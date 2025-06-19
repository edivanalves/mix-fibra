import React from 'react';

const Contact = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="contact"
      ref={ref}
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Fale <span className="text-orange-400">Conosco</span>
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Tem dúvidas, quer assinar um plano ou precisa de suporte? Nossa equipe está pronta para te atender!
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
        // Código MODIFICADO:
<a href="https://wa.me/5583996411187" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 text-white font-extrabold py-4 px-10 rounded-full text-2xl md:text-3xl shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"> {/* <-- ADICIONADO AQUI */}
    WhatsApp
</a>
        <a href="mailto:mixfibra@provedor.com" className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-cyan-400 px-6 py-3 rounded-full shadow-lg text-blue-900 font-extrabold text-lg hover:scale-105 transition-transform duration-200 active:scale-95"> {/* <-- ADICIONADO AQUI */}
    mixfibra@provedor.com
</a>
      </div>
    </section>
  );
});

export default Contact;