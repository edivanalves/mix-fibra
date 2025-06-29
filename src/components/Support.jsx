import React, { useState, useRef, useCallback } from 'react';
import {
  MessageSquare,
  ChevronDown,
  HelpCircle,
  Search,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Zap,
  Shield
} from 'lucide-react';

const CommonProblemItem = ({ problem, solution, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFeedback = (type) => {
    setFeedbackGiven(type);
    console.log(`Feedback para "${problem}": ${type === 'yes' ? 'Ajudou' : 'Não Ajudou'}`);
  };

  return (
    <div 
      className="group relative mb-4 transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-cyan-500/20 rounded-2xl blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden shadow-xl">
        <button
          className="w-full flex justify-between items-center text-left p-6 cursor-pointer hover:bg-white/5 transition-all duration-300 group"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-4 text-white">
            <div className="p-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 group-hover:scale-110 transition-transform duration-300">
              <HelpCircle size={20} className="text-white" />
            </div>
            <span className="font-semibold text-lg group-hover:text-orange-300 transition-colors duration-300">{problem}</span>
          </span>
          <ChevronDown
            size={24}
            className={`transition-all duration-300 text-cyan-300 group-hover:text-orange-300 ${isOpen ? 'rotate-180 scale-110' : ''}`}
          />
        </button>
        
        <div className={`overflow-hidden transition-all duration-500 ease-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 pb-6">
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <p className="text-white/90 mb-4 leading-relaxed">{solution}</p>
              
              {feedbackGiven ? (
                <div className={`text-center p-3 rounded-lg ${feedbackGiven === 'yes' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  <Sparkles className="w-5 h-5 inline mr-2" />
                  Obrigado pelo seu feedback!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-4 text-white/80">
                  <span className="text-sm font-medium">Esta solução ajudou?</span>
                  <button
                    onClick={() => handleFeedback('yes')}
                    className="flex items-center gap-2 bg-green-500/20 hover:bg-green-500/30 text-green-300 py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 border border-green-500/30"
                  >
                    <ThumbsUp size={16} /> Sim
                  </button>
                  <button
                    onClick={() => handleFeedback('no')}
                    className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-2 px-4 rounded-xl transition-all duration-300 hover:scale-105 border border-red-500/30"
                  >
                    <ThumbsDown size={16} /> Não
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const Support = React.forwardRef(({ loading }, ref) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const commonProblemsData = [
    { problem: 'Minha internet está lenta. O que fazer?', solution: 'Verifique se há muitos dispositivos conectados, reinicie seu roteador e o modem. Se o problema persistir, entre em contato com o suporte técnico 24/7.' },
    { problem: 'Não consigo conectar ao Wi-Fi. Qual o problema?', solution: 'Certifique-se de que o roteador está ligado e com as luzes indicadoras normais. Tente esquecer a rede Wi-Fi no seu dispositivo e reconectar. Verifique se a senha está correta.' },
    { problem: 'Minha fatura não chegou. Como posso obter a 2ª via?', solution: 'Você pode acessar a 2ª via da sua fatura diretamente na Central do Assinante em nosso site ou solicitar via WhatsApp de forma rápida e prática.' },
    { problem: 'Preciso mudar meu plano de internet. Como faço?', solution: 'Entre em contato com nossa central de atendimento pelo WhatsApp ou telefone para verificar as opções de planos disponíveis e fazer a alteração sem burocracia.' },
    { problem: 'O suporte técnico funciona 24 horas?', solution: 'Sim! Nosso suporte técnico está disponível 24 horas por dia, 7 dias por semana, para monitorar a rede e atender emergências com agilidade total.' },
    { problem: 'Como faço para alterar meus dados cadastrais?', solution: 'Para alterar dados como telefone, e-mail ou endereço, entre em contato com nossa Central de Atendimento ou através da Central do Assinante de forma segura.'},
    { problem: 'Minha conexão está caindo constantemente. O que pode ser?', solution: 'Verifique os cabos do roteador e modem. Reinicie os equipamentos. Se persistir, pode ser infraestrutura externa. Nossa equipe técnica resolve rapidamente!'},
    { problem: 'Esqueci a senha do meu Wi-Fi. O que fazer?', solution: 'A senha padrão está no rótulo do roteador. Se alterou e esqueceu, podemos ajudar a reconfigurar ou fornecer suporte técnico especializado.'}
  ];

  const filteredProblems = commonProblemsData.filter(item =>
    item.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.solution.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section
      id="support-section"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(147, 51, 234, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-green-400" />
            Suporte 24/7 Disponível
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent mb-6">
            Central de Ajuda
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Encontre soluções rápidas ou fale com nossos especialistas para um atendimento personalizado
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-300" />
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite sua dúvida ou problema..."
                  className="w-full p-4 pl-12 pr-4 bg-transparent text-white placeholder-white/60 focus:outline-none text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search size={24} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="max-w-5xl mx-auto mb-16">
          {filteredProblems.length > 0 ? (
            <div className="grid gap-4">
              {filteredProblems.map((item, index) => (
                <CommonProblemItem key={index} problem={item.problem} solution={item.solution} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-white" />
              </div>
              <p className="text-white/80 text-xl mb-2">Nenhum resultado encontrado</p>
              <p className="text-white/60">Tente pesquisar com outras palavras ou entre em contato conosco</p>
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MessageSquare size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Precisa de Ajuda Personalizada?
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Nossa equipe especializada está pronta para resolver qualquer problema. 
                Atendimento rápido, eficiente e sempre disponível!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5583996411187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-green-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/40 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Falar no WhatsApp
                    <Zap className="w-5 h-5 transition-transform group-hover:scale-110" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                
                <a
                  href="https://mixfibra.sgp.net.br/central/home/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold text-lg rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Central do Assinante
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Support;
