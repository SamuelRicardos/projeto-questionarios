import { FaListAlt, FaChartLine, FaQuestion, FaUser } from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

const ComoFunciona = () => {
  const { theme } = useThemeStore();

  return (
    <section
      id="como-funciona"
      className={`w-full py-16 flex flex-col items-center transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-[#faf7ed]"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Como funciona?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] w-full px-4">
        {[
          {
            icon: <FaUser className="text-4xl mb-4" />,
            title: "1. Crie sua conta",
            description: "Faça seu cadastro para acessar todos os questionários.",
          },
          {
            icon: <FaListAlt className="text-4xl mb-4" />,
            title: "2. Escolha uma categoria",
            description: "Navegue entre as opções e selecione a área desejada.",
          },
          {
            icon: <FaQuestion className="text-4xl mb-4" />,
            title: "3. Responda os questionários",
            description: "Desafie seus conhecimentos com perguntas interativas.",
          },
          {
            icon: <FaChartLine className="text-4xl mb-4" />,
            title: "4. Confira seus resultados",
            description: "Analise seu desempenho e veja onde pode melhorar.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg flex flex-col items-center shadow-md transition-transform transform hover:-translate-x-3 hover:-translate-y-3 hover:shadow-lg duration-300 ${
              theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
            }`}
          >
            {item.icon}
            <h3
              className={`text-lg font-semibold mb-2 whitespace-nowrap transition-colors duration-300 ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`text-center min-h-[48px] transition-colors duration-300 ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ComoFunciona;
