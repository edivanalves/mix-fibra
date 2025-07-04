import { useState, useEffect, useCallback, memo } from 'react';
import { Menu, X, Zap, Sparkles } from 'lucide-react';

const NavLink = memo(({ href, text, refLink, activeSection, scrollToSection, isMobile }) => {
  const isActive = activeSection === href;
  const handleClick = useCallback((e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('closeContent'));
    scrollToSection(refLink);
  }, [refLink, scrollToSection]);
  
  if (isMobile) {
    return (
      <a
        href={`#${href}`}
        onClick={handleClick}
        className={`
          block w-full text-center py-4 px-6 rounded-2xl font-bold text-xl
          backdrop-blur-md border transition-all duration-300 transform
          ${isActive 
            ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-orange-400/50 shadow-lg shadow-orange-500/25 scale-105' 
            : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105 hover:border-white/40'
          }
        `}
        aria-current={isActive ? 'page' : undefined}
        role="menuitem"
      >
        {text}
      </a>
    );
  }
  
  return (
    <a
      href={`#${href}`}
      onClick={handleClick}
      className={`
        relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300
        backdrop-blur-sm border transform hover:scale-105
        ${isActive 
          ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white border-orange-400/50 shadow-lg shadow-orange-500/25' 
          : 'bg-white/10 text-white/90 border-white/20 hover:bg-white/20 hover:text-white hover:border-white/40'
        }
      `}
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
    
    // Fechar dropdown mobile ao clicar fora
    const handleClickOutside = (e) => {
      const dropdown = document.getElementById('mobile-more-dropdown');
      const button = e.target.closest('button');
      if (dropdown && !dropdown.contains(e.target) && !button?.textContent?.includes('Mais')) {
        dropdown.classList.add('hidden');
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((ref) => {
    setMobileMenuOpen(false);
    // Fechar overlay se estiver aberto
    window.dispatchEvent(new CustomEvent('closeContent'));
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const navLinks = [
    { href: 'home', text: 'Início', ref: refs.homeRef },
    { href: 'plans-section', text: 'Planos', ref: refs.plansRef },
    { href: 'contact', text: 'Contato', ref: refs.contactRef },
    { href: 'solicitation-form', text: 'Solicite Agora', ref: refs.solicitationRef },
  ];

  const moreLinks = [
    { href: 'speedtest-section', text: 'Teste Velocidade', ref: refs.speedTestRef },
    { href: 'support-section', text: 'Suporte', ref: refs.supportRef },
    { href: 'central-assinante', text: 'Central do Cliente', ref: refs.centralRef },
    { href: 'about', text: 'Sobre Nós', ref: refs.aboutRef },
    { href: 'why-choose-us-section', text: 'Diferenciais', ref: refs.whyChooseUsRef },
    { href: 'testimonials-section', text: 'Depoimentos', ref: refs.testimonialsRef },
    { href: 'image-section', text: 'Liderança', ref: refs.imageSectionRef },
  ];

  return (
    <>
      <nav 
        className={`
          fixed top-0 w-full z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl shadow-blue-500/10 border-b border-white/10' 
            : 'bg-transparent backdrop-blur-sm'
          }
        `} 
        role="navigation" 
        aria-label="Menu principal"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <a
            href="#home"
            onClick={(e) => { 
              e.preventDefault(); 
              window.dispatchEvent(new CustomEvent('closeContent'));
              scrollToSection(refs.homeRef); 
            }}
            className="flex items-center gap-3 group transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <img
                src="/mix-fibra/imagens/logo-mix-fibra.png"
                alt="Mix Fibra"
                className="w-12 h-12 rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-orange-500/25"
                loading="lazy"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                MIX FIBRA
              </span>
              <span className="text-xs text-orange-400 font-medium -mt-1">
                Ultra Velocidade
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-3" role="menubar">
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
            
            {/* More Menu */}
            <div className="relative group">
              <button className="px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 backdrop-blur-sm border transform hover:scale-105 bg-gradient-to-r from-orange-500 to-orange-600 text-white border-orange-400 hover:from-orange-600 hover:to-orange-700 shadow-lg">
                🚀 Mais
              </button>
              
              <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800/95 backdrop-blur-md border-2 border-orange-400/50 rounded-2xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 shadow-2xl" onMouseLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) { e.currentTarget.classList.add('invisible', 'opacity-0'); } }}>
                <div className="text-orange-400 text-xs font-bold mb-3 text-center uppercase tracking-wide">
                  ✨ Conteúdo Completo
                </div>
                <div className="space-y-2">
                  {moreLinks.map(link => (
                    <button
                      key={link.href}
                      onClick={(e) => { 
                        e.preventDefault(); 
                        window.showContent = link.href;
                        window.dispatchEvent(new CustomEvent('showContent', { detail: link.href }));
                      }}
                      className="block w-full text-left px-4 py-3 text-white font-medium hover:text-orange-300 hover:bg-orange-500/20 rounded-xl transition-all duration-200 text-sm border border-transparent hover:border-orange-400/30"
                    >
                      {link.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://mixfibra.sgp.net.br/central/home/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold px-6 py-3 rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25 backdrop-blur-sm border border-emerald-400/30"
          >
            <Sparkles className="w-4 h-4" />
            Central do Assinante
          </a>

          <div className="md:hidden flex items-center gap-2">
            {/* Mobile More Button */}
            <div className="relative">
              <button 
                onClick={() => {
                  const dropdown = document.getElementById('mobile-more-dropdown');
                  dropdown.classList.toggle('hidden');
                }}
                className="px-3 py-2 rounded-lg font-bold text-xs bg-gradient-to-r from-orange-500 to-orange-600 text-white border border-orange-400 shadow-lg"
              >
                🚀 Mais
              </button>
              
              <div id="mobile-more-dropdown" className="hidden absolute top-full right-0 mt-2 w-56 bg-slate-800/95 backdrop-blur-md border-2 border-orange-400/50 rounded-2xl p-4 z-50 shadow-2xl">
                <div className="text-orange-400 text-xs font-bold mb-3 text-center uppercase tracking-wide">
                  ✨ Conteúdo Completo
                </div>
                <div className="space-y-2">
                  {moreLinks.map(link => (
                    <button
                      key={link.href}
                      onClick={(e) => { 
                        e.preventDefault();
                        document.getElementById('mobile-more-dropdown').classList.add('hidden');
                        window.showContent = link.href;
                        window.dispatchEvent(new CustomEvent('showContent', { detail: link.href }));
                      }}
                      className="block w-full text-left px-4 py-3 text-white font-medium hover:text-orange-300 hover:bg-orange-500/20 rounded-xl transition-all duration-200 text-sm border border-transparent hover:border-orange-400/30"
                    >
                      {link.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:scale-105"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div 
          id="mobile-menu" 
          className="md:hidden fixed inset-0 bg-slate-900/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center gap-6 p-8" 
          role="menu"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50" />
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          <div className="relative z-10 w-full max-w-sm space-y-4">
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
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25 backdrop-blur-sm border border-emerald-400/30"
            >
              <Sparkles className="w-5 h-5" />
              Central do Assinante
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
