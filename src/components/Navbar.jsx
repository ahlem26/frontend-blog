import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const { theme, toggleTheme } = useTheme();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className={`flex justify-between items-center px-8 py-4 shadow-md transition-colors duration-300
        ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gradient-to-r from-indigo-100 via-white to-blue-100 text-gray-800"}
      `}
    >
      {/* Liens gauche */}
      <div className="flex space-x-6 font-medium">
        <Link
          to="/"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          Accueil
        </Link>
        <Link
          to="/blogs"
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
        >
          Blogs
        </Link>
      </div>

      {/* Liens droite */}
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="hidden sm:inline">
              Bonjour, <span className="font-semibold">{user.name}</span>
            </span>
            <Link
              to="/create"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition"
            >
              + Ajouter
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-gray-800 dark:text-gray-200 shadow-sm transition"
            >
              Profil
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow-md transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition"
            >
              Register
            </Link>
          </>
        )}

        {/* Bouton Dark/Light */}
        <button
          onClick={toggleTheme}
          className="ml-4 p-2 rounded-full bg-indigo-200 dark:bg-gray-800 text-gray-900 dark:text-yellow-300 hover:scale-110 shadow-md transition"
          aria-label="Toggle Dark Mode"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}
