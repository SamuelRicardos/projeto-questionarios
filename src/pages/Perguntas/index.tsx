import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function Perguntas() {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [lives, setLives] = useState(3);
  const [loading, setLoading] = useState(false);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setSelected(null);
      setAnswered(false);

      // Chame sua API que gera a pergunta
      const response = await axios.get("http://localhost:8080/api/perguntas/gerar?topico=listas");

      // Ajuste caso sua API retorne o JSON dentro de algum wrapper
      // Aqui assumimos que já vem o objeto com {question, options, correctAnswer}
      setQuestion(response.data);
    } catch (err) {
      console.error("Erro ao buscar pergunta:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  const handleAnswer = (option: string) => {
    if (answered || !question) return;
    setSelected(option);
    setAnswered(true);

    if (option !== question.correctAnswer) {
      setLives((prev) => Math.max(prev - 1, 0));
    }
  };

  if (loading || !question) {
    return <div className="text-center mt-10 text-gray-600">Carregando pergunta...</div>;
  }

  const isCorrect = selected === question.correctAnswer;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md space-y-6">
      {/* Vidas */}
      <div className="flex justify-between items-center">
        <div className="flex gap-1">
          {[...Array(3)].map((_, i) => (
            <FaHeart key={i} className={`text-xl ${i < lives ? "text-red-500" : "text-gray-300"}`} />
          ))}
        </div>
        <div className="text-sm text-gray-500">Python - Tópico: Listas</div>
      </div>

      <h2 className="text-xl font-semibold text-gray-800">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const correct = question.correctAnswer === option;

          let style = "w-full px-4 py-3 rounded-lg border transition-all ";
          if (answered) {
            if (isSelected && correct) style += "bg-green-100 border-green-500 text-green-800";
            else if (isSelected && !correct) style += "bg-red-100 border-red-500 text-red-800";
            else style += "bg-gray-50 border-gray-300";
          } else {
            style += "hover:bg-gray-100 border-gray-300";
          }

          return (
            <button
              key={option}
              className={style}
              onClick={() => handleAnswer(option)}
              disabled={answered}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Resultado e Próxima */}
      {answered && (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center gap-2 text-lg font-medium">
            {isCorrect ? (
              <>
                <FaCheckCircle className="text-green-500" /> Resposta correta!
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500" /> Resposta incorreta
              </>
            )}
          </div>

          <button
            onClick={fetchQuestion}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Próxima pergunta
          </button>
        </div>
      )}
    </div>
  );
}
