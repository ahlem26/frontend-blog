import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateBlog, fetchBlogById } from "../api";
import { useTheme } from "../useTheme"; // ✅ Hook theme

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme(); // ✅ accès au thème

  const [form, setForm] = useState({ title: "", content: "" });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetchBlogById(id);
        const blogs = res.data;
        if (blogs) {
          setForm({ title: blogs.title, content: blogs.content });
          setPreview(blogs.image || null);
        }
      } catch (err) {
        console.error("Erreur chargement blog:", err);
      }
    };
    load();
  }, [id]);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("content", form.content);
      if (file) fd.append("image", file);

      await updateBlog(id, fd);
      navigate("/blogs");
    } catch (err) {
      setMsg(err.response?.data?.message || "Erreur modification");
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
        className={`w-full max-w-2xl rounded-2xl shadow-lg p-8 border transition-colors duration-300
          ${theme === "dark"
            ? "bg-gray-900 border-gray-700"
            : "bg-white border-gray-200"
          }`}
      >
        <h2
          className={`text-3xl font-bold text-center mb-6
            ${theme === "dark" ? "text-white" : "text-gray-800"}`}
        >
          ✏️ Modifier Blog
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Titre */}
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Titre"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />

          {/* Contenu */}
          <textarea
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            rows={6}
            placeholder="Contenu"
            required
            className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-indigo-500 focus:outline-none transition
              ${theme === "dark"
                ? "bg-gray-700 text-white border-gray-600"
                : "bg-white text-gray-900 border-gray-300"
              }`}
          />

          {/* Aperçu image */}
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Aperçu"
                className={`w-48 h-48 object-cover rounded-lg shadow-md border 
                  ${theme === "dark" ? "border-gray-600" : "border-gray-300"}`}
              />
            </div>
          )}

          {/* Upload image */}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`block w-full text-sm
              ${theme === "dark" ? "text-gray-300" : "text-gray-600"} 
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-600 file:text-white
              hover:file:bg-indigo-700`}
          />

          {/* Bouton Sauvegarder */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            ✅ Sauvegarder
          </button>
        </form>

        {/* Message */}
        {msg && (
          <p className="mt-4 text-center text-red-500 font-medium">{msg}</p>
        )}
      </div>
    </div>
  );
}
