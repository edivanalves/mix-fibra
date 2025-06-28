import React, { memo, useCallback } from 'react';

const Hero = memo(React.forwardRef(({ loading, scrollToPlans }, ref) => {
  return (
    <section
      id="home"
      ref={ref}
      className="w-full h-screen relative flex items-center overflow-hidden mb-12"
      aria-label="Seção inicial do site com apresentação e chamada para conhecer planos"
    >
      <style>
        {`
          @keyframes hero-float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-8px) scale(1.02); }
          }
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes gradient-shift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          .hero-float { animation: hero-float 4s ease-in-out infinite; }
          .fade-up { animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }
          .fade-up-delay { animation: fade-in-up 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards; }
          .gradient-animate { 
            background: linear-gradient(-45deg, #1e40af, #3b82f6, #06b6d4, #0891b2);
            background-size: 400% 400%;
            animation: gradient-shift 8s ease infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .hero-float, .fade-up, .fade-up-delay, .gradient-animate { animation: none; }
          }
        `}
      </style>

      {/* Vídeo de fundo */}
      <div className="absolute inset-0 w-full h-full -z-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="w-full h-full object-cover"
          src="/mix-fibra/videos/hero-video.mp4"
          poster="/mix-fibra/imagens/hero-poster.jpg"
        >
          <source src="/mix-fibra/videos/hero-video.webm" type="video/webm" />
          <source src="/mix-fibra/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </div>
      {/* Overlay para escurecer o vídeo */}
      <div className="absolute inset-0 bg-blue-950/70 -z-10" />

      {/* Conteúdo principal */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-20">
        <div className="flex flex-col lg:flex-row items-center gap-10">

          <div className="flex justify-center items-center w-full lg:w-1/2">
            <div className="hero-float relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-cyan-400/20 rounded-2xl blur-xl"></div>
              <img
                src="/mix-fibra/imagens/mix.png"
                alt="Logo da Mix Fibra - Internet de fibra óptica de alta velocidade"
                className="relative rounded-2xl w-64 sm:w-80 md:w-[22rem] lg:w-full max-w-xl h-auto shadow-2xl"
                loading="eager"
                decoding="async"
                fetchpriority="high"
                width={352}
                height={224}
              />
            </div>
          </div>

          <div className="text-center lg:text-left space-y-6 w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight fade-up opacity-0">
              A Conexão que <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">Transforma</span> o seu Dia.
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-200 max-w-lg mx-auto lg:mx-0 fade-up-delay opacity-0 leading-relaxed">
              Ultra velocidade e estabilidade <strong className="text-white">100% fibra óptica</strong> para você navegar, trabalhar, jogar e assistir sem limites.
            </p>

            <div className="flex justify-center lg:justify-start">
              <button
                onClick={useCallback(() => scrollToPlans(), [scrollToPlans])}
                className="group inline-flex items-center justify-center gap-2 gradient-animate
                  text-white font-bold text-base sm:text-lg px-8 sm:px-10 py-4 sm:py-5 rounded-2xl
                  shadow-lg shadow-blue-500/30 hover:shadow-blue-400/50 hover:shadow-2xl
                  transition-all duration-300 transform hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent
                  border border-white/20 hover:border-white/30"
                aria-label="Conhecer nossos planos de internet"
                type="button"
              >
                Conhecer Planos
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  focusable="false"
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
}));

export default Hero;
