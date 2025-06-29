import React, { memo, useMemo, useCallback, useState, useRef } from 'react';
import LazyImage from './LazyImage';
import { MapPin, Users, Zap, Award } from 'lucide-react';

const cidadesAtendidas = [
  { nome: 'Sumé', cor: 'from-orange-500 to-pink-500', imagem: '/mix-fibra/imagens/sume.jpg', habitantes: '16.8k', cobertura: '95%' },
  { nome: 'Congo', cor: 'from-cyan-500 to-blue-500', imagem: '/mix-fibra/imagens/congo.jpg', habitantes: '4.8k', cobertura: '90%' },
  { nome: 'Camalaú', cor: 'from-yellow-500 to-orange-500', imagem: '/mix-fibra/imagens/camalau.jpg', habitantes: '6.2k', cobertura: '88%' },
  { nome: 'Caraúbas', cor: 'from-pink-500 to-purple-500', imagem: '/mix-fibra/imagens/caraubas.jpg', habitantes: '4.5k', cobertura: '92%' }
];

const CidadeCard = memo(({ cidade, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      role="listitem"
      className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer"
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`Cidade atendida: ${cidade.nome}`}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${cidade.cor} rounded-3xl blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'}`} />
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-xl">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <LazyImage
            src={cidade.imagem}
            alt={`Vista da cidade de ${cidade.nome}, uma das localidades atendidas pela Mix Fibra`}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Status Indicator */}
          <div className="absolute top-4 right-4">
            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${cidade.cor} animate-pulse shadow-lg`} />
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2 rounded-xl bg-gradient-to-r ${cidade.cor}`}>
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-white font-bold text-xl">{cidade.nome}</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <Users className="w-4 h-4 text-cyan-400 mx-auto mb-1" />
              <div className="text-white font-semibold">{cidade.habitantes}</div>
              <div className="text-white/60">Habitantes</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-xl border border-white/10">
              <Zap className="w-4 h-4 text-green-400 mx-auto mb-1" />
              <div className="text-white font-semibold">{cidade.cobertura}</div>
              <div className="text-white/60">Cobertura</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

const About = React.forwardRef(({ loading }, ref) => {
  const memoizedCidades = useMemo(() => cidadesAtendidas, []);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      aria-label="Sobre a Mix Fibra"
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(249, 115, 22, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Award className="w-4 h-4 text-orange-400" />
            Conectando o Futuro
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-orange-200 to-pink-200 bg-clip-text text-transparent mb-6">
            Sobre a Mix Fibra
          </h2>
          
          <p className="text-xl text-white/80 max-w-4xl mx-auto leading-relaxed mb-8">
            Somos sua parceira em conectividade, trazendo internet de <strong className="text-orange-400">ultra velocidade</strong> para sua casa ou empresa. 
            Nossa missão é conectar pessoas e negócios, garantindo uma experiência online sem limites.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-3xl font-black text-orange-400 mb-1">4</div>
              <div className="text-white/80 text-sm">Cidades</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-3xl font-black text-cyan-400 mb-1">500MB</div>
              <div className="text-white/80 text-sm">Velocidade Máx</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-3xl font-black text-green-400 mb-1">24/7</div>
              <div className="text-white/80 text-sm">Suporte</div>
            </div>
            <div className="text-center p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
              <div className="text-3xl font-black text-purple-400 mb-1">100%</div>
              <div className="text-white/80 text-sm">Fibra Óptica</div>
            </div>
          </div>
        </div>

        {/* Cities Section */}
        <div className="mb-8">
          <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent mb-12">
            Cidades Atendidas
          </h3>
          
          <div role="list" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {memoizedCidades.map((cidade, index) => (
              <CidadeCard key={cidade.nome} cidade={cidade} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default About;
