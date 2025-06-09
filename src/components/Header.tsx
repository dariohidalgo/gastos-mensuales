import React, {  useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

interface Header1Props {
  toggleDarkMode: () => void;
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Header1: React.FC<Header1Props> = ({ toggleDarkMode, darkMode, mobileMenuOpen, setMobileMenuOpen }) => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === "/";

  // Efecto para manejar cambios de modo oscuro
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  if (isLoginPage) return null;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  // --- HEADER FIJO ---
  return (
    <>
      <nav className="fixed top-0 left-0 w-full right-0 z-50 bg-white dark:bg-black shadow-md transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between w-full">
            {/* Contenedor para elementos de la izquierda (Logo y Hamburguesa) */}
            <div className="flex items-center">
              {/* Botón hamburguesa (solo mobile) */}
              <div className="lg:hidden mr-2">
                <button
                  onClick={toggleMobileMenu}
                  type="button"
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
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
              <div className="text-gray-900 dark:text-white text-xl font-bold transition-colors duration-200">
                Gastos App
              </div>
            </div>
            {/* Botones navegación y perfil en pantalla grande */}
            <div className="hidden lg:flex items-center space-x-4 lg:space-x-6 ml-auto">
              <button
                onClick={() => navigate("/expenses")}
                className={`rounded-md px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${location.pathname === "/expenses"
                  ? "bg-gray-900 dark:bg-gray-700 text-white scale-105"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:scale-105"
                  }`}
              >
                🏠 Inicio
              </button>
              <button
                onClick={() => navigate("/credit-expenses")}
                className={`rounded-md px-3 py-2 text-sm lg:text-base font-medium transition-all duration-300 ${location.pathname === "/credit-expenses"
                  ? "bg-gray-900 dark:bg-gray-700 text-white scale-105"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white hover:scale-105"
                  }`}
              >
                💳 Tarjetas
              </button>
              <button
                onClick={handleSignOut}
                className="rounded-md px-2 py-1 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
              <button
                onClick={toggleDarkMode}
                className="rounded-full bg-gray-200 dark:bg-gray-800 p-1 lg:p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:rotate-12"
              >
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button
                type="button"
                className="relative flex rounded-full bg-gray-200 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none hover:scale-110 transition-all duration-300"
              >
                <img
                  className="size-8 lg:size-10 rounded-full"
                  src={user?.photoURL || "https://via.placeholder.com/32"}
                  alt="Foto de perfil"
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú lateral (drawer) en mobile */}
      {mobileMenuOpen && (
        <>
          {/* Fondo overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer lateral solo con clases Tailwind */}
          <div
            className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 z-50 p-4 transition-transform duration-300 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
          >
            {/* Botón cerrar */}
            <button
              className="mb-4 text-gray-900 dark:text-white text-2xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              ✕
            </button>
            <div className="space-y-1">
              <button
                onClick={() => {
                  navigate("/expenses");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === "/expenses"
                    ? "bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                }`}
              >
                🏠 Inicio
              </button>
              <button
                onClick={() => {
                  navigate("/credit-expenses");
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left rounded-md px-3 py-2 text-base font-medium ${
                  location.pathname === "/credit-expenses"
                    ? "bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-white"
                    : "text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
                }`}
              >
                💳 Tarjetas
              </button>
              <button
                onClick={() => {
                  handleSignOut();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Salir
              </button>
              <div className="flex items-center space-x-3 px-3 py-1">
                <button
                  onClick={toggleDarkMode}
                  className="rounded-full bg-gray-200 dark:bg-gray-700 p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 hover:rotate-12"
                >
                  {darkMode ? "☀️" : "🌙"}
                </button>
                <img
                  className="size-9 rounded-full"
                  src={user?.photoURL || "https://via.placeholder.com/32"}
                  alt="Foto de perfil"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header1;
