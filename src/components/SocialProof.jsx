import React, { useState, useEffect } from 'react';
import { Star, Users, Award, TrendingUp, Shield } from 'lucide-react';

const SocialProof = () => {
  const [currentStat, setCurrentStat] = useState(0);

  const stats = [
    { icon: <Users className="w-5 h-5" />, value: "5.000+", label: "Clientes Satisfeitos", color: "text-blue-400" },
    { icon: <Star className="w-5 h-5" />, value: "4.9/5", label: "Avaliação Google", color: "text-yellow-400" },
    { icon: <Award className="w-5 h-5" />, value: "99.9%", label: "Uptime Garantido", color: "text-green-400" },
    { icon: <TrendingUp className="w-5 h-5" />, value: "500MB", label: "Velocidade Máxima", color: "text-orange-400" }
  ];

  const certifications = [
    { name: "ISO 27001", description: "Segurança da Informação" },
    { name: "ANATEL", description: "Certificação Regulatória" },
    { name: "LGPD", description: "Proteção de Dados" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-1/2 left-4 transform -translate-y-1/2 z-40 hidden lg:block">
      <div className="space-y-4">
        {/* Stats Rotativo */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4 min-w-[200px] transition-all duration-500">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl bg-gradient-to-r from-slate-700 to-slate-800 ${stats[currentStat].color}`}>
              {stats[currentStat].icon}
            </div>
            <div>
              <div className="text-xl font-bold text-white">{stats[currentStat].value}</div>
              <div className="text-xs text-white/70">{stats[currentStat].label}</div>
            </div>
          </div>
        </div>

        {/* Certificações */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-white">Certificações</span>
          </div>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="text-xs">
                <div className="text-white font-medium">{cert.name}</div>
                <div className="text-white/60">{cert.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Online Counter */}
        <div className="bg-green-500/20 backdrop-blur-md rounded-2xl border border-green-500/30 p-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white">
              <strong>{Math.floor(Math.random() * 50) + 20}</strong> pessoas online
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;