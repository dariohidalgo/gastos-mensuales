import React from "react";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import budgetImage from "../assets/budget-image.jpg";

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
    <div className="login d-flex justify-content-center align-items-center vh-90">
      <div className="col-10 col-sm-8 col-md-6 col-lg-10 d-flex flex-column align-items-center text-center">
        <img
          src={budgetImage}
          alt="Presupuesto y ahorro"
          className="mb-4"
          style={{ width: "450px", height: "450px", borderRadius: "10px" }}
        />
        <h2
          className="titulo mb-4 wow-title"
          style={{
            fontSize: "2.5rem",
            color: "#007bff",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          Bienvenido a{" "}
          <span style={{ fontWeight: "bold" }}>Gastos Hidalgo Voos</span>
        </h2>
        <button className="btn btn-primary btn-lg" onClick={handleLogin}>
          Iniciar sesión con Google
        </button>
      </div>
    </div>
  );
};

export default Login;
