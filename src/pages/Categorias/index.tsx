import { useEffect } from "react";
import { BotaoTema } from "../../components/BotaoTema";
import { Sidebar } from "../../components/Sidebar";
import { useThemeStore } from "../../store/themeStore";
import { FaPython, FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";

export const Categorias = () => {
  const { theme, hasHydrated } = useThemeStore();
  const isDark = theme === "dark";

  const containerClasses = `flex min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-[#faf7ed] text-gray-800"}`;
  const cardClasses = `p-6 rounded-2xl shadow-md transition-transform duration-300 hover:scale-105 cursor-pointer border
    ${isDark
      ? "bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#1e40af] text-white border-blue-500/20 hover:shadow-blue-500/30"
      : "bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:shadow-md"
    }`;
  const titleClasses = `${isDark ? "text-white" : "text-gray-900"}`;
  const paragraphClasses = `${isDark ? "text-gray-300" : "text-gray-600"} text-sm text-center`;

  useEffect(() => {
    if (hasHydrated) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme, hasHydrated]);

  if (!hasHydrated) return null;

  const Card = ({ title, description, progress, icon, link }: any) => (
    <a href={link} className={cardClasses}>
      <div className="flex justify-center mb-4 text-5xl text-blue-500">{icon}</div>
      <h2 className={`text-center text-xl font-semibold mb-2 ${titleClasses}`}>{title}</h2>
      <p className={paragraphClasses}>{description}</p>
      <div className="mt-4 w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500 ${isDark ? "bg-[#9f00ff]" : "bg-green-500"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-center mt-1 text-gray-400">{progress}% concluído</p>
    </a>
  );

  return (
    <div className={containerClasses}>
      <Sidebar />
      <BotaoTema />
      <div className={`flex flex-col items-center py-10 flex-1 transition-colors duration-300 ${isDark
        ? "bg-gradient-to-br from-[#1f2937] via-[#0f172a] to-[#11255b]"
        : "bg-gradient-to-br bg-gray-50"
        }`}>
        <h1 className="text-4xl font-bold mb-10 text-center">Escolha a sua linguagem!</h1>

        <section className="w-full px-4 max-w-6xl mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nível Básico</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card
              title="Python (Básico)"
              description="Comece sua jornada com Python, linguagem versátil e poderosa."
              progress={80}
              icon={<FaPython />}
              link="/roadmap-python-basico"
            />
            <Card
              title="Java (Básico)"
              description="Inicie em Java, uma linguagem robusta e muito usada no mercado."
              progress={30}
              icon={<FaJava />}
              link="/roadmap-java-basico"
            />
            <Card
              title="C# (Básico)"
              description="Descubra os fundamentos de C# com foco em aplicações práticas."
              progress={45}
              icon={<TbBrandCSharp />}
              link="/roadmap-csharp-basico"
            />
          </div>
        </section>

        <section className="w-full px-4 max-w-6xl mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nível Intermediário</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card
              title="Python (Intermediário)"
              description="Aprofunde seus conhecimentos com estruturas mais avançadas."
              progress={60}
              icon={<FaPython />}
              link="/roadmap-python-intermediario"
            />
            <Card
              title="Java (Intermediário)"
              description="Explore conceitos como orientação a objetos e frameworks."
              progress={50}
              icon={<FaJava />}
              link="/roadmap-java-intermediario"
            />
            <Card
              title="C# (Intermediário)"
              description="Aprenda recursos intermediários do C# com exemplos práticos."
              progress={40}
              icon={<TbBrandCSharp />}
              link="/roadmap-csharp-intermediario"
            />
          </div>
        </section>

        <section className="w-full px-4 max-w-6xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nível Avançado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card
              title="Python (Avançado)"
              description="Domine Python com tópicos como automação, APIs e mais."
              progress={25}
              icon={<FaPython />}
              link="/roadmap-python-avancado"
            />
            <Card
              title="Java (Avançado)"
              description="Torne-se um expert em Java com tópicos avançados e arquitetura."
              progress={15}
              icon={<FaJava />}
              link="/roadmap-java-avancado"
            />
            <Card
              title="C# (Avançado)"
              description="Explore o potencial máximo do C# em projetos robustos."
              progress={20}
              icon={<TbBrandCSharp />}
              link="/roadmap-csharp-avancado"
            />
          </div>
        </section>
      </div>
    </div>
  );
};