import React, { useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import Footer from './Footer';
import Header from './Header';
import './themeColor.css';

export default function App() {
  const [themeColor, setThemeColor] = useState('dark');

  function toggleTheme() {
    setThemeColor(themeColor === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={ { color: themeColor, toggleTheme } }>
      <div className={ `app ${themeColor}` }>
        <Header />
        <Image />
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}
