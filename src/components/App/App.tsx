import React from 'react';
import { Routes, Route, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import { CurrentThemeContext } from '../../contexts/CurrentThemeContext';
import CalcShell from '../CalcShell/CalcShell';
import Screen from '../Screen/Screen';
import ButtonArea from '../ButtonArea/ButtonArea';
import ControlPanel from '../ControlPanel/ControlPanel'
import History from '../History/History'


function App() {
  const location = useLocation();
  const navigate = useNavigate()
  const [theme, setTheme] = React.useState('light');
  const exArr=['1 + 2 = 4', 'foo']

  function changeTheme(): void {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  function toggleHistory(): void {
    console.log(location);
    if (location.pathname === '/') {
      navigate('/history', {replace: true});
    } else {
      navigate('/', {replace: true});
    }
  }



  return (
    <CurrentThemeContext.Provider value={theme}>
      <div className={`app app_theme_${theme}`}>
        <CalcShell theme={theme}>
          <Screen theme={theme} changeTheme={changeTheme} />
          <ControlPanel theme={theme} toggleHistory={toggleHistory} />
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
