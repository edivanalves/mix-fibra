// Caminho: src/components/Support.jsx

import React, { useState } from 'react';
import { MessageSquareText, PhoneCall, ChevronDown, HelpCircle, Search, ThumbsUp, ThumbsDown, Info } from 'lucide-react'; // Ícones adicionais

// Sub-componente para um item de problema comum (similar ao FaqItem)
const CommonProblemItem = ({ problem, solution }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null); // 'yes' | 'no' | null

  const handleFeedback = (type) => {
    setFeedbackGiven(type);
    // Aqui você poderia enviar esta informação para um serviço de análise, se necessário.
    console.log(`Feedback para "${problem}": ${type === 'yes' ? 'Ajudou' : 'Não Ajudou'}`);
  };

  return (
    <div className="bg-blue-800/60 rounded-xl shadow-lg border border-blue-700/50 mb-3 overflow-hidden transition-all duration-300 ease-in-out">
      <button
        className="w-full flex justify-between items-center text-left text-lg font-semibold p-4 cursor-pointer hover:bg-blue-700/70 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`problem-solution-${problem.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <span className="flex items-center gap-3 text-white">
          <HelpCircle size={20} className="text-orange-400" /> {/* Ícone para o problema */}
          {problem}
        </span>
        <ChevronDown
          size={22}
          className={`transition-transform duration-300 text-cyan-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <div
        id={`problem-solution-${problem.replace(/\s+/g, '-').toLowerCase()}`}
        // CORREÇÃO: Ajustado as classes CSS para evitar o erro de sintaxe.
        // px-4 é aplicado sempre, pb-4 e max-h/opacity são condicionais.
        className={`overflow-hidden transition-all duration-500 ease-in-out px-4 ${isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
        role="region"
        aria-labelledby={`problem-${problem.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <p className="text-blue-200 mb-4">{solution}</p>
        {feedbackGiven ? (
          <p className={`text-sm text-center font-medium ${feedbackGiven === 'yes' ? 'text-green-400' : 'text-red-400'}`}>
            Obrigado pelo seu feedback!
          </p>
        ) : (
          <div className="flex items-center justify-center gap-4 text-blue-300 text-sm font-medium">
            Esta solução ajudou?
            <button
              onClick={() => handleFeedback('yes')}
              className="flex items-center gap-1 bg-green-600/30 text-green-300 py-1 px-3 rounded-full hover:bg-green-600/50 transition-colors duration-200"
            >
              <ThumbsUp size={16} /> Sim
            </button>
            <button
              onClick={() => handleFeedback('no')}
              className="flex items-center gap-1 bg-red-600/30 text-red-300 py-1 px-3 rounded-full hover:bg-red-600/50 transition-colors duration-200"
            >
              <ThumbsDown size={16} /> Não
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


const Support = React.forwardRef(({ loading }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');

  const commonProblemsData = [
    { problem: 'Minha internet está lenta. O que fazer?', solution: 'Verifique se há muitos dispositivos conectados, reinicie seu roteador e o modem. Se o problema persistir, entre em contato com o suporte técnico.' },
    { problem: 'Não consigo conectar ao Wi-Fi. Qual o problema?', solution: 'Certifique-se de que o roteador está ligado e com as luzes indicadoras normais. Tente esquecer a rede Wi-Fi no seu dispositivo e reconectar. Verifique se a senha está correta.' },
    { problem: 'Minha fatura não chegou. Como posso obter a 2ª via?', solution: 'Você pode acessar a 2ª via da sua fatura diretamente na Central do Assinante em nosso site ou solicitar via WhatsApp.' },
    { problem: 'Preciso mudar meu plano de internet. Como faço?', solution: 'Entre em contato com nossa central de atendimento pelo WhatsApp ou telefone para verificar as opções de planos disponíveis e fazer a alteração.' },
    { problem: 'O suporte técnico funciona 24 horas?', solution: 'Sim, nosso suporte técnico está disponível 24 horas por dia, 7 dias por semana, para monitorar a rede geral e atender às emergências.' },
    { problem: 'Como faço para alterar meus dados cadastrais?', solution: 'Para alterar dados como telefone, e-mail ou endereço, entre em contato com a nossa Central de Atendimento ou através da Central do Assinante.'},
    { problem: 'Minha conexão está caindo constantemente. O que pode ser?', solution: 'Verifique os cabos do roteador e modem. Reinicie os equipamentos. Se o problema persistir, pode ser necessário verificar a infraestrutura externa. Contacte o suporte.'},
    { problem: 'Esqueci a senha do meu Wi-Fi. O que fazer?', solution: 'A senha padrão do Wi-Fi geralmente está no rótulo do seu roteador. Se tiver alterado e não se lembra, pode ser necessário reconfigurar o roteador ou entrar em contato com o suporte para assistência.'}
  ];

  const filteredProblems = commonProblemsData.filter(item =>
    item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.solution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="support-section"
      ref={ref}
      className={`w-full py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
        Suporte Rápido <span className="text-orange-400">Mix Fibra</span>
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Encontre soluções para problemas comuns ou fale com um dos nossos especialistas para um atendimento personalizado.
      </p>

      {/* Secção de Problemas Comuns */}
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-blue-900/40 rounded-xl shadow-inner border border-blue-700/30">
        <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg flex items-center justify-center gap-2">
            <Info size={28} className="text-cyan-300" />
            Problemas Comuns <span className="text-cyan-300">e Soluções</span>
        </h3>

        {/* Campo de Pesquisa */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Pesquisar problema ou solução..."
            className="w-full p-3 pl-10 rounded-lg bg-blue-700/50 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-300" />
        </div>

        {filteredProblems.length > 0 ? (
          filteredProblems.map((item, index) => (
            <CommonProblemItem key={index} problem={item.problem} solution={item.solution} />
          ))
        ) : (
          <p className="text-blue-200 text-center text-lg py-8">Nenhum problema encontrado para "{searchTerm}".</p>
        )}
      </div>

      <div className="mt-12 p-6 bg-blue-900/40 rounded-xl shadow-inner border border-blue-700/30"> {/* Box para CTA */}
        <p className="text-blue-200 mb-6 text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Não encontrou a resposta ou precisa de ajuda imediata? Fale diretamente com a nossa equipa de suporte!
        </p>
        <a
          href="https://wa.me/5583996411187"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-extrabold py-3 px-8 rounded-full text-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          title="Iniciar Atendimento via WhatsApp com o Suporte da Mix Fibra"
        >
          <MessageSquareText size={28} strokeWidth={2.5} />
          Falar com Suporte no WhatsApp
        </a>
      </div>
      {/*
        Se o componente QuickSupport (para suporte com IA) for criado,
        ele pode ser adicionado aqui, talvez com um link ou botão secundário.
        Ex: <QuickSupport />
      */}
    </section>
  );
});

export default Support;
