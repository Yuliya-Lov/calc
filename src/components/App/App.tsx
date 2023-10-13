import React from 'react';
import './App.css';
import { CurrentThemeContext } from '../../contexts/CurrentThemeContext';
import CalcShell from '../CalcShell/CalcShell';

function App() {
  const [theme, setTheme] = React.useState('light');

  function changeTheme(): void {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return (
    <CurrentThemeContext.Provider value={theme}>
      <div className={`app app_theme_${theme}`}>
        <CalcShell theme={theme} changeTheme={changeTheme}/>
      </div>
    </CurrentThemeContext.Provider>
  )
}

export default App
