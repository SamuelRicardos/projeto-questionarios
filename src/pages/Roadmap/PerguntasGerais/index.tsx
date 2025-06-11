import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const PerguntasGerais = () => {
    const [topico, setTopico] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topico.trim()) {
            navigate(`/perguntas-gerais/${encodeURIComponent(topico.trim())}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Gerais</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Digite um tópico para estudar"
                    value={topico}
                    onChange={(e) => setTopico(e.target.value)}
                    className="px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                    Começar
                </button>
            </form>
        </div>
    );
};
