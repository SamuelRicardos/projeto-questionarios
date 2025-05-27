import {
  FaLaptopCode,
  FaDatabase,
  FaCloud,
  FaNetworkWired,
  FaRobot,
} from "react-icons/fa";
import { Sidebar } from "../../components/Sidebar";

const categories = [
  {
    id: 1,
    name: "Desenvolvimento Web",
    icon: <FaLaptopCode />,
    image: "https://img.freepik.com/fotos-gratis/representacao-da-experiencia-do-utilizador-e-design-da-interface_23-2150169850.jpg",
    description:
      "Questões sobre criação de sites, aplicações web e frameworks modernos.",
  },
  {
    id: 2,
    name: "Banco de Dados",
    icon: <FaDatabase />,
    image: "https://img.freepik.com/fotos-premium/sistema-de-gestao-de-bases-de-dados_968957-19661.jpg",
    description:
      "Questões sobre como armazenar, gerenciar e consultar dados de forma eficiente.",
  },
  {
    id: 3,
    name: "Cloud Computing",
    icon: <FaCloud />,
    image: "https://img.freepik.com/fotos-gratis/tecnologia-integrada-na-vida-cotidiana_23-2151887047.jpg",
    description:
      "Questões sobre serviços em nuvem, infraestrutura escalável e deploy global.",
  },
  {
    id: 4,
    name: "Redes e Segurança",
    icon: <FaNetworkWired />,
    image: "https://img.freepik.com/fotos-gratis/conceito-de-colagem-de-controle-de-qualidade-padrao_23-2149595831.jpg",
    description:
      "Questões sobre comunicação entre dispositivos e proteção de dados.",
  },
  {
    id: 5,
    name: "Inteligência Artificial",
    icon: <FaRobot />,
    image: "https://img.freepik.com/fotos-premium/futuro-robo-de-inteligencia-artificial-e-cyborg_31965-4258.jpg",
    description:
      "Questões sobre o poder das máquinas para resolver problemas complexos.",
  },
];

export const Categorias = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1/2 items-center py-5">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Tecnologia da informação
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-[80%] px-3 md:px-10">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-[150px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
