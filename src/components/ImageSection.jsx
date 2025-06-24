import React from 'react';

const ImageSection = ({ loading }) => {
  const baseUrl = import.meta.env.BASE_URL;

  const ceoMain = {
    src: baseUrl + 'imagens/ceo-principal.jpg',
    alt: 'Retrato principal do CEO da Mix Fibra, sorrindo e em um ambiente profissional, transmitindo confiança e liderança.',
  };

  return (
    <section
      aria-labelledby="leadership-team-heading"
      className={`w-full py-12 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-8 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${
        loading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h2
        id="leadership-team-heading"
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-10 drop-shadow-lg"
      >
        Nossa <span className="text-orange-400">Liderança</span>
      </h2>

      {/* LAYOUT FLEX RESPONSIVO */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10">
        {/* IMAGEM DO CEO */}
        <figure className="w-full max-w-sm lg:max-w-md rounded-xl overflow-hidden shadow-2xl border-4 border-orange-400">
          <img
            src={ceoMain.src}
            alt={ceoMain.alt}
            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <figcaption className="sr-only">{ceoMain.alt}</figcaption>
        </figure>

        {/* TEXTO */}
        <div className="text-white text-left flex-1 px-2">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 drop-shadow-lg text-orange-400">
            Visão da Liderança
          </h3>
          <p className="text-base sm:text-lg md:text-xl font-medium sm:font-semibold mb-6 drop-shadow-md">
            Nossos CEOs são a força que impulsiona a inovação e o compromisso da Mix Fibra. Com uma visão estratégica e liderança inspiradora, eles conduzem nossa missão de conectar pessoas e transformar o futuro. Por meio de soluções que rompem barreiras e um foco incansável na excelência, garantem que cada conexão entregue qualidade, confiança e evolução constante.
          </p>
          <blockquote className="text-sm sm:text-base italic text-orange-300 drop-shadow-sm border-l-4 border-orange-400 pl-4">
            &ldquo;Conectando vidas, transformando futuros, com a fibra da nossa paixão.&rdquo;
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ImageSection;
