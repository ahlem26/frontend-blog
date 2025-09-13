import React, { useState } from "react";
import { registerUser, getProfile } from "../api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme"; // ✅ Hook theme

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: "", createdAt: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ accès au thème

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(form);
      // backend renvoie token + user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify({
        name: res.data.name,
        email: res.data.email,
        id: res.data._id,
        avatar: res.data.avatar,   // ajout de l’avatar
        createdAt: res.data.createdAt,
      }));
      // 2️⃣ Récupération profil complet
      const profileRes = await getProfile();
      localStorage.setItem("user", JSON.stringify(profileRes.data));
      navigate("/blogs");
    } catch (err) {
      setMsg(err.response?.data?.message || "Erreur inscription");
      console.error(err);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 transition-colors duration-300
        ${theme === "dark"
          ? "text-white"
          : "text-gray-800"
        }`}
    >
      <div
        className={`w-full max-w-sm p-8 rounded-2xl shadow-xl border transition-colors duration-300
          ${theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
          }`}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Inscription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            required
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />
          <input
            required
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />
          <input
            required
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            S'inscrire
          </button>
        </form>

        {msg && (
          <p className="mt-4 text-center text-red-500 font-medium">{msg}</p>
        )}

        <p className={`mt-6 text-center text-sm
        ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
          Déjà un compte ?{" "}
          <a
            href="/login"
            className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline"
          >
            Se connecter
          </a>
        </p>
      </div>
    </div>
  );
}
