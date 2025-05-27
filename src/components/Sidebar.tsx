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
  const user = {
    name: "Samuel Ricardo",
    photo: "",
  };

  return (
    <aside
      className="flex flex-col bg-white w-64 h-screen border-r border-gray-200
                 shadow-lg sticky top-0"
      aria-label="Sidebar principal"
    >

      <div className="flex items-center gap-4 p-4 border-b border-gray-200">
        {user.photo ? (
          <img
            src={user.photo}
            alt={`${user.name} foto do perfil`}
            className="w-12 h-12 rounded-full object-cover shadow-sm"
          />
        ) : (
          <div className="w-12 h-12 rounded-full flex items-center justify-center">
            <FaUserCircle className="text-3xl text-gray-500" />
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">Aluno Python</p>
        </div>
      </div>

      <nav className="flex flex-col flex-grow mt-4" role="menu">
        {menuItems.map(({ id, label, icon, href }) => (
          <a
            key={id}
            href={href}
            className="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-blue-100
                       hover:text-blue-700 transition-colors duration-200 rounded-md
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
                       focus:ring-offset-white cursor-pointer"
            role="menuitem"
            tabIndex={0}
          >
            <span className="text-lg">{icon}</span>
            <span className="text-md font-medium">{label}</span>
          </a>
        ))}
      </nav>

      {/* Rodapé */}
      <div className="p-4 border-t border-gray-200 text-center text-gray-400 text-sm">
        © 2025 Sua Plataforma
      </div>
    </aside>
  );
};
