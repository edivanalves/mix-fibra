import React, { useState, useRef, useCallback } from 'react';
import {
  MessageSquare,
  Instagram,
  FileText,
  User,
  Linkedin,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  }, []);

  return (
    <footer 
      ref={footerRef}
      className="relative w-full mt-12 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%)`
        }}
      />
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <img
                    src="/mix-fibra/imagens/logo-mix-fibra.png"
                    alt="Logo Mix Fibra"
                    className="w-12 h-12 rounded-xl shadow-lg"
                  />
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl blur opacity-30" />
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
                    MIX FIBRA
                  </span>
                  <div className="text-sm text-orange-400 font-medium">Ultra Velocidade</div>
                </div>
              </div>
              <p className="text-white/80 leading-relaxed mb-4">
                Conectando você ao futuro com internet de fibra óptica de ultra velocidade. 
                Experiência digital sem limites para sua casa e empresa.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Sumé, Congo, Camalaú, Caraúbas - PB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>(83) 99641-1187</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span>mixfibrasume@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Atendimento 24/7</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Links Rápidos</h4>
              <div className="space-y-3">
                <a href="#plans-section" className="block text-white/70 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Nossos Planos
                </a>
                <a href="#about" className="block text-white/70 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Sobre Nós
                </a>
                <a href="#support-section" className="block text-white/70 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Suporte
                </a>
                <a href="#speedtest-section" className="block text-white/70 hover:text-orange-400 transition-colors duration-300 hover:translate-x-1 transform">
                  Teste de Velocidade
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Redes Sociais</h4>
              <div className="space-y-3">
                <a
                  href="https://wa.me/5583996411187"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-all duration-300 hover:scale-105 transform p-2 rounded-lg hover:bg-white/5"
                >
                  <MessageSquare className="w-5 h-5" />
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/mixfibra_sume"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/70 hover:text-pink-400 transition-all duration-300 hover:scale-105 transform p-2 rounded-lg hover:bg-white/5"
                >
                  <Instagram className="w-5 h-5" />
                  Instagram
                </a>
                <a
                  href="/termos"
                  className="flex items-center gap-3 text-white/70 hover:text-blue-400 transition-all duration-300 hover:scale-105 transform p-2 rounded-lg hover:bg-white/5"
                >
                  <FileText className="w-5 h-5" />
                  Termos de Uso
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Developer Credit */}
              <div className="flex flex-col md:flex-row items-center gap-4 text-white/60 text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>Desenvolvido por Edivan Alves</span>
                </div>
                <a
                  href="https://www.linkedin.com/in/edivan-alves/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300 hover:underline"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>

              {/* Copyright */}
              <div className="text-center md:text-right text-white/60 text-sm">
                <p>© {currentYear} Mix Fibra. Todos os direitos reservados.</p>
                <p className="text-white/40 mt-1">
                  🚀 Sem fidelidade • 💳 Sem juros • 🔒 100% Seguro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
