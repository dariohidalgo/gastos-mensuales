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
import Header from "./components/Header";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, User, signOut } from "firebase/auth";

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
    return null;
  }

  return user ? <>{children}</> : <Navigate to="/" />;
};

// Componente principal de la aplicación
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
    }
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleBeforeUnload = () => {
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
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Login />} />
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
                <CreditCardExpenseForm />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
