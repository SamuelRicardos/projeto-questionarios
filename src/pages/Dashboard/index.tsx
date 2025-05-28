import { useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { BotaoTema } from "../../components/BotaoTema";
import { useThemeStore } from "../../store/themeStore";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";

interface Desempenho {
  categoria: string;
  vitorias: number;
  derrotas: number;
}

interface ProfileData {
  nome: string;
  email: string;
  desempenhos: Desempenho[];
}

const CirculoAcertos = ({
  titulo,
  acertos,
  isDark,
}: {
  titulo: string;
  acertos: number;
  isDark: boolean;
}) => {
  return (
    <section
      className={`
        flex flex-col items-center justify-center p-6 rounded-3xl
        shadow-md transition-colors duration-300
        ${isDark ? "bg-gradient-to-tr from-gray-700 via-gray-800 to-gray-900 text-teal-400" : "bg-gradient-to-tr bg-white text-blue-900"}
        hover:scale-[1.05] hover:shadow-lg
        cursor-default
      `}
      style={{ minWidth: 140 }}
    >
      <h3 className="text-lg font-semibold mb-3 tracking-wide">{titulo}</h3>
      <div
        className={`flex items-center justify-center rounded-full
          w-28 h-28
          bg-gradient-to-br
          ${isDark ? "from-teal-600 to-cyan-500" : "from-blue-500 to-cyan-400"}
          shadow-lg
          text-4xl font-extrabold drop-shadow-md`}
      >
        {acertos}
      </div>
    </section>
  );
};

export const Dashboard = () => {
  const { theme } = useThemeStore();
  const isDark = theme === "dark";

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/auth/profile?email=samuelric4rdo@gmail.com")
      .then((res) => res.json())
      .then((data: ProfileData) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || !profile) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <p className="text-lg">{loading ? "Carregando dados..." : "Erro ao carregar perfil."}</p>
      </div>
    );
  }

  const totalVitorias = profile.desempenhos.reduce(
    (acc, cur) => acc + cur.vitorias,
    0
  );
  const totalDerrotas = profile.desempenhos.reduce(
    (acc, cur) => acc + cur.derrotas,
    0
  );

  const chartData = profile.desempenhos.map((d) => ({
    categoria: d.categoria,
    Vitórias: d.vitorias,
    Derrotas: d.derrotas,
  }));

  const pieData = [
    { name: "Vitórias", value: totalVitorias },
    { name: "Derrotas", value: totalDerrotas },
  ];

  const totalAcertosPorLinguagem = (linguagem: string) =>
    profile.desempenhos
      .filter((d) => d.categoria.toLowerCase().includes(linguagem.toLowerCase()))
      .reduce((acc, cur) => acc + cur.vitorias, 0);

  return (
    <div className={`flex min-h-screen ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"}`}>
      <Sidebar />
      <BotaoTema />
      <main className="flex-grow p-8 max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight">
          Dashboard de desempenho
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">
          <section
            className={`flex-1 p-8 rounded-3xl shadow-xl transition-colors duration-300
              ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">
              Vitórias e Derrotas por Categoria
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis
                  dataKey="categoria"
                  stroke={isDark ? "#a0aec0" : "#4a5568"}
                  tick={{ fontWeight: "600" }}
                />
                <YAxis
                  stroke={isDark ? "#a0aec0" : "#4a5568"}
                  tick={{ fontWeight: "600" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#2d3748" : "#f7fafc",
                    borderRadius: 8,
                    borderColor: isDark ? "#4FD1C5" : "#2563EB",
                  }}
                  itemStyle={{ color: isDark ? "#4FD1C5" : "#2563EB" }}
                />
                <Legend
                  wrapperStyle={{ fontWeight: "bold", color: isDark ? "#81e6d9" : "#2b6cb0" }}
                />
                <Bar dataKey="Vitórias" fill={isDark ? "#4FD1C5" : "#2563EB"} radius={[10, 10, 0, 0]} />
                <Bar dataKey="Derrotas" fill={isDark ? "#F56565" : "#dc2626"} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </section>

          <section
            className={`flex-1 p-8 rounded-3xl shadow-xl transition-colors duration-300
              ${isDark ? "bg-gray-800" : "bg-white"}`}
          >
            <h2 className="text-2xl font-semibold mb-6 text-center tracking-wide">
              Desempenho Total (Vitórias vs Derrotas)
            </h2>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  label={{
                    fill: isDark ? "#e6fffa" : "#2c5282",
                    fontWeight: "700",
                    fontSize: 14,
                  }}
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === 0
                          ? isDark
                            ? "#4FD1C5"
                            : "#2563EB"
                          : isDark
                          ? "#F56565"
                          : "#dc2626"
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#2d3748" : "#f7fafc",
                    borderRadius: 8,
                    borderColor: isDark ? "#4FD1C5" : "#2563EB",
                  }}
                  itemStyle={{ color: isDark ? "#4FD1C5" : "#2563EB" }}
                />
                <Legend
                  wrapperStyle={{ fontWeight: "bold", color: isDark ? "#81e6d9" : "#2b6cb0" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </section>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <CirculoAcertos
            titulo="Vitórias em Java"
            acertos={totalAcertosPorLinguagem("java")}
            isDark={isDark}
          />
          <CirculoAcertos
            titulo="Vitórias em Python"
            acertos={totalAcertosPorLinguagem("python")}
            isDark={isDark}
          />
          <CirculoAcertos
            titulo="Vitórias em C#"
            acertos={totalAcertosPorLinguagem("c#")}
            isDark={isDark}
          />
        </div>
      </main>
    </div>
  );
};
