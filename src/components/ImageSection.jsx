// Caminho do arquivo: src/components/ImageSection.jsx

import React from 'react';

const ImageSection = ({ loading }) => {
  const images = [
    {
      src: "https://placehold.co/600x400/000033/FFA500?text=Promoção+Mix+Fibra",
      alt: "Promoção Mix Fibra",
      description: "Promoção de planos com ultra velocidade.",
      glowColor: "bg-orange-400",
      borderColor: "border-orange-400",
      gridSpan: "md:col-span-1",
    },
    {
      src: "https://placehold.co/600x400/000033/00FFFF?text=Técnico+Mix+Fibra",
      alt: "Técnico Mix Fibra",
      description: "Nossos técnicos garantindo sua conexão.",
      glowColor: "bg-cyan-400",
      borderColor: "border-cyan-400",
      gridSpan: "md:col-span-1",
    },
    {
      src: "https://placehold.co/1200x400/000033/FFFFFF?text=Instalação+Fibra+Óptica",
      alt: "Instalação de Fibra",
      description: "Cuidamos da sua instalação com fibra óptica.",
      glowColor: "bg-yellow-300",
      borderColor: "border-yellow-300",
      gridSpan: "md:col-span-2",
    },
  ];

  return (
    <section className={`w-full py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-8 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-14 drop-shadow-lg">
        Nossa Conexão em <span className="text-orange-400">Imagens</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {images.map((image, index) => (
          <div key={index} className={`relative bg-gradient-to-br from-blue-800/80 to-blue-900/80 glass rounded-2xl p-6 shadow-2xl flex flex-col items-center group hover:scale-105 transition-transform duration-300 overflow-hidden ${image.gridSpan}`}>
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-30 ${image.glowColor} pointer-events-none`}></div>
            <img src={image.src} alt={image.alt} className={`rounded-xl shadow-lg w-full h-56 object-cover mb-4 border-4 ${image.borderColor}/30 group-hover:${image.borderColor} transition-all duration-300`} />
            <p className="text-blue-200 text-lg font-semibold">{image.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageSection;