import React from "react";
import { useTheme } from "../useTheme"; // ✅ récupère le thème

export default function Home() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen w-full text-center px-6 transition-colors duration-300
        ${theme === "dark"
          ? "text-white"
          : "text-gray-900"
        }`}
    >
      {/* Titre principal */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow">
        Bienvenue sur le{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Blog App 🚀
        </span>
      </h1>

      {/* Sous-titre */}
      <p
        className={`text-lg md:text-xl max-w-2xl mb-10
        ${theme === "dark"
            ? "text-gray-300"
            : "text-gray-700"
          }`}
      >
        Découvrez les idées de la communauté, partagez vos histoires et inspirez d’autres passionnés ✨
      </p>

      {/* Boutons */}
      <div className="flex flex-wrap gap-4">
        <a
          href="/blogs"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 
                     text-white font-semibold shadow-lg 
                     hover:scale-105 hover:shadow-xl transform transition duration-300"
        >
          🌍 Explorer les Blogs
        </a>

        <a
          href="/create"
          className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-red-500 
                     text-white font-semibold shadow-lg 
                     hover:scale-105 hover:shadow-xl transform transition duration-300"
        >
          ✍️ Créer un Blog
        </a>
      </div>
    </div>
  );
}
