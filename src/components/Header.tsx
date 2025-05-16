import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/Quiz_logo.png";
import { useThemeStore } from "../store/themeStore";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === "dark"
            ? "bg-gray-800 shadow-md"
            : "bg-[#faf7ed] shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1500px] mx-auto flex justify-between items-center p-1">
        <Link to="/" className="text-2xl font-bold cursor-pointer">
          <img src={Logo} className="w-16" alt="Logo do site" />
        </Link>

        <nav
          className={`hidden md:flex gap-6 pr-4 ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
        >
          <button
            onClick={toggleTheme}
            className="focus:outline-none hover:text-gray-400 transition cursor-pointer"
          >
            {theme === "light" ? (
              <FaMoon className="text-gray-800" size={20} />
            ) : (
              <FaSun className="text-yellow-400" size={20} />
            )}
          </button>
          <Link
            to="/login"
            className="cursor-pointer hover:text-gray-400 transition"
          >
            Login
          </Link>
          <Link
            to="/cadastro"
            className="cursor-pointer hover:text-gray-400 transition"
          >
            Cadastrar-se
          </Link>
        </nav>

        <div
          className={`md:hidden cursor-pointer ${
            theme === "dark" ? "text-gray-200" : "text-gray-800"
          }`}
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {isOpen && (
        <div
          className={`md:hidden flex flex-col items-center gap-4 py-4 ${
            theme === "dark" ? "bg-gray-800 text-gray-200" : "bg-[#faf7ed]"
          }`}
        >
          <Link
            to="/login"
            onClick={closeMenu}
            className="cursor-pointer hover:text-gray-400 transition"
          >
            Login
          </Link>
          <Link
            to="/cadastro"
            onClick={closeMenu}
            className="cursor-pointer hover:text-gray-400 transition"
          >
            Cadastrar-se
          </Link>
          <a
            href="#categorias"
            onClick={closeMenu}
            className="cursor-pointer hover:text-gray-400 transition"
          >
            Categorias
          </a>
          <a
            href="#como-funciona"
            onClick={closeMenu}
            className="cursor-pointer hover:text-gray-400 transition"
          >
            Como Funciona
          </a>
          <a
            href="#faq"
            onClick={closeMenu}
            className="cursor-pointer hover:text-gray-400 transition"
          >
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;