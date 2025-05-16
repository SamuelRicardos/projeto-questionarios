import { FaCode, FaDatabase, FaCloud, FaCogs } from "react-icons/fa";
import Girl from "../../assets/Landingpage_quests.png";
import Duolingo from "../../assets/duolingo.png";
import Header from "../../components/Header";
import ComoFunciona from "../../components/ComoFunciona";
import FAQAccordion from "../../components/FAQ";
import Footer from "../../components/Footer";
import { useThemeStore } from "../../store/themeStore";

const Home = () => {
    const { theme } = useThemeStore();

    return (
        <>
            <Header />
            <main
                className={`w-full h-full transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-[#faf7ed] text-gray-800"
                    }`}
            >
                <section className="w-full h-[89.9vh] max-w-[1500px] overflow-hidden flex justify-center relative">
                    {theme === "dark" ? (
                        <div className="w-full flex items-center justify-center gap-10 px-10">
                            <div className="flex flex-col gap-4 max-w-[50%]">
                                <h1 className="text-4xl font-bold text-white">
                                    Sabia que este site foi inspirado no Duolingo? ✨
                                </h1>
                                <p className="text-lg text-gray-400">
                                    O desenvolvedor trouxe o conceito de aprendizado interativo e
                                    gamificação do Duolingo para criar uma experiência única em
                                    questionários. Explore, aprenda e teste seus conhecimentos de forma
                                    divertida e envolvente!
                                </p>
                                <button className="px-4 py-2 font-bold mt-5 border border-gray-500 rounded-lg cursor-pointer bg-gray-700 text-white hover:bg-gray-600 transition w-[30%]">
                                    Saiba mais
                                </button>
                            </div>

                            <img
                                src={Duolingo}
                                alt="Imagem do Duolingo representando inspiração para o site."
                                className="w-[30vw] h-[70vh] object-contain transition-all duration-300"
                            />
                        </div>
                    ) : (
                        <img
                            src={Girl}
                            alt="Foto de garota com um caderno na mão convidando para realizar questionario"
                            className="w-[80vw] h-[100vh] object-cover hidden sm:block transition-all duration-300"
                        />
                    )}

                    <div className="sm:hidden text-center flex flex-col items-center justify-center h-full p-4">
                        <h1
                            className={`text-4xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-800"
                                }`}
                        >
                            Aprenda e teste seus conhecimentos em programação!
                        </h1>
                        <p
                            className={`text-lg max-w-[300px] ${theme === "dark" ? "text-gray-400" : "text-gray-600"
                                }`}
                        >
                            Explore questionários desafiadores sobre linguagens, bancos de
                            dados, DevOps e muito mais!
                        </p>
                        <button
                            className={`px-4 py-2 font-bold mt-5 border border-gray-300 rounded-lg cursor-pointer ${theme === "dark" ? "bg-gray-700 text-white" : "bg-[#D9D9D9] text-gray-800"
                                }`}
                        >
                            Comece agora!
                        </button>
                    </div>
                </section>

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

                <ComoFunciona />
                <FAQAccordion />
                <Footer />
            </main>
        </>
    );
};

export default Home;
