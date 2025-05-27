import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaBook,
  FaCog,
  FaSignOutAlt,
  FaUserCircle,
} from "react-icons/fa";

const menuItems = [
  { id: 1, label: "Início", icon: <FaHome />, href: "/" },
  { id: 2, label: "Cursos", icon: <FaBook />, href: "/cursos" },
  { id: 3, label: "Configurações", icon: <FaCog />, href: "/configuracoes" },
  { id: 4, label: "Sair", icon: <FaSignOutAlt />, href: "/logout" },
];

export const Sidebar = () => {
  const [user, setUser] = useState<{ nome: string; email: string } | null>(null);

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
    <aside className="flex flex-col bg-white w-64 h-screen border-r border-gray-200 shadow-lg sticky top-0" aria-label="Sidebar principal">
      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        <div className="w-12 h-12 rounded-full flex items-center justify-center">
          <FaUserCircle className="text-3xl text-gray-500" />
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-800 truncate whitespace-nowrap overflow-hidden max-w-[140px]">
            {user ? user.nome : "Carregando..."}
          </p>
          <p className="text-sm text-gray-500">Estudante</p>
        </div>
      </div>

      <nav className="flex flex-col flex-grow mt-4" role="menu">
        {menuItems.map(({ id, label, icon, href }) => (
          <a
            key={id}
            href={href}
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-white cursor-pointer"
            role="menuitem"
            tabIndex={0}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-md font-medium">{label}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 text-center text-gray-400 text-sm">
        © 2025 Sua Plataforma
      </div>
    </aside>
  );
};
