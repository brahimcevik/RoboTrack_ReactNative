import React, { createContext, useState, useContext } from 'react';

// Theme context oluşturma
export const ThemeContext = createContext();

// Theme provider bileşeni
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  // Tema değiştirme fonksiyonu
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook - diğer bileşenlerde kullanmak için
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
