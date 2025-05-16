import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

const Footer = () => {
  const { theme } = useThemeStore();

  return (
    <footer
      className={`w-full py-8 mt-1 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-[#faf7ed]"
      }`}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center px-4 gap-4">
        <div
          className={`text-center md:text-left transition-colors duration-300 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <h3 className="text-xl font-bold">Quests - Teste seus conhecimentos</h3>
          <p
            className={`transition-colors duration-300 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            © 2025 Todos os direitos reservados.
          </p>
        </div>

        <div className="flex gap-4">
          {["Sobre", "Contato", "Termos de Serviço", "Política de Privacidade"].map(
            (item, index) => (
              <a
                key={index}
                href="#"
                className={`transition-colors duration-300 ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {item}
              </a>
            )
          )}
        </div>

        <div className="flex gap-4">
          {[FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp].map((Icon, index) => (
            <a
              key={index}
              href="#"
              className={`transition-colors duration-300 ${
                theme === "dark"
                  ? "text-gray-400 hover:text-gray-200"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;