import React, { useState } from "react";
import { createBlog } from "../api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme"; // ✅ Import du thème

export default function CreateBlog() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [msg, setMsg] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ Utiliser le thème

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("content", form.content);
      if (file) fd.append("image", file);

      const res = await createBlog(fd);

      // ✅ Mettre à jour blogsCount de l’utilisateur
      const user = JSON.parse(localStorage.getItem("user"));
      const updatedUser = { ...user, blogsCount: res.data.blogsCount };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      navigate("/blogs");
    } catch (err) {
      setMsg(err.response?.data?.message || "Erreur création");
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
      <div className={`w-full max-w-2xl rounded-2xl shadow-lg p-8 border transition-colors duration-300
          ${theme === "dark"
          ? "bg-gray-900 border-gray-700"
          : "bg-white border-gray-200"
        }`}
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          ✍️ Créer un article
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Champ Titre */}
          <div>
            <label className="block font-medium mb-2">
              Titre
            </label>
            <input
              required
              placeholder="Titre de l'article"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
                }`}
            />
          </div>

          {/* Champ Contenu */}
          <div>
            <label className="block font-medium mb-2">
              Contenu
            </label>
            <textarea
              required
              rows={8}
              placeholder="Écrivez votre contenu ici..."
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-gray-900 border-gray-300"
                }`}
            />
          </div>

          {/* Upload image */}
          <div>
            <label className="block font-medium mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className={`block w-full text-sm
              ${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700`}
            />
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 
                   rounded-lg transition duration-200"
          >
            🚀 Publier
          </button>
        </form>

        {/* Message d'erreur */}
        {msg && (
          <p className="text-center mt-4 text-red-500 font-medium">{msg}</p>
        )}
      </div>
    </div>
  );
}
