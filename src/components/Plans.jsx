import React, { useRef, memo } from 'react';

const PlanCard = memo(({ plan, index, isInView }) => {
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!glowRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.setProperty('--mouse-x', `${x}px`);
    glowRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const isHighlighted = plan.highlight;

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`
        group relative rounded-2xl p-1
        transition-transform duration-500
        shadow-lg hover:shadow-2xl hover:-translate-y-2
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        max-w-xs mx-auto bg-gradient-to-br ${isHighlighted ? 'from-orange-500 to-yellow-400' : 'from-cyan-700 to-blue-900'}
      `}
    >
      <div className="relative rounded-xl bg-slate-900 p-6 flex flex-col items-center text-center overflow-hidden">
        {/* Glow seguindo mouse */}
        <div
          ref={glowRef}
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), ${
              isHighlighted ? 'rgba(255 165 0 / 0.35)' : 'rgba(6 182 212 / 0.3)'
            }, transparent 80%)`,
            filter: 'blur(40px)',
          }}
        />

        {isHighlighted && (
          <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 px-4 py-1 rounded-bl-lg text-xs font-extrabold text-white uppercase shadow-lg z-10">
            Popular
          </div>
        )}

        <div className={`relative z-10 flex flex-col items-center w-full`}>
          <div
            className={`text-5xl font-black mb-2 tracking-tight ${
              isHighlighted ? 'text-yellow-400' : 'text-cyan-400'
            }`}
          >
            {plan.megas}
            <span className="text-2xl font-bold align-top">MB</span>
          </div>
          <p className="text-slate-300 text-sm font-medium mb-5 min-h-[3rem] line-clamp-2">
            {plan.description}
          </p>
          <ul className="mb-5 space-y-2 text-left text-slate-200 text-sm">
            {plan.advantages.map((adv, i) => (
              <li key={i} className="flex items-center">
                <span className="w-5 h-5 mr-3 text-green-400 flex-shrink-0">{adv.icon}</span>
                {adv.text}
              </li>
            ))}
          </ul>
          <hr className="w-full border-t border-slate-700 mb-6" />
          <p className="text-4xl font-extrabold text-yellow-400 drop-shadow-md mb-4">
            <span className="text-xl align-top mr-1">R$</span>
            {plan.price}
          </p>
          <button
            onClick={() =>
              window.open(
                `https://wa.me/5583996411187?text=Olá!%20Quero%20assinar%20o%20plano%20de%20${plan.megas}MB`,
                '_blank'
              )
            }
            className={`w-full py-3 rounded-lg font-bold shadow-lg text-white text-base tracking-wide transition-transform duration-300 hover:scale-105 active:scale-95 focus:outline-none ${
              isHighlighted
                ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 ring-2 ring-yellow-300/60'
                : 'bg-gradient-to-r from-cyan-600 to-blue-700'
            }`}
            aria-label={`Assinar plano de ${plan.megas} megas`}
          >
            Assinar Agora
          </button>
        </div>
      </div>
    </div>
  );
});

export default PlanCard;
