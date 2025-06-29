import React, { useState, useRef, useCallback } from 'react';
import { Gauge, ExternalLink, Zap, Wifi, Monitor, Smartphone } from 'lucide-react';

const SpeedTest = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const speedTests = [
    {
      name: "Speedtest by Ookla",
      url: "https://www.speedtest.net/pt/",
      description: "O teste de velocidade mais confiável do mundo",
      icon: <Gauge className="w-6 h-6" />,
      gradient: "from-purple-500 to-indigo-600",
      popular: true
    },
    {
      name: "Fast.com Netflix",
      url: "https://fast.com/pt/",
      description: "Teste rápido focado em streaming",
      icon: <Zap className="w-6 h-6" />,
      gradient: "from-red-500 to-pink-600"
    },
    {
      name: "Google Speed Test",
      url: "https://www.google.com/search?q=speed+test",
      description: "Teste integrado do Google",
      icon: <Wifi className="w-6 h-6" />,
      gradient: "from-blue-500 to-cyan-600"
    }
  ];

  const speedRanges = [
    { range: "Até 50MB", usage: "Navegação básica", icon: <Smartphone className="w-5 h-5" />, color: "text-blue-400" },
    { range: "50-200MB", usage: "Streaming HD", icon: <Monitor className="w-5 h-5" />, color: "text-green-400" },
    { range: "200-500MB", usage: "Gaming e 4K", icon: <Zap className="w-5 h-5" />, color: "text-orange-400" },
    { range: "500MB+", usage: "Uso profissional", icon: <Gauge className="w-5 h-5" />, color: "text-purple-400" }
  ];

  return (
    <section
      id="speedtest-section"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Gauge className="w-4 h-4 text-purple-400" />
            Teste de Velocidade
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-purple-200 to-indigo-200 bg-clip-text text-transparent mb-6">
            Teste Sua Velocidade
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Meça a velocidade real da sua internet e compare com os planos Mix Fibra
          </p>
        </div>

        {/* Speed Test Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {speedTests.map((test, index) => (
            <div
              key={index}
              className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Popular Badge */}
              {test.popular && (
                <div className="absolute -top-2 -right-2 z-20">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    ⭐ POPULAR
                  </div>
                </div>
              )}
              
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${test.gradient} rounded-3xl blur-sm transition-opacity duration-300 opacity-0 group-hover:opacity-75`} />
              
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${test.gradient} shadow-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {test.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{test.name}</h3>
                <p className="text-white/70 mb-6 leading-relaxed">{test.description}</p>
                
                <a
                  href={test.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${test.gradient} text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg`}
                >
                  <ExternalLink className="w-4 h-4" />
                  Testar Agora
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Speed Guide */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">
            Guia de Velocidades
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {speedRanges.map((range, index) => (
              <div 
                key={index}
                className="text-center p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 mb-4 ${range.color}`}>
                  {range.icon}
                </div>
                <div className="text-lg font-bold text-white mb-2">{range.range}</div>
                <div className="text-sm text-white/60">{range.usage}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-white/70 text-sm">
              💡 <strong className="text-orange-400">Dica:</strong> Para melhores resultados, feche outros aplicativos e conecte-se via cabo ethernet
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SpeedTest;
