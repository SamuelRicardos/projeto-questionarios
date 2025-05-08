import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../assets/Quiz_logo.png'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#faf7ed] shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-[1500px] mx-auto flex justify-between items-center p-1">
        <Link to='/' className="text-2xl font-bold text-gray-800 cursor-pointer">
          <img src={Logo} className='w-16' alt="Logo do site" />
        </Link>

        <nav className="hidden md:flex gap-6 text-gray-800 pr-4">
          <Link to="/login" className="cursor-pointer hover:text-gray-600 transition">
            Login
          </Link>
          <Link to="/cadastro" className="cursor-pointer hover:text-gray-600 transition">
            Cadastrar-se
          </Link>
        </nav>

        <div className="md:hidden text-gray-800 cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#faf7ed] flex flex-col items-center gap-4 py-4">
          <Link to="/login" className="cursor-pointer hover:text-gray-600 transition">
            Login
          </Link>
          <Link to="/cadastro" className="cursor-pointer hover:text-gray-600 transition">
            Cadastrar-se
          </Link>
          <a href="#categorias" onClick={closeMenu} className="cursor-pointer hover:text-gray-600 transition">
            Categorias
          </a>
          <a href="#como-funciona" onClick={closeMenu} className="cursor-pointer hover:text-gray-600 transition">
            Como Funciona
          </a>
          <a href="#faq" onClick={closeMenu} className="cursor-pointer hover:text-gray-600 transition">
            FAQ
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;