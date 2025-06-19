import React from 'react';
import { Mail, Phone, MessageSquareText } from 'lucide-react'; // Importar ícones da lucide-react

const Contact = React.forwardRef(({ loading }, ref) => {
  return (
    <section
      id="contact"
      ref={ref}
      className={`w-full py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-950 to-indigo-900 text-center shadow-2xl mt-12 rounded-3xl max-w-6xl mx-auto mb-12 transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
    >
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg">
        Fale <span className="text-orange-400">Connosco</span>
      </h2>
      <p className="text-blue-200 mb-8 text-lg md:text-xl font-medium max-w-2xl mx-auto">
        Tem dúvidas, quer assinar um plano ou precisa de suporte? A nossa equipa está pronta para o atender!
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center gap-10 mt-10">
        {/* Botão do WhatsApp com ícone e estilo aprimorado */}
        <a
          href="https://wa.me/5583996411187"
          target="_blank"
          rel="noopener noreferrer"
          className="
            bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700
            text-white font-extrabold py-4 px-10 rounded-full
            text-xl md:text-2xl shadow-lg
            flex items-center justify-center gap-3
            transition-all duration-300 hover:scale-105 active:scale-95
          "
          title="Fale connosco pelo WhatsApp" // Adicionado para acessibilidade
        >
          <MessageSquareText size={28} strokeWidth={2.5} /> {/* Ícone de WhatsApp/Mensagem */}
          WhatsApp
        </a>

        {/* Link de Email com ícone e estilo aprimorado para contraste */}
        <a
          href="mailto:mixfibra@provedor.com"
          className="
            inline-flex items-center justify-center gap-3
            bg-gradient-to-r from-orange-400 to-cyan-400 hover:from-orange-500 hover:to-cyan-500
            px-8 py-4 rounded-full shadow-lg
            text-blue-900 font-extrabold text-xl md:text-2xl /* Ajuste de tamanho para consistência */
            transition-all duration-300 hover:scale-105 active:scale-95
          "
          title="Envie-nos um email" // Adicionado para acessibilidade
        >
          <Mail size={28} strokeWidth={2.5} /> {/* Ícone de E-mail */}
          mixfibra@provedor.com
        </a>
      </div>
    </section>
  );
});

export default Contact;
