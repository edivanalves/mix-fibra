import React, { useState, useRef, useCallback } from 'react';
import { ExternalLink, CreditCard, FileText, History, Settings, Shield } from 'lucide-react';

const CentralAssinante = React.forwardRef(({ loading }, ref) => {
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
    {
      icon: <FileText className="w-6 h-6" />,
      title: "2ª Via de Boleto",
      description: "Acesse e baixe suas faturas"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Formas de Pagamento",
      description: "Gerencie seus métodos de pagamento"
    },
    {
      icon: <History className="w-6 h-6" />,
      title: "Histórico",
      description: "Consulte seu histórico completo"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Configurações",
      description: "Altere dados e preferências"
    }
  ];

  return (
    <section
      id="central-assinante"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-cyan-400" />
            Área Segura do Cliente
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Central do Assinante
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Gerencie sua conta, acesse faturas, histórico de pagamentos e muito mais em um só lugar
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl" />
          
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ExternalLink size={32} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Acesse Sua Conta Agora
              </h3>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                Entre na sua área do cliente e tenha controle total sobre seus serviços Mix Fibra
              </p>
              
              <a
                href="https://mixfibra.sgp.net.br/accounts/central/login?next=/central/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg shadow-cyan-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/40 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
                title="Acessar Central do Assinante"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ExternalLink className="w-6 h-6" />
                  Entrar na Central SGP
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Conexão Segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-cyan-400" />
                  <span>Fácil de Usar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default CentralAssinante;
