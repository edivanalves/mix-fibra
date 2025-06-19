// Caminho: src/components/Hero.jsx

import React from 'react';

const Hero = React.forwardRef(({ loading, scrollToPlans }, ref) => {
  return (
    <section
      id="home"
      ref={ref}
      className="w-full h-screen relative flex items-center overflow-hidden"
    >
      {/* --- FUNDO DE VÍDEO E OVERLAY --- */}
      <div className="absolute inset-0 w-full h-full -z-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/hero-video.mp4"
        />
      </div>
      <div className="absolute inset-0 w-full h-full bg-blue-950/70 -z-10"></div>

      {/* --- CONTAINER DO CONTEÚDO --- */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* --- LADO ESQUERDO: TEXTO E CTA --- */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-black text-white leading-tight mb-6">
              A Conexão que <span className="text-orange-400">Transforma</span> o seu Dia.
            </h1>
            <p className="text-lg lg:text-xl text-slate-200 mb-8 max-w-lg mx-auto lg:mx-0">
              Ultra velocidade e estabilidade 100% fibra óptica para você navegar, trabalhar, jogar e assistir sem limites.
            </p>
            <div>
              <button
    onClick={scrollToPlans}
    className="bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-orange-500/30 transition-all duration-300 transform hover:scale-105 hover:shadow-orange-500/50 focus:outline-none active:scale-95" // <-- ADICIONADO AQUI
>
    Conhecer Planos
</button>
            </div>
          </div>
          
          {/* --- LADO DIREITO: IMAGEM --- */}
          <div className="hidden lg:flex justify-center items-center">
            <div>
              <img
                src="/imagens/mix.png"
                alt="Representação visual da Mix Fibra"
                // MUDANÇA AQUI: de max-w-md para max-w-lg
                className="rounded-2xl40 w-full max-w-lg h-auto"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Hero;