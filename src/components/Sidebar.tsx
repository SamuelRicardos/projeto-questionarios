import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaTrophy,
  FaChartBar,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

const menuItems = [
  { id: 1, label: "Início", icon: <FaHome />, href: "/categorias" },
  { id: 2, label: "Dashboard", icon: <FaChartBar />, href: "/dashboard" },
  { id: 3, label: "Ranking", icon: <FaTrophy />, href: "/ranking" },
  { id: 4, label: "Configurações", icon: <FaCog />, href: "/configuracoes" },
  { id: 5, label: "Sair", icon: <FaSignOutAlt />, href: "/logout" },
];

export const Sidebar = () => {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useThemeStore((state: { theme: any }) => state.theme);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (!token) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/auth/profile?email=${email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls="sidebar"
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 ${
          theme === "dark"
            ? "bg-gray-800 text-gray-100 focus:ring-blue-400 focus:ring-offset-gray-900"
            : "bg-white text-gray-800 focus:ring-blue-500 focus:ring-offset-white shadow-md"
        } md:hidden`}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>
      <aside
        id="sidebar"
        style={{ height: "100vh" }} // altura fixa na viewport
        className="sticky top-0 w-64 border-r shadow-lg
      bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100
      flex flex-col"
        aria-label="Sidebar principal"
      >
        {/* Header */}
        <div
          className={`flex items-center gap-4 p-4 border-b ${
            theme === "dark" ? "border-gray-700" : "border-gray-200"
          } flex-shrink-0`}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <FaUserCircle
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } text-3xl`}
            />
          </div>
          <div>
            <p className="text-lg font-semibold truncate whitespace-nowrap overflow-hidden max-w-[140px]">
              {user ? user.nome : "Carregando..."}
            </p>
            <p
              className={`${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              } text-sm`}
            >
              Estudante
            </p>
          </div>
        </div>

        {/* Nav com scroll */}
        <nav className="flex-grow overflow-y-auto mt-4 px-2" role="menu">
          {menuItems.map(({ id, label, icon, href }) => (
            <a
              key={id}
              href={href}
              role="menuitem"
              tabIndex={0}
              onClick={() => setIsOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-blue-400 focus:ring-offset-gray-900"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:ring-blue-500 focus:ring-offset-white"
              }`}
            >
              <span className="text-lg">{icon}</span>
              <span className="text-md font-medium">{label}</span>
            </a>
          ))}
        </nav>

        {/* Footer fixo embaixo */}
        <div
          className={`p-4 border-t text-center text-sm flex-shrink-0 ${
            theme === "dark"
              ? "border-gray-700 text-gray-400"
              : "border-gray-200 text-gray-400"
          }`}
        >
          © 2025 Sua Plataforma
        </div>
      </aside>

      {/* Fundo escuro quando sidebar aberta no mobile */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          aria-hidden="true"
        />
      )}
    </>
  );
};
