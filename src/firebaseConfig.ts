import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // Importa GoogleAuthProvider
import { getFirestore } from "firebase/firestore";

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
const app = initializeApp(firebaseConfig);

// Inicializa Auth y Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configura el proveedor de Google
export const provider = new GoogleAuthProvider(); // Añade esta línea para el proveedor
