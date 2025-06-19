import React from 'react';

const About = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="about"
      ref={ref}
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="relative mb-10 flex flex-col items-center">
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-32 rounded-full blur-2xl opacity-40 bg-orange-400 pointer-events-none"></div>
        <img
          src="/imagens/logo-mix-fibra.png"
          alt="Logo Mix Fibra"
          className="w-32 h-32 rounded-2xl shadow-xl border-4 border-orange-400/30 mb-4 bg-white/10 object-contain"
          loading="lazy"
        />
      </div>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Sobre a <span className="text-orange-400">Mix Fibra</span>
      </h2>
      <p className="text-blue-200 mb-10 text-lg md:text-xl max-w-3xl mx-auto">
        A Mix Fibra é sua parceira em conectividade, trazendo internet de ultra velocidade para sua casa ou empresa. Nossa missão é conectar pessoas e negócios, garantindo uma experiência online sem limites.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-10">
        <div className="flex flex-col items-center bg-blue-800/80 glass rounded-2xl p-8 shadow-xl w-full md:w-1/2">
          <h3 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4 drop-shadow">
            Cidades Atendidas
          </h3>
          <ul className="grid grid-cols-2 gap-4 text-left mx-auto max-w-xs text-blue-100 text-lg font-semibold">
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></span> Sumé</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></span> Congo</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-300 animate-pulse"></span> Camalaú</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-orange-300 animate-pulse"></span> Caraúbas</li>
          </ul>
        </div>
      </div>
    </section>
  );
});

export default About;