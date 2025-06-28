import React, { useState, useEffect, memo } from 'react';
import { MessageSquareText, Phone, X, ChevronUp } from 'lucide-react';

const FloatingActionButton = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions = [
    {
      icon: <MessageSquareText size={20} />,
      label: 'WhatsApp',
      href: 'https://wa.me/5583996411187',
      color: 'bg-green-500 hover:bg-green-600',
      delay: '0ms'
    },
    {
      icon: <Phone size={20} />,
      label: 'Ligar',
      href: 'tel:+5583996411187',
      color: 'bg-blue-500 hover:bg-blue-600',
      delay: '100ms'
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="bg-slate-700/90 hover:bg-slate-600 text-white p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110"
          aria-label="Voltar ao topo"
        >
          <ChevronUp size={20} />
        </button>
      )}

      {/* Action buttons */}
      {isOpen && actions.map((action, index) => (
        <a
          key={index}
          href={action.href}
          target={action.href.startsWith('http') ? '_blank' : undefined}
          rel={action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className={`${action.color} text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 animate-[fadeInUp_0.3s_ease-out] flex items-center gap-2 pr-4`}
          style={{ animationDelay: action.delay }}
          aria-label={action.label}
        >
          {action.icon}
          <span className="text-sm font-medium">{action.label}</span>
        </a>
      ))}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-gradient-to-r from-orange-500 to-yellow-400 hover:from-orange-600 hover:to-yellow-500 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${isOpen ? 'rotate-45' : ''}`}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu de contato'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X size={24} /> : <MessageSquareText size={24} />}
      </button>
    </div>
  );
});

export default FloatingActionButton;