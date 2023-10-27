import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { CurrentThemeContext } from '../../contexts/CurrentThemeContext';
import CalcShell from '../CalcShell/CalcShell';
import Screen from '../Screen/Screen';
import ButtonArea from '../ButtonArea/ButtonArea';
import Button from '../Button/Button';
import ControlPanel from '../ControlPanel/ControlPanel'
import History from '../History/History';
import {
  buttonArr,
  nums,
  actions,
  converters,
  cleaners,
  equalizers,
} from '../../utils/constants';


function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = React.useState<string>('light');
  const [currentItem, setCurrentItem] = React.useState<string>('0');
  const [currentPair, setCurrentPair] = React.useState<Array<string>>([]);
  const [task, setTask] = React.useState<Array<string>>([]);
  const [result, setResult] = React.useState<string>('0');
  const data: string | null = localStorage.getItem('calc-history');
  const [historyArr, setHistoryArr] = React.useState<Array<string>>(typeof data === 'string' ? JSON.parse(data) : []);

  function changeTheme(): void {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  function toggleHistory(): void {
    if (location.pathname === '/') {
      navigate('/history', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }

  function handlePair([num1, action, num2]: Array<string>): string | number {
    console.log(num1, action, num2);
    if (action === '+') {
      return (+num1 + +num2);
    }
    if (action === '-') {
      return (+num1 - +num2);
    }
    if (action === '*') {
      return (+num1 * +num2);
    }
    if (action === '/') {
      if (num2 === '0') return 'Деление на ноль невозможно';
      return (+num1 / +num2);
    }
    else {
      return 'Результат не определен'
    }
  }

  function setInitialState(): void {
    setTask([]);
    setCurrentPair([]);
    setCurrentItem('0');
    setResult('0');
  }

  function deleteLastSimb(): void {
    if (currentItem.length <= 1) {
      setCurrentItem('0'),
        setResult('0')
    } else {
      setCurrentItem(currentItem.slice(0, currentItem.length - 1)),
        setResult(currentItem.slice(0, currentItem.length - 1))
    }
  }


  function clearHistory(): void {
    setHistoryArr([]);
  }

  function changeLastAction(action: string): void {
    setCurrentPair(currentPair.map((i, index) => {
      if (index === currentPair.length - 1) {
        return action
      } else {
        return i;
      }
    }))
    setTask(task.map((i, index) => {
      if (index === task.length - 2) {
        return action
      } else {
        return i;
      }
    }));
  }

  function handleAction(action: string): void {
    console.log('currentPair', currentPair)
    if (currentItem === '') {
      changeLastAction(action);
      if (currentPair.length === 1) {
        setCurrentPair([...currentPair, action])
        setTask([currentPair[0], ' ', action, ' '])
      }
    }
    if (currentItem.length > 0) {
      setTask([...task, currentItem, ' ', action, ' ']);
      if (currentPair.length === 0) {
        setCurrentPair([...currentPair, currentItem, action])
      }
      if (currentPair.length === 1) {
        setCurrentPair([currentItem, action])
      }
      if (currentPair.length === 2) {
        const actualResult = handlePair([...currentPair, currentItem]);
        if (typeof actualResult === 'number') {
          setCurrentPair([actualResult.toString(), action]);
          setResult(actualResult.toString())
        } else {
          setResult(actualResult);
          setTask([])
          setCurrentPair([]);
        }
      }
      setCurrentItem('');
    }
  }

  function handleEqualizer(): void {
    if (task.length === 0) {
      if (currentItem) {
        setResult(currentItem);
        setCurrentPair([currentItem]);
      } else {
        setResult('0');
        setCurrentPair(['0']);
      }
    }
    if (task.length > 0) {
      if (currentItem.length === 0) {
        setResult(currentPair[0]);
      } else {
        const actualResult = handlePair([...currentPair, currentItem]);
        if (typeof actualResult === 'number') {
          historyArr.length < 10
            ? setHistoryArr([task.concat(' ', currentItem, ' = ', actualResult.toString()).join(''), ...historyArr])
            : setHistoryArr([task.concat(' ', currentItem, ' = ', actualResult.toString()).join(''), ...historyArr.slice(0, historyArr.length - 1)])
          setCurrentPair([actualResult.toString()]);
          setCurrentItem('')
          setResult(actualResult.toString());
        } else {
          setResult(actualResult);
          setTask([])
          setCurrentPair([]);
        }
      }
    }
    setTask([]);
  }

  function handleNum(num: string): void {
    console.log(' выходящее значение currentItem', currentItem)
    console.log('видно ли в ф-ции значение: начало', num, typeof num)
    const newNum = currentItem.length < 16 ? currentItem.concat(num.toString()) : currentItem;
    if (currentItem === '0' || currentItem === '') {
      if (num.includes('0')) {
        setCurrentItem('0');
        setResult('0')
        return;
      } else if (num.includes('.')) {
        setCurrentItem('0.');
        setResult('0.')
        return;
      } else {
        setCurrentItem(num);
        setResult(num);
        console.log('видно ли в ф-ции значение: конец', num)
        return;
      }
    } else {
      if (num.includes('.') && currentItem.includes('.')) {
        setCurrentItem(currentItem);
        setResult(currentItem)
        return;
      } else {
        setCurrentItem(newNum);
        setResult(newNum)
        console.log('видно ли в ф-ции значение: конец', num)
        return;
      }
    }
  }


  function handleConverter(converter: string): void {
    if (converter === '+/-') {
      console.log(currentPair, 'currentPair')
      if (currentItem.length > 0) {
        setCurrentItem((+currentItem * -1).toString());
        setResult((+currentItem * -1).toString());
      }
      if (currentPair.length === 1) {
        setCurrentPair([(+currentPair[0] * -1).toString()])
        setResult((+currentPair[0] * -1).toString());
      }
    }
    if (converter === '%') {
      if (task.length > 3) {
        const newNum = +task[task.length - 4] * +currentItem / 100;
        setCurrentItem(newNum.toString());
        setResult(newNum.toString())
      }
    }
  }


  function handleSimbol(val: string): void {
    if (val) {
      if (nums.includes(val)) {
        handleNum(val)
        return;
      }
      if (actions.includes(val)) {
        handleAction(val)
        return;
      }
      if (converters.includes(val)) {
        handleConverter(val)
        return;
      }
      if (cleaners.includes(val)) {
        if (val === 'Backspace') {
          deleteLastSimb()
          return;
        } else {
          setInitialState()
          return;
        }
      }
      if (equalizers.includes(val)) {
        handleEqualizer()
        return;
      }
    }
  }

  function pointKeyValue(e: KeyboardEvent): void {
    handleSimbol(e.key)
  }

  React.useEffect(() => {
    localStorage.setItem('calc-history', JSON.stringify(historyArr));
  }, [historyArr])

  React.useEffect(() => {
    if (document.activeElement) {
      const focusEl: HTMLButtonElement = document.activeElement;
      focusEl.blur()
    }
    window.addEventListener('keydown', pointKeyValue);
    return () => {
      window.removeEventListener('keydown', pointKeyValue);
    }
  }, [pointKeyValue])


  return (
    <CurrentThemeContext.Provider value={theme}>
      <div className={`app app_theme_${theme}`}>
        <CalcShell theme={theme}>
          <Screen result={result} task={task} theme={theme} changeTheme={changeTheme} />
          <ControlPanel theme={theme} toggleHistory={toggleHistory} deleteLast={deleteLastSimb} />
          <Routes>
            <Route path='/' element={
              <ButtonArea theme={theme} >
                {buttonArr.map((item, index) => {
                  return <Button key={index} theme={theme} content={item} handleSimbol={handleSimbol} />
                })}
              </ButtonArea>
            } />
            <Route path='/history' element={
              <History theme={theme} historyArr={historyArr} clearHistory={clearHistory} />
            } />
          </Routes>
        </CalcShell>
      </div>
    </CurrentThemeContext.Provider>
  )
}

export default App;
