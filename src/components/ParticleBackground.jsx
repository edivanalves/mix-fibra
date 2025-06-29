import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Particles from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

const ParticleBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particleOptions = useMemo(() => ({
    background: { color: { value: 'transparent' } },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: !isMobile, mode: 'repulse' },
        resize: true,
      },
      modes: {
        repulse: { distance: 80, duration: 0.4 }
      },
    },
    particles: {
      color: { value: '#3b82f6' },
      links: {
        color: '#3b82f6',
        distance: 120,
        enable: true,
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 0.8,
        direction: 'none',
        outModes: { default: 'bounce' },
        random: false,
        straight: false
      },
      number: {
        density: { enable: true, area: 800 },
        value: isMobile ? 25 : 60,
      },
      opacity: { value: 0.3 },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 3 } }
    },
    detectRetina: true,
  }), [isMobile]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10" aria-hidden="true">
      <Particles id="tsparticles" init={particlesInit} options={particleOptions} />
    </div>
  );
};

export default ParticleBackground;
