// Caminho: src/components/Navbar.jsx

import React, { useState, useEffect } from 'react';

const NavLink = ({ href, text, refLink, activeSection, scrollToSection, isMobile = false }) => {
  const isActive = activeSection === href;

  const desktopClasses = `
    relative text-sm font-medium rounded-full transition-colors duration-200 px-4 py-2
    group whitespace-nowrap
    ${isActive
      ? 'bg-orange-500 text-white'
      : 'text-slate-200 hover:bg-slate-700/50'
    }
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-0.5 after:bg-orange-400 after:transition-all after:duration-300 after:-translate-x-1/2
    ${isActive ? 'after:w-full' : 'group-hover:after:w-full'}
  `;

  const mobileClasses = `
    text-2xl font-bold text-slate-200 transition-colors duration-300 hover:text-orange-400 text-center
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
      aria-current={isActive ? 'page' : undefined}
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
      <nav className={`w-full bg-slate-900/60 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg shadow-black/30' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3 sm:py-4 flex-wrap gap-y-2">
          <a
            href="#home"
            onClick={() => scrollToSection(refs.homeRef)}
            className="flex items-center gap-2 min-w-[150px]"
          >
            <img
              src={`${import.meta.env.BASE_URL}imagens/logo-mix-fibra.png`}
              alt="Logo Mix Fibra"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg object-cover"
            />
            <span className="text-lg sm:text-xl font-black tracking-tighter text-white">
              MIX <span className="text-orange-400">FIBRA</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-2 flex-wrap justify-center">
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

          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://mixfibra.sgp.net.br/central/home/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold px-4 py-2 rounded-full shadow-lg text-sm transition-all duration-300 transform hover:scale-105"
            >
              Central do Assinante
            </a>
          </div>

          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 z-50 cursor-pointer ml-auto"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`w-6 h-0.5 bg-white rounded transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`w-6 h-0.5 bg-white rounded my-1 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white rounded transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 w-full h-full bg-slate-900/90 backdrop-blur-xl z-40 transition-opacity duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 px-6 text-center">
          {navLinksData.map((link, index) => (
            <div
              key={link.href}
              className={`transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              style={{ transitionDelay: `${150 + index * 50}ms` }}
            >
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
          <a
            href="https://mixfibra.sgp.net.br/central/home/"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-8 bg-orange-500 text-white font-bold px-8 py-3 rounded-full shadow-lg text-lg transition-all duration-300 hover:scale-105 active:scale-95 ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
            style={{ transitionDelay: `${150 + navLinksData.length * 50}ms` }}
          >
            Central do Assinante
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
