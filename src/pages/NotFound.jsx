import { useTheme } from "../useTheme"; // ✅ Hook theme
export default function NotFound() {
  const { theme } = useTheme(); // ✅ accès au thème
  return <h2
    className={`mt-6 text-center text-sm
        ${theme === "dark" ? "text-white" : "text-black"}`}
  >
    404 - Page non trouvée
  </h2>;
}
