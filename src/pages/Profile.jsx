import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme";

export default function Profile() {
  const navigate = useNavigate();
  const { theme } = useTheme(); // 🎨 récupère le thème actuel
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return (
      <p className="text-center text-red-500 mt-10">
        ⚠ Utilisateur non connecté
      </p>
    );
  }

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300
        ${theme === "dark"
          ? "text-white"
          : "text-gray-800"
        }`}
    >
      <div
        className={`shadow-xl rounded-2xl p-8 max-w-md w-full border transition-colors duration-300
          ${theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
          }`}
      >
        {/* Avatar */}
        <div className="flex justify-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
            />
          ) : (
            <span
              className={`flex items-center justify-center w-24 h-24 text-4xl font-bold rounded-full border-4 border-indigo-500 shadow-md
                ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
              {user.name[0].toUpperCase()}
            </span>
          )}
        </div>

        {/* Nom + Email */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
            {user.email}
          </p>
        </div>

        {/* Infos supplémentaires */}
        <div className="mt-6 space-y-3">
          <p>
            <strong>📅 Membre depuis :</strong>{" "}
            {user.createdAt
              ? new Date(user.createdAt).toLocaleDateString()
              : "Inconnu"}
          </p>
          <p>
            <strong>📝 Articles publiés :</strong> {user.blogsCount ?? 0}
          </p>
        </div>

        {/* Bouton Modifier */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/profile/edit")}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md transition-all"
          >
            ✏️ Modifier le profil
          </button>
        </div>
      </div>
    </div>
  );
}
