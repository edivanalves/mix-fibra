import React, { useState, useRef, useCallback } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

const FaqItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative mb-4 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 rounded-2xl blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl">
        <button
          className="w-full flex justify-between items-center text-left p-6 cursor-pointer hover:bg-white/5 transition-all duration-300 group"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${question.replace(/\s+/g, '-')}`}
        >
          <span className="flex items-center gap-4 text-white">
            <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-110 transition-transform duration-300">
              <HelpCircle size={20} className="text-white" />
            </div>
            <span className="font-semibold text-lg group-hover:text-blue-300 transition-colors duration-300">{question}</span>
          </span>
          <ChevronDown
            size={24}
            className={`transition-all duration-300 text-cyan-300 group-hover:text-blue-300 ${isOpen ? 'rotate-180 scale-110' : ''}`}
          />
        </button>
        
        <div 
          id={`faq-answer-${question.replace(/\s+/g, '-')}`}
          className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
          role="region"
          aria-labelledby={`faq-question-${question.replace(/\s+/g, '-')}`}
        >
          <div className="px-6 pb-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/90 leading-relaxed">{answer}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Faq = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const faqData = [
    { question: 'Como faço para verificar a disponibilidade na minha cidade?', answer: 'Entre em contato conosco pelo WhatsApp ou preencha o formulário de contato. Nossa equipe verificará a cobertura em seu endereço de forma rápida e gratuita.' },
    { question: 'Quais são as formas de pagamento aceitas?', answer: 'Aceitamos pagamentos via boleto bancário, débito automático, cartão de crédito e PIX. Consulte nossos atendentes para escolher a melhor opção para você.' },
    { question: 'Posso mudar de plano a qualquer momento?', answer: 'Sim! Você pode solicitar upgrade ou downgrade do seu plano a qualquer momento. Entre em contato com nossa central de atendimento para fazer a alteração.' },
    { question: 'A Mix Fibra oferece suporte técnico 24h?', answer: 'Sim! Oferecemos suporte técnico especializado 24 horas por dia, 7 dias por semana, para garantir que você esteja sempre conectado com qualidade total.' },
    { question: 'Há fidelidade nos planos da Mix Fibra?', answer: 'Nossos planos são flexíveis e sem fidelidade obrigatória. Alguns planos promocionais podem ter condições especiais. Consulte nossa equipe para mais detalhes.' },
    { question: 'Qual é o prazo para instalação?', answer: 'O prazo médio de instalação é de 24 a 48 horas após a contratação, dependendo da disponibilidade técnica na sua região. Nossa equipe entrará em contato para agendar.' },
    { question: 'A velocidade é realmente garantida?', answer: 'Sim! Garantimos 100% da velocidade contratada via fibra óptica. Caso não atinja a velocidade, nossa equipe técnica resolve o problema sem custo adicional.' }
  ];

  return (
    <section
      id="faq"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <HelpCircle className="w-4 h-4 text-blue-400" />
            Dúvidas Frequentes
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-6">
            Perguntas & Respostas
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Encontre respostas para as dúvidas mais comuns sobre nossos serviços
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto mb-12">
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} index={index} />
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Não encontrou sua dúvida? Fale conosco!</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Faq;
