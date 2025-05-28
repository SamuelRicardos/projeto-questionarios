import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
  FaTrophy,
  FaChartBar,
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
  const theme = useThemeStore((state: { theme: any; }) => state.theme);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const email = localStorage.getItem("email");
      if (!token) return;

      try {
        const response = await axios.get(`http://localhost:8080/auth/profile?email=${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar perfil do usuário:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <aside
      className={`flex flex-col w-64 h-screen border-r shadow-lg sticky top-0
        ${theme === "dark"
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-800"
        }
      `}
      aria-label="Sidebar principal"
    >
      <div
        className={`flex items-center gap-4 p-4 border-b
          ${theme === "dark" ? "border-gray-700" : "border-gray-200"}
        `}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <FaUserCircle className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-3xl`} />
        </div>
        <div>
          <p className="text-lg font-semibold truncate whitespace-nowrap overflow-hidden max-w-[140px]">
            {user ? user.nome : "Carregando..."}
          </p>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-500"} text-sm`}>
            Estudante
          </p>
        </div>
      </div>

      <nav className="flex flex-col flex-grow mt-4" role="menu">
        {menuItems.map(({ id, label, icon, href }) => (
          <a
            key={id}
            href={href}
            role="menuitem"
            tabIndex={0}
            className={`flex items-center gap-3 px-6 py-3 rounded-md cursor-pointer transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1
              ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700 hover:text-white focus:ring-blue-400 focus:ring-offset-gray-900"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700 focus:ring-blue-500 focus:ring-offset-white"
              }
            `}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-md font-medium">{label}</span>
          </a>
        ))}
      </nav>

      <div
        className={`p-4 border-t text-center text-sm
          ${theme === "dark" ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-400"}
        `}
      >
        © 2025 Sua Plataforma
      </div>
    </aside>
  );
};
