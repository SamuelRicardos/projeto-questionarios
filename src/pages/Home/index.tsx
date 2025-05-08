import { FaCode, FaDatabase, FaCloud, FaCogs } from 'react-icons/fa';
import Girl from '../../assets/Landingpage_quests.png';
import Header from '../../components/Header';
import ComoFunciona from '../../components/ComoFunciona';
import FAQAccordion from '../../components/FAQ';

const Home = () => {
    return (
        <>
            <Header />
            <main className="w-full h-full bg-[#faf7ed]">
                <section className="w-full h-[89.9vh] max-w-[1500px] overflow-hidden flex justify-center relative">
                    <img
                        src={Girl}
                        alt="Foto de garota com um caderno na mão convidando para realizar questionario"
                        className="w-[80vw] h-[100vh] object-cover hidden sm:block"
                    />
                    <div className="sm:hidden text-center flex flex-col items-center justify-center h-full p-4">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">
                            Aprenda e teste seus conhecimentos em programação!
                        </h1>
                        <p className="text-lg text-gray-600 max-w-[300px]">
                            Explore questionários desafiadores sobre linguagens, bancos de dados, DevOps e muito mais!
                        </p>
                        <button className="px-4 py-2 bg-[#D9D9D9] font-bold mt-5 text-white border border-gray-300 rounded-lg cursor-pointer">
                            Começe agora!
                        </button>
                    </div>
                </section>

                <section className="w-full py-16 bg-white flex flex-col items-center">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Categorias de questionários</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-[1200px] w-full px-4">
                        <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center shadow-md">
                            <FaCode className="text-4xl md:text-5xl text-[#a79191] mb-4" />
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Programação</h3>
                            <p className="text-gray-600 text-center text-sm md:text-base">Testes sobre JavaScript, Python, Java, C++ e mais.</p>
                        </div>

                        <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center shadow-md">
                            <FaDatabase className="text-4xl md:text-5xl text-[#a79191] mb-4" />
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Banco de Dados</h3>
                            <p className="text-gray-600 text-center text-sm md:text-base">Desafios SQL, NoSQL, modelagem e otimização.</p>
                        </div>

                        <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center shadow-md">
                            <FaCloud className="text-4xl md:text-5xl text-[#a79191] mb-4" />
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">Cloud Computing</h3>
                            <p className="text-gray-600 text-center text-sm md:text-base">Testes sobre AWS, Azure, GCP e arquitetura em nuvem.</p>
                        </div>

                        <div className="bg-[#faf7ed] p-6 rounded-lg flex flex-col items-center shadow-md">
                            <FaCogs className="text-4xl md:text-5xl text-[#a79191] mb-4" />
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800">DevOps</h3>
                            <p className="text-gray-600 text-center text-sm md:text-base">Conceitos sobre CI/CD, Docker, Kubernetes e mais.</p>
                        </div>
                    </div>
                </section>
                
                <ComoFunciona />
                <FAQAccordion />
            </main>
        </>
    )
}

export default Home;