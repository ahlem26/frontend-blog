import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import EditBlog from "./pages/EditBlog";
import { ThemeProvider } from "./ThemeProvider";
import { useTheme } from "./useTheme"; // ✅ importer le hook

function AppContent() {
  const { theme } = useTheme(); // ✅ récupère le thème (dark / light)

  return (
    <BrowserRouter>
      {/* Navbar toujours affichée */}
      <Navbar />

      {/* Contenu principal */}
      <main
        className={`min-h-screen px-6 py-8 transition-colors
    ${theme === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
            : "bg-gradient-to-br from-blue-500 via-blue-200 to-white"
          }`}
      >

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateBlog />
              </ProtectedRoute>
            }
          />
          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
