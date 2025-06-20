// Caminho: src/components/SpeedTest.jsx

import React from 'react';
import { Gauge, ExternalLink } from 'lucide-react'; // Importar ícones como Gauge ou ExternalLink

// IMPORTANTE: Adicionado React.forwardRef para que o componente possa receber a ref do pai
const SpeedTest = React.forwardRef(({ loading }, ref) => { // Recebendo 'loading' e 'ref'
  return (
    <section
      id="speedtest-section" // Adicione um ID para a seção para que a Navbar possa direcionar
      ref={ref} // Anexando a ref à seção
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 drop-shadow-lg">
        Teste a Sua <span className="text-orange-400">Velocidade</span>
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Clique abaixo para medir a velocidade da sua internet agora mesmo através de um serviço externo confiável.
      </p>
      <div className="flex flex-col items-center gap-6">
        <a
          href="https://www.speedtest.net/pt/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-extrabold py-4 px-10 rounded-full text-xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95" // Adicionado active:scale-95
          title="Abrir Speedtest.net para testar sua velocidade de internet" // Adicionado para acessibilidade
        >
          <Gauge size={28} strokeWidth={2.5} /> {/* Ícone que representa velocidade */}
          Medir Velocidade da Internet
        </a>
      </div>
    </section>
  );
});

export default SpeedTest;
