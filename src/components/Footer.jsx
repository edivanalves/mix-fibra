import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 rounded-t-2xl shadow-2xl p-8 mt-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3 justify-center">
          <img src="/imagens/logo-mix-fibra.png" alt="Logo Mix Fibra" className="w-12 h-12 rounded-lg shadow-md" />
          <span className="text-2xl font-black tracking-tight text-white">
            MIX <span className="text-orange-400">FIBRA</span>
          </span>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 text-center">
          <a href="https://wa.me/5583996411187" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 font-bold transition">WhatsApp</a>
          <a href="https://instagram.com/mixfibra_sume" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 font-bold transition">Instagram</a>
          <a href="#" className="text-blue-200 hover:text-orange-400 transition-colors duration-300">Termos de Uso</a>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-blue-300">© 2025 Mix Fibra. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;