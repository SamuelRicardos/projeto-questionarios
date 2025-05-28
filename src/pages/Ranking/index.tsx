import { BotaoTema } from "@/components/BotaoTema";
import { Sidebar } from "@/components/Sidebar";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";
import { FaMedal, FaUserCircle } from "react-icons/fa";

const rankingData = [
  { id: 1, nome: "Samuel Ricardo", pontos: 9800 },
  { id: 2, nome: "Ana Clara", pontos: 9200 },
  { id: 3, nome: "João Pedro", pontos: 8900 },
  { id: 4, nome: "Mariana Silva", pontos: 8600 },
  { id: 5, nome: "Lucas Souza", pontos: 8300 },
  { id: 6, nome: "Beatriz Lima", pontos: 8000 },
];

export const Ranking = () => {
  const { theme, hasHydrated } = useThemeStore();

  useEffect(() => {
    if (hasHydrated) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, hasHydrated]);

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <BotaoTema />
      <main className="flex-1 min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 dark:bg-gradient-to-br dark:from-[#1f2937] dark:via-[#0f172a] dark:to-[#11255b] p-6 flex flex-col items-center">
        <h1 className="text-center text-2xl md:text-4xl font-extrabold text-blue-900 dark:text-gray-100 mb-10 drop-shadow-md w-full max-w-screen-xl px-4">
          Ranking semanal
        </h1>

        <section className="w-full max-w-screen-xl px-4">
          {rankingData.map(({ id, nome, pontos }, index) => {
            const isTop3 = index < 3;
            const neonColors = [
              "text-cyan-400",
              "text-purple-400",
              "text-lime-400", 
            ];
            const borderNeon = [
              "border-cyan-400",
              "border-purple-400",
              "border-lime-400",
            ];
            const textNeon = [
              "text-cyan-300",
              "text-purple-300",
              "text-lime-300",
            ];
            return (
              <div
                key={id}
                className={`flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 mb-4 transition-shadow hover:shadow-xl
                  ${isTop3 ? `border-4 ${borderNeon[index]}` : "border border-blue-200 dark:border-gray-700"}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    aria-label={`Posição ${index + 1}`}
                    className={`flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-gray-700 font-bold text-blue-700 dark:${textNeon[index] ?? "text-gray-300"} text-xl select-none`}
                  >
                    {isTop3 ? (
                      <FaMedal
                        className={`${neonColors[index]} text-3xl`}
                        aria-hidden="true"
                        title={`Medalha da posição ${index + 1}`}
                      />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <FaUserCircle className="text-blue-400 dark:text-white" size={32} aria-hidden="true" />
                  <span className="text-lg font-semibold text-blue-900 dark:text-gray-100">{nome}</span>
                </div>

                <div className="font-mono font-semibold text-blue-700 dark:text-cyan-300 text-lg tabular-nums">
                  {pontos.toLocaleString()}
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
};