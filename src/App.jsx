// Caminho: src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Zap, Shield, Award } from 'lucide-react';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Plans from './components/Plans';
import WhyChooseUs from './components/WhyChooseUs';
import ImageSection from './components/ImageSection';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Support from './components/Support';
import CentralAssinante from './components/CentralAssinante';
import SpeedTest from './components/SpeedTest';
import Footer from './components/Footer';
import SolicitationForm from './components/SolicitationForm';
import ParticleBackground from './components/ParticleBackground';
import PlanRecommender from './components/PlanRecommender';
import IngridAssistant from './components/IngridAssistant';
import LGPDBanner from './components/LGPDBanner';

import UrgencyTimer from './components/UrgencyTimer';

import ScrollProgress from './components/ScrollProgress';
import MobileMenu from './components/MobileMenu';
import LocationMap from './components/LocationMap';
import ParallaxHero from './components/ParallaxHero';
import CompactHero from './components/CompactHero';
import CompactPlans from './components/CompactPlans';
import LoadingScreen from './components/LoadingScreen';
import { SkeletonSection } from './components/SkeletonLoader';
import { initGA, measurePerformance, trackScroll, trackPageView } from './utils/analytics';
import { conversionFunnel } from './utils/conversionFunnel';
import { abTesting } from './utils/abTesting';

const ContentViewer = ({ refs, loading }) => {
  const [currentContent, setCurrentContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleShowContent = (event) => {
      setCurrentContent(event.detail);
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && currentContent) {
        handleClose();
      }
    };

    const handleCloseContent = () => {
      if (currentContent) {
        handleClose();
      }
    };

    window.addEventListener('showContent', handleShowContent);
    window.addEventListener('closeContent', handleCloseContent);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('showContent', handleShowContent);
      window.removeEventListener('closeContent', handleCloseContent);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentContent]);

  const handleClose = () => {
    setIsVisible(false);
    document.body.style.overflow = '';
    setTimeout(() => setCurrentContent(null), 300);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const renderContent = () => {
    switch(currentContent) {
      case 'why-choose-us-section':
        return <WhyChooseUs ref={refs.whyChooseUsRef} loading={loading} />;
      case 'testimonials-section':
        return <Testimonials ref={refs.testimonialsRef} loading={loading} />;
      case 'speedtest-section':
        return <SpeedTest ref={refs.speedTestRef} loading={loading} />;
      case 'support-section':
        return <Support ref={refs.supportRef} loading={loading} />;
      case 'central-assinante':
        return <CentralAssinante ref={refs.centralRef} loading={loading} />;
      case 'about':
        return <About ref={refs.aboutRef} loading={loading} />;
      case 'image-section':
        return <ImageSection ref={refs.imageSectionRef} loading={loading} />;
      default:
        return null;
    }
  };

  if (!currentContent) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleBackdropClick}
    >
      <ParticleBackground />
      
      {/* Botões de Fechar */}
      <div className="fixed top-4 left-4 z-60 flex gap-3">
        <button
          onClick={handleClose}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm border border-orange-400/30"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Voltar
        </button>
      </div>
      
      {/* Botão X no canto superior direito */}
      <div className="fixed top-4 right-4 z-60">
        <button
          onClick={handleClose}
          className="flex items-center justify-center w-12 h-12 bg-red-500/80 hover:bg-red-600 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg backdrop-blur-sm border border-red-400/30"
          title="Fechar (ESC)"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10 pt-20 overflow-y-auto h-full" onClick={(e) => e.stopPropagation()}>
        {renderContent()}
      </div>
      
      {/* Instrução de como sair */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-60">
        <div className="bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm border border-white/20">
          Pressione ESC ou clique fora para sair
        </div>
      </div>
    </div>
  );
};

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');


  const homeRef = useRef(null);
  const plansRef = useRef(null);
  const supportRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const centralRef = useRef(null);
  const solicitationRef = useRef(null);
  const testimonialsRef = useRef(null);
  const whyChooseUsRef = useRef(null);
  const imageSectionRef = useRef(null);
  const speedTestRef = useRef(null);

  const sectionRefs = [
    { id: 'home', ref: homeRef },
    { id: 'plans-section', ref: plansRef },
    { id: 'why-choose-us-section', ref: whyChooseUsRef },
    { id: 'image-section', ref: imageSectionRef },
    { id: 'testimonials-section', ref: testimonialsRef },
    { id: 'about', ref: aboutRef },
    { id: 'contact', ref: contactRef },
    { id: 'support-section', ref: supportRef },
    { id: 'central-assinante', ref: centralRef },
    { id: 'speedtest-section', ref: speedTestRef },
    { id: 'solicitation-form', ref: solicitationRef }
  ];

  useEffect(() => {
    // Initialize analytics
    initGA();
    measurePerformance();
    trackScroll();
    trackPageView('Home');
    
    // Initialize conversion tracking
    conversionFunnel.trackStep('app_loaded');
    
    // Initialize A/B testing
    console.log('A/B Tests initialized');
    
    const timer = setTimeout(() => setLoading(false), 2000);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      clearTimeout(timer);
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);



  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-slate-900">
      <LoadingScreen loading={loading} />
      <ParticleBackground />

      <Navbar
        refs={{
          homeRef,
          plansRef,
          supportRef,
          aboutRef,
          contactRef,
          centralRef,
          solicitationRef,
          testimonialsRef,
          whyChooseUsRef,
          speedTestRef
        }}
        activeSection={activeSection}
      />

      <div className="relative z-10">
        <ParallaxHero ref={homeRef} scrollToPlans={() => scrollToSection(plansRef)} />
        <Plans ref={plansRef} loading={loading} />
        <SolicitationForm ref={solicitationRef} />
        <Contact ref={contactRef} loading={loading} />
        
        {/* Seções dinâmicas */}
        <ContentViewer 
          refs={{
            whyChooseUsRef,
            testimonialsRef,
            speedTestRef,
            supportRef,
            centralRef,
            aboutRef,
            imageSectionRef
          }}
          loading={loading}
        />
      </div>

      <Footer />
      <IngridAssistant />


      <UrgencyTimer />
      <ScrollProgress />
      <LGPDBanner />
    </div>
  );
}

export default App;
