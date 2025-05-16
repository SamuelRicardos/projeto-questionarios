import { FaCode, FaDatabase, FaCloud, FaCogs } from "react-icons/fa";
import { useThemeStore } from "../store/themeStore";

export const CategoriasHome = () => {
    const { theme } = useThemeStore();

    return (
        <section
            id="categorias"
            className={`w-full py-16 flex flex-col items-center transition-colors duration-300 ${theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
        >
            <h2
                className={`text-3xl font-bold mb-8 ${theme === "dark" ? "text-white" : "text-gray-800"
                    }`}
            >
                Categorias de questionários
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] w-full px-4">
                {[
                    {
                        icon: <FaCode className="text-4xl md:text-5xl mb-4" />,
                        title: "Programação",
                        description: "Testes sobre JavaScript, Python, Java, C++ e mais.",
                    },
                    {
                        icon: <FaDatabase className="text-4xl md:text-5xl mb-4" />,
                        title: "Banco de Dados",
                        description: "Desafios SQL, NoSQL, modelagem e otimização.",
                    },
                    {
                        icon: <FaCloud className="text-4xl md:text-5xl mb-4" />,
                        title: "Cloud Computing",
                        description: "Testes sobre AWS, Azure, GCP e arquitetura em nuvem.",
                    },
                    {
                        icon: <FaCogs className="text-4xl md:text-5xl mb-4" />,
                        title: "DevOps",
                        description: "Conceitos sobre CI/CD, Docker, Kubernetes e mais.",
                    },
                ].map((item, index) => (
                    <div
                        key={index}
                        className={`p-6 rounded-lg flex flex-col items-center shadow-md transition-transform transform hover:-translate-x-3 hover:-translate-y-3 hover:shadow-lg ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#faf7ed] text-gray-800"
                            }`}
                    >
                        {item.icon}
                        <h3 className="text-xl md:text-2xl font-semibold">
                            {item.title}
                        </h3>
                        <p className="text-center text-sm md:text-base mt-2">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
