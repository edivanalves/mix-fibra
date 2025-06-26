import React, { useState, useEffect } from 'react';

const NavLink = ({ href, text, refLink, activeSection, scrollToSection, isMobile = false }) => {
  const isActive = activeSection === href;

  const desktopClasses = `
    relative text-sm font-semibold rounded-full transition-colors duration-300 px-5 py-2
    group whitespace-nowrap select-none
    ${isActive
      ? 'bg-orange-500 text-white shadow-lg'
      : 'text-slate-300 hover:bg-slate-700/60 hover:text-orange-400'}
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-orange-400 after:rounded after:transition-all after:duration-300 after:-translate-x-1/2
    ${isActive ? 'after:w-full' : 'group-hover:after:w-full'}
    focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900
  `;

  const mobileClasses = `
    text-2xl font-bold text-slate-200 transition-colors duration-300 hover:text-orange-400 text-center select-none
    ${isActive ? '!text-orange-400 font-extrabold' : ''}
    focus:outline-none focus:ring-4 focus:ring-orange-400 focus:ring-offset-4 focus:ring-offset-slate-900 rounded-lg px-4 py-2
  `;

  return (
    <a
      href={`#${href}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(refLink);
      }}
      className={isMobile ? mobileClasses : desktopClasses}
      aria-current={isActive ? 'page' : undefined}
      role="link"
      tabIndex={0}
    >
      {text}
    </a>
  );
};

const Navbar = ({ refs, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';
  }, [mobileMenuOpen]);

  const scrollToSection = (ref) => {
    setMobileMenuOpen(false);
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinksData = [
    { href: 'home', text: 'Início', ref: refs.homeRef },
    { href: 'plans-section', text: 'Planos', ref: refs.plansRef },
    { href: 'about', text: 'Sobre', ref: refs.aboutRef },
    { href: 'contact', text: 'Contato', ref: refs.contactRef },
    { href: 'solicitation-form', text: 'Solicite Agora', ref: refs.solicitationRef },
    { href: 'speedtest-section', text: 'Teste de Velocidade', ref: refs.speedTestRef },
  ];

  return (
    <>
      <nav
        className={`w-full bg-slate-900/70 backdrop-blur-md fixed top-0 left-0 right-0 z-50 transition-shadow duration-500
          ${isScrolled ? 'shadow-2xl shadow-orange-600/70' : 'shadow-none'}`}
        role="navigation"
        aria-label="Menu principal"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4 flex-wrap gap-y-2">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => scrollToSection(refs.homeRef)}
            className="flex items-center gap-3 min-w-[160px]"
            aria-label="Ir para Início"
          >
            <img
              src={`${import.meta.env.BASE_URL}imagens/logo-mix-fibra.png`}
              alt="Logo Mix Fibra"
              className="w-14 h-14 rounded-lg object-contain"
              loading="lazy"
              draggable="false"
            />
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-white select-none">
              MIX <span className="text-orange-400">FIBRA</span>
            </span>
          </a>

          {/* Menu desktop */}
          <div
            className="hidden md:flex items-center gap-4 flex-wrap justify-center"
            role="menubar"
            aria-label="Navegação principal"
          >
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

          {/* Botão Central do Assinante - desktop */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href="https://mixfibra.sgp.net.br/central/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold px-5 py-3 rounded-full shadow-lg text-base transition-all duration-300 transform hover:scale-110"
            >
              Central do Assinante
            </a>
          </div>

          {/* Botão toggle menu mobile */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 cursor-pointer ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <span className={`block w-7 h-0.5 bg-white rounded transition-transform duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-7 h-0.5 bg-white rounded my-1 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-7 h-0.5 bg-white rounded transition-transform duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 w-full h-full bg-slate-900/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-10
          transition-transform duration-500 ease-in-out
          ${mobileMenuOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        aria-hidden={!mobileMenuOpen}
      >
        {navLinksData.map((link, index) => (
          <NavLink
            key={link.href}
            href={link.href}
            text={link.text}
            refLink={link.ref}
            activeSection={activeSection}
            scrollToSection={scrollToSection}
            isMobile={true}
          />
        ))}

        <a
          href="https://mixfibra.sgp.net.br/central/home/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 bg-orange-500 text-white font-bold px-10 py-3 rounded-full shadow-lg text-xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          Central do Assinante
        </a>
      </div>
    </>
  );
};

export default Navbar;
