import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentThemeContext } from '../../contexts/CurrentThemeContext';
import CalcShell from '../CalcShell/CalcShell';
import Screen from '../Screen/Screen';
import ButtonArea from '../ButtonArea/ButtonArea';
import ControlPanel from '../ControlPanel/ControlPanel'
import History from '../History/History';
import {
  nums,
  actions,
  converters,
  cleaner
} from '../../utils/constants';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<string>('light');
  const [currentItem, setCurrentItem] = React.useState<string>('');
  const [task, setTask] = React.useState<Array<string>>([]);
  const [result, setResult] = React.useState<string>('0');
  const [interimResult, setInterimResult] = React.useState<string | undefined>();
  const exArr = ['1 + 2 = 4', 'foo'];

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
      navigate('/history', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  function handlePair([num1, action, num2]: Array<string>): string {
    console.log(num1, action, num2);
    if (action === '+') {
      return (+num1 + +num2).toString();
    }
    if (action === '-') {
      return (+num1 - +num2).toString();
    }
    if (action === '*') {
      return (+num1 * +num2).toString();
    }
    if (action === '/') {
      if (num2 === '0') return 'Деление на ноль невозможно!';
      return (+num1 / +num2).toString();
    }
    else {
      return 'Результат не определен'
    }
  }

  function handleCleaner(): void {
    setTask([])
    setResult('0');
    setInterimResult(undefined);
    setCurrentItem('');
  }

  function handleAction(action: string): void {
    if (task.length > 1) {
      const pair = task.slice(task.length - 4, task.length - 1).filter(i => i !== ' ')
      console.log(pair)
      const activePair = interimResult
        ? [interimResult, pair[1], currentItem]
        : [...pair, currentItem]
      setInterimResult(handlePair(activePair))
      setResult(handlePair(activePair))
    } else {
      setResult(currentItem);
    }
    setTask([...task, currentItem, ' ', action, ' ']);
    setCurrentItem('');
  }

  function handleNum(num: string): void {
    const newNum = currentItem.length < 16 ? currentItem.concat(num.toString()) : currentItem;
    setCurrentItem(newNum);
    setResult(newNum)
  }

  function handleConverter(converter: string): void {
    console.log(converter)
    if (converter === '+/-') {
      setCurrentItem((+currentItem * -1).toString());
    }
    if (converter === '%') {
      console.log(currentItem, '%  от', task[task.length - 1])
    }
  }

  function handleSimbol(e: React.MouseEvent<HTMLButtonElement>): void {
    const val = e.currentTarget.value;
    if (val) {
      if (nums.includes(val)) {
        handleNum(val)
      }
      if (actions.includes(val)) {
        handleAction(val)
      }
      if (converters.includes(val)) {
        handleConverter(val)
      }
      if (val === cleaner) {
        handleCleaner()
      }
    }
  }



  return (
    <CurrentThemeContext.Provider value={theme}>
      <div className={`app app_theme_${theme}`}>
        <CalcShell theme={theme}>
          <Screen result={result} task={task} theme={theme} changeTheme={changeTheme} />
          <ControlPanel theme={theme} toggleHistory={toggleHistory} />
          <Routes>
            <Route path='/' element={
              <ButtonArea theme={theme} handleSimbol={handleSimbol} />
            } />
            <Route path='/history' element={
              <History theme={theme} exArr={exArr} />
            } />
          </Routes>
        </CalcShell>
      </div>
    </CurrentThemeContext.Provider>
  )
}

export default App;
