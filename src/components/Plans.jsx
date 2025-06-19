import React, { useState, useEffect, useRef, memo } from 'react';
import PlanRecommender from './PlanRecommender';

const iconProps = "w-5 h-5 text-green-400 mr-3 flex-shrink-0";

const advantagesIcons = {
  wifi: (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconProps} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M14.243 5.757a1 1 0 010 1.414l-4.243 4.243a1 1 0 01-1.414 0L4.243 7.172a1 1 0 011.414-1.414L10 10.586l4.243-4.829a1 1 0 011.414-.141z"
        clipRule="evenodd"
        transform="rotate(90 10 10)"
      />
    </svg>
  ),
  stream: (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconProps} viewBox="0 0 20 20" fill="currentColor">
      <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm14 0H4v8h12V6z" />
      <path d="M6 8a1 1 0 100 2h8a1 1 0 100-2H6z" />
    </svg>
  ),
  games: (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconProps} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
        clipRule="evenodd"
      />
      <path d="M10 13a1 1 0 110-2h.01a1 1 0 110 2H10zM10 9a1 1 0 110-2h.01a1 1 0 110 2H10z" />
    </svg>
  ),
  home: (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconProps} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
    </svg>
  ),
  business: (
    <svg xmlns="http://www.w3.org/2000/svg" className={iconProps} viewBox="0 0 20 20" fill="currentColor">
      <path
        fillRule="evenodd"
        d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 11-2 0V4H6v12a1 1 0 11-2 0V4zm5 3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm-2 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm2 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
        clipRule="evenodd"
      />
    </svg>
  ),
};

const plansData = [
  {
    megas: 50,
    price: '39,99',
    description: 'Ideal para uso básico, redes sociais e e-mails.',
    highlight: false,
    advantages: [
      { text: "Wi-Fi Grátis", icon: advantagesIcons.wifi },
      { text: "Suporte técnico", icon: advantagesIcons.home },
    ],
  },
  {
    megas: 100,
    price: '49,99',
    description: 'Perfeito para streaming de filmes e séries em HD.',
    highlight: true,
    advantages: [
      { text: "Streaming sem travar", icon: advantagesIcons.stream },
      { text: "Wi-Fi 5G", icon: advantagesIcons.wifi },
      { text: "Acima de 4 dispositivos", icon: advantagesIcons.games },
    ],
  },
  {
    megas: 200,
    price: '59,99',
    description: 'Para trabalho remoto, videochamadas e jogos online.',
    highlight: false,
    advantages: [
      { text: "Ideal para home office", icon: advantagesIcons.home },
      { text: "Baixa latência p/ jogos", icon: advantagesIcons.games },
    ],
  },
  {
    megas: 300,
    price: '69,99',
    description: 'Experiência completa para múltiplos streamings 4K.',
    highlight: true,
    advantages: [
      { text: "Streaming em 4K", icon: advantagesIcons.stream },
      { text: "Família conectada", icon: advantagesIcons.home },
      { text: "Wi-Fi alta performance", icon: advantagesIcons.wifi },
    ],
  },
  {
    megas: 500,
    price: '99,99',
    description: 'Ultra velocidade para empresas e gamers exigentes.',
    highlight: false,
    advantages: [
      { text: "Ideal para empresas", icon: advantagesIcons.business },
      { text: "Performance p/ gamers", icon: advantagesIcons.games },
    ],
  },
];

// Memoizado para evitar re-renderizações desnecessárias
const PlanCard = memo(({ plan, index, isInView }) => {
  const isHighlighted = plan.highlight;
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty('--mouse-x', `${x}px`);
    glowRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`
        animated-border group rounded-2xl p-0.5
        transition-all duration-500
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div
        className="relative h-full w-full bg-slate-900 rounded-[15px] p-6 flex flex-col items-center"
      >
        <div
          ref={glowRef}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${
              isHighlighted ? 'rgba(249, 115, 22, 0.15)' : 'rgba(34, 211, 238, 0.1)'
            } 0%, transparent 40%)`,
          }}
        />
        {isHighlighted && (
          <div className="absolute top-0 right-0 text-white text-xs font-bold uppercase bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-1 rounded-bl-lg shadow-md">
            Popular
          </div>
        )}
        <div className="relative z-10 flex flex-col items-center text-center w-full h-full">
          <div className={`text-5xl font-black mb-2 tracking-tight ${isHighlighted ? 'text-orange-300' : 'text-cyan-300'}`}>
            {plan.megas}
            <span className="text-2xl font-bold align-top">MB</span>
          </div>
          <p className="text-slate-300 text-sm font-medium mb-4 h-12">{plan.description}</p>
          <div className="w-full text-center mb-4 flex-grow">
            <ul className="space-y-2 text-left">
              {plan.advantages.map((adv, i) => (
                <li key={i} className="flex items-center text-slate-200 text-sm">
                  {adv.icon}
                  <span>{adv.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <hr className="w-full border-t border-slate-700 my-4" />
          <p className="text-4xl font-extrabold text-orange-400 drop-shadow-md my-2">
            <span className="text-xl align-top mr-1">R$</span>
            {plan.price}
          </p>
          
<button
    className={`w-full py-3 mt-4 font-bold rounded-lg shadow-lg text-white text-base tracking-wide transition-all duration-300 transform hover:scale-105 focus:outline-none active:scale-95 ${isHighlighted ? 'bg-gradient-to-r from-orange-500 to-yellow-400 ring-2 ring-orange-400/50' : 'bg-gradient-to-r from-cyan-600 to-blue-600'}`} // <-- ADICIONADO AQUI
    onClick={() => window.open(`https://wa.me/5583996411187?text=Olá!%20Quero%20assinar%20o%20plano%20de%20${plan.megas}MB`, '_blank')}
>
    Assinar Agora
</button>
        </div>
      </div>
    </div>
  );
});

const Plans = React.forwardRef(({ loading }, ref) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref?.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref]);

  return (
    <section
      id="plans-section"
      ref={ref}
      className={`w-full py-16 px-4 bg-transparent text-center mt-8 rounded-2xl max-w-7xl mx-auto transition-opacity duration-500 ${
        loading ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-16">Nossos Planos de Internet</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12 px-4">
        {plansData.map((plan, index) => (
          <PlanCard key={index} plan={plan} index={index} isInView={isInView} />
        ))}
      </div>
      <PlanRecommender />
    </section>
  );
});

export default Plans;
