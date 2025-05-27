import { Sidebar } from "../../components/Sidebar";

export const Categorias = () => {
  return (
    <div className="flex min-h-screen bg-[#faf7ed] text-gray-800">
      <Sidebar />

      <div className="flex flex-col items-center py-10 flex-1">
        <h1 className="text-3xl font-bold mb-8">Escolha a sua linguagem!</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[90%] max-w-[1000px] px-4">
          <a
            href="/roadmap-python"
            className="bg-white border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <img
                src="https://www.python.org/static/community_logos/python-logo.png"
                alt="Python"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">Python</h2>
            <p className="text-gray-600 text-sm text-center">
              Comece sua jornada com Python, a linguagem versátil e poderosa.
            </p>
          </a>

          <a
            href="/roadmaps/java"
            className="bg-white border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.worldvectorlogo.com/logos/java-4.svg"
                alt="Java"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">Java</h2>
            <p className="text-gray-600 text-sm text-center">
              Aprenda Java, amplamente usado em sistemas corporativos e Android.
            </p>
          </a>

          {/* C# */}
          <a
            href="/roadmaps/csharp"
            className="bg-white border border-gray-300 p-6 rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105"
          >
            <div className="flex justify-center mb-4">
              <img
                src="https://cdn.worldvectorlogo.com/logos/c--4.svg"
                alt="C#"
                className="h-14 w-auto object-contain"
              />
            </div>
            <h2 className="text-center text-xl font-semibold mb-2">C#</h2>
            <p className="text-gray-600 text-sm text-center">
              Explore C#, ideal para desenvolvimento .NET e jogos com Unity.
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};
