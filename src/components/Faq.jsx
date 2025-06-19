import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react'; // Importar o ícone ChevronDown da lucide-react

// Componente individual de FAQ
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen} // Atributo ARIA para acessibilidade
        aria-controls={`faq-answer-${question.replace(/\s+/g, '-')}`} // Ligação para a resposta
      >
        <span>{question}</span>
        <ChevronDown // Usar ícone SVG para melhor controlo e acessibilidade
          size={24}
          className={`faq-arrow transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
        {/*
          NOTA: A classe 'rotate' no CSS para 'faq-arrow.rotate'
          deve ser ajustada para 'rotate-180' se estiver a usar Tailwind diretamente,
          ou pode manter o 'rotate' e certificar-se que a regra CSS é:
          .faq-arrow.rotate { transform: rotate(180deg); }
          No meu CSS, 'rotate' já está mapeado para 'rotate-180', então está consistente.
        */}
      </button>
      <div
        id={`faq-answer-${question.replace(/\s+/g, '-')}`} // ID único para a resposta
        className={`faq-answer ${isOpen ? 'open' : ''}`}
        role="region" // Atributo ARIA para indicar que é uma região de conteúdo
        aria-labelledby={`faq-question-${question.replace(/\s+/g, '-')}`} // Ligação para a pergunta
      >
        <p className="p-4 text-blue-100">{answer}</p> {/* Adicionado cor de texto para tema escuro */}
      </div>
    </div>
  );
};

// Componente principal de FAQ
const Faq = React.forwardRef(({ loading }, ref) => { // Adicionado React.forwardRef
  const faqData = [
    { question: 'Como faço para verificar a disponibilidade na minha cidade?', answer: 'Você pode entrar em contato conosco pelo WhatsApp ou preencher o formulário de contato. Nossa equipe verificará a cobertura em seu endereço.' },
    { question: 'Quais são as formas de pagamento aceitas?', answer: 'Aceitamos pagamentos via boleto bancário, débito automático e cartão de crédito. Consulte nossos atendentes para mais detalhes.' },
    { question: 'Posso mudar de plano a qualquer momento?', answer: 'Sim, você pode solicitar a alteração do seu plano a qualquer momento, de acordo com as condições contratuais. Entre em contato com nossa central de atendimento.' },
    { question: 'A Mix Fibra oferece suporte técnico 24h?', answer: 'Sim, a Mix Fibra oferece suporte técnico especializado 24 horas por dia, 7 dias por semana, para garantir que você esteja sempre conectado. Entre em contato pelos nossos canais de atendimento.' },
    { question: 'Há fidelidade nos planos da Mix Fibra?', answer: 'Nossos planos são flexíveis, mas alguns podem ter um período de fidelidade associado a benefícios promocionais. Verifique as condições do plano escolhido ou fale com nossa equipe comercial.' },
  ];

  return (
    <section
      className={`w-full py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      id="faq" // Adicionado ID para navegação
      ref={ref} // Passa o ref para a secção
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-lg">
        Perguntas Frequentes <span className="text-orange-400">(FAQ)</span>
      </h2>
      <div className="max-w-3xl mx-auto text-left"> {/* Alinhamento do texto à esquerda para melhor leitura */}
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
});

export default Faq;
