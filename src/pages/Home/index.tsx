import Girl from "../../assets/Landingpage_quests.png";
import Duolingo from "../../assets/duolingo.png";
import test from "../../assets/test.png"
import Header from "../../components/Header";
import ComoFunciona from "../../components/ComoFunciona";
import FAQAccordion from "../../components/FAQ";
import Footer from "../../components/Footer";
import { useThemeStore } from "../../store/themeStore";
import { motion, AnimatePresence } from "framer-motion";
import { CategoriasHome } from "../../components/CategoriasHome";

const Home = () => {
    const { theme } = useThemeStore();

    return (
        <>
            <Header />
            <main
                className={`w-full h-full transition-colors duration-300 ${theme === "dark" ? "bg-gray-800 text-white" : "bg-[#faf7ed] text-gray-800"
                    }`}
            >
                <section className="w-full h-[89.9vh] max-w-[1600px] overflow-hidden flex justify-center relative">
                    <AnimatePresence mode="wait" initial={false}>
                        {theme === "dark" ? (
                            <motion.div
                                key="dark-theme"
                                className="relative w-full h-full hidden sm:flex items-center justify-center gap-10 px-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7 }}
                            >
                                <motion.img
                                    src={test}
                                    alt="Background Image"
                                    className="absolute inset-0 w-full h-full object-cover z-10"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                />

                                <div className="w-full flex items-center justify-center gap-10 relative z-20 px-10">
                                    <motion.div
                                        className="flex flex-col gap-4 max-w-[50%]"
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 100 }}
                                        transition={{ duration: 0.7 }}
                                    >
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
                                            Comece agora!
                                        </button>
                                    </motion.div>

                                    <motion.img
                                        src={Duolingo}
                                        alt="Imagem do Duolingo representando inspiração para o site."
                                        className="w-[30vw] h-[70vh] object-contain"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: [0, -15, 0],
                                        }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{
                                            opacity: { duration: 0.7 },
                                            scale: { duration: 0.7 },
                                            y: {
                                                duration: 4,
                                                repeat: Infinity, 
                                                repeatType: "loop",
                                                ease: "easeInOut",
                                            },
                                        }}
                                    />
                                </div>
                            </motion.div>
                        ) : (
                            <motion.img
                                key="light-theme"
                                src={Girl}
                                alt="Foto de garota com um caderno na mão convidando para realizar questionario"
                                className="w-[80vw] h-[100vh] object-cover hidden sm:block relative z-10"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.7 }}
                            />
                        )}
                    </AnimatePresence>

                    <div className="sm:hidden text-center flex flex-col items-center justify-center h-full p-4 relative z-10">
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

                <CategoriasHome/>
                <ComoFunciona />
                <FAQAccordion />
                <Footer />
            </main>
        </>
    );
};

export default Home;
