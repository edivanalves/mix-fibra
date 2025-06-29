import React, { useState, useRef, useCallback } from 'react';
import { Cpu, Headphones, Tv, Zap, Shield, Award } from 'lucide-react';

const ReasonCard = ({ reason, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-4"
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-2 bg-gradient-to-r ${reason.gradient} rounded-3xl blur-lg transition-opacity duration-300 ${isHovered ? 'opacity-60' : 'opacity-0'}`} />
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl h-96">
        {/* Icon Section */}
        <div className="relative p-8 text-center">
          <div className={`absolute inset-0 bg-gradient-to-br ${reason.gradient} opacity-10`} />
          
          <div className="relative z-10">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${reason.gradient} shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
              {reason.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">{reason.title}</h3>
            <p className="text-white/80 leading-relaxed mb-6">{reason.description}</p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {reason.stats.map((stat, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
            
            {/* Features */}
            <div className="space-y-2">
              {reason.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/80">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${reason.gradient}`} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const reasons = [
    {
      title: 'Tecnologia de Ponta',
      description: 'Infraestrutura 100% fibra óptica com tecnologia de última geração para máxima performance.',
      icon: <Zap className="w-10 h-10 text-white" strokeWidth={2.5} />,
      gradient: 'from-cyan-500 to-blue-600',
      stats: [
        { value: '500MB', label: 'Velocidade Máx' },
        { value: '99.9%', label: 'Uptime' }
      ],
      features: [
        'Fibra óptica pura',
        'Baixa latência',
        'Alta estabilidade'
      ]
    },
    {
      title: 'Suporte Especializado',
      description: 'Equipe técnica qualificada disponível 24/7 para resolver qualquer problema rapidamente.',
      icon: <Shield className="w-10 h-10 text-white" strokeWidth={2.5} />,
      gradient: 'from-emerald-500 to-green-600',
      stats: [
        { value: '24/7', label: 'Disponibilidade' },
        { value: '2min', label: 'Tempo Resposta' }
      ],
      features: [
        'Suporte via WhatsApp',
        'Técnicos especializados',
        'Monitoramento 24h'
      ]
    },
    {
      title: 'Melhor Custo-Benefício',
      description: 'Planos com preços justos, sem taxa de instalação e sem fidelidade obrigatória.',
      icon: <Award className="w-10 h-10 text-white" strokeWidth={2.5} />,
      gradient: 'from-orange-500 to-pink-600',
      stats: [
        { value: 'R$39', label: 'A partir de' },
        { value: '0%', label: 'Taxa Instalação' }
      ],
      features: [
        'Sem fidelidade',
        'Instalação gratuita',
        'Preços transparentes'
      ]
    }
  ];

  return (
    <section
      id="why-choose-us-section"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Award className="w-4 h-4 text-yellow-400" />
            Diferenciais Exclusivos
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-6">
            Por Que Escolher a Mix Fibra?
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Descubra os diferenciais que fazem da Mix Fibra a melhor escolha para sua conexão
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard key={index} reason={reason} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default WhyChooseUs;
