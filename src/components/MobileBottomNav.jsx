import React, { useState, useEffect } from 'react';
import { Home, Package, MessageSquare, Phone, Menu } from 'lucide-react';

const MobileBottomNav = ({ refs, activeSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest('#mobile-nav-dropdown') && !event.target.closest('[data-dropdown-trigger]')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDropdownOpen]);

  const scrollToSection = (ref) => {
    window.dispatchEvent(new CustomEvent('closeContent'));
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navItems = [
    {
      id: 'home',
      icon: <Home className="w-5 h-5" />,
      label: 'Início',
      action: () => scrollToSection(refs.homeRef)
    },
    {
      id: 'plans-section',
      icon: <Package className="w-5 h-5" />,
      label: 'Planos',
      action: () => scrollToSection(refs.plansRef)
    },
    {
      id: 'contact',
      icon: <MessageSquare className="w-5 h-5" />,
      label: 'Contato',
      action: () => scrollToSection(refs.contactRef)
    },
    {
      id: 'central-assinante',
      icon: <Phone className="w-5 h-5" />,
      label: 'Central',
      action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'central-assinante' }))
    },
    {
      id: 'more',
      icon: <Menu className="w-5 h-5" />,
      label: 'Mais',
      action: () => setIsDropdownOpen(!isDropdownOpen)
    }
  ];

  const moreItems = [
    { label: 'Diferenciais', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'why-choose-us-section' })) },
    { label: 'Depoimentos', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'testimonials-section' })) },
    { label: 'Teste Velocidade', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'speedtest-section' })) },
    { label: 'Suporte', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'support-section' })) },
    { label: 'Sobre Nós', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'about' })) },
    { label: 'Liderança', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'image-section' })) }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div 
          id="mobile-nav-dropdown" 
          className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-2 duration-200"
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/30 rounded-2xl p-4 shadow-2xl">
            <div className="grid grid-cols-2 gap-3">
              {moreItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    item.action();
                  }}
                  className="p-3 text-white hover:text-orange-400 hover:bg-white/20 rounded-xl transition-all duration-200 text-sm font-semibold text-center border border-white/10 hover:border-orange-400/50 hover:scale-105"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              data-dropdown-trigger={item.id === 'more' ? 'true' : undefined}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-orange-400 bg-orange-500/20 scale-110'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              } ${item.id === 'more' && isDropdownOpen ? 'text-orange-400 bg-orange-500/20' : ''}`}
            >
              {item.icon}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default MobileBottomNav;