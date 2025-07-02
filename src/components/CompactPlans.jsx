import React from 'react';
import { Check, Zap, MessageSquare } from 'lucide-react';

const CompactPlans = React.forwardRef((props, ref) => {
  const plans = [
    {
      name: "BÁSICO",
      speed: "100MB",
      price: "49,90",
      originalPrice: "59,90",
      features: ["Download 100MB", "Upload 50MB", "Wi-Fi Grátis", "Instalação Grátis", "Suporte 24h"],
      popular: false,
      gradient: "from-blue-500 to-blue-600",
      badge: "ECONOMIA"
    },
    {
      name: "TURBO",
      speed: "200MB", 
      price: "69,90",
      originalPrice: "89,90",
      features: ["Download 200MB", "Upload 100MB", "Wi-Fi Grátis", "Instalação Grátis", "Suporte 24h", "Netflix Grátis"],
      popular: true,
      gradient: "from-orange-500 to-orange-600",
      badge: "MAIS POPULAR"
    },
    {
      name: "ULTRA",
      speed: "500MB",
      price: "99,90",
      originalPrice: "129,90",
      features: ["Download 500MB", "Upload 250MB", "Wi-Fi Grátis", "Instalação Grátis", "Suporte 24h", "Netflix + Prime Video"],
      popular: false,
      gradient: "from-purple-500 to-purple-600",
      badge: "PREMIUM"
    }
  ];

  return (
    <section id="plans-section" ref={ref} className="py-16 px-4 bg-slate-800/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Escolha Seu <span className="text-orange-400">Plano</span>
          </h2>
          <p className="text-xl text-white/80">
            Internet de fibra óptica com a melhor velocidade da região
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                plan.popular ? 'scale-105 -translate-y-2' : ''
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${plan.gradient} rounded-3xl blur-sm transition-opacity duration-300 opacity-0 group-hover:opacity-75`} />
              
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 shadow-2xl">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className={`bg-gradient-to-r ${plan.gradient} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}>
                  {plan.badge}
                </div>
              </div>

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-4`}>
                  <Zap className="w-10 h-10 text-white" />
                </div>
                <div className="mb-2">
                  {plan.originalPrice && (
                    <div className="text-white/50 line-through text-lg">R$ {plan.originalPrice}</div>
                  )}
                  <div className="text-4xl font-bold text-white">
                    R$ <span className="text-5xl">{plan.price}</span>
                  </div>
                  <div className="text-white/60">/mês</div>
                </div>
                <div className="text-2xl font-bold text-orange-400 mt-2">{plan.speed}</div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-white/80">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button className={`w-full py-3 px-6 bg-gradient-to-r ${plan.gradient} text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105`}>
                  Contratar Agora
                </button>
                
                <div className="relative group">
                  <button className="w-full py-3 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-all duration-300">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    WhatsApp
                  </button>
                  
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="text-white/90 text-xs font-medium mb-2">Escolha sua cidade:</div>
                    <div className="space-y-1">
                      <a href="https://wa.me/5583996411187" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm">
                        Sumé - (83) 99641-1187
                      </a>
                      <a href="https://wa.me/5583999298366" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm">
                        Congo - (83) 99929-8366
                      </a>
                      <a href="https://wa.me/5583988539424" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm">
                        Caraúbas - (83) 98853-9424
                      </a>
                      <a href="https://wa.me/5583996784194" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 text-sm">
                        Camalaú - (83) 99678-4194
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CompactPlans;