import React, { useState, useRef, useCallback } from 'react';
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const contactMethods = [
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'WhatsApp',
      description: 'Resposta em 2 minutos',
      action: 'Conversar Agora',
      href: 'https://wa.me/5583996411187',
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'from-green-600 to-emerald-700'
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: 'E-mail',
      description: 'mixfibrasume@gmail.com',
      action: 'Enviar E-mail',
      href: 'mailto:mixfibrasume@gmail.com',
      gradient: 'from-blue-500 to-cyan-600',
      hoverGradient: 'from-blue-600 to-cyan-700'
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: 'Telefone',
      description: '(83) 99641-1187',
      action: 'Ligar Agora',
      href: 'tel:+5583996411187',
      gradient: 'from-purple-500 to-indigo-600',
      hoverGradient: 'from-purple-600 to-indigo-700'
    }
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto mb-12 transition-opacity duration-500 ${
        loading ? 'opacity-0' : 'opacity-100'
      }`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(34, 211, 238, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Send className="w-4 h-4 text-cyan-400" />
            Entre em Contato
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Fale Conosco
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Tem dúvidas, quer assinar um plano ou precisa de suporte? 
            Nossa equipe está pronta para atender você!
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-white/70 text-sm mb-12">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Sumé, Congo, Camalaú, Caraúbas - PB</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-400" />
              <span>Atendimento 24/7</span>
            </div>
          </div>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${method.gradient} rounded-3xl blur-sm transition-opacity duration-300 opacity-0 group-hover:opacity-75`} />
              
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-xl">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${method.gradient} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-white/70 mb-6">{method.description}</p>
                
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${method.gradient} hover:${method.hoverGradient} text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg`}
                >
                  {method.action}
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-green-400 mb-1">2min</div>
            <div className="text-white/60 text-sm">Tempo Resposta</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
            <div className="text-white/60 text-sm">Disponibilidade</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-purple-400 mb-1">100%</div>
            <div className="text-white/60 text-sm">Satisfação</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="text-2xl font-bold text-orange-400 mb-1">4</div>
            <div className="text-white/60 text-sm">Cidades</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Contact;
