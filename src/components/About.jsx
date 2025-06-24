import React from 'react';

// Lista de cidades com cores e imagens usando base dinâmica
const cidadesAtendidas = [
{
    nome: 'Sumé',
    cor: 'bg-orange-400',
    imagem: import.meta.env.BASE_URL + 'imagens/sume.jpg'
  },
  {
    nome: 'Congo',
    cor: 'bg-cyan-400',
    imagem: import.meta.env.BASE_URL + 'imagens/congo.jpg'
  },
  {
    nome: 'Camalaú',
    cor: 'bg-yellow-300',
    imagem: import.meta.env.BASE_URL + 'imagens/camalau.jpg'
  },
  {
    nome: 'Caraúbas',
    cor: 'bg-pink-400',
    imagem: import.meta.env.BASE_URL + 'imagens/caraubas.jpg'
  }
];

const About = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="about"
      ref={ref}
      aria-label="Sobre a Mix Fibra"
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Sobre a <span className="text-orange-400">Mix Fibra</span>
      </h2>

      <p className="text-blue-200 mb-10 text-lg md:text-xl max-w-3xl mx-auto">
        A Mix Fibra é sua parceira em conectividade, trazendo internet de ultra velocidade para sua casa ou empresa. Nossa missão é conectar pessoas e negócios, garantindo uma experiência online sem limites.
      </p>

      <h3 className="text-3xl md:text-4xl font-bold text-orange-400 mb-8 drop-shadow-lg">
        Cidades Atendidas
      </h3>

      {/* Cards de cidades */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {cidadesAtendidas.map((cidade) => (
          <div
            key={cidade.nome}
            className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/10 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={cidade.imagem}
              alt={`Cidade de ${cidade.nome}`}
              className="w-full h-40 object-cover rounded-xl mb-3 border-2 border-white/20"
              loading="lazy"
            />
            <div className="text-white font-semibold text-lg flex items-center justify-center gap-2">
              <span className={`w-3 h-3 rounded-full ${cidade.cor} motion-safe:animate-ping`}></span>
              {cidade.nome}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default About;
