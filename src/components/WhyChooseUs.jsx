// Caminho do arquivo: src/components/WhyChooseUs.jsx

import React from 'react';

const WhyChooseUs = ({ loading }) => {
  const reasons = [
    {
      title: 'Tecnologia de Ponta',
      description: 'Conexão 100% fibra óptica para máxima estabilidade e velocidade.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M12 20v-6m0 0c-2.5 0-4.5-2-4.5-4.5S9.5 5 12 5s4.5 2 4.5 4.5S14.5 14 12 14z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      glowColor: 'bg-cyan-400',
      borderColor: 'border-cyan-300',
      gradient: 'from-cyan-400 via-blue-400 to-blue-700'
    },
    {
      title: 'Suporte Dedicado',
      description: 'Equipe pronta para te ajudar sempre que precisar, com agilidade.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M18 10c0-3.314-2.686-6-6-6S6 6.686 6 10c0 2.386 1.676 4.434 4 4.899V18h4v-3.101c2.324-.465 4-2.513 4-4.899z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      glowColor: 'bg-orange-400',
      borderColor: 'border-orange-300',
      gradient: 'from-orange-400 via-yellow-300 to-orange-600'
    },
    {
      title: 'Entretenimento Completo',
      description: 'Planos com TV digital para você e sua família desfrutarem de centenas de canais.',
      icon: (
        <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 12H9v-2h2v2zm0-4H9V6h2v4z"/>
        </svg>
      ),
      glowColor: 'bg-yellow-300',
      borderColor: 'border-yellow-200',
      gradient: 'from-yellow-300 via-orange-400 to-orange-600'
    }
  ];

  return (
    <section className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-14 drop-shadow-lg">
        Por Que Escolher a <span className="text-orange-400">Mix Fibra?</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reasons.map((reason, index) => (
          <div key={index} className="relative bg-gradient-to-br from-blue-800/80 to-blue-900/80 glass rounded-2xl p-8 shadow-2xl flex flex-col items-center group
                hover:scale-105 hover:-translate-y-1 hover:shadow-orange-500/50 transition-all duration-300 overflow-hidden"> {/* Adicionado hover:-translate-y-1 e shadow mais forte */}
            <div className={`absolute -top-8 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full blur-2xl opacity-30 ${reason.glowColor} pointer-events-none`}></div>
            <div className={`mb-5 flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr ${reason.gradient} shadow-lg border-4 ${reason.borderColor} animate-float-subtle`}> {/* animate-pulse substituído por animate-float-subtle */}
              {reason.icon}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow">{reason.title}</h3>
            <p className="text-blue-200 text-center text-lg" dangerouslySetInnerHTML={{ __html: reason.description }}></p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;