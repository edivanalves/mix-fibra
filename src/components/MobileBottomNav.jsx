import React, { useState, useEffect } from 'react';
import { Home, Package, MessageSquare, Phone, Menu } from 'lucide-react';

const MobileBottomNav = ({ refs, activeSection }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsVisible(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      id: 'support-section',
      icon: <Phone className="w-5 h-5" />,
      label: 'Suporte',
      action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'support-section' }))
    },
    {
      id: 'more',
      icon: <Menu className="w-5 h-5" />,
      label: 'Mais',
      action: () => {
        const dropdown = document.getElementById('mobile-nav-dropdown');
        dropdown.classList.toggle('hidden');
      }
    }
  ];

  const moreItems = [
    { label: 'Diferenciais', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'why-choose-us-section' })) },
    { label: 'Depoimentos', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'testimonials-section' })) },
    { label: 'Teste Velocidade', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'speedtest-section' })) },
    { label: 'Central Cliente', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'central-assinante' })) },
    { label: 'Sobre Nós', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'about' })) },
    { label: 'Liderança', action: () => window.dispatchEvent(new CustomEvent('showContent', { detail: 'image-section' })) }
  ];

  if (!isVisible) return null;

  return (
    <>
      {/* Dropdown Menu */}
      <div id="mobile-nav-dropdown" className="hidden fixed bottom-20 left-4 right-4 z-50">
        <div className="bg-slate-800/95 backdrop-blur-md border border-white/20 rounded-2xl p-4 shadow-2xl">
          <div className="grid grid-cols-2 gap-3">
            {moreItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  document.getElementById('mobile-nav-dropdown').classList.add('hidden');
                  item.action();
                }}
                className="p-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 text-sm font-medium text-center"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={item.action}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                activeSection === item.id
                  ? 'text-orange-400 bg-orange-500/20 scale-110'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
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