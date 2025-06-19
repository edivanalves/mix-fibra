import React from 'react';
import { LogOut, ExternalLink } from 'lucide-react'; // Importar ícones da lucide-react

const CentralAssinante = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="central-assinante"
      ref={ref}
      // Manter o estilo base consistente com outros componentes
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Central do <span className="text-cyan-300">Assinante</span>
        {/*
          NOTA: Se quiser que a cor 'cyan-300' mude com o tema (claro/escuro),
          pode definir uma variável CSS no seu index.css (ex: --color-secondary-highlight)
          e usá-la aqui: className="text-[var(--color-secondary-highlight)]"
        */}
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Aceda à sua fatura, 2ª via de boleto, histórico de pagamentos e muito mais.
      </p>
      <a
        href="https://mixfibra.sgp.net.br/accounts/central/login?next=/central/home/"
        target="_blank" // Continua a abrir em nova aba
        rel="noopener noreferrer"
        // Estilo do botão: gradiente, texto branco, padding, arredondado, sombra e efeito hover
        className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-extrabold py-4 px-10 rounded-full text-xl shadow-lg transition-all duration-300 hover:scale-105"
        title="Aceder à Central do Assinante" // Adicionado para acessibilidade
      >
        {/* Ícone para indicar login ou link externo */}
        <ExternalLink size={24} strokeWidth={2.5} /> {/* Usando ícone ExternalLink da Lucide */}
        Login Central do Assinante (SGP)
      </a>
    </section>
  );
});

export default CentralAssinante;
