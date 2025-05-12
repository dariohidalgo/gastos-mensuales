import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import { gmail_v1 } from "googleapis";
import { decode as quotedPrintableDecode } from "quoted-printable";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
import "dayjs/locale/es";
import * as dotenv from "dotenv";
dotenv.config();

admin.initializeApp();
const db = admin.firestore();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

function findBodyData(
  parts: gmail_v1.Schema$MessagePart[] | undefined,
  mimeType: string
): string | null {
  if (!parts) return null;
  for (const part of parts) {
    if (part.mimeType === mimeType && part.body?.data) {
      return part.body.data;
    }
    if (part.parts) {
      const found = findBodyData(part.parts, mimeType);
      if (found) return found;
    }
  }
  return null;
}

function decodeEmail(rawData: string): string {
  const base64 = rawData.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");
  return quotedPrintableDecode(buffer.toString("utf8"));
}

function extractCommerceAndDate(text: string) {
  const regex = /el día\s+(\d{2}\/\d{2}\/\d{4})[^.]*?en\s+([A-Z0-9*]+)/i;
  const match = text.match(regex);
  if (match) {
    const [, dateStr, transactionDetail] = match;
    return { dateStr, transactionDetail };
  }
  console.warn("⚠️ No se pudo extraer fecha y comercio.");
  return { dateStr: null, transactionDetail: null };
}

function extractAmounts(text: string) {
  const regex = /consumo de \$\s*([\d.]+,\d{2})(?:\s+en\s+(\d+)\s+cuotas?)?/i;
  const match = text.match(regex);
  if (match) {
    const raw = match[1].replace(/\./g, "").replace(",", ".");
    const amountInPesos = parseFloat(raw);
    const installments = match[2] ? parseInt(match[2], 10) : 1;
    return { amountInPesos, installments };
  }
  console.warn("⚠️ No se detectó un importe válido.");
  return { amountInPesos: 0, installments: 1 };
}

const processGmailMovements = async () => {
  const query =
    'from:alertas@infomistarjetas.com subject:"Novedades de tus transacciones" newer_than:1d';
  const res = await gmail.users.messages.list({ userId: "me", q: query });
  const messages = res.data?.messages || [];



  for (const msg of messages) {

    const msgData = await gmail.users.messages.get({
      userId: "me",
      id: msg.id!,
      format: "full",
    });
    const payload = msgData.data.payload;

    let htmlRaw = "";
    if (payload?.parts) {
      const htmlEncoded = findBodyData(payload.parts, "text/html");
      if (htmlEncoded) htmlRaw = decodeEmail(htmlEncoded);
    } else if (payload?.body?.data) {
      htmlRaw = decodeEmail(payload.body.data);
    }
    const plainText = htmlRaw
      .replace(/&nbsp;/gi, " ")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();

   
    const { dateStr, transactionDetail } = extractCommerceAndDate(plainText);
    const { amountInPesos, installments } = extractAmounts(plainText);

    if (!transactionDetail || !amountInPesos) {
      console.warn("⚠️ Datos incompletos. Se omite el registro.");
      continue;
    }

    const formattedDate = dateStr
      ? dayjs(dateStr, "DD/MM/YYYY").format("YYYY-MM-DD")
      : dayjs(parseInt(msgData.data.internalDate || "0")).format("YYYY-MM-DD");

    const dup = await db
      .collection("creditCardExpenses")
      .where("date", "==", formattedDate)
      .where("transactionDetail", "==", transactionDetail)
      .where("amountInPesos", "==", amountInPesos)
      .get();

    if (dup.empty) {
      await db.collection("creditCardExpenses").add({
        date: formattedDate,
        transactionDetail,
        amountInPesos,
        amountInDollars: 0,
        installments,
      });
   
    
    } else {
      console.log(`🔁 Duplicado: ${transactionDetail} - ya existe.`);
    }
  }


};

export const syncCreditCardEmails = functions.pubsub
  .schedule("every day 23:50")
  .timeZone("America/Argentina/Cordoba")
  .onRun(processGmailMovements);

export const syncCreditCardEmailsHTTP = functions.https.onRequest(
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }
    try {
      await processGmailMovements();
      res.status(200).send("✅ Sincronizado");
    } catch (e) {
      console.error("❌ Error al sincronizar:", e);
      res.status(500).send(`❌ ${e}`);
    }
  }
);
