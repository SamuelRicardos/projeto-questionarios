import { Sidebar } from "@/components/Sidebar";
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
    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <main className="flex-1 min-h-screen bg-gradient-to-tr from-blue-50 via-white to-blue-100 p-6 flex flex-col items-center">
                <h1 className="text-center text-2xl md:text-4xl font-extrabold text-blue-900 mb-10 drop-shadow-md w-full max-w-screen-xl px-4">
                    Ranking semanal
                </h1>

                <section className="w-full max-w-screen-xl px-4">
                    {rankingData.map(({ id, nome, pontos }, index) => {
                        const isTop3 = index < 3;
                        const medalColors = ["text-yellow-400", "text-gray-400", "text-amber-700"];
                        return (
                            <div
                                key={id}
                                className={`flex items-center justify-between bg-white rounded-xl shadow-md p-4 mb-4 transition-shadow hover:shadow-xl
                  ${isTop3 ? "border-4 border-yellow-300" : "border border-blue-200"}`}
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        aria-label={`Posição ${index + 1}`}
                                        className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 font-bold text-blue-800 text-xl select-none"
                                    >
                                        {isTop3 ? (
                                            <FaMedal
                                                className={`${medalColors[index]} text-3xl`}
                                                aria-hidden="true"
                                                title={`Medalha da posição ${index + 1}`}
                                            />
                                        ) : (
                                            <span>{index + 1}</span>
                                        )}
                                    </div>
                                    <FaUserCircle className="text-blue-400" size={32} aria-hidden="true" />
                                    <span className="text-lg font-semibold text-blue-900">{nome}</span>
                                </div>

                                <div className="font-mono font-semibold text-blue-700 text-lg tabular-nums">
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

