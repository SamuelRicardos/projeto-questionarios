import { useEffect } from "react";
import { BotaoTema } from "../../components/BotaoTema";
import { Sidebar } from "../../components/Sidebar";
import { useThemeStore } from "../../store/themeStore";
import Python from "../../assets/python.png"

export const Categorias = () => {
  const { theme, hasHydrated } = useThemeStore();
  const isDark = theme === "dark";

  const containerClasses = `flex min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-[#faf7ed] text-gray-800"}`;

  const cardClasses = `p-6 rounded-2xl shadow-2xl transition-transform duration-300 hover:scale-105 cursor-pointer border 
    ${isDark
      ? "bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e40af] text-white border-blue-500/20 hover:shadow-blue-500/30"
      : "bg-gradient-to-br from-[#edf2f7] via-[#e6f0fa] to-[#d9e2ec] border-none"
    }`;

  const titleClasses = `${isDark ? "text-white" : "text-gray-900"}`;
  const paragraphClasses = `${isDark ? "text-gray-300" : "text-gray-600"} text-sm text-center`;

  useEffect(() => {
    if (hasHydrated) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, hasHydrated]);

  if (!hasHydrated) return null;

  return (
    <div className={containerClasses}>
      <Sidebar />
      <BotaoTema />
      <div className={`flex flex-col items-center py-10 flex-1 transition-colors duration-300 ${isDark
        ? "bg-gradient-to-br from-[#1f2937] via-[#0f172a] to-[#11255b]"
        : "bg-gradient-to-br from-[#f0e8d9] via-[#fff] to-[#e6e4d8]"
        }`}>
        <h1 className={`text-4xl font-bold mb-10 text-center transition-colors duration-300 ${isDark ? "text-white" : "text-gray-900"
          }`}>
          Escolha a sua linguagem!
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[90%] max-w-[1000px] px-4">
          <a href="/roadmap-python" className={cardClasses}>
            <div className="flex justify-center mb-4">
              <img
                src={Python}
                alt="Python"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h2 className={`text-center text-xl font-semibold mb-2 ${titleClasses}`}>Python</h2>
            <p className={paragraphClasses}>
              Comece sua jornada com Python, a linguagem versátil e poderosa.
            </p>
          </a>

          <a href="/roadmap-java" className={cardClasses}>
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn-icons-png.freepik.com/512/5968/5968282.png?ga=GA1.1.1484315943.1747346408"
                alt="Java"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h2 className={`text-center text-xl font-semibold mb-2 ${titleClasses}`}>Java</h2>
            <p className={paragraphClasses}>
              Aprenda Java, amplamente usado em sistemas corporativos e Android.
            </p>
          </a>

          <a href="/roadmap-csharp" className={cardClasses}>
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.worldvectorlogo.com/logos/c--4.svg"
                alt="C#"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h2 className={`text-center text-xl font-semibold mb-2 ${titleClasses}`}>C#</h2>
            <p className={paragraphClasses}>
              Explore C#, ideal para desenvolvimento .NET e jogos com Unity.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
