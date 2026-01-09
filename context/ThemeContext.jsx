import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-gray'); // 'black' oder 'dark-gray'

  const toggleTheme = () => {
    setTheme(prev => prev === 'black' ? 'dark-gray' : 'black');
  };

  useEffect(() => {
    document.body.className = theme === 'black' ? 'bg-black' : 'bg-gray-900';
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
