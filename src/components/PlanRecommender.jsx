import React, { useState, useCallback, useMemo } from 'react';
import { Calculator, Wifi, Monitor, Gamepad2, Users, Zap, CheckCircle } from 'lucide-react';

const SpeedCalculator = () => {
  const [people, setPeople] = useState(2);
  const [activities, setActivities] = useState({
    streaming: false,
    gaming: false,
    work: false,
    social: false,
    download: false
  });
  const [quality, setQuality] = useState('hd');

  const activityData = {
    streaming: { name: 'Streaming (Netflix, YouTube)', speed: quality === '4k' ? 25 : quality === 'hd' ? 8 : 3, icon: Monitor },
    gaming: { name: 'Jogos Online', speed: 15, icon: Gamepad2 },
    work: { name: 'Home Office/Videochamadas', speed: 10, icon: Users },
    social: { name: 'Redes Sociais', speed: 2, icon: Wifi },
    download: { name: 'Downloads Pesados', speed: 20, icon: Zap }
  };

  const plans = [
    { speed: 50, price: '39,99', color: 'from-blue-500 to-cyan-500' },
    { speed: 100, price: '49,99', color: 'from-orange-500 to-pink-500', popular: true },
    { speed: 200, price: '59,99', color: 'from-purple-500 to-indigo-500' },
    { speed: 300, price: '69,99', color: 'from-emerald-500 to-teal-500' },
    { speed: 500, price: '99,99', color: 'from-red-500 to-orange-500' }
  ];

  const calculateSpeed = useMemo(() => {
    let totalSpeed = 0;
    Object.entries(activities).forEach(([key, active]) => {
      if (active) totalSpeed += activityData[key].speed;
    });
    return Math.ceil(totalSpeed * people * 1.3); // 30% buffer
  }, [people, activities, quality]);

  const recommendedPlan = useMemo(() => {
    return plans.find(plan => plan.speed >= calculateSpeed) || plans[plans.length - 1];
  }, [calculateSpeed]);

  const handleActivityChange = useCallback((activity) => {
    setActivities(prev => ({ ...prev, [activity]: !prev[activity] }));
  }, []);

  return (
    <div className="relative mt-16 max-w-6xl mx-auto">
      {/* Background Effects */}
      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-cyan-500/20 rounded-3xl blur-xl" />
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-white mb-4">
            <Calculator className="w-5 h-5" />
            Calculadora Inteligente
          </div>
          <h3 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
            Descubra Seu Plano Ideal
          </h3>
          <p className="text-white/80 text-lg">Configure seu perfil e veja a recomendação personalizada</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Calculator */}
          <div className="space-y-6">
            {/* People Counter */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Quantas pessoas usam a internet?
              </label>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setPeople(Math.max(1, people - 1))}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold text-xl hover:scale-105 transition-transform"
                >-</button>
                <span className="text-3xl font-black text-white min-w-[3rem] text-center">{people}</span>
                <button 
                  onClick={() => setPeople(Math.min(10, people + 1))}
                  className="w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl text-white font-bold text-xl hover:scale-105 transition-transform"
                >+</button>
              </div>
            </div>

            {/* Quality Selector */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold mb-4">Qualidade de Streaming</label>
              <div className="grid grid-cols-3 gap-2">
                {[{id: 'sd', label: 'SD'}, {id: 'hd', label: 'HD'}, {id: '4k', label: '4K'}].map(q => (
                  <button
                    key={q.id}
                    onClick={() => setQuality(q.id)}
                    className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                      quality === q.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-105' 
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <label className="block text-white font-semibold mb-4">Atividades Online</label>
              <div className="space-y-3">
                {Object.entries(activityData).map(([key, data]) => {
                  const Icon = data.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => handleActivityChange(key)}
                      className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                        activities[key] 
                          ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30 text-white' 
                          : 'bg-white/5 border border-white/10 text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activities[key] ? 'text-emerald-400' : 'text-white/60'}`} />
                      <span className="flex-1 text-left font-medium">{data.name}</span>
                      {activities[key] && <CheckCircle className="w-5 h-5 text-emerald-400" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Speed Result */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-400/30">
              <div className="text-center">
                <div className="text-5xl font-black text-white mb-2">{calculateSpeed}</div>
                <div className="text-purple-200 text-lg font-semibold mb-4">MB recomendados</div>
                <div className="text-white/80 text-sm">Baseado no seu perfil de uso</div>
              </div>
            </div>

            {/* Plan Recommendation */}
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-white mb-4">Plano Recomendado</h4>
              {plans.map(plan => {
                const isRecommended = plan.speed === recommendedPlan.speed;
                const isOverkill = plan.speed > calculateSpeed * 2;
                const isInsufficient = plan.speed < calculateSpeed;
                
                return (
                  <div
                    key={plan.speed}
                    className={`relative p-4 rounded-2xl border transition-all duration-300 ${
                      isRecommended 
                        ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border-emerald-400/50 scale-105 shadow-lg shadow-emerald-500/25' 
                        : isInsufficient
                        ? 'bg-red-500/10 border-red-400/30 opacity-60'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {isRecommended && (
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        ⭐ IDEAL
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white font-bold text-lg">{plan.speed}MB</div>
                        <div className="text-white/60 text-sm">
                          {isInsufficient ? 'Insuficiente' : isOverkill ? 'Muito rápido' : 'Perfeito'}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold text-xl">R$ {plan.price}</div>
                        <div className="text-white/60 text-sm">/mês</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <a
              href={`https://wa.me/5583996411187?text=Olá! Calculei que preciso de ${calculateSpeed}MB e me interessei pelo plano de ${recommendedPlan.speed}MB por R$${recommendedPlan.price}/mês`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-2xl text-center transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/25"
            >
              <span className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Contratar {recommendedPlan.speed}MB por R$ {recommendedPlan.price}/mês
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpeedCalculator;
