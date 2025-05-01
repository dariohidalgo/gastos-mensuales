// functions/src/index.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { google } from "googleapis";
import dayjs from "dayjs";
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
oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

const processGmailMovements = async () => {
  const query = `from:alertas@infomistarjetas.com subject:'Notificación de Movimiento' newer_than:1d`;

  try {
    const res = await gmail.users.messages.list({ userId: "me", q: query });
    const messages = res.data?.messages || [];

    console.log(`🔍 Mensajes encontrados: ${messages.length}`);

    if (messages.length === 0) {
      console.log("⚠️ No se encontraron mensajes con el filtro aplicado.");
      return;
    }

    for (const msg of messages) {
      const msgData = await gmail.users.messages.get({
        userId: "me",
        id: msg.id ?? "",
        format: "full",
      });

      const bodyEncoded = msgData.data.payload?.parts?.[0]?.body?.data || "";
      const body = Buffer.from(bodyEncoded, "base64").toString("utf-8");

      const matchPesos = body.match(/consumo de \$\s?([\d.,]+)/i);
      const matchDolares = body.match(/consumo de USD\s?([\d.,]+)/i);
      const matchCuotas = body.match(/en (\d+) cuotas?/i);
      const matchFecha = body.match(/el d[ií]a (\d{2}\/\d{2}\/\d{4})/i);
      const matchComercio = body.match(/en ([A-ZÁÉÍÓÚÑ0-9.*\- ]+)/i);

      const amountInPesos = matchPesos
        ? parseFloat(matchPesos[1].replace(/\./g, "").replace(",", "."))
        : 0;
      const amountInDollars = matchDolares
        ? parseFloat(matchDolares[1].replace(/\./g, "").replace(",", "."))
        : 0;
      const installments = matchCuotas ? parseInt(matchCuotas[1]) : 1;
      const dateStr = matchFecha ? matchFecha[1] : null;
      const transactionDetail = matchComercio ? matchComercio[1].trim() : "";

      const msgDate = dayjs(dateStr, "DD/MM/YYYY");
      if (!msgDate.isValid()) {
        console.log("Email omitido por fecha inválida:", dateStr);
        continue;
      }

      const snapshot = await db
        .collection("creditCardExpenses")
        .where("date", "==", msgDate.format("YYYY-MM-DD"))
        .where("transactionDetail", "==", transactionDetail)
        .where("amountInPesos", "==", amountInPesos)
        .limit(1)
        .get();

      if (!snapshot.empty) {
        console.log("Movimiento ya existe, no se duplica");
        continue;
      }

      await db.collection("creditCardExpenses").add({
        date: msgDate.format("YYYY-MM-DD"),
        transactionDetail,
        amountInPesos,
        amountInDollars,
        installments,
      });

      console.log("✅ Gasto agregado:", transactionDetail, amountInPesos);
    }
  } catch (err) {
    console.error("❌ Error al sincronizar mails:", err);
  }
};

export const syncCreditCardEmails = functions.pubsub
  .schedule("every day 23:50")
  .timeZone("America/Argentina/Cordoba")
  .onRun(processGmailMovements);

export const syncCreditCardEmailsHTTP = functions.https.onRequest(
  async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "GET, POST");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    try {
      await processGmailMovements();
      res.status(200).send("✅ Sincronización completada.");
    } catch (error) {
      console.error("❌ Error en sincronización HTTP:", error);
      res.status(500).send("❌ Error al sincronizar.");
    }
  }
);
