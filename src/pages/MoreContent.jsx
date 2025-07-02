import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft } from 'lucide-react';

import WhyChooseUs from '../components/WhyChooseUs';
import ImageSection from '../components/ImageSection';
import Testimonials from '../components/Testimonials';
import About from '../components/About';
import Support from '../components/Support';
import CentralAssinante from '../components/CentralAssinante';
import SpeedTest from '../components/SpeedTest';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import IngridAssistant from '../components/IngridAssistant';
import LGPDBanner from '../components/LGPDBanner';
import UrgencyTimer from '../components/UrgencyTimer';
import ScrollProgress from '../components/ScrollProgress';
import LocationMap from '../components/LocationMap';
import LoadingScreen from '../components/LoadingScreen';

function MoreContent() {
  const [loading, setLoading] = useState(true);

  const whyChooseUsRef = useRef(null);
  const imageSectionRef = useRef(null);
  const testimonialsRef = useRef(null);
  const aboutRef = useRef(null);
  const supportRef = useRef(null);
  const centralRef = useRef(null);
  const speedTestRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full bg-slate-900">
      <LoadingScreen loading={loading} />
      <ParticleBackground />

      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>
      </div>

      <div className="relative z-10 pt-20">
        <div className="text-center py-16 px-4">
          <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Conteúdo Completo
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Explore todos os nossos serviços, diferenciais e informações detalhadas
          </p>
        </div>

        <WhyChooseUs ref={whyChooseUsRef} loading={loading} />
        <Testimonials ref={testimonialsRef} loading={loading} />
        <SpeedTest ref={speedTestRef} loading={loading} />
        <Support ref={supportRef} loading={loading} />
        <CentralAssinante ref={centralRef} loading={loading} />
        <About ref={aboutRef} loading={loading} />
        <ImageSection ref={imageSectionRef} loading={loading} />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <LocationMap />
        </div>
      </div>

      <Footer />
      <IngridAssistant />
      <UrgencyTimer />
      <ScrollProgress />
      <LGPDBanner />
    </div>
  );
}

export default MoreContent;