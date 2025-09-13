import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserProfile } from "../api";
import { useTheme } from "../useTheme"; // ✅ Import du thème

export default function EditProfile() {
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ Récupérer le thème
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");

  const [form, setForm] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(storedUser?.avatar || null);
  const [msg, setMsg] = useState("");

  // ✅ Gérer changement avatar
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  // ✅ Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("email", form.email);
      if (file) fd.append("avatar", file);

      const res = await updateUserProfile(fd);

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/profile");
    } catch (err) {
      setMsg(err.response?.data?.message || "Erreur modification profil");
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
      <div className={`shadow-xl rounded-2xl p-8 max-w-md w-full border transition-colors duration-300
          ${theme === "dark"
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          ✏️ Modifier le profil
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Preview */}
          <div className="flex justify-center">
            {preview ? (
              <img
                src={preview}
                alt={form.name}
                className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
              />
            ) : (
              <span className={`flex items-center justify-center w-24 h-24 text-4xl font-bold rounded-full border-4 border-indigo-500 shadow-md
                ${theme === "dark" ? "text-white" : "text-gray-800"}`}
              >
                {form.name[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Upload Avatar */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`block w-full text-sm
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-600 file:text-white
                     hover:file:bg-indigo-700
                     ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          />

          {/* Name */}
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Nom"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />

          {/* Email */}
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Email"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            💾 Sauvegarder
          </button>
        </form>

        {msg && <p className="mt-4 text-center text-red-500">{msg}</p>}
      </div>
    </div>
  );
}
