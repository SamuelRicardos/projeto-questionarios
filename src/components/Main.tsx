import { FaCode, FaDatabase, FaCloud, FaCogs } from 'react-icons/fa';
import Girl from '../assets/Landingpage_quests.png';

const Main = () => {
  return (
<main className="w-full h-full bg-[#faf7ed]">
      <section className="w-full h-[89.9vh] max-w-[1500px] overflow-hidden flex justify-center relative">
        <img
          src={Girl}
          alt="Foto de garota com um caderno na mão convidando para realizar questionario"
          className="w-[80vw] h-[100vh] object-cover"
        />
      </section>

      <section className="w-full py-16 bg-white flex flex-col items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Categorias de Questionários</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] w-full">
          <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center">
            <FaCode className="text-4xl text-[#a79191] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Programação</h3>
            <p className="text-gray-600 text-center">Testes sobre JavaScript, Python, Java, C++ e mais.</p>
          </div>
          <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center">
            <FaDatabase className="text-4xl text-[#a79191] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Banco de Dados</h3>
            <p className="text-gray-600 text-center">Desafios SQL, NoSQL, modelagem e otimização.</p>
          </div>
          <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center">
            <FaCloud className="text-4xl text-[#a79191] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Cloud Computing</h3>
            <p className="text-gray-600 text-center">Testes sobre AWS, Azure, GCP e arquitetura em nuvem.</p>
          </div>
          <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center">
            <FaCogs className="text-4xl text-[#a79191] mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">DevOps</h3>
            <p className="text-gray-600 text-center">Conceitos sobre CI/CD, Docker, Kubernetes e mais.</p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
