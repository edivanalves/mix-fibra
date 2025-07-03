import React, { useState, useRef, useCallback } from 'react';
import { Users, Target, Award, TrendingUp } from 'lucide-react';

const ImageSection = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const values = [
    { icon: <Users className="w-6 h-6" />, title: 'Compromisso', description: 'Com cada cliente' },
    { icon: <Target className="w-6 h-6" />, title: 'Inovação', description: 'Tecnologia avançada' },
    { icon: <Award className="w-6 h-6" />, title: 'Excelência', description: 'Em cada serviço' },
    { icon: <TrendingUp className="w-6 h-6" />, title: 'Crescimento', description: 'Junto com você' }
  ];

  return (
    <section
      id="image-section"
      ref={ref}

      className={`relative w-full py-12 px-4 text-center mt-8 max-w-7xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-700 to-blue-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Award className="w-4 h-4 text-orange-400" />
            Liderança & Visão
          </div>
          
          <h2 id="leadership-team-heading" className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Nossa Liderança
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/30 to-orange-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src="/mix-fibra/imagens/ceo-principal.jpg"
                  alt="CEO da Mix Fibra em ambiente profissional"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x500/1e40af/FFFFFF?text=CEO+Mix+Fibra";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
              
              {/* CEO Info */}
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Liderança Mix Fibra</h3>
                <p className="text-orange-400 font-semibold">Fundadores & CEOs</p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="text-left space-y-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Visão <span className="text-orange-400">Estratégica</span>
              </h3>
              <p className="text-xl text-white/80 leading-relaxed mb-6">
                Nossa liderança impulsiona a inovação e o compromisso da Mix Fibra. Com visão estratégica e 
                liderança inspiradora, conduzimos a missão de <strong className="text-orange-400">conectar pessoas</strong> e 
                transformar o futuro digital.
              </p>
              
              <blockquote className="relative p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="absolute top-4 left-4 text-4xl text-orange-400 opacity-50">&ldquo;</div>
                <p className="text-lg italic text-white/90 pl-8">
                  Conectando vidas, transformando futuros, com a fibra da nossa paixão.
                </p>
                <div className="absolute bottom-4 right-4 text-4xl text-orange-400 opacity-50 rotate-180">&ldquo;</div>
              </blockquote>
            </div>
            
            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center group hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                    {value.icon}
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{value.title}</div>
                  <div className="text-sm text-white/60">{value.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default ImageSection;
