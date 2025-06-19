import React, { useState } from 'react';

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <span className={`faq-arrow ${isOpen ? 'rotate' : ''}`}>▼</span>
      </button>
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <p className="p-4">{answer}</p>
      </div>
    </div>
  );
};

const Faq = ({ loading }) => {
  const faqData = [
    { question: 'Como faço para verificar a disponibilidade na minha cidade?', answer: 'Você pode entrar em contato conosco pelo WhatsApp ou preencher o formulário de contato. Nossa equipe verificará a cobertura em seu endereço.' },
    { question: 'Quais são as formas de pagamento aceitas?', answer: 'Aceitamos pagamentos via boleto bancário, débito automático e cartão de crédito. Consulte nossos atendentes para mais detalhes.' },
    { question: 'Posso mudar de plano a qualquer momento?', answer: 'Sim, você pode solicitar a alteração do seu plano a qualquer momento, de acordo com as condições contratuais. Entre em contato com nossa central de atendimento.' },
  ];

  return (
    <section className={`w-full py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-lg">
        Perguntas Frequentes (FAQ)
      </h2>
      <div className="max-w-3xl mx-auto">
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
    </section>
  );
};

export default Faq;