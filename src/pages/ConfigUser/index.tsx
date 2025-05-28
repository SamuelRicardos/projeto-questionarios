import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { FaEdit, FaPython, FaReact, FaJsSquare, FaNodeJs } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { PiMedalFill } from "react-icons/pi";
import { BotaoTema } from "@/components/BotaoTema";

export const ConfigUser = () => {
    const [user] = useState({
        nome: "Samuel Ferreira",
        email: "samuel@email.com",
        foto: "https://ui-avatars.com/api/?name=Samuel+Ferreira&background=0D8ABC&color=fff",
    });

    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewURL = URL.createObjectURL(file);
            setFotoPreview(previewURL);
        }
    };

    const badges = [
        {
            label: "React Master",
            icon: <FaReact className="text-cyan-400" size={28} />,
            bg: "bg-white",
            border: "border-cyan-400",
            description: "Criou mais de 10 projetos com React.",
        },
        {
            label: "Python Avançado",
            icon: <FaPython className="text-yellow-500" size={28} />,
            bg: "bg-white",
            border: "border-yellow-500",
            description: "Automatizou processos com Python + Airflow.",
        },
        {
            label: "JS Pro",
            icon: <FaJsSquare className="text-yellow-300" size={28} />,
            bg: "bg-white",
            border: "border-yellow-300",
            description: "Dominou o JavaScript moderno.",
        },
        {
            label: "Node Ninja",
            icon: <FaNodeJs className="text-green-600" size={28} />,
            bg: "bg-white",
            border: "border-green-600",
            description: "Construiu APIs robustas com Node.js.",
        },
        {
            label: "Tailwind Designer",
            icon: <SiTailwindcss className="text-sky-400" size={28} />,
            bg: "bg-white",
            border: "border-sky-400",
            description: "Criou interfaces incríveis com Tailwind CSS.",
        },
    ];

    return (
        <div className="flex min-h-screen w-full bg-gray-100">
            <Sidebar />
            <BotaoTema />
            <main className="flex-1 max-w-4xl mx-auto p-6 mt-12 bg-white rounded-xl shadow-md">
                <h1 className="text-3xl font-extrabold text-blue-900 mb-8 text-center">
                    Meu Perfil
                </h1>

                {/* Perfil */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-10">
                    <div className="relative w-32 h-32">
                        <img
                            src={fotoPreview || user.foto}
                            alt="Foto do usuário"
                            className="w-full h-full object-cover rounded-full border-4 border-blue-600"
                        />
                        <label className="p-2 absolute bottom-0 right-0 bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition">
                            <FaEdit size={16} />
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFotoChange}
                            />
                        </label>
                    </div>

                    <div className="space-y-2">
                        <p className="text-lg font-semibold text-gray-800">{user.nome}</p>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                {/* Conquistas */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <PiMedalFill className="text-yellow-500" />
                        Conquistas
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {badges.map((badge, i) => (
                            <div
                                key={i}
                                className={`relative flex items-center gap-4 p-4 rounded-xl border-2 ${badge.border} bg-white shadow hover:scale-[1.03] transition-transform`}
                                title={badge.description}
                            >
                                {badge.icon}
                                <div>
                                    <p className="font-semibold text-gray-800">{badge.label}</p>
                                    <p className="text-sm text-gray-500">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};