// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isBlack, setIsBlack] = useState(false);

  const toggleTheme = () => {
    setIsBlack((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isBlack, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
