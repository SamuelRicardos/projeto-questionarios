import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaCheckCircle, FaPlay } from "react-icons/fa";
import { useLessonStore } from "../../../store/licaoStore";

const icones = {
  bloqueada: <FaLock className="text-gray-400" />,
  disponivel: <FaPlay className="text-blue-500 animate-pulse" />,
  concluida: <FaCheckCircle className="text-green-500" />,
};

export const RoadmapCsharp = () => {
  const navigate = useNavigate();
  const { licoesPorLinguagem } = useLessonStore();
  const licoes = licoesPorLinguagem["csharp"]; // Pega lições da linguagem C#

  const iniciarTopico = (topico: string) => {
    navigate(`/perguntas/${topico}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Roadmap - C#
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {licoes.map((licao) => (
          <motion.div
            key={licao.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: licao.id * 0.1 }}
            className={`flex flex-col items-center justify-center p-4 rounded-xl shadow-md border-2 ${
              licao.status === "bloqueada"
                ? "bg-gray-100 border-gray-300"
                : licao.status === "disponivel"
                ? "bg-blue-50 border-blue-400"
                : "bg-green-50 border-green-400"
            }`}
          >
            <div className="text-3xl mb-2">{icones[licao.status]}</div>
            <span className="text-center font-medium text-gray-700">
              {licao.titulo}
            </span>

            {licao.status === "disponivel" && (
              <button
                className="cursor-pointer mt-3 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none"
                onClick={() => iniciarTopico(licao.topico)}
              >
                Começar
              </button>
            )}

            {licao.status !== "disponivel" && (
              <span className="mt-3 text-xs text-gray-500">
                {licao.status === "bloqueada" ? "Bloqueada" : "Concluída"}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
