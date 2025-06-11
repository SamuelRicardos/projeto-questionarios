import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Search, RefreshCcw } from "lucide-react";
import { useThemeStore } from "../../../store/themeStore";
import { BotaoTema } from "@/components/BotaoTema";
import { CgTrash } from "react-icons/cg";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export const PerguntasGerais = () => {
  const [topico, setTopico] = useState("");
  const [topicosRecentes, setTopicosRecentes] = useState<string[]>([]);
  const navigate = useNavigate();

  const theme = useThemeStore((state) => state.theme);
  const hasHydrated = useThemeStore((state) => state.hasHydrated);

  useEffect(() => {
    const armazenados = localStorage.getItem("topicosRecentes");
    if (armazenados) {
      setTopicosRecentes(JSON.parse(armazenados));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const topicoFormatado = topico.trim();
    if (!topicoFormatado) return;

    const atualizados = [topicoFormatado, ...topicosRecentes.filter((t) => t !== topicoFormatado)].slice(0, 6);
    localStorage.setItem("topicosRecentes", JSON.stringify(atualizados));
    setTopicosRecentes(atualizados);

    navigate(`/perguntas-gerais/${encodeURIComponent(topicoFormatado)}`);
  };

  const refazerTopico = (t: string) => {
    navigate(`/perguntas-gerais/${encodeURIComponent(t)}`);
  };

  const limparTopicos = () => {
    localStorage.removeItem("topicosRecentes");
    setTopicosRecentes([]);
  };

  if (!hasHydrated) return null;

  return (
    <div
      className={`${
        theme === "dark" ? "bg-zinc-900 text-white" : "bg-white text-black"
      } transition-all duration-300 min-h-screen py-10 px-4`}
    >
      <div className="max-w-3xl mx-auto space-y-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold">Perguntas gerais</h2>
          </div>
          <div className="fixed top-4 right-4 z-50">
            <BotaoTema />
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Digite um tema e receba perguntas personalizadas para praticar seus conhecimentos!
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-3 text-gray-400" />
<input
  type="text"
  placeholder="Insira qualquer assunto para gerar perguntas"
  value={topico}
  onChange={(e) => setTopico(e.target.value)}
  className="
    w-full pl-10 pr-4 py-3 rounded-xl
    border border-gray-300
    bg-white text-black placeholder-gray-500
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500

    dark:border-zinc-600
    dark:bg-zinc-800 dark:text-white dark:placeholder-gray-400
    dark:focus:ring-blue-400 dark:focus:border-blue-400

    transition-colors
  "
  required
/>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            Começar
          </button>
        </form>

        {topicosRecentes.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Tópicos Recentes</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={limparTopicos}
                    type="button"
                    aria-label="Limpar tópicos recentes"
                    className={`
                      cursor-pointer rounded-full transition 
                      ${theme === "dark"
                        ? "bg-zinc-800 hover:bg-zinc-700 text-white shadow-md"
                        : "bg-neutral-100 hover:bg-neutral-200 text-black border border-gray-300"
                      }
                      p-2
                    `}
                  >
                    <CgTrash className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top" align="center">
                  Limpar tópicos recentes
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {topicosRecentes.map((item, index) => (
                <div
                  key={index}
                  onClick={() => refazerTopico(item)}
                  className={`flex items-center justify-between p-4 ${
                    theme === "dark"
                      ? "bg-zinc-800 hover:bg-zinc-700 text-white"
                      : "bg-neutral-100 hover:bg-neutral-200 text-black"
                  } cursor-pointer rounded-xl transition`}
                >
                  <span className="font-medium">{item}</span>
                  <RefreshCcw className="w-5 h-5 text-blue-600" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-sm text-gray-500 dark:text-gray-400 text-center pt-6 border-t dark:border-zinc-700">
          Dica: quanto mais específico for o tópico, melhores serão as perguntas!
        </div>
      </div>
    </div>
  );
};
