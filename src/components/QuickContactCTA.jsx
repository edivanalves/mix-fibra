import React, { useState, useRef, useCallback } from 'react';
import { MessageSquare, Zap, Clock, Users } from 'lucide-react';

const QuickContactCTA = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative max-w-6xl mx-auto mt-16 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-green-600 to-cyan-600 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-30 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 p-8 md:p-12 text-white text-center">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-6">
            <Clock className="w-4 h-4" />
            Atendimento Imediato
          </div>
          
          <h3 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">
            Pronto para Conectar?
          </h3>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Nossa equipe especializada está online agora para ajudar você a escolher o plano perfeito e ativar sua internet em minutos!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <Zap className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">2 min</div>
            <div className="text-green-200 text-sm">Tempo de Resposta</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <Users className="w-8 h-8 text-blue-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-green-200 text-sm">Suporte Disponível</div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <MessageSquare className="w-8 h-8 text-green-300 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">100%</div>
            <div className="text-green-200 text-sm">Satisfação</div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="relative">
          <div className="absolute -inset-2 bg-gradient-to-r from-white/30 to-green-200/30 rounded-3xl blur-lg" />
          <a
            href="https://wa.me/5583996411187"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center gap-3 bg-white hover:bg-green-50 text-green-700 font-bold py-6 px-12 rounded-3xl shadow-2xl transition-all duration-300 hover:scale-105 text-xl"
            aria-label="Entrar em contato via WhatsApp"
          >
            <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
            Falar Agora no WhatsApp
            <Zap className="w-6 h-6 text-yellow-600 group-hover:rotate-12 transition-transform duration-300" />
          </a>
        </div>
        
        <p className="text-green-200 text-sm mt-4 opacity-80">
          🔒 Seus dados estão seguros • 🚀 Resposta garantida em 2 minutos
        </p>
      </div>
    </section>
  );
};

export default QuickContactCTA;
