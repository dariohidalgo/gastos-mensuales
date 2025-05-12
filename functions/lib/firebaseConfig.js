"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.provider = exports.db = exports.auth = void 0;
const app_1 = require("firebase/app");
const auth_1 = require("firebase/auth"); // Importa GoogleAuthProvider
const firestore_1 = require("firebase/firestore");
// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCqkgutqaofo2LOGpNnAurawoP21IrMicY",
    authDomain: "gastos-66dbe.firebaseapp.com",
    projectId: "gastos-66dbe",
    storageBucket: "gastos-66dbe.appspot.com",
    messagingSenderId: "1092119604551",
    appId: "1:1092119604551:web:032ce6a8cb110fec04f062",
};
// Inicializa Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
// Inicializa Auth y Firestore
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, firestore_1.getFirestore)(app);
// Configura el proveedor de Google
exports.provider = new auth_1.GoogleAuthProvider(); // Añade esta línea para el proveedor
//# sourceMappingURL=firebaseConfig.js.map