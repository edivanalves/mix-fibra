import React, { useState, useEffect, useRef, memo, useMemo, useCallback } from 'react';
import PlanRecommender from './PlanRecommender';
import { trackPlanInterest, trackButtonClick } from '../utils/analytics';
import { Zap, Wifi, Monitor, Users, Building, Gamepad2 } from 'lucide-react';

const advantagesIcons = {
  wifi: <Wifi className="w-5 h-5 text-emerald-400" />,
  stream: <Monitor className="w-5 h-5 text-emerald-400" />,
  games: <Gamepad2 className="w-5 h-5 text-emerald-400" />,
  home: <Users className="w-5 h-5 text-emerald-400" />,
  business: <Building className="w-5 h-5 text-emerald-400" />,
  speed: <Zap className="w-5 h-5 text-emerald-400" />
};

const plansData = [
  {
    megas: 50,
    price: '39,99',
    description: 'Ideal para uso básico, redes sociais e e-mails.',
    highlight: false,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    advantages: [
      { text: "Wi-Fi Grátis", icon: advantagesIcons.wifi },
      { text: "Suporte", icon: advantagesIcons.home },
      { text: "Velocidade garantida", icon: advantagesIcons.speed },
    ],
  },
  {
    megas: 100,
    price: '49,99',
    description: 'Perfeito para streaming de filmes e séries em HD.',
    highlight: true,
    color: 'from-orange-500 to-pink-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    advantages: [
      { text: "Streaming HD sem travar", icon: advantagesIcons.stream },
      { text: "Wi-Fi 5G incluído", icon: advantagesIcons.wifi },
      { text: "Até 6 dispositivos", icon: advantagesIcons.home },
    ],
  },
  {
    megas: 200,
    price: '59,99',
    description: 'Para trabalho remoto, videochamadas e jogos online.',
    highlight: false,
    color: 'from-purple-500 to-indigo-500',
    glowColor: 'rgba(147, 51, 234, 0.3)',
    advantages: [
      { text: "Home office perfeito", icon: advantagesIcons.business },
      { text: "Gaming sem lag", icon: advantagesIcons.games },
      { text: "Upload rápido", icon: advantagesIcons.speed },
    ],
  },
  {
    megas: 300,
    price: '69,99',
    description: 'Experiência completa para múltiplos streamings 4K.',
    highlight: true,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    advantages: [
      { text: "Streaming 4K múltiplo", icon: advantagesIcons.stream },
      { text: "Família toda conectada", icon: advantagesIcons.home },
      { text: "Wi-Fi mesh premium", icon: advantagesIcons.wifi },
    ],
  },
  {
    megas: 500,
    price: '89,99',
    description: 'Ultra velocidade para empresas e gamers exigentes.',
    highlight: false,
    color: 'from-red-500 to-orange-500',
    glowColor: 'rgba(239, 68, 68, 0.3)',
    advantages: [
      { text: "Empresas e escritórios", icon: advantagesIcons.business },
      { text: "Gaming profissional", icon: advantagesIcons.games },
      { text: "Velocidade extrema", icon: advantagesIcons.speed },
    ],
  },
];

const PlanCard = memo(({ plan, index, isInView, onOpenModal }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 50, y: 50 });
  }, []);

  const handlePlanClick = useCallback(() => {
    console.log('Card clicado:', plan.megas + 'MB'); // DEBUG
    trackPlanInterest(`${plan.megas}MB`);
    trackButtonClick('assinar_plano', 'plans_section');
    onOpenModal(plan);
  }, [plan, onOpenModal]);

  const transform3D = isHovered 
    ? `perspective(1000px) rotateX(${(mousePosition.y - 50) * 0.1}deg) rotateY(${(mousePosition.x - 50) * 0.1}deg) translateZ(20px)`
    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';

  return (
    <div
      ref={cardRef}
      style={{ 
        transitionDelay: `${index * 150}ms`,
        pointerEvents: 'auto'
      }}
      className={`
        relative group cursor-pointer transition-all duration-700 ease-out
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
        max-w-sm mx-auto
      `}
    >
      {/* 3D Card Container */}
      <div 
        className="relative w-full min-h-[600px] flex flex-col rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${plan.color})`,
          boxShadow: isHovered 
            ? `0 25px 50px -12px ${plan.glowColor}, 0 0 0 1px rgba(255,255,255,0.1)` 
            : `0 10px 25px -5px ${plan.glowColor}`,
        }}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/20" />
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
              opacity: isHovered ? 1 : 0
            }}
          />
        </div>

        {/* Popular Badge */}
        {plan.highlight && (
          <div className="absolute -top-2 -right-2 z-20 pointer-events-none">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg transform rotate-12 animate-pulse">
              ⭐ POPULAR
            </div>
          </div>
        )}

        {/* Card Content */}
        <div className="relative z-10 flex-1 flex flex-col p-8 text-white">
          {/* Speed Display */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <div className={`text-7xl font-black bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent drop-shadow-lg`}>
                {plan.megas}
              </div>
              <div className="text-xl font-bold text-white/90 -mt-2">MEGA</div>
              <div className="absolute -inset-4 bg-white/10 rounded-full blur-xl -z-10 animate-pulse" />
            </div>
          </div>

          {/* Description */}
          <p className="text-white/90 text-center text-sm font-medium mb-6 leading-relaxed">
            {plan.description}
          </p>

          {/* Features */}
          <div className="space-y-3 mb-6">
            {plan.advantages.map((adv, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 text-white/90 text-sm font-medium p-2 rounded-lg bg-white/10 backdrop-blur-sm"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="flex-shrink-0 p-1 rounded-full bg-emerald-500/20">
                  {adv.icon}
                </div>
                <span>{adv.text}</span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="text-center mb-6">
            <div className="text-4xl font-black text-white drop-shadow-lg">
              <span className="text-xl align-top">R$</span>
              {plan.price}
              <span className="text-lg font-medium text-white/80">/mês</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-auto pt-6 relative z-[1000]" style={{ pointerEvents: 'auto' }}>
            <button
              type="button"
              onClick={() => {
                console.log('CLIQUE FUNCIONANDO - Plano:', plan.megas + 'MB');
                onOpenModal(plan);
              }}
              className="w-full py-4 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl font-bold text-white text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
              style={{ 
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 9999
              }}
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5" />
                Assinar Agora
              </div>
            </button>
          </div>


        </div>

        {/* 3D Depth Effect */}
        <div 
          className="absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)',
            opacity: isHovered ? 1 : 0
          }}
        />
      </div>

      {/* 3D Shadow */}
      <div 
        className="absolute inset-0 rounded-3xl transition-all duration-700 -z-10"
        style={{
          background: `linear-gradient(135deg, ${plan.color})`,
          filter: 'blur(20px)',
          opacity: isHovered ? 0.6 : 0.3,
          transform: 'translateZ(-50px) scale(0.9)'
        }}
      />
    </div>
  );
});

