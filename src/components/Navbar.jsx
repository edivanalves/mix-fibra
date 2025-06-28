import { useState, useEffect, useCallback, memo } from 'react';

const NavLink = memo(({ href, text, refLink, activeSection, scrollToSection, isMobile }) => {
  const isActive = activeSection === href;
  const handleClick = useCallback((e) => {
    e.preventDefault();
    scrollToSection(refLink);
  }, [refLink, scrollToSection]);
  
  return (
    <a
      href={`#${href}`}
      onClick={handleClick}
      className={isMobile 
        ? `text-2xl font-bold transition-colors duration-300 text-center ${isActive ? 'text-orange-400' : 'text-slate-200 hover:text-orange-400'}`
        : `relative text-sm font-semibold rounded-full transition-all duration-300 px-5 py-2 whitespace-nowrap ${isActive ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-700/60 hover:text-orange-400'}`
      }
      aria-current={isActive ? 'page' : undefined}
      role="menuitem"
    >
      {text}
    </a>
  );
});

const Navbar = ({ refs, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((ref) => {
    setMobileMenuOpen(false);
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navLinks = [
    { href: 'home', text: 'Início', ref: refs.homeRef },
    { href: 'plans-section', text: 'Planos', ref: refs.plansRef },
    { href: 'about', text: 'Sobre', ref: refs.aboutRef },
    { href: 'contact', text: 'Contato', ref: refs.contactRef },
    { href: 'solicitation-form', text: 'Solicite Agora', ref: refs.solicitationRef },
    { href: 'speedtest-section', text: 'Teste de Velocidade', ref: refs.speedTestRef },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full bg-slate-900/70 backdrop-blur-md z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-xl' : ''}`} role="navigation" aria-label="Menu principal">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollToSection(refs.homeRef); }}
            className="flex items-center gap-3"
          >
            <img
              src={`${import.meta.env.BASE_URL}imagens/logo-mix-fibra.png`}
              alt="Mix Fibra"
              className="w-12 h-12 rounded-lg"
              loading="lazy"
            />
            <span className="text-xl font-bold text-white">
              MIX <span className="text-orange-400">FIBRA</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-4" role="menubar">
            {navLinks.map(link => (
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

          <a
            href="https://mixfibra.sgp.net.br/central/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white font-bold px-5 py-2 rounded-full transition-all duration-300 hover:scale-105"
          >
            Central do Assinante
          </a>

          <button
            className="md:hidden flex flex-col justify-center w-8 h-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white rounded my-1 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white rounded transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center gap-8" role="menu">
          {navLinks.map(link => (
            <NavLink
              key={link.href}
              href={link.href}
              text={link.text}
              refLink={link.ref}
              activeSection={activeSection}
              scrollToSection={scrollToSection}
              isMobile
            />
          ))}
          <a
            href="https://mixfibra.sgp.net.br/central/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-500 text-white font-bold px-8 py-3 rounded-full text-lg transition-transform duration-300 hover:scale-105"
          >
            Central do Assinante
          </a>
        </div>
      )}
    </>
  );
};

export default Navbar;
