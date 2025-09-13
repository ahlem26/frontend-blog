import React, { useState } from "react";
import { loginUser, getProfile } from "../api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme"; // ✅ Hook theme

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ accès au thème

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: res.data.name,
          email: res.data.email,
          id: res.data._id,
          avatar: res.data.avatar,
          createdAt: res.data.createdAt,
        })
      );
      const profileRes = await getProfile();
      localStorage.setItem("user", JSON.stringify(profileRes.data));
      navigate("/blogs");
    } catch (err) {
      setMsg(err.response?.data?.message || "Connexion échouée");
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
        {/* Titre */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Connexion 🔑
        </h2>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
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
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white 
              font-medium rounded-lg shadow-md transition"
          >
            Se connecter
          </button>
        </form>

        {/* Message d'erreur */}
        {msg && (
          <p className="mt-4 text-sm text-center text-red-500">{msg}</p>
        )}

        {/* Lien inscription */}
        <p className={`mt-6 text-center text-sm
        ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}>
          Pas encore de compte ?{" "}
          <a
            href="/register"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Inscrivez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
