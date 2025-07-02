import React, { useState, useRef, useCallback } from 'react';
import { Play, Video, Users, Headphones } from 'lucide-react';

const VideoSection = React.forwardRef(({ loading }, ref) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  const videos = [
    {
      src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      title: "Promoção Ultra Velocidade",
      description: "Conheça nossas ofertas especiais",
      icon: <Video className="w-6 h-6" />,
      gradient: "from-orange-500 to-orange-600",
      category: "Promoções"
    },
    {
      src: "https://www.youtube.com/embed/videoseries?list=PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG",
      title: "Atendimento Técnico",
      description: "Suporte especializado 24/7",
      icon: <Headphones className="w-6 h-6" />,
      gradient: "from-blue-500 to-blue-600",
      category: "Suporte"
    },
    {
      src: "https://www.youtube.com/embed/5qap5aO4i9A",
      title: "Depoimentos de Clientes",
      description: "Experiências reais dos nossos clientes",
      icon: <Users className="w-6 h-6" />,
      gradient: "from-emerald-500 to-emerald-600",
      category: "Testemunhos"
    }
  ];

  return (
    <section
      id="video-section"
      ref={ref}
      className={`relative w-full py-20 px-4 text-center mt-12 max-w-7xl mx-auto transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={sectionRef} className="absolute inset-0" />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-800 to-blue-900 rounded-3xl" />
      <div 
        className="absolute inset-0 opacity-20 rounded-3xl"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-600/20 to-blue-700/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-6">
            <Play className="w-4 h-4 text-blue-400" />
            Vídeos Exclusivos
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-blue-300 bg-clip-text text-transparent mb-6">
            Mix Fibra em Ação
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Descubra como nossa tecnologia e atendimento fazem a diferença na vida dos nossos clientes
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <div
              key={index}
              className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${video.gradient} rounded-3xl blur-sm transition-opacity duration-300 opacity-0 group-hover:opacity-75`} />
              
              <div className="relative bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
                {/* Video Container */}
                <div className="relative aspect-video overflow-hidden">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={video.src}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${video.gradient} rounded-full text-white text-xs font-bold`}>
                    {video.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${video.gradient} group-hover:scale-110 transition-transform duration-300`}>
                      {video.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {video.title}
                    </h3>
                  </div>
                  
                  <p className="text-white/70 text-sm leading-relaxed">
                    {video.description}
                  </p>
                  
                  {/* Play Button */}
                  <div className="mt-4 flex items-center justify-center">
                    <div className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${video.gradient} rounded-xl text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105`}>
                      <Play className="w-4 h-4" />
                      Assistir Vídeo
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
            <Video className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">Mais vídeos em nosso canal</span>
          </div>
        </div>
      </div>
    </section>
  );
});

export default VideoSection;