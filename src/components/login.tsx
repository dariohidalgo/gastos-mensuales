import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      console.error("Error durante el inicio de sesión:", error);
      alert(
        "Error durante el inicio de sesión. Por favor, inténtalo de nuevo."
      );
    }
  };

  return (
    <div className="login d-flex justify-content-center align-items-center vh-100">
      <div className="col-10 col-sm-8 col-md-6 col-lg-4 d-flex flex-column align-items-center">
        <h2 className="titulo mb-4 text-center">
          Bienvenido a la Aplicación de Gastos
        </h2>
        <button className="btn btn-primary" onClick={handleLogin}>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