const Plans = React.forwardRef(({ loading }, ref) => {
  const [isInView, setIsInView] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const memoizedPlans = useMemo(() => plansData, []);

  const cities = [
    { name: 'Sumé', phone: '5583996411187' },
    { name: 'Congo', phone: '5583999298366' },
    { name: 'Caraúbas', phone: '5583988539424' },
    { name: 'Camalaú', phone: '5583996784194' }
  ];

  const handleOpenModal = useCallback((plan) => {
    console.log('Modal aberto para plano:', plan.megas + 'MB'); // DEBUG
    setSelectedPlan(plan);
    setShowCityModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    console.log('Modal fechado'); // DEBUG
    setShowCityModal(false);
    setSelectedPlan(null);
  }, []);

  const handleCitySelect = useCallback((whatsappNumber) => {
    if (!selectedPlan) {
      console.log('Erro: Nenhum plano selecionado'); // DEBUG
      return;
    }
    console.log('Cidade selecionada para plano:', selectedPlan.megas + 'MB', 'WhatsApp:', whatsappNumber); // DEBUG
    const message = `Olá! Quero assinar o plano de ${selectedPlan.megas}MB por R$ ${selectedPlan.price}/mês`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    handleCloseModal();
  }, [selectedPlan, handleCloseModal]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref?.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [ref]);

  return (
    <section
      id="plans-section"
      ref={ref}
      className={`w-full py-16 px-4 bg-transparent text-center mt-8 rounded-2xl max-w-7xl mx-auto transition-opacity duration-500 ${
        loading ? 'opacity-0' : 'opacity-100'
      }`}
      aria-label="Planos de Internet Mix Fibra"
    >
      {/* Animated Title */}
      <div className="text-center mb-20">
        <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 animate-pulse">
          Planos Incríveis
        </h2>
        <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
          Escolha o plano perfeito para sua necessidade e experimente a velocidade da fibra óptica
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        </div>
      </div>



      {/* 3D Cards Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 lg:gap-12 justify-center items-center"
        style={{ perspective: '1000px' }}
      >
        {memoizedPlans.map((plan, index) => (
          <PlanCard key={`${plan.megas}-${index}`} plan={plan} index={index} isInView={isInView} onOpenModal={handleOpenModal} />
        ))}
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {/* Componente recomendador */}
      <PlanRecommender />

      {/* City Selection Modal */}
      {showCityModal && selectedPlan && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm" 
          onClick={(e) => {
            console.log('Clique no backdrop'); // DEBUG
            handleCloseModal();
          }}
        >
          <div 
            className="bg-slate-800/90 backdrop-blur-md rounded-3xl border border-white/20 p-8 max-w-md w-full mx-4 shadow-2xl" 
            onClick={(e) => {
              console.log('Clique no modal (não deve fechar)'); // DEBUG
              e.stopPropagation();
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 text-center">Escolha sua cidade</h3>
            <p className="text-white/70 text-center mb-6">Plano {selectedPlan.megas}MB - R$ {selectedPlan.price}/mês</p>
            <div className="space-y-3">
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={(e) => {
                    console.log('Clique na cidade:', city.name); // DEBUG
                    e.preventDefault();
                    e.stopPropagation();
                    handleCitySelect(city.phone);
                  }}
                  className="w-full p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 backdrop-blur-sm border border-green-500/30 rounded-2xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  📱 {city.name}
                </button>
              ))}
            </div>
            <button
              onClick={(e) => {
                console.log('Clique no cancelar'); // DEBUG
                e.preventDefault();
                e.stopPropagation();
                handleCloseModal();
              }}
              className="w-full mt-4 p-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/30 rounded-2xl text-red-300 font-semibold transition-all duration-300 hover:scale-105"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs z-[10000]">
          <div>Modal: {showCityModal ? 'ABERTO' : 'FECHADO'}</div>
          <div>Plano: {selectedPlan ? selectedPlan.megas + 'MB' : 'NENHUM'}</div>
        </div>
      )}
    </section>
  );
});

export default Plans;
