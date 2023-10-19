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
  cleaner,
  equalizer
} from '../../utils/constants';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<string>('light');
  const [currentItem, setCurrentItem] = React.useState<string>('0');
  const [currentPair, setCurrentPair] = React.useState<Array<string>>([]);
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
      if (num2 === '0') return 'Деление на ноль невозможно';
      return (+num1 / +num2).toString();
    }
    else {
      return 'Результат не определен'
    }
  }

  function setInitialState(): void {
    setTask([])
    setResult('0');
    setInterimResult(undefined);
    setCurrentItem('');
  }
  function deleteLast(): void {
    if (currentItem !== '0') {
      setCurrentItem('0'),
        setResult('0')
    }
  }

  function getResult(): void {
    if (task.length > 1) {
      const pair = task.slice(task.length - 4, task.length - 1).filter(i => i !== ' ')
      console.log('pair', pair)
      const activePair = interimResult
        ? [interimResult, pair[1], currentItem]
        : [...pair, currentItem]
      setInterimResult(handlePair(activePair))
      setResult(handlePair(activePair))
    } else {
      setResult(currentItem);
    }
  }

  function handleAction(action: string): void {
    if (currentItem !== '') {
      getResult();
      setTask([...task, currentItem, ' ', action, ' ']);
      setCurrentItem('');
    } else {
      if (task.length > 3) {
        setTask(task.map((i, index) => {
          if (index === task.length - 2) {
            return action
          } else {
            return i;
          }
        }));
      }
    }
  }

  function handleEqualizer(equalizer: string): void {
    if (task.length > 0) {
      getResult();
      console.log(task.concat(currentItem, equalizer));
      setCurrentItem(result);
    } else {
      setResult(task[0]);
      setCurrentItem(task[0]);
    }
    setTask([]);
    setInterimResult(undefined);
  }

  function handleNum(num: string): void {
    const newNum = currentItem.length < 16 ? currentItem.concat(num.toString()) : currentItem;
    if (currentItem === '0' || currentItem === '') {
      if (num.includes('0')) {
        setCurrentItem('0');
        setResult('0')
      } else {
        setCurrentItem(num);
        setResult(num);
      }
    } else {
      setCurrentItem(newNum);
      setResult(newNum)
    }
  }


  function handleConverter(converter: string): void {
    if (converter === '+/-' && currentItem) {
      setCurrentItem((+currentItem * -1).toString());
      setResult((+currentItem * -1).toString());
    }
    if (converter === '%') {
      if (task.length > 3) {
        const newNum = interimResult ? +interimResult * +currentItem / 100 : +task[task.length - 4] * +currentItem / 100;
        setCurrentItem(newNum.toString());
        setResult(newNum.toString())
      }
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
        setInitialState()
      }
      if (val === equalizer) {
        handleEqualizer(val)
      }
    }
  }


  return (
    <CurrentThemeContext.Provider value={theme}>
      <div className={`app app_theme_${theme}`}>
        <CalcShell theme={theme}>
          <Screen result={result} task={task} theme={theme} changeTheme={changeTheme} />
          <ControlPanel theme={theme} toggleHistory={toggleHistory} deleteLast={deleteLast} />
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
