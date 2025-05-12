"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncCreditCardEmailsHTTP = exports.syncCreditCardEmails = void 0;
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const googleapis_1 = require("googleapis");
const quoted_printable_1 = require("quoted-printable");
const dayjs_1 = __importDefault(require("dayjs"));
const customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
dayjs_1.default.extend(customParseFormat_1.default);
require("dayjs/locale/es");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
admin.initializeApp();
const db = admin.firestore();
const oAuth2Client = new googleapis_1.google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });
const gmail = googleapis_1.google.gmail({ version: "v1", auth: oAuth2Client });
function findBodyData(parts, mimeType) {
    if (!parts)
        return null;
    for (const part of parts) {
        if (part.mimeType === mimeType && part.body?.data) {
            return part.body.data;
        }
        if (part.parts) {
            const found = findBodyData(part.parts, mimeType);
            if (found)
                return found;
        }
    }
    return null;
}
function decodeEmail(rawData) {
    const base64 = rawData.replace(/-/g, "+").replace(/_/g, "/");
    const buffer = Buffer.from(base64, "base64");
    return (0, quoted_printable_1.decode)(buffer.toString("utf8"));
}
function extractCommerceAndDate(text) {
    const regex = /el día\s+(\d{2}\/\d{2}\/\d{4})[^.]*?en\s+([A-Z0-9*]+)/i;
    const match = text.match(regex);
    if (match) {
        const [, dateStr, transactionDetail] = match;
        return { dateStr, transactionDetail };
    }
    console.warn("⚠️ No se pudo extraer fecha y comercio.");
    return { dateStr: null, transactionDetail: null };
}
function extractAmounts(text) {
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
    const query = 'from:alertas@infomistarjetas.com subject:"Novedades de tus transacciones" newer_than:1d';
    const res = await gmail.users.messages.list({ userId: "me", q: query });
    const messages = res.data?.messages || [];
  
    for (const msg of messages) {
       
        const msgData = await gmail.users.messages.get({
            userId: "me",
            id: msg.id,
            format: "full",
        });
        const payload = msgData.data.payload;
        let htmlRaw = "";
        if (payload?.parts) {
            const htmlEncoded = findBodyData(payload.parts, "text/html");
            if (htmlEncoded)
                htmlRaw = decodeEmail(htmlEncoded);
        }
        else if (payload?.body?.data) {
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
            ? (0, dayjs_1.default)(dateStr, "DD/MM/YYYY").format("YYYY-MM-DD")
            : (0, dayjs_1.default)(parseInt(msgData.data.internalDate || "0")).format("YYYY-MM-DD");
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
           
        }
        else {
            console.log(`🔁 Duplicado: ${transactionDetail} - ya existe.`);
        }
    }
    
};
exports.syncCreditCardEmails = functions.pubsub
    .schedule("every day 23:50")
    .timeZone("America/Argentina/Cordoba")
    .onRun(processGmailMovements);
exports.syncCreditCardEmailsHTTP = functions.https.onRequest(async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return;
    }
    try {
        await processGmailMovements();
        res.status(200).send("✅ Sincronizado");
    }
    catch (e) {
        console.error("❌ Error al sincronizar:", e);
        res.status(500).send(`❌ ${e}`);
    }
});
//# sourceMappingURL=index.js.map