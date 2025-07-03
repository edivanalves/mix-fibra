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
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span>Sumé: (83) 99641-1187</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <span>Congo: (83) 99929-8366</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <span>Caraúbas: (83) 98853-9424</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <span>Camalaú: (83) 99678-4194</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-orange-400" />
                  <span>mixfibrasume@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Seg-Sáb: 8h-12h | 14h-18h</span>
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
                <div className="relative group">
                  <div className="flex items-center gap-3 text-white/70 hover:text-green-400 transition-all duration-300 hover:scale-105 transform p-2 rounded-lg hover:bg-white/5 cursor-pointer">
                    <MessageSquare className="w-5 h-5" />
                    WhatsApp
                  </div>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
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

          {/* Quality Badges & Reviews Section */}
          <div className="border-t border-white/10 pt-8 mb-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              {/* Quality Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold">SSL Seguro</div>
                      <div className="text-xs opacity-90">Conexão 100% Segura</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold">ISO 9001</div>
                      <div className="text-xs opacity-90">Qualidade Certificada</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs font-bold">ANATEL</div>
                      <div className="text-xs opacity-90">Licenciado</div>
                    </div>
                  </div>
                </div>
                

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
