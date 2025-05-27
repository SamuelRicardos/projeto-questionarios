import { motion } from "framer-motion";
import { FaLock, FaCheckCircle, FaPlay } from "react-icons/fa";

type Licao = {
  id: number;
  titulo: string;
  status: "bloqueada" | "disponivel" | "concluida";
};

const licoes: Licao[] = [
  { id: 1, titulo: "Introdução ao Python", status: "concluida" },
  { id: 2, titulo: "Variáveis e Tipos", status: "concluida" },
  { id: 3, titulo: "Operadores", status: "disponivel" },
  { id: 4, titulo: "Condicionais", status: "bloqueada" },
  { id: 5, titulo: "Laços de Repetição", status: "bloqueada" },
  { id: 6, titulo: "Funções", status: "bloqueada" },
  { id: 7, titulo: "Listas e Tuplas", status: "bloqueada" },
];

const icones = {
  bloqueada: <FaLock className="text-gray-400" />,
  disponivel: <FaPlay className="text-blue-500 animate-pulse" />,
  concluida: <FaCheckCircle className="text-green-500" />,
};

export const RoadmapPython = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Trilha de Aprendizado em Python 🐍
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
                className="mt-3 px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none"
                aria-label={`Começar ${licao.titulo}`}
              >
                Começar
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};
