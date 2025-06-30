import React, { useState, useEffect } from 'react';
import { Shield, X, Check } from 'lucide-react';

const LGPDBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('mixfibra-lgpd-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('mixfibra-lgpd-consent', 'accepted');
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('mixfibra-lgpd-consent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-slate-900/95 backdrop-blur-md border-t border-white/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <Shield className="w-6 h-6 text-blue-400 flex-shrink-0" />
            <div className="text-sm text-white/90">
              <p className="mb-1">
                <strong>Privacidade e Cookies:</strong> Utilizamos cookies para melhorar sua experiência. 
                Ao continuar navegando, você concorda com nossa{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300 underline">
                  Política de Privacidade
                </a>.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleReject}
              className="px-4 py-2 text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg transition-all duration-200"
            >
              Rejeitar
            </button>
            <button
              onClick={handleAccept}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
            >
              <Check className="w-4 h-4" />
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LGPDBanner;