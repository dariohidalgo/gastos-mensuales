const { google } = require("googleapis");
const readline = require("readline");

const oAuth2Client = new google.auth.OAuth2(
  "1092119604551-f3h7tr9jcbc4rb4hbj64db8ksvfim05f.apps.googleusercontent.com",
  "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",
  "http://localhost" // redirecciona localmente
);

// Genera la URL para autorizar
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/gmail.readonly"],
});

console.log("Visita esta URL para autorizar la app:");
console.log(authUrl);

// Leer el código desde la terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Pegá aquí el código que obtuviste de la URL: ", (code) => {
  rl.close();
  oAuth2Client.getToken(code, (err, token) => {
    if (err) {
      return console.error("Error obteniendo el token:", err);
    }
    console.log("🎉 Refresh Token generado:");
    console.log(token.refresh_token);
  });
});
