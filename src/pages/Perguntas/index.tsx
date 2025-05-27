import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function Perguntas() {
  const MAX_LIVES = 3;
  const MAX_QUESTIONS = 5;

  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [lives, setLives] = useState(MAX_LIVES);
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [fade, setFade] = useState(true); // Controle para animação fade

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      setSelected(null);
      setAnswered(false);

      const response = await axios.get(
        "http://localhost:8080/api/perguntas/gerar?topico=listas"
      );
      setQuestion(response.data);
      setFade(true); // Quando carregar pergunta, fazer fade in
    } catch (err) {
      console.error("Erro ao buscar pergunta:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestion();
  }, []);

  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
    } else if (questionCount > MAX_QUESTIONS) {
      setGameWon(true);
    }
  }, [lives, questionCount]);

  const handleAnswer = (option: string) => {
    if (answered || !question || gameOver || gameWon) return;

    setSelected(option);
    setAnswered(true);

    if (option !== question.correctAnswer) {
      const remainingLives = lives - 1;
      setLives(remainingLives);
      if (remainingLives === 0) {
        setGameOver(true);
      }
    }
  };

  const nextQuestion = () => {
    if (gameOver || gameWon) return;

    // Fazer fade out antes de trocar a pergunta
    setFade(false);
    setTimeout(() => {
      const nextCount = questionCount + 1;
      if (nextCount > MAX_QUESTIONS) {
        setGameWon(true);
      } else {
        setQuestionCount(nextCount);
        fetchQuestion();
      }
    }, 300); // duração da animação fade out
  };

  const restart = () => {
    setLives(MAX_LIVES);
    setQuestionCount(1);
    setGameOver(false);
    setGameWon(false);
    setSelected(null);
    setAnswered(false);
    fetchQuestion();
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600 animate-pulse">
        Carregando pergunta...
      </div>
    );
  }

  if (gameOver || gameWon) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg text-center space-y-4 animate-fadeIn">
        <div className="text-lg font-semibold text-gray-700">
          {gameOver
            ? "Você perdeu todas as vidas!"
            : "Parabéns! Você concluiu todas as perguntas!"}
        </div>
        <button
          onClick={restart}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
        >
          Jogar novamente
        </button>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-center mt-10 text-gray-600 animate-pulse">
        Nenhuma pergunta carregada.
      </div>
    );
  }

  const isCorrect = selected === question.correctAnswer;
  const progressPercent = (questionCount / MAX_QUESTIONS) * 100;

  return (
    <div
      className={`max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6 transition-opacity duration-300 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-1">
          {[...Array(MAX_LIVES)].map((_, i) => (
            <FaHeart
              key={i}
              className={`text-xl ${
                i < lives ? "text-red-500" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-gray-500">Python - Tópico: Listas</div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
      <div className="text-right text-xs text-gray-400">
        {questionCount} / {MAX_QUESTIONS}
      </div>

      <h2 className="text-xl font-bold text-gray-800">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option) => {
          const isSelected = selected === option;
          const correct = question.correctAnswer === option;

          let style =
            "w-full px-4 py-3 rounded-lg border transition-all duration-300 ease-in-out text-left";

          if (answered) {
            if (isSelected && correct)
              style +=
                " bg-green-100 border-green-500 text-green-800 scale-105 shadow-lg";
            else if (isSelected && !correct)
              style += " bg-red-100 border-red-500 text-red-800 scale-105 shadow-lg";
            else style += " bg-gray-50 border-gray-300 opacity-70";
          } else {
            style += " hover:bg-gray-100 border-gray-300 cursor-pointer";
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

      {answered && !gameOver && !gameWon && (
        <div className="flex flex-col items-center space-y-4 animate-fadeIn">
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
            onClick={nextQuestion}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
          >
            Próxima pergunta
          </button>
        </div>
      )}
    </div>
  );
}
