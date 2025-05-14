import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import budgetImage from "../assets/budget-image.jpg";
import "../styles/global.css";


const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Correo electrónicos permitidos
      const allowedEmails = ["dhidalgo651@gmail.com", "voosdani@gmail.com"];

      if (user && allowedEmails.includes(user.email!)) {
        // Redirigir a la página de gastos si el correo es válido
        navigate("/expenses");
      } else {
        // Mostrar un mensaje de error y cerrar sesión si el correo no es válido
        alert("Correo electrónico no autorizado.");
        auth.signOut();
      }
    } catch (error) {
      alert(
        "Error durante el inicio de sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-10 text-center max-w-md w-full transform transition-all duration-300 hover:scale-105">
        <div className="mb-8 flex justify-center">
          <img
            src={budgetImage}
            alt="Presupuesto y ahorro"
            className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-white"
          />
        </div>
        <h2 className="text-4xl mb-6 text-gray-800 font-light tracking-tight">
          Bienvenido a
          <span className="block text-5xl font-bold text-blue-600 mt-2">Gastos</span>
          <span className="block text-3xl font-semibold text-gray-600 mt-1">Hidalgo Voos</span>
        </h2>
        <button 
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50" 
          onClick={handleLogin}
        >
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
