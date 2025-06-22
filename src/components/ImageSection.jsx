import React from 'react';

const ImageSection = ({ loading }) => {
  const baseUrl = import.meta.env.BASE_URL;

  const ceoMain = {
    src: baseUrl + "imagens/ceo-principal.jpg",
    alt: "Retrato principal do CEO da Mix Fibra, sorrindo e em um ambiente profissional, transmitindo confiança e liderança.",
  };

  const teamPhoto = {
    src: baseUrl + "imagens/equipe-mixfibra.jpg", // Certifique-se de ter uma foto de equipe aqui
    alt: "Foto da equipe completa da Mix Fibra, sorrindo e unida, simbolizando colaboração e sucesso.",
  };

  return (
    <section
      aria-labelledby="leadership-team-heading"
      className={`w-full py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-8 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 id="leadership-team-heading" className="text-4xl md:text-5xl font-extrabold text-white mb-12 drop-shadow-lg">
        Nossa <span className="text-orange-400">Liderança</span> e <span className="text-orange-400">Equipe</span>
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center gap-12 mb-16">
        {/* Bloco de Destaque do CEO Principal */}
        <div className="w-full lg:w-3/4 flex flex-col md:flex-row items-center bg-blue-800/50 rounded-xl shadow-xl overflow-hidden border-4 border-orange-400 p-6 md:p-8">
          <figure className="flex-shrink-0 w-full md:w-1/2 lg:w-2/5 rounded-lg overflow-hidden shadow-2xl border-2 border-white">
            <img
              src={ceoMain.src}
              alt={ceoMain.alt}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <figcaption className="sr-only">{ceoMain.alt}</figcaption>
          </figure>

          <div className="text-left text-white md:ml-8 mt-6 md:mt-0 flex-grow">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-orange-400">Visão da Liderança</h3>
            <p className="text-lg md:text-xl font-semibold mb-6 drop-shadow-md">
              **Nossos CEOs são a força que impulsiona a inovação e o compromisso da Mix Fibra. Com uma visão estratégica e liderança inspiradora, eles conduzem nossa missão de conectar pessoas e transformar o futuro. Por meio de soluções que rompem barreiras e um foco incansável na excelência, garantem que cada conexão entregue qualidade, confiança e evolução constante.**
            </p>
            <blockquote className="text-md md:text-lg italic text-orange-300 drop-shadow-sm border-l-4 border-orange-400 pl-4">
              &ldquo;Conectando vidas, transformando futuros, com a fibra da nossa paixão.&rdquo;
            </blockquote>
          </div>
        </div>
      </div>

      {/* Seção da Equipe com uma única foto */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-lg">
          Conheça nossa <span className="text-orange-400">Equipe</span>
        </h3>

        <p className="text-lg md:text-xl font-semibold text-white mb-12 max-w-4xl mx-auto drop-shadow-md">
          A Mix Fibra é impulsionada por pessoas dedicadas e apaixonadas. Juntos, somos a força que garante a inovação, o suporte e a qualidade que você merece, construindo o futuro da comunicação com união e excelência.
        </p>

        {/* Foto da Equipe */}
        <div className="flex justify-center">
          <figure className="w-full md:w-3/4 lg:w-2/3 rounded-xl overflow-hidden shadow-2xl border-4 border-orange-300">
            <img
              src={teamPhoto.src}
              alt={teamPhoto.alt}
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-300 ease-in-out"
            />
            <figcaption className="sr-only">{teamPhoto.alt}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};

export default ImageSection;