import React from 'react';
import { MessageSquare, Instagram, FileText, User, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-t-xl shadow-xl p-4 mt-12 text-white text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo discreta */}
        <div className="flex items-center gap-2 justify-center opacity-70">
          <img
            src="imagens/logo-mix-fibra.png"
            alt="Logo Mix Fibra"
            className="w-6 h-6"
          />
          <span className="text-base font-bold tracking-tight text-white">
            MIX <span className="text-orange-400">FIBRA</span>
          </span>
        </div>

        {/* Links Sociais */}
        <div className="flex flex-col md:flex-row items-center gap-3 text-center">
          <a
            href="https://wa.me/5583996411187"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-all duration-300 flex items-center gap-1"
            title="Contacte-nos via WhatsApp"
          >
            <MessageSquare size={18} />
            WhatsApp
          </a>
          <a
            href="https://instagram.com/mixfibra_sume"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:text-pink-300 transition-all duration-300 flex items-center gap-1"
            title="Siga-nos no Instagram"
          >
            <Instagram size={18} />
            Instagram
          </a>
          <a
            href="#"
            className="text-blue-200 hover:text-orange-400 transition-colors duration-300 flex items-center gap-1"
            title="Termos de Uso"
          >
            <FileText size={18} />
            Termos de Uso
          </a>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="mt-4 pt-3 border-t border-blue-700/50 flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex items-center gap-2 text-blue-300">
          <User size={16} />
          <span>Criado por Edivan Alves</span>
          <a
            href="https://www.linkedin.com/in/edivan-alves/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200 font-medium transition-colors duration-300"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </div>
        <p className="text-blue-400 text-xs text-center md:text-right">
          © {currentYear} Mix Fibra. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
