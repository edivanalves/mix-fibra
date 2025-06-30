import React, { useState, useEffect, useRef } from 'react';
import { Play, ArrowDown, Zap, Shield, Award } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';

const ParallaxHero = React.forwardRef(({ scrollToPlans }, ref) => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxOffset = scrollY * 0.5;
  const parallaxSlow = scrollY * 0.3;

  return (
    <section 
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
        style={{ transform: `translateY(${parallaxSlow}px)` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          style={{ 
            left: `${20 + mousePosition.x * 0.1}%`,
            top: `${10 + mousePosition.y * 0.1}%`,
            transform: `translateY(${-parallaxOffset}px)`
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full blur-3xl"
          style={{ 
            right: `${15 + mousePosition.x * 0.05}%`,
            bottom: `${20 + mousePosition.y * 0.05}%`,
            transform: `translateY(${-parallaxOffset * 0.7}px)`
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              transform: `translateY(${-parallaxOffset * (0.2 + Math.random() * 0.3)}px)`
            }}
          />
        ))}
      </div>

      {/* Video Background */}
      <div className="absolute inset-0 opacity-30">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-slate-900/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto pt-20 sm:pt-16 md:pt-12">


        {/* Main Title - Logo */}
        <div 
          className="mb-6 animate-slide-up flex justify-center"
          style={{ 
            animationDelay: '0.4s',
            transform: `translateY(${-parallaxOffset * 0.1}px)`
          }}
        >
          <img
            src="/mix-fibra/imagens/mix.png"
            alt="Mix Fibra"
            className="w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto object-contain"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onError={(e) => {
              e.target.src = "https://placehold.co/500x200/1e40af/FFFFFF?text=Mix+Fibra";
            }}
          />
        </div>

        {/* Subtitle */}
        <p 
          className="text-2xl md:text-3xl text-white/90 mb-8 font-light animate-slide-up"
          style={{ 
            animationDelay: '0.6s',
            transform: `translateY(${-parallaxOffset * 0.05}px)`
          }}
        >
          Conectando você ao <strong className="text-orange-400">futuro digital</strong>
        </p>

        {/* Features */}
        <div 
          className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up"
          style={{ animationDelay: '0.8s' }}
        >
          {[
            { icon: Zap, text: 'Internet de Ultra Velocidade' },
            { icon: Zap, text: 'Até 500MB' },
            { icon: Shield, text: 'Sem Fidelidade' },
            { icon: Award, text: 'Instalação Grátis' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-white/80">
              <feature.icon className="w-5 h-5 text-orange-400" />
              <span className="font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up"
          style={{ animationDelay: '1s' }}
        >
          <AnimatedButton
            onClick={scrollToPlans}
            variant="primary"
            size="lg"
            icon={Play}
            className="text-xl px-8 py-4"
          >
            Ver Planos
          </AnimatedButton>
          
          <div className="relative group">
            <button className="flex items-center gap-2 px-8 py-4 text-xl font-bold text-white border-2 border-white/30 hover:border-white/60 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white/10">
              Falar no WhatsApp
            </button>
            
            {/* Dropdown Menu */}
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

        {/* Scroll Indicator */}
        <div 
          className="animate-bounce cursor-pointer animate-slide-up"
          style={{ animationDelay: '1.2s' }}
          onClick={scrollToPlans}
        >
          <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white/80 transition-colors">
            <span className="text-sm font-medium">Descubra mais</span>
            <ArrowDown className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
});

export default ParallaxHero;