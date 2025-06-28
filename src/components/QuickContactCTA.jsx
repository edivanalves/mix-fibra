import React from 'react';

const QuickContactCTA = () => {
  return (
    <section className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-to-r from-green-600 to-green-500 rounded-2xl shadow-lg text-white text-center">
      <h3 className="text-3xl font-extrabold mb-4">Quer tirar suas dúvidas ou contratar agora?</h3>
      <p className="mb-6 text-lg max-w-xl mx-auto">
        Nosso time está pronto para ajudar você a escolher o plano ideal e ativar sua internet rapidamente.
      </p>
      <a
        href="https://wa.me/5583996411187"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-white text-green-700 font-bold py-4 px-10 rounded-full shadow-lg hover:bg-green-50 transition-colors duration-300"
        aria-label="Entrar em contato via WhatsApp"
      >
        Fale Conosco no WhatsApp
      </a>
    </section>
  );
};

export default QuickContactCTA;
