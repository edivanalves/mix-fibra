import React, { useState, useEffect } from 'react';
import { Clock, Zap, Gift } from 'lucide-react';

const UrgencyTimer = ({ 
  title = "Oferta Especial!", 
  subtitle = "Aproveite antes que acabe",
  hours = 24,
  showOnlyOnce = true 
}) => {
  const [timeLeft, setTimeLeft] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user already saw this offer
    if (showOnlyOnce) {
      const hasSeenOffer = localStorage.getItem('mixfibra-urgency-seen');
      if (hasSeenOffer) return;
    }

    // Set end time (24 hours from now)
    const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
    localStorage.setItem('mixfibra-offer-end', endTime);
    
    setIsVisible(true);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setIsVisible(false);
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [hours, showOnlyOnce]);

  const handleClose = () => {
    setIsVisible(false);
    if (showOnlyOnce) {
      localStorage.setItem('mixfibra-urgency-seen', 'true');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 right-4 z-50 max-w-sm">
      <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-1 shadow-2xl animate-pulse">
        <div className="bg-slate-900 rounded-xl p-4 relative">
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-white/60 hover:text-white text-xl"
          >
            ×
          </button>
          
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-orange-500 rounded-lg">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">{title}</h3>
              <p className="text-white/80 text-xs">{subtitle}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-white text-sm font-medium">Termina em:</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-xl font-bold text-white">{timeLeft.hours || 0}</div>
              <div className="text-xs text-white/70">Horas</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-xl font-bold text-white">{timeLeft.minutes || 0}</div>
              <div className="text-xs text-white/70">Min</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2">
              <div className="text-xl font-bold text-white">{timeLeft.seconds || 0}</div>
              <div className="text-xs text-white/70">Seg</div>
            </div>
          </div>

          <div className="mt-4">
            <a
              href="https://wa.me/5583996411187"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Zap className="w-4 h-4" />
              Aproveitar Agora!
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UrgencyTimer;