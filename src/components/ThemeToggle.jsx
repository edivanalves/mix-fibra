import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
        document.documentElement.classList.remove('bg-blue-950', 'text-white');
        document.documentElement.classList.add('bg-gray-100', 'text-gray-900');
    } else {
        document.documentElement.classList.remove('bg-gray-100', 'text-gray-900');
        document.documentElement.classList.add('bg-blue-950', 'text-white');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="relative group">
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r ${theme === 'dark' ? 'from-yellow-500 to-orange-500' : 'from-indigo-500 to-purple-500'} rounded-2xl blur-sm transition-opacity duration-300 ${isHovered ? 'opacity-75' : 'opacity-0'}`} />
        
        <button
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          onClick={toggleTheme}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative flex items-center justify-center w-14 h-14 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${
            theme === 'dark' 
              ? 'bg-white/10 border-white/20 text-yellow-400 hover:bg-white/20 focus:ring-yellow-400' 
              : 'bg-black/10 border-black/20 text-indigo-600 hover:bg-black/20 focus:ring-indigo-400'
          }`}
        >
          <div className="relative">
            {theme === 'dark' ? (
              <Sun className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'rotate-180 scale-110' : ''}`} />
            ) : (
              <Moon className={`w-6 h-6 transition-transform duration-300 ${isHovered ? 'rotate-12 scale-110' : ''}`} />
            )}
          </div>
          
          {/* Tooltip */}
          <div className={`absolute right-full mr-3 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'}`}>
            {theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'}
            <div className="absolute top-1/2 -right-1 w-2 h-2 bg-black/80 rotate-45 -translate-y-1/2" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;