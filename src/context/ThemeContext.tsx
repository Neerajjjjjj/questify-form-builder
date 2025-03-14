
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'default' | 'purple' | 'green' | 'orange' | 'blue';
type ThemeContextType = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeType>('default');
  
  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('form-builder-theme');
    if (savedTheme && ['default', 'purple', 'green', 'orange', 'blue'].includes(savedTheme)) {
      setTheme(savedTheme as ThemeType);
    }
  }, []);
  
  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('form-builder-theme', theme);
    
    // Apply theme classes to the document
    document.documentElement.classList.remove('theme-default', 'theme-purple', 'theme-green', 'theme-orange', 'theme-blue');
    document.documentElement.classList.add(`theme-${theme}`);
  }, [theme]);
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
