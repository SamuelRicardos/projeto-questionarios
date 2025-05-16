import { FaListAlt, FaChartLine, FaQuestion, FaUser } from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

const ComoFunciona = () => {
  const { theme } = useThemeStore();

  return (
    <section
      id="como-funciona"
      className={`w-full py-16 flex flex-col items-center transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800" : "bg-[#f3f4f6]"
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
            icon: <FaUser className="text-4xl md:text-5xl mb-4 text-blue-400" />,
            title: "1. Crie sua conta",
            description: "Faça seu cadastro para acessar todos os questionários.",
          },
          {
            icon: <FaListAlt className="text-4xl md:text-5xl mb-4 text-cyan-400" />,
            title: "2. Escolha uma categoria",
            description: "Navegue entre as opções e selecione a área desejada.",
          },
          {
            icon: <FaQuestion className="text-4xl md:text-5xl mb-4 text-purple-400" />,
            title: "3. Responda os questionários",
            description: "Desafie seus conhecimentos com perguntas interativas.",
          },
          {
            icon: <FaChartLine className="text-4xl md:text-5xl mb-4 text-green-400" />,
            title: "4. Confira seus resultados",
            description: "Analise seu desempenho e veja onde pode melhorar.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl flex flex-col items-center shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-lg 
            ${theme === "dark"
                ? "bg-gray-900 backdrop-blur-md border border-gray-700 hover:border-cyan-500 cursor-pointer"
                : "bg-white/80 backdrop-blur-lg border border-gray-200 hover:border-cyan-500 cursor-pointer"
              }`}
          >
            {item.icon}
            <h3
              className={`text-xl md:text-2xl font-semibold ${theme === "dark" ? "text-cyan-400" : "text-gray-800"}`}
            >
              {item.title}
            </h3>
            <p
              className={`text-center text-sm md:text-base mt-2 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}
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
