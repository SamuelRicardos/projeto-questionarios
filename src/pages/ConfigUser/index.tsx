import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { FaEdit, FaPython, FaJava } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { PiMedalFill } from "react-icons/pi";
import { BotaoTema } from "@/components/BotaoTema";
import { useThemeStore } from "../../store/themeStore";

export const ConfigUser = () => {
    const { theme, hasHydrated } = useThemeStore();

    useEffect(() => {
        if (hasHydrated) {
            document.documentElement.classList.toggle("dark", theme === "dark");
        }
    }, [theme, hasHydrated]);

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
            label: "Python Avançado",
            icon: <FaPython className="text-yellow-500" size={28} />,
            bg: "bg-white",
            border: "border-yellow-500",
            description: "Automatizou processos com Python + Airflow.",
        },
        {
            label: "Java Expert",
            icon: <FaJava className="text-red-600" size={28} />,
            bg: "bg-white",
            border: "border-red-600",
            description: "Desenvolveu aplicações corporativas robustas em Java.",
        },
        {
            label: "C# Profissional",
            icon: <TbBrandCSharp className="text-purple-600" size={28} />,
            bg: "bg-white",
            border: "border-purple-600",
            description: "Criou soluções com .NET e jogos com Unity.",
        },
    ];

    return (
        <div className="flex min-h-screen w-full bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
            <Sidebar />
            <BotaoTema />
            <main className="flex-1 max-w-4xl mx-auto p-6 mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-colors duration-300">
                <h1 className="text-3xl font-extrabold text-blue-900 dark:text-blue-300 mb-8 text-center">
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
                        <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.nome}</p>
                        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
                    </div>
                </div>

                {/* Conquistas */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                        <PiMedalFill className="text-yellow-500" />
                        Conquistas
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {badges.map((badge, i) => (
                            <div
                                key={i}
                                className={`relative flex items-center gap-4 p-4 rounded-xl border-2 ${badge.border} ${badge.bg} dark:bg-gray-700 shadow hover:scale-[1.03] transition-transform`}
                                title={badge.description}
                            >
                                {badge.icon}
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-white">{badge.label}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-300">{badge.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};