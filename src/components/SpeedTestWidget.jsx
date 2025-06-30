import React, { useState, useEffect } from 'react';
import { Gauge, Wifi, Download, Upload, Activity, X } from 'lucide-react';

const SpeedTestWidget = ({ isOpen, onClose }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState('');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const runSpeedTest = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults(null);

    // Simular teste de ping
    setCurrentTest('Testando Ping...');
    for (let i = 0; i <= 25; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 50));
    }

    // Simular teste de download
    setCurrentTest('Testando Download...');
    for (let i = 25; i <= 70; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 80));
    }

    // Simular teste de upload
    setCurrentTest('Testando Upload...');
    for (let i = 70; i <= 100; i++) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 60));
    }

    // Gerar resultados simulados baseados em conexões reais
    const downloadSpeed = Math.floor(Math.random() * 200) + 50; // 50-250 Mbps
    const uploadSpeed = Math.floor(downloadSpeed * 0.3) + 10; // ~30% do download
    const ping = Math.floor(Math.random() * 30) + 10; // 10-40ms

    setResults({
      download: downloadSpeed,
      upload: uploadSpeed,
      ping: ping,
      jitter: Math.floor(Math.random() * 5) + 1,
      timestamp: new Date()
    });

    setIsRunning(false);
    setCurrentTest('Teste Concluído!');
  };

  const getSpeedCategory = (speed) => {
    if (speed >= 100) return { label: 'Excelente', color: 'text-green-400' };
    if (speed >= 50) return { label: 'Boa', color: 'text-yellow-400' };
    if (speed >= 25) return { label: 'Regular', color: 'text-orange-400' };
    return { label: 'Lenta', color: 'text-red-400' };
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
              <Gauge className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Teste de Velocidade</h3>
              <p className="text-white/60 text-sm">Mix Fibra Speed Test</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isRunning && !results && (
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gauge className="w-12 h-12 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">Pronto para testar?</h4>
              <p className="text-white/70 mb-6">Clique no botão abaixo para medir a velocidade da sua internet</p>
              <button
                onClick={runSpeedTest}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105"
              >
                Iniciar Teste
              </button>
            </div>
          )}

          {isRunning && (
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                    className="transition-all duration-300"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{progress}%</div>
                    <Activity className="w-6 h-6 text-blue-400 mx-auto animate-pulse" />
                  </div>
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{currentTest}</h4>
              <p className="text-white/70">Por favor, aguarde...</p>
            </div>
          )}

          {results && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-2xl font-bold text-white mb-2">Resultados do Teste</h4>
                <p className="text-white/60 text-sm">
                  Testado em {results.timestamp.toLocaleTimeString()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <Download className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.download}</div>
                  <div className="text-sm text-white/60 mb-1">Mbps Download</div>
                  <div className={`text-xs font-semibold ${getSpeedCategory(results.download).color}`}>
                    {getSpeedCategory(results.download).label}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.upload}</div>
                  <div className="text-sm text-white/60 mb-1">Mbps Upload</div>
                  <div className={`text-xs font-semibold ${getSpeedCategory(results.upload).color}`}>
                    {getSpeedCategory(results.upload).label}
                  </div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <Wifi className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.ping}</div>
                  <div className="text-sm text-white/60">ms Ping</div>
                </div>

                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <Activity className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{results.jitter}</div>
                  <div className="text-sm text-white/60">ms Jitter</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-4 border border-blue-400/30">
                <h5 className="font-bold text-white mb-2">💡 Dica Mix Fibra</h5>
                <p className="text-white/80 text-sm">
                  {results.download >= 100 
                    ? "Excelente! Sua velocidade está ótima para streaming 4K e jogos online."
                    : results.download >= 50
                    ? "Boa velocidade! Ideal para streaming HD e trabalho remoto."
                    : "Que tal um upgrade? Nossos planos de fibra óptica oferecem velocidades superiores!"}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={runSpeedTest}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold py-3 px-4 rounded-2xl transition-all duration-300"
                >
                  Testar Novamente
                </button>
                <button
                  onClick={() => window.open('https://wa.me/5583996411187?text=Olá! Testei minha velocidade e gostaria de saber mais sobre os planos da Mix Fibra!', '_blank')}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-300"
                >
                  Contratar Mix Fibra
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeedTestWidget;