import React from 'react';

// Sugestão 3: Importando a imagem para otimização (o caminho pode precisar de ajuste)
import mapaParaiba from '/public/imagens/paraiba-municipios.png'; 

// Sugestão 1: Centralizando a lista de cidades em um array para fácil manutenção
const cidadesAtendidas = [
  { nome: 'Sumé', cor: 'bg-orange-400' },
  { nome: 'Congo', cor: 'bg-cyan-400' },
  { nome: 'Camalaú', cor: 'bg-yellow-300' },
  { nome: 'Caraúbas', cor: 'bg-pink-400' }
];

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
          src="/imagens/ChatGPT Image 17 de jun. de 2025, 11_40_41.png"
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

      {/* Bloco com o mapa e destaque das cidades */}
      <div 
        className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-orange-400/60 w-full max-w-4xl mx-auto h-96 mb-10 bg-cover bg-center bg-no-repeat"
        style={{
          // A sintaxe pode variar (ex: `mapaParaiba` ou `mapaParaiba.src`) dependendo do seu setup
          backgroundImage: `url(${mapaParaiba})`, 
        }}
      >
        <div className="absolute inset-0 bg-blue-900/40 backdrop-blur-sm flex flex-col justify-center items-center text-white p-4">
          <h3 className="text-3xl md:text-4xl font-bold text-orange-400 mb-4 drop-shadow-lg">
            Cidades Atendidas
          </h3>
          <ul className="grid grid-cols-2 gap-4 text-center text-lg font-semibold">
            {/* Mapeando o array para criar a lista de cidades dinamicamente */}
            {cidadesAtendidas.map((cidade) => (
              <li key={cidade.nome} className="flex items-center justify-center gap-2">
                {/* Sugestão 2: Animação acessível com motion-safe */}
                <span className={`w-3 h-3 rounded-full ${cidade.cor} motion-safe:animate-ping`}></span> 
                {cidade.nome}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
});

export default About;