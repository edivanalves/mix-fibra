// Caminho: src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';

// Sub-componente para os links, para evitar repetição
const NavLink = ({ href, text, refLink, activeSection, scrollToSection, isMobile = false }) => {
  const isActive = activeSection === href;

  const desktopClasses = `
    relative text-sm font-medium rounded-full transition-colors duration-200 px-4 py-2
    group // Adicione esta classe para usar o hover no after
    ${isActive 
        ? 'bg-orange-500 text-white' // Estilo para o link ativo
        : 'text-slate-200 hover:bg-slate-700/50'
    }
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-300 after:-translate-x-1/2 
    ${isActive ? 'after:w-full' : 'group-hover:after:w-full'} // Condição para o sublinhado no ativo e no hover
  `;

  const mobileClasses = `
    text-3xl font-bold text-slate-200 transition-colors duration-300 hover:text-orange-400
    ${isActive ? '!text-orange-400' : ''}
  `;

  return (
    <a
      href={`#${href}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(refLink);
      }}
      className={isMobile ? mobileClasses : desktopClasses}
    >
      {text}
    </a>
  );
};

// Componente principal da Navbar
const Navbar = ({ refs, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Efeito para a sombra ao rolar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito para travar o scroll do body quando o menu mobile estiver aberto
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  const scrollToSection = (ref) => {
    setMobileMenuOpen(false);
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinksData = [
    { href: 'home', text: 'Início', ref: refs.homeRef },
    { href: 'plans-section', text: 'Planos', ref: refs.plansRef },
    { href: 'video-section', text: 'Vídeos', ref: refs.videoRef },
    { href: 'about', text: 'Sobre', ref: refs.aboutRef },
    { href: 'contact', text: 'Contato', ref: refs.contactRef },
    { href: 'solicitation-form', text: 'Solicite Agora', ref: refs.solicitationRef },
    { href: 'speedtest-section', text: 'Teste de Velocidade', ref: refs.speedTestRef }, // <-- NOVO: LINK PARA TESTE DE VELOCIDADE
  ];

  return (
    <>
      {/* --- BARRA DE NAVEGAÇÃO DESKTOP --- */}
      <nav className={`w-full bg-slate-900/60 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-black/30' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          {/* Logo */}
          <a href="#home" onClick={() => scrollToSection(refs.homeRef)} className="flex items-center space-x-3">
            <img src="/imagens/logo-mix-fibra.png" alt="Logo Mix Fibra" className="w-10 h-10 rounded-lg" />
            <span className="text-xl font-black tracking-tighter text-white">
              MIX <span className="text-orange-400">FIBRA</span>
            </span>
          </a>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {navLinksData.map(link => (
              <NavLink
                key={link.href}
                href={link.href}
                text={link.text}
                refLink={link.ref}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
              />
            ))}
          </div>
          
          {/* Botões de Ação Desktop */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://mixfibra.sgp.net.br/central/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold px-5 py-2 rounded-full shadow-lg transition-all duration-300 text-sm transform hover:scale-105"
            >
              Central do Assinante
            </a>
          </div>

          {/* Botão Hamburguer Mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            <span className={`hamburger-line transform ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`hamburger-line my-1 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`hamburger-line transform ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </nav>

      {/* --- MENU MOBILE DE TELA CHEIA --- */}
      <div
        className={`
          md:hidden fixed inset-0 w-full h-full bg-slate-900/90 backdrop-blur-xl z-40
          transition-opacity duration-500 ease-in-out
          ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinksData.map((link, index) => (
             <div key={link.href} className={`transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`} style={{transitionDelay: `${150 + index * 50}ms`}}>
                <NavLink
                    href={link.href}
                    text={link.text}
                    refLink={link.ref}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                    isMobile={true}
                />
             </div>
          ))}
           {/* O botão da Central do Assinante também pode ser adicionado aqui no menu mobile, se desejar */}
           <a
              href="https://mixfibra.sgp.net.br/central/home/"
              target="_blank"
              rel="noopener noreferrer"
              className={`
                mt-8 bg-orange-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg
                transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
              `}
              style={{transitionDelay: `${150 + navLinksData.length * 50}ms`}}
            >
              Central do Assinante
            </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;