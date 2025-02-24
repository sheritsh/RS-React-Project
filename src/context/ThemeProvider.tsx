import React, { useState, useEffect } from 'react';
import { Theme } from './ThemeTypes';
import { ThemeContext } from './useTheme';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={
          theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
