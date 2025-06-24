// Caminho: src/components/ParticleBackground.jsx

import React, { useCallback, useEffect, useState } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Verifica se é dispositivo móvel (largura até 600px)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };
    handleResize(); // inicial
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: 'repulse' },
        resize: true,
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 },
      },
    },
    particles: {
      color: { value: '#5a6a99' },
      links: {
        color: '#5a6a99',
        distance: 120,
        enable: true,
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        outModes: { default: 'bounce' },
        random: false,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: isMobile ? 25 : 80, // Menos partículas no mobile
      },
      opacity: { value: 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } },
    },
    detectRetina: true,
  };

  return (
    <div
      className="absolute top-0 left-0 w-full h-full -z-10"
      aria-hidden="true"
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particleOptions}
      />
    </div>
  );
};

export default ParticleBackground;
