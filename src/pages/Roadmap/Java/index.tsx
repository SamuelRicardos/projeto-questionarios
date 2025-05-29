import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaCheckCircle, FaPlay } from "react-icons/fa";
import { useLessonStore } from "../../../store/licaoStore";
import { BotaoTema } from "@/components/BotaoTema";
import { useEffect } from "react";
import { useThemeStore } from "@/store/themeStore";

const icones = {
  bloqueada: <FaLock className="text-gray-400 dark:text-gray-500" />,
  disponivel: <FaPlay className="text-[#9f00ff] animate-bounce" />,
  concluida: <FaCheckCircle className="text-green-500" />,
};

export const RoadmapJava = () => {
  const navigate = useNavigate();
  const { licoesPorLinguagem } = useLessonStore();
  const licoes = licoesPorLinguagem["java"];
  const { theme, hasHydrated } = useThemeStore();
  const isDark = theme === "dark";

  useEffect(() => {
    if (hasHydrated) {
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [theme, hasHydrated]);

  const iniciarTopico = (topico: string) => {
    navigate(`/perguntas/java/${topico}`);
  };

  const progresso = Math.round(
    (licoes.filter((l) => l.status === "concluida").length / licoes.length) * 100
  );

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-tr from-gray-100 via-white to-gray-100 text-gray-800 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900 dark:text-white transition-colors duration-300">
      <BotaoTema />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 tracking-tight">
          Roadmap Java ☕
          <span className="block w-20 h-1 bg-[#9f00ff] mx-auto mt-2 rounded animate-pulse"></span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {licoes.map((licao) => (
            <motion.div
              key={licao.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: licao.id * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`relative group p-6 rounded-2xl shadow-md border transition-all duration-300
                ${
                  licao.status === "bloqueada"
                    ? "bg-gray-200 border-gray-300 dark:bg-zinc-700/60 dark:border-zinc-600"
                    : licao.status === "disponivel"
                    ? "bg-purple-100 border-purple-400 dark:bg-purple-600/20 dark:border-purple-400"
                    : "bg-green-100 border-green-400 dark:bg-green-600/20 dark:border-green-400"
                }
              `}
            >
              <div className="text-4xl mb-4">{icones[licao.status]}</div>
              <span className="text-xl font-semibold text-center block">
                {licao.titulo}
              </span>

              {licao.status === "disponivel" && (
                <button
                  className="mt-5 px-4 py-2 w-full bg-[#9f00ff] hover:bg-purple-700 text-white rounded-lg shadow transition-all"
                  onClick={() => iniciarTopico(licao.topico)}
                >
                  Começar
                </button>
              )}

              {licao.status !== "disponivel" && (
                <span className="mt-4 text-sm text-gray-600 dark:text-gray-300 block text-center">
                  {licao.status === "bloqueada" ? "Bloqueada" : "Concluída"}
                </span>
              )}

              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#9f00ff] transition duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg font-medium mb-2">Progresso no Java:</p>
          <div className="w-full bg-gray-300 dark:bg-zinc-700 rounded-full h-4 overflow-hidden">
            <motion.div
              className="bg-[#9f00ff] h-4 shadow-[0_0_10px_#9f00ff,0_0_20px_#9f00ff]"
              initial={{ width: 0 }}
              animate={{ width: `${progresso}%` }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{progresso}% concluído</p>
        </div>
      </div>
    </div>
  );
};