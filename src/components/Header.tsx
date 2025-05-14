import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface Header1Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header1: React.FC<Header1Props> = ({ toggleDarkMode, darkMode }) => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLoginPage = location.pathname === "/";

  if (isLoginPage) return null;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-md">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 lg:h-20 items-center justify-between w-full">
    {/* QUITAMOS justify-between temporalmente o permanentemente */}
  
        {/* Contenedor para elementos de la izquierda (Logo y Hamburguesa) */}
        <div className="flex items-center">
          {/* Botón hamburguesa (solo mobile) */}
          <div className="lg:hidden mr-2"> {/* Opcional: mr-2 si quieres un poco de espacio entre hamburguesa y logo en móvil */}
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Abrir menú principal</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

           {/* Logo or App Name */}
        <div className="text-white text-xl font-bold"> {/* Quita lg:mr-8 si ya no es necesario con esta estructura */}
          Gastos App
        </div>
      </div>

          {/* Botones navegación y perfil en pantalla grande */}
          <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 ml-auto"> {/* <-- AÑADIDO ml-auto */}
            <button
              onClick={() => navigate("/expenses")}
              className={`rounded-md px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${location.pathname === "/expenses"
                ? "bg-gray-900 text-white scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
                }`}
            >
              🏠 Inicio
            </button>
            <button
              onClick={() => navigate("/credit-expenses")}
              className={`rounded-md px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${location.pathname === "/credit-expenses"
                ? "bg-gray-900 text-white scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
                }`}
            >
              💳 Tarjetas
            </button>
            <button
              onClick={handleSignOut}
              className="rounded-md px-2 py-1 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </button>
            <button
              onClick={toggleDarkMode}
              className="rounded-full bg-gray-800 p-1 lg:p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 hover:rotate-12"
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              type="button"
              className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none hover:scale-110 transition-all duration-300"
            >
              <img
                className="size-8 lg:size-10 rounded-full"
                src={user?.photoURL || "https://via.placeholder.com/32"}
                alt="Foto de perfil"
              />
            </button>
          </div>
        </div>

        {/* Menú mobile desplegable */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 bg-gray-700 rounded-lg shadow-xl">
            <div className="space-y-1 px-2 pt-2 pb-3">
              <button
                onClick={() => {
                  navigate("/expenses");
                  toggleMobileMenu();
                }}
                className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${location.pathname === "/expenses"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                🏠 Inicio
              </button>
              <button
                onClick={() => {
                  navigate("/credit-expenses");
                  toggleMobileMenu();
                }}
                className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${location.pathname === "/credit-expenses"
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
              >
                💳 Tarjetas
              </button>
              <button
                onClick={handleSignOut}
                className="block w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
              <div className="flex items-center space-x-4 px-3 py-2">
                <button
                  onClick={toggleDarkMode}
                  className="rounded-full bg-gray-800 p-2 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 hover:rotate-12"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
                <img
                  className="size-10 rounded-full"
                  src={user?.photoURL || "https://via.placeholder.com/32"}
                  alt="Foto de perfil"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header1;
