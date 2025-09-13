import React, { useEffect, useState } from "react";
import { fetchBlogs, deleteBlog } from "../api";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../useTheme"; // 👈 importer le hook

export default function Blogs() {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    const [blogs, setBlogs] = useState([]);
    const [err, setErr] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { theme } = useTheme(); // 👈 accéder au thème

    useEffect(() => {
        const get = async () => {
            try {
                const res = await fetchBlogs(page, 5);
                setBlogs(res.data.blogs);
                setTotalPages(res.data.totalPages);
            } catch (e) {
                setErr("Impossible de charger les blogs");
                console.error(e);
            }
        };
        get();
    }, [page]);

    const handleDelete = async (id) => {
        if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
            try {
                await deleteBlog(id);
                setBlogs(blogs.filter((b) => b._id !== id));
            } catch (e) {
                alert("Erreur lors de la suppression");
                console.error(e);
            }
        }
    };

    return (
        <div
            className={`max-w-6xl mx-auto px-6 py-12 transition-colors duration-300
        ${theme === "dark"
                    ? "text-white"
                    : "text-gray-800"
                }`}
        >
            <h2
                className={`text-3xl font-bold mb-8 text-center 
        ${theme === "dark" ? "text-white" : "text-gray-800"}`}
            >
                📚 Blogs
            </h2>

            {err && (
                <p className="text-red-500 text-center mb-6">{err}</p>
            )}

            {blogs.length === 0 && (
                <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-center`}>
                    Aucun article pour l'instant.
                </p>
            )}

            <div className="space-y-8">
                {blogs.map((b) => (
                    <article
                        key={b._id}
                        className={`shadow-lg rounded-xl overflow-hidden border transition-colors duration-300
              ${theme === "dark"
                                ? "bg-gray-900 border-gray-700"
                                : "bg-white border-gray-200"}`}
                    >
                        {b.image && (
                            <img
                                src={b.image}
                                alt={b.title}
                                className="w-full h-64 object-cover"
                            />
                        )}
                        <div className="p-6">
                            <h3
                                className={`text-xl font-semibold mb-2 
                ${theme === "dark" ? "text-white" : "text-gray-800"}`}
                            >
                                {b.title}
                            </h3>
                            <p
                                className={`mb-4 line-clamp-3 
                ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
                            >
                                {b.content}
                            </p>
                            <small
                                className={`block text-sm mb-4
                ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                            >
                                ✍️ Auteur : {b.author?.name || "Inconnu"} •{" "}
                                {new Date(b.createdAt).toLocaleString()}
                            </small>

                            {currentUser && currentUser._id === b.author._id && (
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/blogs/edit/${b._id}`)}
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
                                    >
                                        ✏️ Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(b._id)}
                                        className="px-4 py-2 text-sm font-medium rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                                    >
                                        🗑️ Supprimer
                                    </button>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-10">
                <button
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${page <= 1
                            ? theme === "dark"
                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white"
                        }`}
                >
                    ◀ Précédent
                </button>

                <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>
                    Page {page} / {totalPages}
                </span>

                <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${page >= totalPages
                            ? theme === "dark"
                                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-indigo-500 hover:bg-indigo-600 text-white"
                        }`}
                >
                    Suivant ▶
                </button>
            </div>
        </div>
    );
}
