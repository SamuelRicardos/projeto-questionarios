import { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const faqs = [
    {
      question: 'Como posso criar uma conta?',
      answer:
        'Para criar uma conta, clique no botão "Cadastre-se" no topo da página e preencha os dados requisitados.',
    },
    {
      question: 'Os questionários são gratuitos?',
      answer:
        'Sim, todos os questionários disponíveis são gratuitos para acesso e realização.',
    },
    {
      question: 'Posso acompanhar meu progresso?',
      answer:
        'Claro! Após realizar os questionários, você pode visualizar seu desempenho no painel de usuário.',
    },
    {
      question: 'Como funcionam as categorias?',
      answer:
        'As categorias são agrupamentos de questionários de acordo com áreas de conhecimento, como Programação, Banco de Dados, DevOps, entre outros.',
    },
  ];

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
      setHeight(0);
    } else {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [activeIndex]);

  return (
    <section id='faq' className="w-full py-16 bg-white flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Perguntas frequentes</h2>
      <div className="w-full max-w-[800px] divide-y divide-gray-200 shadow-md">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-[#faf7ed]">
            <div
              onClick={() => toggleAccordion(index)}
              className="p-4 flex justify-between items-center cursor-pointer hover:bg-[#f6e1e1] transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp className="text-gray-600" />
              ) : (
                <FaChevronDown className="text-gray-600" />
              )}
            </div>

            <motion.div
              ref={contentRef}
              initial={false}
              animate={{ height: activeIndex === index ? height : 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 text-gray-600">
                {faq.answer}
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQAccordion;