import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/login";
import ExpenseForm from "./components/expenseForm";
import ExpenseSummary from "./components/ExpenseSummary";
import CreditCardExpenseForm from "./components/CreditCardExpenseForm";
import GastosGrafico from "./components/GastosGrafico";
import UserInfo from "./components/UserInfo";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Función para proteger rutas
const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticating(false);
    });

    return () => unsubscribe();
  }, []);

  if (isAuthenticating) {
    return null; // O mostrar un spinner de carga mientras se verifica la autenticación
  }

  return user ? <>{children}</> : <Navigate to="/" />;
};

// Componente principal de la aplicación
const App: React.FC = () => {
  const handleTotalsUpdate = (totals: Record<string, number>) => {
    console.log("Totales actualizados:", totals);
  };

  useEffect(() => {
    const handleBeforeUnload = () => {
      // Usar sendBeacon para una desconexión segura al cerrar o recargar la página
      navigator.sendBeacon(
        "/signout",
        JSON.stringify({ user: auth.currentUser })
      );
      signOut(auth).catch((error) =>
        console.error("Error al desloguearse:", error)
      );
    };

    window.addEventListener("unload", handleBeforeUnload);

    return () => {
      window.removeEventListener("unload", handleBeforeUnload);
    };
  }, []);

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <UserInfo />
        <h1 className="d-flex justify-content-center align-items-center">
          Gastos Hidalgo Voos
        </h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gastos-grafico" element={<GastosGrafico />} />
          <Route
            path="/expenses"
            element={
              <PrivateRoute>
                <>
                  <ExpenseForm />
                  <ExpenseSummary />
                </>
              </PrivateRoute>
            }
          />
          <Route
            path="/credit-expenses"
            element={
              <PrivateRoute>
                <CreditCardExpenseForm onTotalsUpdate={handleTotalsUpdate} />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
