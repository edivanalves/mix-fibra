import React, { useState, useRef, useCallback } from 'react';
import { Play, Zap, Shield, Award, MessageSquare, ExternalLink } from 'lucide-react';

const CompactHero = React.forwardRef(({ scrollToPlans }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const features = [
    { icon: <Zap className="w-5 h-5" />, text: 'Até 500MB' },
    { icon: <Shield className="w-5 h-5" />, text: 'Sem Fidelidade' },
    { icon: <Award className="w-5 h-5" />, text: 'Instalação Grátis' }
  ];

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/mix-fibra/imagens/mix.png"
            alt="Mix Fibra"
            className="w-64 sm:w-80 md:w-96 h-auto object-contain mx-auto"
            loading="eager"
            onError={(e) => {
              e.target.src = "https://placehold.co/500x200/1e40af/FFFFFF?text=Mix+Fibra";
            }}
          />
        </div>

        {/* Tagline */}
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Internet de <span className="text-orange-400">Ultra Velocidade</span>
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Fibra óptica 100% pura para sua casa ou empresa. Sem fidelidade, sem taxa de instalação.
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
              <div className="text-orange-400">{feature.icon}</div>
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button
            onClick={scrollToPlans}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <Play className="w-5 h-5" />
            Ver Planos
          </button>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold text-lg rounded-2xl transition-all duration-300 hover:scale-105">
              <MessageSquare className="w-5 h-5" />
              WhatsApp
            </button>
            
            {/* Dropdown */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
              <div className="text-white/90 text-sm font-medium mb-3 text-center">Escolha sua cidade:</div>
              <div className="space-y-2">
                <a href="https://wa.me/5583996411187" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-center">
                  Sumé - (83) 99641-1187
                </a>
                <a href="https://wa.me/5583999298366" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-center">
                  Congo - (83) 99929-8366
                </a>
                <a href="https://wa.me/5583988539424" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-center">
                  Caraúbas - (83) 98853-9424
                </a>
                <a href="https://wa.me/5583996784194" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-center">
                  Camalaú - (83) 99678-4194
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-orange-400 mb-1">500MB</div>
            <div className="text-white/60 text-sm">Velocidade Máx</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-green-400 mb-1">R$39</div>
            <div className="text-white/60 text-sm">A partir de</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400 mb-1">4</div>
            <div className="text-white/60 text-sm">Cidades</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400 mb-1">0%</div>
            <div className="text-white/60 text-sm">Taxa Instalação</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CompactHero;