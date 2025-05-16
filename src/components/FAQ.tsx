import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { motion } from "framer-motion";
import { useThemeStore } from "../store/themeStore";

const FAQAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [height, setHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();

  const faqs = [
    {
      question: "Como posso criar uma conta?",
      answer:
        'Para criar uma conta, clique no botão "Cadastre-se" no topo da página e preencha os dados requisitados.',
    },
    {
      question: "Os questionários são gratuitos?",
      answer:
        "Sim, todos os questionários disponíveis são gratuitos para acesso e realização.",
    },
    {
      question: "Posso acompanhar meu progresso?",
      answer:
        "Claro! Após realizar os questionários, você pode visualizar seu desempenho no painel de usuário.",
    },
    {
      question: "Como funcionam as categorias?",
      answer:
        "As categorias são agrupamentos de questionários de acordo com áreas de conhecimento, como Programação, Banco de Dados, DevOps, entre outros.",
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
    <section
      id="faq"
      className={`w-full py-16 flex flex-col items-center transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-[#ffffff]"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 transition-colors duration-300 ${
          theme === "dark" ? "text-white" : "text-gray-800"
        }`}
      >
        Perguntas frequentes
      </h2>

      <div
        className={`w-full max-w-[800px] divide-y shadow-lg rounded-xl overflow-hidden transition-colors duration-300 ${
          theme === "dark"
            ? "divide-gray-800 border border-gray-700"
            : "divide-gray-200 border border-gray-300"
        }`}
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`transition-colors duration-300 ${
              theme === "dark"
                ? "bg-gray-800/30 backdrop-blur-md hover:bg-gray-800"
                : "bg-white/70 hover:bg-gray-100"
            }`}
          >
            <div
              onClick={() => toggleAccordion(index)}
              className={`p-5 flex justify-between items-center cursor-pointer transition-colors duration-300 ${
                theme === "dark"
                  ? "hover:text-cyan-400 text-white"
                  : "hover:text-cyan-600 text-gray-800"
              }`}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              {activeIndex === index ? (
                <FaChevronUp
                  className={`transition-colors duration-300 ${
                    theme === "dark" ? "text-cyan-400" : "text-cyan-600"
                  }`}
                />
              ) : (
                <FaChevronDown
                  className={`transition-colors duration-300 ${
                    theme === "dark" ? "text-white" : "text-gray-600"
                  }`}
                />
              )}
            </div>

            <motion.div
              ref={contentRef}
              initial={false}
              animate={{ height: activeIndex === index ? height : 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <div
                className={`px-5 pb-5 transition-colors duration-300 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
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