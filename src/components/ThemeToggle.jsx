import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  // Inicializa o tema a partir do localStorage ou usa 'dark' como padrão
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  // Efeito para atualizar o atributo no HTML e o localStorage sempre que o tema mudar
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
    <div className="fixed top-4 right-4 z-50">
      <button
        aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        onClick={toggleTheme}
        className="bg-blue-800 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-all text-xl"
      >
        <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
};

export default ThemeToggle;