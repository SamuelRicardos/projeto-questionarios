import { useState } from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import { Link, useNavigate } from "react-router-dom";
import Logo from '../assets/Quiz_logo.png'

export const HeaderCategorias = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const user = useAuthStore((state) => state.user);
    const clearUser = useAuthStore((state) => state.clearUser);

    const handleDropdown = () => {
        setIsOpen((prev) => !prev);
    };

    const handleOptionClick = (option: string) => {
        if (option === "Sair") {
            localStorage.removeItem("token");
            clearUser();
            navigate("/login");
        } else {
            alert(`${option} selecionado.`);
        }
        setIsOpen(false);
    };

    return (
        <header className="bg-[#529E8D] text-white p-5 flex items-center justify-between shadow-md relative">
            <Link to="/" className="text-2xl font-bold text-gray-800 cursor-pointer">
                <div className="w-13 h-13 bg-white rounded-full flex items-center justify-center shadow-md">
                    <img src={Logo} className="w-16" alt="Logo do site" />
                </div>
            </Link>

            <div className="flex items-center gap-4 relative">
                <div className="text-right">
                    <p className="text-lg font-semibold">{user?.name || "Usuário"}</p>
                    <p className="text-sm text-gray-200">{user?.cargo || "Visitante"}</p>
                </div>

                {user?.photo ? (
                    <img
                        src={user.photo}
                        alt="Foto do usuário"
                        className="w-12 h-12 rounded-full border-2 border-white"
                    />
                ) : (
                    <FaUserCircle className="w-12 h-12 text-gray-200" />
                )}

                <FaChevronDown
                    className="text-white cursor-pointer"
                    onClick={handleDropdown}
                />

                {isOpen && (
                    <div className="absolute right-0 mt-25 bg-white text-gray-800 rounded-lg shadow-md w-44 z-50">
                        <ul className="flex flex-col">
                            <li
                                onClick={() => handleOptionClick("Configurações")}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Configurações
                            </li>
                            <li
                                onClick={() => handleOptionClick("Sair")}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            >
                                Sair
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
};
