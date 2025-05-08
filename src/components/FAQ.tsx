import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Como posso criar uma conta?',
      answer: 'Para criar uma conta, clique no botão "Cadastre-se" no topo da página e preencha os dados requisitados.',
    },
    {
      question: 'Os questionários são gratuitos?',
      answer: 'Sim, todos os questionários disponíveis são gratuitos para acesso e realização.',
    },
    {
      question: 'Posso acompanhar meu progresso?',
      answer: 'Claro! Após realizar os questionários, você pode visualizar seu desempenho no painel de usuário.',
    },
    {
      question: 'Como funcionam as categorias?',
      answer: 'As categorias são agrupamentos de questionários de acordo com áreas de conhecimento, como Programação, Banco de Dados, DevOps, entre outros.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 bg-white flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Perguntas Frequentes</h2>
      <div className="w-full max-w-[800px] divide-y divide-gray-200 shadow-md">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#faf7ed]">
            <div
              onClick={() => toggleAccordion(index)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </div>
            {activeIndex === index && (
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;