import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // adapte si backend sur un autre port
});

// Attacher le token JWT à chaque requête si présent
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const updateUserProfile = (formData) =>
  API.put(`/auth/profile`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const getProfile = () => API.get("/auth/profile");


// Users
// export const createUser = (data) => API.post("/users/create", data);
// export const fetchUsers = () => API.get("/users/get");
// export const fetchUserById = (id) => API.get(`/users/${id}`);
// export const updateUser = (id, data) => API.put(`/users/${id}`, data);
// export const deleteUser = (id) => API.delete(`/users/${id}`);

// Blogs (si tu as déjà un BlogController / BlogRoutes)
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export const createBlog = (formData) =>
  API.post("/blogs", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const fetchBlogs = (page = 1, limit = 5) =>
  API.get(`/blogs?page=${page}&limit=${limit}`);

export const fetchBlogById = (id) => API.get(`/blogs/${id}`);


export default API;
