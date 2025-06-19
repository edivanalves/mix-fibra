import React, { useState } from 'react';
import { Cpu, Headphones, Tv } from 'lucide-react';

// Subcomponente para cada cartão
const ReasonCard = ({ reason }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="relative w-full h-80 rounded-2xl p-0.5 shadow-2xl flex flex-col items-center group
                 perspective-1000 cursor-pointer overflow-hidden
                 hover:shadow-orange-500/50 transition-shadow duration-300"
    >
      <div
        className={`relative w-full h-full text-center transition-transform duration-700 ease-in-out transform-style-preserve-3d
                    ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Frente */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl bg-gradient-to-br from-blue-800/80 to-blue-900/80 glass p-8 flex flex-col items-center justify-center">
          <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-30 ${reason.glowColor} pointer-events-none`}></div>
          <div className={`mb-5 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr ${reason.gradient} shadow-lg border-4 ${reason.borderColor} animate-float-subtle`}>
            {reason.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">{reason.title}</h3>
          <p className="text-blue-200 text-center text-lg">{reason.description}</p>

          {/* Indicador de interatividade */}
          <div className="absolute bottom-4 right-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
            </svg>
          </div>
        </div>

        {/* Verso */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-br from-blue-900/90 to-blue-700/90 glass p-8 flex flex-col items-center justify-center text-white">
          <h3 className="text-2xl font-bold text-orange-400 mb-4 drop-shadow">{reason.title}</h3>
          <img
            src={reason.detailImage}
            alt={reason.title}
            className="w-2/3 h-auto rounded-lg shadow-md mb-4 object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/5a6a99/FFFFFF?text=Imagem+Detalhada"; }}
          />
          <p className="text-blue-200 text-center text-md">{reason.detailedDescription}</p>
          <button onClick={handleFlip} className="mt-4 text-sm text-cyan-300 hover:underline">Voltar</button>
        </div>
      </div>
    </div>
  );
};

const WhyChooseUs = React.forwardRef(({ loading }, ref) => {
  const reasons = [
    {
      title: 'Tecnologia de Ponta',
      description: 'Conexão 100% fibra óptica para máxima estabilidade e velocidade.',
      detailedDescription: 'Nossa infraestrutura usa fibra óptica moderna para máxima performance. Ideal para jogos, trabalho remoto e streaming sem travamentos.',
      icon: <Cpu className="w-12 h-12 text-white" strokeWidth={2.5} />,
      detailImage: 'https://placehold.co/400x250/2a3a5c/FFFFFF?text=Fibra+Óptica+Avançada',
      glowColor: 'bg-cyan-400',
      borderColor: 'border-cyan-300',
      gradient: 'from-cyan-400 via-blue-400 to-blue-700'
    },
    {
      title: 'Suporte Dedicado',
      description: 'Equipa pronta para o ajudar sempre que precisar, com agilidade.',
      detailedDescription: 'Nossa equipe de suporte está sempre disponível para atender você via WhatsApp, telefone ou chat, 24 horas por dia.',
      icon: <Headphones className="w-12 h-12 text-white" strokeWidth={2.5} />,
      detailImage: 'https://placehold.co/400x250/3c2a5c/FFFFFF?text=Suporte+Atendimento',
      glowColor: 'bg-orange-400',
      borderColor: 'border-orange-300',
      gradient: 'from-orange-400 via-yellow-300 to-orange-600'
    },
    {
      title: 'Entretenimento Completo',
      description: 'Planos com TV digital para você e sua família desfrutarem de centenas de canais.',
      detailedDescription: 'Aproveite o melhor do cinema, esporte, e variedades com nossos planos que incluem TV digital HD.',
      icon: <Tv className="w-12 h-12 text-white" strokeWidth={2.5} />,
      detailImage: 'https://placehold.co/400x250/5c2a3a/FFFFFF?text=TV+Digital+HD',
      glowColor: 'bg-yellow-300',
      borderColor: 'border-yellow-200',
      gradient: 'from-yellow-300 via-orange-400 to-orange-600'
    }
  ];

  return (
    <section
      id="why-choose-us-section"
      ref={ref}
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      {/* Estilo customizado para o efeito flip */}
      <style>
        {`
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-preserve-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
        `}
      </style>

      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-14 drop-shadow-lg">
        Por Que Escolher a <span className="text-orange-400">Mix Fibra?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reasons.map((reason, index) => (
          <ReasonCard key={index} reason={reason} />
        ))}
      </div>
    </section>
  );
});

export default WhyChooseUs;
