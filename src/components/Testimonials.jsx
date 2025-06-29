import React, { useState, useRef, useCallback } from 'react';
import { User, Star, Quote, MapPin } from 'lucide-react';

const TestimonialCard = ({ testimonial, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
      style={{ animationDelay: `${index * 200}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${testimonial.gradient} rounded-3xl blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'}`} />
      
      <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl p-8">
        {/* Quote Icon */}
        <div className="absolute top-6 right-6 opacity-20">
          <Quote className="w-12 h-12 text-white" />
        </div>
        
        {/* Stars */}
        <div className="flex gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-5 h-5 ${testimonial.gradient.includes('orange') ? 'text-orange-400' : 'text-cyan-400'} fill-current`} />
          ))}
        </div>
        
        {/* Testimonial Text */}
        <blockquote className="text-white/90 text-lg leading-relaxed mb-8 italic">
          "{testimonial.text}"
        </blockquote>
        
        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-2xl bg-gradient-to-r ${testimonial.gradient} group-hover:scale-110 transition-transform duration-300`}>
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h4 className="text-white font-bold text-lg">{testimonial.author}</h4>
            <div className="flex items-center gap-2 text-white/60">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{testimonial.city}</span>
            </div>
            <div className="text-xs text-white/50 mt-1">{testimonial.plan}</div>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 rounded-3xl`} />
      </div>
    </div>
  );
};

const Testimonials = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const testimonials = [
    {
      text: "A Mix Fibra transformou completamente minha experiência com internet. Velocidade incrível, estabilidade perfeita e sem quedas! Recomendo de olhos fechados.",
      author: "Maria Silva",
      city: "Sumé, PB",
      plan: "Plano 200MB",
      gradient: "from-orange-500 to-pink-500"
    },
    {
      text: "Excelente atendimento e uma internet que realmente entrega o que promete. Trabalho de casa sem preocupações e minha família fica conectada o tempo todo.",
      author: "João Pereira",
      city: "Congo, PB",
      plan: "Plano 300MB",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      text: "Migrei de outra operadora e a diferença é notável! Suporte rápido, instalação sem complicação e preço justo. Mix Fibra é sinônimo de qualidade.",
      author: "Ana Costa",
      city: "Camalaú, PB",
      plan: "Plano 100MB",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <section 
      id="testimonials-section"
      ref={ref} 
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(236, 72, 153, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            Avaliações Reais
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent mb-6">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Depoimentos reais de quem já experimentou a qualidade Mix Fibra
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-1">4.9</div>
            <div className="text-white/60 text-sm">Avaliação Média</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">98%</div>
            <div className="text-white/60 text-sm">Satisfação</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">5000+</div>
            <div className="text-white/60 text-sm">Clientes Felizes</div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
            <div className="text-white/60 text-sm">Suporte</div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Testimonials;
