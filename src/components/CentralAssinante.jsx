// Caminho: src/components/CentralAssinante.jsx

import React from 'react';

const CentralAssinante = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="central-assinante"
      ref={ref}
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Central do <span className="text-cyan-300">Assinante</span>
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Acesse sua fatura, 2ª via de boleto, histórico de pagamentos e muito mais.
      </p>
      <a
        href="https://mixfibra.sgp.net.br/accounts/central/login?next=/central/home/"
        target="_blank" // Continua abrindo em nova aba
        rel="noopener noreferrer"
        className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 text-white font-extrabold py-4 px-10 rounded-full text-xl shadow-lg transition-all duration-300 hover:scale-105"
      >
        Login Central do Assinante (SGP)
      </a>
    </section>
  );
});

export default CentralAssinante;