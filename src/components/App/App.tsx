import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { CurrentThemeContext } from '../../contexts/CurrentThemeContext';
import CalcShell from '../CalcShell/CalcShell';
import Screen from '../Screen/Screen';
import ButtonArea from '../ButtonArea/ButtonArea';
import ControlPanel from '../ControlPanel/ControlPanel'
import History from '../History/History'

function App() {
  const [theme, setTheme] = React.useState('light');
  const exArr=['1 + 2 = 4', 'foo']

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
        <CalcShell theme={theme}>
          <Screen theme={theme} changeTheme={changeTheme} />
          <ControlPanel theme={theme} />
          <Routes>
            <Route path='/' element={
              <ButtonArea theme={theme} />
            }/>
            <Route path='/history' element={
              <History theme={theme} exArr={exArr}/>
            }/>

          </Routes>
        </CalcShell>
      </div>
    </CurrentThemeContext.Provider>
  )
}

export default App
