// Caminho: src/App.jsx

import React, { useState, useEffect, useRef } from 'react';

// Importando todos os seus componentes
// ASSUMIMOS que TODOS os seus ficheiros .jsx de componente estão
// dentro da pasta 'src/components/'. Se a sua estrutura for diferente,
// ajuste estes caminhos para refletir o seu ambiente (ex: './NomeDoComponente').
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Plans from './components/Plans';
import WhyChooseUs from './components/WhyChooseUs';
import ImageSection from './components/ImageSection';
import VideoSection from './components/VideoSection';
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
import ParticleBackground from './components/ParticleBackground'; // Adicionado: Faltava no seu último App.jsx
import PlanRecommender from './components/PlanRecommender';     // Adicionado: Faltava no seu último App.jsx

function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');

  // Estados para as cores das partículas baseadas no tema
  const [currentParticleColor, setCurrentParticleColor] = useState('#5a6a99');
  const [currentLinkColor, setCurrentLinkColor] = useState('#5a6a99');

  // Refs para cada seção
  const homeRef = useRef(null);
  const plansRef = useRef(null);
  const videoRef = useRef(null);
  const supportRef = useRef(null);
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const centralRef = useRef(null); // Ref para Central do Assinante
  const solicitationRef = useRef(null); // Ref para Formulário de Solicitação
  const speedTestRef = useRef(null); // Ref para Teste de Velocidade
  const testimonialsRef = useRef(null); // Ref adicionada para Testimonials
  const faqRef = useRef(null); // Ref adicionada para Faq
  const whyChooseUsRef = useRef(null); // Ref adicionada para WhyChooseUs

  // Agrupando as refs para facilitar a observação
  const sectionRefs = [
    { id: 'home', ref: homeRef },
    { id: 'plans-section', ref: plansRef },
    { id: 'why-choose-us-section', ref: whyChooseUsRef }, // Adicionado WhyChooseUs
    { id: 'video-section', ref: videoRef },
    { id: 'support-section', ref: supportRef },
    { id: 'about', ref: aboutRef },
    { id: 'contact', ref: contactRef },
    { id: 'central-assinante', ref: centralRef },
    { id: 'solicitation-form', ref: solicitationRef },
    { id: 'speedtest-section', ref: speedTestRef },
    { id: 'testimonials-section', ref: testimonialsRef }, // Adicionado Testimonials
    { id: 'faq', ref: faqRef }, // Adicionado Faq
  ];

  // Efeito para o loading inicial e para observar as seções
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

    // Função de limpeza para remover observadores e timers ao desmontar o componente
    return () => {
      clearTimeout(timer);
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Efeito para as cores das partículas baseado no tema
  // Este efeito ajusta as cores das partículas dinamicamente com base no tema (claro/escuro)
  useEffect(() => {
    const updateParticleColors = () => {
      // Obtém os estilos computados do elemento raiz do documento (<html>)
      const rootStyles = getComputedStyle(document.documentElement);
      // Lê os valores das variáveis CSS definidas no index.css
      const mainTextColor = rootStyles.getPropertyValue('--color-text-main').trim();
      const mutedTextColor = rootStyles.getPropertyValue('--color-text-muted').trim();

      // Altera as cores das partículas com base no atributo 'data-theme' do <html>
      if (document.documentElement.getAttribute('data-theme') === 'light') {
        setCurrentParticleColor(mainTextColor || '#1f2937'); // Cor mais escura para tema claro
        setCurrentLinkColor(mutedTextColor || '#a78bfa'); // Exemplo de link/conexão para tema claro
      } else {
        setCurrentParticleColor(mutedTextColor || '#5a6a99'); // Cor padrão para tema escuro
        setCurrentLinkColor(mutedTextColor || '#5a6a99'); // Cor padrão para tema escuro
      }
    };

    // Atualiza as cores imediatamente e adiciona um observador para mudanças no 'data-theme'
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

  // Função genérica para rolar para uma secção específica
  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full bg-blue-950">
      {/* O ParticleBackground flutua no fundo da aplicação */}
      <ParticleBackground particleColor={currentParticleColor} linkColor={currentLinkColor} />

      {/* O botão de alternar tema (sol/lua) fica fixo no canto superior direito */}
      <ThemeToggle />

      {/* A barra de navegação que contém os links e o menu mobile */}
      <Navbar
        // Passa todas as referências das secções para a Navbar para que ela possa rolar
        refs={{ homeRef, plansRef, videoRef, supportRef, aboutRef, contactRef, centralRef, solicitationRef, speedTestRef, testimonialsRef, faqRef, whyChooseUsRef }}
        activeSection={activeSection} // Passa a secção ativa para destacar o link correto na Navbar
      />

      {/* Conteúdo principal da página, com z-index para ficar acima do fundo de partículas */}
      <div className="relative z-10">
        {/* Renderiza cada secção do website, passando a ref e a prop loading */}
        <Hero ref={homeRef} loading={loading} scrollToPlans={() => scrollToSection(plansRef)} />
        <Plans ref={plansRef} loading={loading} />
        <WhyChooseUs ref={whyChooseUsRef} loading={loading} /> {/* Passando a ref para WhyChooseUs */}
        <ImageSection loading={loading} />
        <VideoSection ref={videoRef} loading={loading} />
        <Testimonials ref={testimonialsRef} loading={loading} /> {/* Testemunhos com ref */}
        <About ref={aboutRef} loading={loading} />
        <Contact ref={contactRef} loading={loading} />
        <Support ref={supportRef} loading={loading} />
        <Faq ref={faqRef} loading={loading} /> {/* FAQ com ref */}
        <SpeedTest ref={speedTestRef} loading={loading} />
        <CentralAssinante ref={centralRef} loading={loading} />
        <SolicitationForm ref={solicitationRef} />
        {/* O PlanRecommender não precisa de ref para a navegação principal, mas é bom tê-lo aqui */}
        <div className="my-12"> {/* Adicionado uma div para espaçamento */}
          <PlanRecommender />
        </div>
      </div>

      {/* O rodapé do website */}
      <Footer />
    </div>
  );
}

export default App;
