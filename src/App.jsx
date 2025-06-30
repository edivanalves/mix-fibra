// Caminho: src/App.jsx

import React, { useState, useEffect, useRef } from 'react';

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
import LoadingScreen from './components/LoadingScreen';
import { SkeletonSection } from './components/SkeletonLoader';
import { initGA, measurePerformance, trackScroll, trackPageView } from './utils/analytics';
import { conversionFunnel } from './utils/conversionFunnel';
import { abTesting } from './utils/abTesting';

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
          whyChooseUsRef
        }}
        activeSection={activeSection}
      />

      <div className="relative z-10">
        <ParallaxHero ref={homeRef} scrollToPlans={() => scrollToSection(plansRef)} />
        <Plans ref={plansRef} loading={loading} />
        <WhyChooseUs ref={whyChooseUsRef} loading={loading} />
        <ImageSection ref={imageSectionRef} loading={loading} />
        <Testimonials ref={testimonialsRef} loading={loading} />
        <About ref={aboutRef} loading={loading} />
        <Contact ref={contactRef} loading={loading} />
        <div className="max-w-7xl mx-auto px-4 py-20">
          <LocationMap />
        </div>
        <Support ref={supportRef} loading={loading} />
        <CentralAssinante ref={centralRef} loading={loading} />
        <SolicitationForm ref={solicitationRef} />
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
