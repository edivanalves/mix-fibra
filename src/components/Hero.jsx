import React, { memo, useCallback, useState, useEffect, useRef, useMemo } from 'react';
import { ArrowRight, Zap, Star, Gauge } from 'lucide-react';
import SpeedTestWidget from './SpeedTestWidget';

const FloatingParticle = memo(({ delay = 0, duration = 20, left, top }) => (
  <div
    className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-float"
    style={{
      left,
      top,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
    }}
  />
));

const Hero = memo(
  React.forwardRef(({ scrollToPlans }, ref) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [showSpeedTest, setShowSpeedTest] = useState(false);
    const heroRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      setIsVisible(true);
    }, []);

    const handleMouseMove = useCallback((e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }, []);

    const handleScrollToPlans = useCallback(() => {
      scrollToPlans();
    }, [scrollToPlans]);

    const particles = useMemo(
      () =>
        Array.from({ length: 20 }, (_, i) => ({
          delay: i * 0.5,
          duration: 15 + Math.random() * 10,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        })),
      []
    );

    return (
      <section
        id="home"
        ref={ref}
        className="relative w-full min-h-screen flex items-center overflow-hidden"
        aria-label="Seção inicial do site com apresentação e chamada para conhecer planos"
        onMouseMove={handleMouseMove}
      >
        <div ref={heroRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)`,
          }}
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {particles.map((p, i) => (
            <FloatingParticle key={i} {...p} />
          ))}
        </div>

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl animate-pulse" />
          <div
            className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 rounded-full blur-xl animate-pulse"
            style={{ animationDelay: '4s' }}
          />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-20">
          <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-center lg:text-left space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Star className="w-4 h-4 text-yellow-400" />
                #1 em Velocidade na Região
              </div>

              <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <span className="block text-white mb-2">Internet que</span>
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
                  Transforma
                </span>
                <span className="block text-white/90 text-2xl sm:text-3xl lg:text-4xl font-semibold mt-2">
                  sua experiência digital
                </span>
              </h1>

              <p className={`text-lg sm:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                Fibra óptica <strong className="text-white">100% pura</strong> com velocidades de até <strong className="text-orange-400">500MB</strong>. Sem travamentos, sem limites, sem complicação.
              </p>

              <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button
                  onClick={handleScrollToPlans}
                  className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold text-lg rounded-2xl shadow-lg shadow-orange-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Ver Planos
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <button
                  onClick={() => setShowSpeedTest(true)}
                  className="group px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-white/40 text-white font-semibold text-lg rounded-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  <span className="flex items-center gap-2">
                    <Gauge className="w-5 h-5" />
                    Teste de Velocidade
                  </span>
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="relative flex justify-center items-center min-h-[600px]">
              <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <div className="absolute inset-0 rounded-full border-4 border-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 animate-spin" style={{ animationDuration: '20s' }} />
                <div className="absolute -inset-16 rounded-full bg-gradient-to-r from-blue-400/20 via-cyan-400/20 to-purple-500/20 blur-3xl animate-pulse" />

                <div
                  className="relative transform-gpu transition-all duration-700 hover:scale-110 group"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg) translateZ(50px)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="relative w-96 h-auto sm:w-[28rem] rounded-3xl p-1 bg-gradient-to-br from-blue-600/30 via-indigo-500/30 to-purple-700/30 shadow-2xl shadow-blue-900/30 backdrop-blur-md border border-white/10"
                    style={{ transform: 'translateZ(50px)' }}
                  >
                    <div className="absolute inset-0 rounded-3xl border border-blue-400/20 pointer-events-none animate-pulse" />
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-slate-900 via-blue-900 to-slate-800 opacity-90 z-0" />
                    <img
                      src="/mix-fibra/imagens/mix.png"
                      alt="Mix Fibra - Internet de Ultra Velocidade"
                      className="relative z-10 w-full h-auto object-contain rounded-2xl transition-all duration-500"
                      loading="eager"
                      decoding="async"
                      fetchpriority="high"
                      style={{
                        filter: 'brightness(1.12) contrast(1.12)',
                      }}
                    />
                  </div>
                </div>

                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-black text-2xl animate-pulse">
                   
                  </div>
                  <div className="text-white/60 text-sm font-medium mt-1">
                    Ultra Velocidade • 100% Fibra Óptica
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <SpeedTestWidget 
          isOpen={showSpeedTest} 
          onClose={() => setShowSpeedTest(false)} 
        />
      </section>
    );
  })
);

export default Hero;
