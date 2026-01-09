// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark-gray'); // 'dark-gray' oder 'black'

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark-gray' ? 'black' : 'dark-gray');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
