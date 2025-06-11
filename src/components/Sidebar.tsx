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
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "../store/themeStore";

const menuItems = [
  { id: 1, label: "Início", icon: <FaHome />, href: "/categorias" },
  { id: 2, label: "Dashboard", icon: <FaChartBar />, href: "/dashboard" },
  { id: 3, label: "Ranking", icon: <FaTrophy />, href: "/ranking" },
  { id: 4, label: "Configurações", icon: <FaCog />, href: "/configuracoes" },
  { id: 5, label: "Sair", icon: <FaSignOutAlt />, href: "/" },
];

export const Sidebar = () => {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useThemeStore((state: { theme: any }) => state.theme);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUser(null);
    navigate("/");
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botão hambúrguer fixo no topo, apenas mobile */}
      <button
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
        aria-controls="sidebar"
        onClick={toggleSidebar}
        className={`fixed top-4 left-4 z-50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1
          md:hidden
          ${theme === "dark"
            ? "bg-gray-800 text-gray-100 focus:ring-blue-400 focus:ring-offset-gray-900"
            : "bg-white text-gray-800 focus:ring-blue-500 focus:ring-offset-white shadow-md"
          }
        `}
      >
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Overlay para fechar o menu clicando fora (apenas mobile) */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        id="sidebar"
        style={{ height: "100vh" }}
        className={`
          fixed top-0 left-0 z-50 w-64 border-r shadow-lg
          bg-white dark:bg-gray-900 dark:border-gray-700 text-gray-800 dark:text-gray-100
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:shadow-none
        `}
        aria-label="Sidebar principal"
      >
        <div className="flex justify-end p-2 md:hidden">
          <button onClick={toggleSidebar} aria-label="Fechar menu">
            <FaTimes
              size={24}
              className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
            />
          </button>
        </div>

        <div
          className={`flex items-center gap-4 p-3 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"
            } flex-shrink-0`}
        >
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <FaUserCircle
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"
                } text-3xl`}
            />
          </div>
          <div>
            <p className="text-lg font-semibold truncate whitespace-nowrap overflow-hidden max-w-[140px]">
              {user ? user.nome : "Carregando..."}
            </p>
            <p
              className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"
                } text-sm`}
            >
              Estudante
            </p>
          </div>
        </div>

        <nav className="flex-grow overflow-y-auto mt-4 px-2" role="menu">
          {menuItems.map(({ id, label, icon, href }) => {
            const isLogout = label === "Sair";

            return (
              <a
                key={id}
                role="menuitem"
                tabIndex={0}
                onClick={() => {
                  setIsOpen(false);
                  if (isLogout) {
                    handleLogout();
                  } else {
                    window.location.href = href;
                  }
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-md cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 ${theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-blue-400 focus:ring-offset-gray-900"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:ring-blue-500 focus:ring-offset-white"
                  }`}
              >
                <span className="text-lg">{icon}</span>
                <span className="text-md font-medium">{label}</span>
              </a>
            );
          })}
        </nav>

        <div
          className={`p-4 border-t text-center text-sm flex-shrink-0 ${theme === "dark"
            ? "border-gray-700 text-gray-400"
            : "border-gray-200 text-gray-400"
            }`}
        >
          © 2025 Projeto Questionários
        </div>
      </aside>
    </>
  );
};