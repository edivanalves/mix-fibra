import React from 'react';
// Lembre-se que o componente QuickSupport precisa ser criado para o suporte com IA funcionar
// import QuickSupport from './QuickSupport'; 

const Support = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="support-section"
      ref={ref}
      className={`w-full py-16 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg flex items-center justify-center gap-3">
        Suporte Rápido <span className="text-orange-400">Mix Fibra</span>
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Precisa de ajuda? A forma mais rápida é falar com um de nossos especialistas pelo WhatsApp.
      </p>
      <div className="flex justify-center mt-8">
        <a href="https://wa.me/5583996411187" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 text-white font-extrabold py-3 px-8 rounded-full text-xl shadow-lg transition-all duration-300 hover:scale-105">
          Falar com Suporte no WhatsApp
        </a>
      </div>
    </section>
  );
});

export default Support;