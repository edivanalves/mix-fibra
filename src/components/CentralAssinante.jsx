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
      icon: <CreditCard className="w-6 h-6" />,
      title: "Pagamento PIX",
      description: "Chave PIX: 83996095270",
      subtitle: "Romildo de Oliveira Feitosa"
    }
  ];

  const cities = [
    { name: "Sumé", whatsapp: "5583996411187" },
    { name: "Congo", whatsapp: "5583999298366" },
    { name: "Caraúbas", whatsapp: "5583988539424" },
    { name: "Camalaú", whatsapp: "5583996784194" }
  ];

  const sendReceipt = (city) => {
    const message = `Olá! Segue comprovante de pagamento PIX da minha fatura Mix Fibra.`;
    const url = `https://wa.me/${city.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="central-assinante"
      ref={ref}
      className={`relative w-full py-12 px-4 text-center mt-8 max-w-7xl mx-auto mb-8 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-700 to-blue-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Shield className="w-4 h-4 text-blue-400" />
            Área Segura do Cliente
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent mb-6">
            Central do Assinante
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Gerencie sua conta, acesse faturas, histórico de pagamentos e muito mais em um só lugar
          </p>
        </div>

        {/* PIX Payment Section */}
        <div className="mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pagamento via PIX</h3>
              <div className="bg-green-500/20 rounded-2xl p-4 border border-green-500/30">
                <div className="text-green-300 font-bold text-lg mb-1">Chave PIX</div>
                <div className="text-white font-mono text-xl mb-2">83996095270</div>
                <div className="text-green-200 text-sm">Romildo de Oliveira Feitosa</div>
              </div>
            </div>
            
            <div className="bg-orange-500/20 rounded-2xl p-4 border border-orange-500/30 mb-6">
              <div className="text-orange-300 font-bold mb-2">⚠️ Importante:</div>
              <div className="text-white/90 text-sm">
                Após realizar o pagamento, envie o comprovante para o WhatsApp da sua cidade.
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {cities.map((city, index) => (
                <button
                  key={index}
                  onClick={() => sendReceipt(city)}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 hover:scale-105 text-sm"
                >
                  Enviar para {city.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main CTA */}
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-blue-600/20 to-blue-700/20 rounded-3xl blur-xl" />
          
          <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-lg rounded-2xl shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
                title="Acessar Central do Assinante"
              >
                <span className="relative z-10 flex items-center gap-3">
                  <ExternalLink className="w-6 h-6" />
                  Entrar na Central SGP
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              
              <div className="mt-6 flex items-center justify-center gap-6 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Conexão Segura</span>
                </div>
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" />
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
