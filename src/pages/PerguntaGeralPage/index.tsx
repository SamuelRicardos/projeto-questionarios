import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";  // Importa useParams
import { FaHeart, FaCheckCircle, FaTimesCircle, FaArrowRight, FaTrophy, FaSadTear, FaRedo, FaMap } from "react-icons/fa";
import carregamentoGif from "../../assets/carregamento.gif";

type Resposta = {
    questaoCorreta: string;
    respostaUsuario: string;
    estaCorreta: boolean;
    questao: string;
    opcoes: string[];
    explicacao?: string;
};

export const PerguntaGeralPage = () => {
    const MAX_LIVES = 3;
    const MAX_QUESTIONS = 5;
    const navigate = useNavigate();

    const { topico } = useParams<{ topico: string }>();  // Pega o tópico da URL
    const [desempenhoEnviado, setDesempenhoEnviado] = useState(false);
    const [question, setQuestion] = useState<Resposta | null>(null);
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
        if (!desempenhoEnviado) {
            if (lives <= 0) {
                setGameOver(true);
                enviarDesempenho(false);
                setDesempenhoEnviado(true);
            } else if (questionCount > MAX_QUESTIONS) {
                setGameWon(true);
                enviarDesempenho(true);
                setDesempenhoEnviado(true);
            }
        }
    }, [lives, questionCount])

    const fetchQuestion = async () => {
        if (!topico?.trim()) return;
        try {
            setLoading(true);
            setSelected(null);
            setAnswered(false);

            const response = await axios.get(`http://localhost:8080/api/perguntas/gerar-geral?topico=${encodeURIComponent(topico)}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setQuestion(response.data);
            setFade(true);
        } catch (err) {
            console.error("Erro ao buscar pergunta geral:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (lives <= 0) setGameOver(true);
        else if (questionCount > MAX_QUESTIONS) setGameWon(true);
    }, [lives, questionCount]);

    useEffect(() => {
        fetchQuestion();
        setLives(MAX_LIVES);
        setQuestionCount(1);
        setGameOver(false);
        setGameWon(false);
        setSelected(null);
        setDesempenhoEnviado(false);
        setAnswered(false);
    }, [topico]);

const handleAnswer = (option: string) => {
    if (answered || !question || gameOver || gameWon) return;

    setSelected(option);
    setAnswered(true);

    const acertou = option === question.questaoCorreta;

    if (!acertou) {
        setLives((prev) => prev - 1);
    }
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

    if (loading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
                <img src={carregamentoGif} alt="Carregando..." className="w-24 h-24" />
            </div>
        );
    }

    if (!question) {
        return (
            <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-3xl shadow-md text-center space-y-4">
                <h2 className="text-xl font-bold text-gray-800">Carregando perguntas para: {topico}</h2>
            </div>
        );
    }

    if (gameOver || gameWon) {
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
                        onClick={() => navigate("/perguntas-gerais")}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
                    >
                        <FaMap /> Voltar para tela principal
                    </button>
                </div>
            </div>
        );
    }

    const isCorrect = selected === question.questaoCorreta;
    const progressPercent = (questionCount / MAX_QUESTIONS) * 100;

    return (
        <div className={`max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg space-y-6 transition-opacity duration-300 ${fade ? "opacity-100" : "opacity-0"}`}>
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1">
                    {[...Array(MAX_LIVES)].map((_, i) => (
                        <FaHeart key={i} className={`text-xl ${i < lives ? "text-red-500" : "text-gray-300"}`} />
                    ))}
                </div>
                <div className="text-sm text-gray-500">Tópico: {topico}</div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full transition-all duration-700 ease-in-out" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="text-right text-xs text-gray-400">{questionCount} / {MAX_QUESTIONS}</div>

            <h2 className="text-xl font-bold text-gray-800">{question.questao}</h2>

            <div className="space-y-3">
                {question.opcoes.map((option) => {
                    const isSelected = selected === option;
                    const correct = question.questaoCorreta === option;

                    let style = "w-full px-4 py-3 rounded-lg border transition-all duration-300 ease-in-out text-left flex justify-between items-center";

                    if (answered) {
                        if (isSelected && correct) style += " bg-green-100 border-green-500 text-green-800 scale-105 shadow-lg";
                        else if (isSelected && !correct) style += " bg-red-100 border-red-500 text-red-800 scale-105 shadow-lg";
                        else if (correct) style += " bg-green-100 border-green-500 text-green-800";
                        else style += " border-gray-300";
                    } else {
                        style += " border-gray-300 hover:bg-gray-100 cursor-pointer";
                    }

                    return (
                        <button
                            key={option}
                            disabled={answered}
                            onClick={() => handleAnswer(option)}
                            className={style}
                        >
                            <span>{option}</span>
                            {answered && isSelected && (isCorrect ? <FaCheckCircle className="text-green-500" /> : <FaTimesCircle className="text-red-500" />)}
                        </button>
                    );
                })}
            </div>

            {answered && !gameOver && !gameWon && (
                <div className=" flex flex-col items-center space-y-4 animate-fadeIn">

                    {!isCorrect && question.explicacao && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-lg text-gray-700 text-sm leading-relaxed">
                            <p><strong>Resposta correta: </strong>{question.questaoCorreta}</p>
                            <p className="text-justify"><strong>Explicação: </strong>{question.explicacao}.</p>
                        </div>
                    )}

                    <button
                        onClick={nextQuestion}
                        className="mt-4 px-5 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                    >
                        Próxima pergunta
                        <FaArrowRight />
                    </button>
                </div>
            )}
        </div>
    );
};