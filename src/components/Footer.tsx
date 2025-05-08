import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#faf7ed] w-full py-8 mt-1">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div className="text-gray-800 text-center md:text-left">
          <h3 className="text-xl font-bold">Quests - Teste seus conhecimentos</h3>
          <p className="text-gray-600">© 2025 Todos os direitos reservados.</p>
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Sobre
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Contato
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Termos de Serviço
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            Política de Privacidade
          </a>
        </div>

        <div className="flex gap-4">
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            <FaLinkedin size={20} />
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-800 transition">
            <FaWhatsapp size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;