import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Package, Shield, Phone, User, ExternalLink } from 'lucide-react';

const MobileMenu = ({ refs, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Início', icon: Home, ref: refs.homeRef },
    { id: 'plans-section', label: 'Planos', icon: Package, ref: refs.plansRef },
    { id: 'why-choose-us-section', label: 'Diferenciais', icon: Shield, ref: refs.whyChooseUsRef },
    { id: 'about', label: 'Sobre', icon: User, ref: refs.aboutRef },
    { id: 'support-section', label: 'Suporte', icon: Phone, ref: refs.supportRef },
    { id: 'contact', label: 'Contato', icon: Phone, ref: refs.contactRef }
  ];

  const scrollToSection = (ref) => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden relative z-50 p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        aria-label="Menu"
      >
        <div className="relative w-6 h-6">
          <Menu 
            className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} 
            size={24} 
          />
          <X 
            className={`absolute inset-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} 
            size={24} 
          />
        </div>
      </button>

      {/* Mobile Menu Overlay */}
      <div className={`
        fixed inset-0 z-40 md:hidden transition-all duration-500 ease-out
        ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={`
          absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-slate-900/95 backdrop-blur-xl border-l border-white/20
          transform transition-transform duration-500 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img 
                  src="/imagens/logo-mix-fibra.png" 
                  alt="Mix Fibra" 
                  className="w-8 h-8"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <span className="text-xl font-bold text-white">Mix Fibra</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-6">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={item.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <button
                    onClick={() => scrollToSection(item.ref)}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300
                      ${activeSection === item.id 
                        ? 'bg-gradient-to-r from-blue-500/20 to-orange-500/20 text-white border border-white/20' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    <div className={`
                      p-2 rounded-xl transition-all duration-300
                      ${activeSection === item.id 
                        ? 'bg-gradient-to-r from-blue-500 to-orange-500' 
                        : 'bg-white/10'
                      }
                    `}>
                      <item.icon size={20} />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Section */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
            <div className="space-y-3">
              <a
                href="https://wa.me/5583996411187"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                <Phone size={20} />
                WhatsApp
              </a>
              
              <a
                href="https://mixfibra.sgp.net.br/accounts/central/login?next=/central/home/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300"
              >
                <ExternalLink size={20} />
                Área do Cliente
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;