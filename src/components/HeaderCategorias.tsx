import { FaUserCircle } from "react-icons/fa";

export const HeaderCategorias = () => {
  const user = {
    name: "Samuel Ferreira",
    cargo: "Estudante",
    photo: "",
  };

  return (
    <header className="bg-[#529E8D] text-white p-5 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">Categorias</div>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-lg font-semibold">{user.name}</p>
          <p className="text-sm text-gray-200">{user.cargo}</p>
        </div>

        {user.photo ? (
          <img
            src={user.photo}
            alt="Foto do usuário"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        ) : (
          <FaUserCircle className="w-12 h-12 text-gray-200" />
        )}
      </div>
    </header>
  );
};
