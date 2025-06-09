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
    <div className="fixed inset-0 bg-blue-100 flex items-center justify-center ">
      <div className="bg-white rounded-2xl shadow-2xl px-6 py-8 sm:px-10 sm:py-12 w-full max-w-xs sm:max-w-md flex flex-col items-center animate-fade-in">
        <img
          src={budgetImage}
          alt="Presupuesto y ahorro"
          className="w-16 h-16 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 object-cover border-4 border-blue-100 shadow-md"
        />
        <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-800 mb-1">Gastos</h1>
        <p className="text-base sm:text-lg text-gray-500 mb-8 sm:mb-8">Hidalgo Voos</p>
        <button
          onClick={handleLogin}
          className="w-70 h-10  sm:h-12 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 rounded-xl shadow transition-all duration-200 text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full p-1" viewBox="0 0 48 48">
            <g>
              <path fill="#4285F4" d="M44.5,20H24v8.5h11.7C34.7,33.9,30.1,37,24,37c-7.2,0-13-5.8-13-13s5.8-13,13-13c3.1,0,6,1.1,8.2,2.9l6.2-6.2C34.3,4.5,29.4,2.5,24,2.5C12.7,2.5,3.5,11.7,3.5,23S12.7,43.5,24,43.5c10.5,0,20-8,20-20C44,22.7,44.3,21.3,44.5,20z"/>
              <path fill="#34A853" d="M6.3,14.7l7,5.1C15.5,16.1,19.4,13,24,13c3.1,0,6,1.1,8.2,2.9l6.2-6.2C34.3,4.5,29.4,2.5,24,2.5C15.1,2.5,7.4,8.7,6.3,14.7z"/>
              <path fill="#FBBC05" d="M24,44.5c5.4,0,10.3-2,14-5.3l-6.5-5.3C30.1,37,25.5,39,24,39c-5.4,0-10.1-3.5-11.7-8.5l-7,5.4C7.4,39.3,15.1,44.5,24,44.5z"/>
              <path fill="#EA4335" d="M44.5,20H24v8.5h11.7c-1.1,3.1-4.2,5.5-7.7,5.5c-5.4,0-10.1-3.5-11.7-8.5l-7,5.4C7.4,39.3,15.1,44.5,24,44.5c10.5,0,20-8,20-20C44,22.7,44.3,21.3,44.5,20z"/>
            </g>
          </svg>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
