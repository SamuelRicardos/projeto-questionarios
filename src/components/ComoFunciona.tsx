import { FaListAlt, FaChartLine, FaQuestion, FaUser } from 'react-icons/fa';

const ComoFunciona = () => {
    return (
        <section className="w-full py-16 bg-[#faf7ed] flex flex-col items-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Como funciona?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] w-full px-4">
                <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md">
                    <FaUser className="text-4xl text-[#a79191] mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap">
                        1. Crie sua conta
                    </h3>
                    <p className="text-gray-600 text-center min-h-[48px]">
                        Faça seu cadastro para acessar todos os questionários.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md">
                    <FaListAlt className="text-4xl text-[#a79191] mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap">
                        2. Escolha uma categoria
                    </h3>
                    <p className="text-gray-600 text-center min-h-[48px]">
                        Navegue entre as opções e selecione a área desejada.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md">
                    <FaQuestion className="text-4xl text-[#a79191] mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap">
                        3. Responda os questionários
                    </h3>
                    <p className="text-gray-600 text-center min-h-[48px]">
                        Desafie seus conhecimentos com perguntas interativas.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg flex flex-col items-center shadow-md">
                    <FaChartLine className="text-4xl text-[#a79191] mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 whitespace-nowrap">
                        4. Confira seus resultados
                    </h3>
                    <p className="text-gray-600 text-center min-h-[48px]">
                        Analise seu desempenho e veja onde pode melhorar.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ComoFunciona