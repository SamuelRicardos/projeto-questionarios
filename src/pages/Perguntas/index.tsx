import { useEffect, useState } from "react";
import axios from "axios";
import { FaHeart, FaCheckCircle, FaTimesCircle, FaArrowRight, FaTrophy, FaSadTear, FaRedo, FaMap } from "react-icons/fa";
import carregamentoGif from "../../assets/carregamento.gif";
import { useNavigate, useParams } from "react-router-dom";
import { useLessonStore } from "../../store/licaoStore";
import { topicosOrdenadosPorLinguagem } from "../../store/licaoStore";

type Question = {
    questao: string;
    opcoes: string[];
    questaoCorreta: string;
    explicacao: string;
};

export default function Perguntas() {
    const MAX_LIVES = 3;
    const MAX_QUESTIONS = 5;
    const navigate = useNavigate();

    const [question, setQuestion] = useState<Question | null>(null);
    const [selected, setSelected] = useState<string | null>(null);
    const [answered, setAnswered] = useState(false);
    const [lives, setLives] = useState(MAX_LIVES);
    const [loading, setLoading] = useState(false);
    const [questionCount, setQuestionCount] = useState(1);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [fade, setFade] = useState(true);


    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email");

    const { topico, linguagem } = useParams<{ topico: string; linguagem: string }>();
    const { desbloquearProxima, concluirLicao } = useLessonStore();

    const fetchQuestion = async () => {
        try {
            setLoading(true);
            setSelected(null);
            setAnswered(false);


            const response = await axios.get(`http://localhost:8080/api/perguntas/gerar?linguagem=${linguagem}&topico=${topico}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setQuestion(response.data);
            setFade(true);
        } catch (err) {
            console.error("Erro ao buscar pergunta:", err);
        } finally {
            setLoading(false);
        }
    };

    const enviarDesempenho = async (acertou: boolean) => {
        if (!userEmail || !token) {
            console.error("Usuário não autenticado ou email não encontrado");
            return;
        }
        try {
            await axios.post(
                "http://localhost:8080/api/desempenho/atualizar",
                {
                    email: userEmail,
                    categoria: topico,
                    acertou,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log("Desempenho enviado com sucesso!");
        } catch (error) {
            console.error("Erro ao enviar desempenho:", error);
        }
    };

    useEffect(() => {
        if (gameWon) {
            enviarDesempenho(true);
            if (linguagem && topico) {
                concluirLicao(linguagem, topico);
                desbloquearProxima(linguagem, topico);
            }

            setTimeout(() => {
                const proximoTopico = obterProximoTopico(linguagem, topico);
                if (proximoTopico) {
                    navigate(`/perguntas/${linguagem}/${proximoTopico}`);
                } else {
                    navigate(`/roadmap-${linguagem}`);
                }
            }, 1500);
        }
    }, [gameWon]);

    useEffect(() => {
        if (gameOver) {
            enviarDesempenho(false);
        }
    }, [gameOver]);

    useEffect(() => {
        fetchQuestion();
    }, [topico]);

    useEffect(() => {
        if (lives <= 0) setGameOver(true);
        else if (questionCount > MAX_QUESTIONS) setGameWon(true);
    }, [lives, questionCount]);

    const handleAnswer = (option: string) => {
        if (answered || !question || gameOver || gameWon) return;
        setSelected(option);
        setAnswered(true);
        if (option !== question.questaoCorreta) setLives((prev) => prev - 1);
    };

    const nextQuestion = () => {
        if (gameOver || gameWon) return;
        setFade(false);
        setTimeout(() => {
            setQuestionCount((prev) => prev + 1);
            fetchQuestion();
        }, 300);
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

    const obterProximoTopico = (ling: string | undefined, atual: string | undefined): string | null => {
        if (!ling || !atual) return null;
        const topicos = topicosOrdenadosPorLinguagem[ling];
        const idx = topicos.indexOf(atual);
        return idx !== -1 && idx < topicos.length - 1 ? topicos[idx + 1] : null;
    };

    if (loading)
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                <img src={carregamentoGif} alt="Carregando..." className="w-24 h-24" />
            </div>
        );

    if (gameOver || gameWon)
        return (
            <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-3xl text-center space-y-6 animate-fadeIn">
                <div className="text-3xl font-bold text-gray-800 flex flex-col justify-center items-center gap-2">
                    {gameOver ? (
                        <>
                            <FaSadTear className="text-red-400 text-5xl animate-pulse" />
                            <span>Você perdeu todas as vidas!</span>
                        </>
                    ) : (
                        <>
                            <FaTrophy className="text-yellow-400 text-5xl animate-bounce" />
                            <span>Parabéns! Você concluiu todas as perguntas!</span>
                        </>
                    )}
                </div>

                <div className="text-gray-600 text-sm">
                    {gameOver
                        ? "Não foi dessa vez, mas você pode tentar novamente!"
                        : "Você está avançando muito bem. Continue assim!"}
                </div>

                <div className="flex justify-center gap-4 mt-6">
                    <button
                        onClick={restart}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl shadow-md hover:bg-green-700 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                        <FaRedo /> Jogar novamente
                    </button>

                    <button
                        onClick={() => navigate(`/roadmap-${linguagem}`)}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                        <FaMap /> Voltar para o Roadmap
                    </button>
                </div>
            </div>
        );

    if (!question)
        return (
            <div className="text-center mt-10 text-gray-600 animate-pulse">
                Nenhuma pergunta carregada.
            </div>
        );

    const isCorrect = selected === question.questaoCorreta;
    const progressPercent = (questionCount / MAX_QUESTIONS) * 100;

    return (
        <div className={`max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1">
                    {[...Array(MAX_LIVES)].map((_, i) => (
                        <FaHeart
                            key={i}
                            className={`text-xl ${i < lives ? "text-red-500" : "text-gray-300"}`}
                        />
                    ))}
                </div>
                <div className="text-sm text-gray-500">{linguagem} - Tópico: {topico}</div>
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

            <h2 className="text-xl font-bold text-gray-800">{question.questao}</h2>

            <div className="space-y-3">
                {question.opcoes.map((option) => {
                    const isSelected = selected === option;
                    const correct = question.questaoCorreta === option;

                    let style =
                        "w-full px-4 py-3 rounded-lg border transition-all duration-300 ease-in-out text-left flex justify-between items-center";

                    if (answered) {
                        if (isSelected && correct)
                            style += " bg-green-100 border-green-500 text-green-800 scale-105 shadow-lg";
                        else if (isSelected && !correct)
                            style += " bg-red-100 border-red-500 text-red-800 scale-105 shadow-lg";
                        else if (correct)
                            style += " bg-green-50 border-green-300 text-green-700";
                        else
                            style += " bg-gray-50 border-gray-300 opacity-70";
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
                            <span>{option}</span>
                            {answered && (
                                isSelected && !correct ? (
                                    <FaTimesCircle className="ml-2 text-red-500" />
                                ) : correct ? (
                                    <FaCheckCircle className="ml-2 text-green-500" />
                                ) : null
                            )}
                        </button>
                    );
                })}
            </div>

            {answered && !gameOver && !gameWon && (
                <div className=" flex flex-col items-center space-y-4 animate-fadeIn">

                    {!isCorrect && question.explicacao && (
                        <div className="text-sm text-gray-700 bg-yellow-100 border border-yellow-400 rounded-md p-3 w-full text-start">
                            <p><strong>Resposta correta: </strong>{question.questaoCorreta}</p><br/>
                            <p className="text-justify"><strong>Explicação: </strong>{question.explicacao}.</p>
                        </div>
                    )}

                    <button
                        onClick={nextQuestion}
                        className="mt-4 px-5 py-3 bg-blue-600 text-white font-semibold rounded-2xl shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        Próxima pergunta
                        <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
}