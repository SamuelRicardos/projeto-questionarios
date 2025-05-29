import { useMemo } from "react";
import { useLessonStore } from "../store/licaoStore";
import { useThemeStore } from "../store/themeStore";

type ProgressProps = {
  linguagem: string;
};

export const ProgressBar = ({ linguagem }: ProgressProps) => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const linguagemKey = linguagem.toLowerCase(); // Normaliza a chave
  const licoes = useLessonStore((state) => state.licoesPorLinguagem[linguagemKey]);

  const progresso = useMemo(() => {
    if (!licoes || licoes.length === 0) return 0;
    const concluidas = licoes.filter((l) => l.status === "concluida").length;
    return Math.round((concluidas / licoes.length) * 100);
  }, [licoes]);

  return (
    <div className="mt-4 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
      <div
        className={`h-3 rounded-full transition-all duration-500 ${isDark ? "bg-[#9f00ff]" : "bg-green-500"}`}
        style={{ width: `${progresso}%` }}
      />
    </div>
  );
};
