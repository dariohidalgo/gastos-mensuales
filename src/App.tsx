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
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
  };
  const [creditCardTotals, setCreditCardTotals] = useState<Record<string, number>>({});

  const handleTotalsUpdate = (totals: Record<string, number>) => {
    setCreditCardTotals(totals);
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
      <div
        className={`app ${darkMode ? "dark-mode" : "light-mode"}`}
        style={{
          padding: "20px",
          backgroundColor: darkMode ? "#121212" : "#ffffff",
          color: darkMode ? "#ffffff" : "#000000",
          minHeight: "100vh",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        <header className="app-header p-3 position-relative ">
          <div className=" top-0 end-0 p-3 d-flex flex-column flex-md-row align-items-center gap-2 user-controls">
            <button
              onClick={toggleDarkMode}
              className="mode-toggle btn btn-outline-secondary w-20 w-md-auto"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <div className="user-info w-100 w-md-auto">
              <UserInfo />
            </div>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/gastos-grafico" element={<GastosGrafico />} />
          <Route
            path="/expenses"
            element={
              <PrivateRoute>
                <>
                  <ExpenseForm />
                  <ExpenseSummary creditCardTotals={creditCardTotals} />
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
