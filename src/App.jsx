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
import Faq from './components/Faq';
import SpeedTest from './components/SpeedTest';
import CentralAssinante from './components/CentralAssinante';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import SolicitationForm from './components/SolicitationForm';
import ParticleBackground from './components/ParticleBackground';
import PlanRecommender from './components/PlanRecommender';

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [currentParticleColor, setCurrentParticleColor] = useState('#5a6a99');
  const [currentLinkColor, setCurrentLinkColor] = useState('#5a6a99');

  const homeRef = useRef(null);
  const plansRef = useRef(null);
  const supportRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const centralRef = useRef(null);
  const solicitationRef = useRef(null);
  const speedTestRef = useRef(null);
  const testimonialsRef = useRef(null);
  const faqRef = useRef(null);
  const whyChooseUsRef = useRef(null);

  const sectionRefs = [
    { id: 'home', ref: homeRef },
    { id: 'plans-section', ref: plansRef },
    { id: 'why-choose-us-section', ref: whyChooseUsRef },
    { id: 'about', ref: aboutRef },
    { id: 'contact', ref: contactRef },
    { id: 'central-assinante', ref: centralRef },
    { id: 'solicitation-form', ref: solicitationRef },
    { id: 'speedtest-section', ref: speedTestRef },
    { id: 'testimonials-section', ref: testimonialsRef },
    { id: 'faq', ref: faqRef },
  ];

  useEffect(() => {
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

  useEffect(() => {
    const updateParticleColors = () => {
      const rootStyles = getComputedStyle(document.documentElement);
      const mainTextColor = rootStyles.getPropertyValue('--color-text-main').trim();
      const mutedTextColor = rootStyles.getPropertyValue('--color-text-muted').trim();

      if (document.documentElement.getAttribute('data-theme') === 'light') {
        setCurrentParticleColor(mainTextColor || '#1f2937');
        setCurrentLinkColor(mutedTextColor || '#a78bfa');
      } else {
        setCurrentParticleColor(mutedTextColor || '#5a6a99');
        setCurrentLinkColor(mutedTextColor || '#5a6a99');
      }
    };

    updateParticleColors();
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
          updateParticleColors();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-blue-950">
      <ParticleBackground particleColor={currentParticleColor} linkColor={currentLinkColor} />
      <ThemeToggle />

      <Navbar
        refs={{
          homeRef,
          plansRef,
          supportRef,
          aboutRef,
          contactRef,
          centralRef,
          solicitationRef,
          speedTestRef,
          testimonialsRef,
          faqRef,
          whyChooseUsRef
        }}
        activeSection={activeSection}
      />

      <div className="relative z-10">
        <Hero ref={homeRef} loading={loading} scrollToPlans={() => scrollToSection(plansRef)} />
        <Plans ref={plansRef} loading={loading} />
        <WhyChooseUs ref={whyChooseUsRef} loading={loading} />
        <ImageSection loading={loading} />
        <Testimonials ref={testimonialsRef} loading={loading} />
        <About ref={aboutRef} loading={loading} />
        <Contact ref={contactRef} loading={loading} />
        <Support ref={supportRef} loading={loading} />
        <Faq ref={faqRef} loading={loading} />
        <SpeedTest ref={speedTestRef} loading={loading} />
        <CentralAssinante ref={centralRef} loading={loading} />
        <SolicitationForm ref={solicitationRef} />
        <div className="my-12">
          <PlanRecommender />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
