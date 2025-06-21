import React from 'react';

const Hero = React.forwardRef(({ loading, scrollToPlans }, ref) => {
  return (
    <section
      id="home"
      ref={ref}
      className="w-full h-screen relative flex items-center overflow-hidden mb-12"
    >
      {/* Estilos internos: animação e prefers-reduced-motion */}
      <style>
        {`
        @keyframes hero-float-scale {
          0% { transform: translateY(0) scale(1); }
          25% { transform: translateY(-5px) scale(1.01); }
          50% { transform: translateY(0) scale(1); }
          75% { transform: translateY(5px) scale(1.01); }
          100% { transform: translateY(0) scale(1); }
        }
        .animate-hero-img-effect {
          animation: hero-float-scale 6s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-hero-img-effect {
            animation: none;
          }
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 1s ease forwards;
        }
        .fade-in-up.delay-100 { animation-delay: 0.1s; }
        .fade-in-up.delay-300 { animation-delay: 0.3s; }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        `}
      </style>

      {/* --- VÍDEO DE FUNDO E SOBREPOSIÇÃO --- */}
      <div className="absolute inset-0 w-full h-full -z-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden="true"
          className="w-full h-full object-cover"
          src="/mix-fibra/videos/hero-video.mp4"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-blue-950/70 -z-10"></div>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pt-20 sm:pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* IMAGEM */}
          <div className="flex justify-center items-center lg:order-last">
            <div className="animate-hero-img-effect">
              <img
                src="/mix-fibra/imagens/mix.png"
                alt="Representação visual da Mix Fibra"
                className="rounded-2xl w-full max-w-xl h-auto"
                loading="eager"
              />
            </div>
          </div>

          {/* TEXTO + BOTÃO */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white leading-tight fade-in-up delay-100">
              A Conexão que <span className="text-orange-400">Transforma</span> o seu Dia.
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 max-w-lg mx-auto lg:mx-0 fade-in-up delay-300">
              Ultra velocidade e estabilidade 100% fibra óptica para você navegar, trabalhar, jogar e assistir sem limites.
            </p>

            {/* BOTÃO PROFISSIONAL COM ÍCONE SVG */}
            <div>
              <button
                onClick={scrollToPlans}
                className="group inline-flex items-center justify-center gap-2 
                           bg-gradient-to-r from-blue-700 to-blue-600 
                           hover:from-blue-600 hover:to-blue-500 
                           text-white font-semibold text-lg px-8 py-4 rounded-xl
                           shadow-md shadow-blue-400/30 hover:shadow-blue-500/50
                           transition-all duration-300 transform hover:scale-105 active:scale-95
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Conhecer Planos"
              >
                Conhecer Planos
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Hero;
