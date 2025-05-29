import { useEffect } from "react";
import { BotaoTema } from "../../components/BotaoTema";
import { Sidebar } from "../../components/Sidebar";
import { useThemeStore } from "../../store/themeStore";
import { FaPython, FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { ProgressBar } from "../../components/Progresso";

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

  const Card = ({ title, description, linguagem, icon, link }: any) => (
    <a href={link} className={cardClasses}>
      <div className="flex justify-center mb-4 text-5xl text-blue-500">{icon}</div>
      <h2 className={`text-center text-xl font-semibold mb-2 ${titleClasses}`}>{title}</h2>
      <p className={paragraphClasses}>{description}</p>
      <ProgressBar linguagem={linguagem} />
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
              linguagem="Python"
              icon={<FaPython />}
              link="/roadmap-python"
            />
            <Card
              title="Java (Básico)"
              description="Inicie em Java, uma linguagem robusta e muito usada no mercado."
              linguagem="Java"
              icon={<FaJava />}
              link="/roadmap-java"
            />
            <Card
              title="C# (Básico)"
              description="Descubra os fundamentos de C# com foco em aplicações práticas."
              linguagem="C#"
              icon={<TbBrandCSharp />}
              link="/roadmap-csharp"
            />
          </div>
        </section>

        <section className="w-full px-4 max-w-6xl mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nível Intermediário</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card
              title="Python (Intermediário)"
              description="Aprofunde seus conhecimentos com estruturas mais avançadas."
              linguagem="PythonIntermediario"
              icon={<FaPython />}
              link="/roadmap-python-intermediario"
            />
            <Card
              title="Java (Intermediário)"
              description="Explore conceitos como orientação a objetos e frameworks."
              linguagem="JavaIntermediario"
              icon={<FaJava />}
              link="/roadmap-java-intermediario"
            />
            <Card
              title="C# (Intermediário)"
              description="Aprenda recursos intermediários do C# com exemplos práticos."
              linguagem="C#Intermediario"
              icon={<TbBrandCSharp />}
              link="/roadmap-csharp-intermediario"
            />
          </div>
        </section>

        <section className="w-full px-4 max-w-6xl">
          <h2 className="text-2xl font-semibold mb-6 text-center">Nível Avançado</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Card
              title="PythonAvancado"
              description="Domine Python com tópicos como automação, APIs e mais."
              linguagem="PythonAvancado"
              icon={<FaPython />}
              link="/roadmap-python-avancado"
            />
            <Card
              title="Java (Avançado)"
              description="Torne-se um expert em Java com tópicos avançados e arquitetura."
              linguagem="JavaAvancado"
              icon={<FaJava />}
              link="/roadmap-java-avancado"
            />
            <Card
              title="C# (Avançado)"
              description="Explore o potencial máximo do C# em projetos robustos."
              linguagem="C#Avancado"
              icon={<TbBrandCSharp />}
              link="/roadmap-csharp-avancado"
            />
          </div>
        </section>
      </div>
    </div>
  );
};