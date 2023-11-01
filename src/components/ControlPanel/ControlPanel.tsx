import React from 'react';
import { useLocation } from 'react-router-dom';
import './ControlPanel.css'

function ControlPanel({ theme, toggleHistory, deleteLast }: { theme: string, toggleHistory(): void, deleteLast(): void }) {
  const location = useLocation();
  const deleteButtonStyles = (): string => {
    console.log(location.pathname === '/history')
    return location.pathname === 'history'
      ? `panel__button  panel__button_theme_${theme} panel__button_return-calc`
      : `panel__button  panel__button_type_history panel__button_theme_${theme}`
  }

  React.useEffect(() => {
    deleteButtonStyles()
  }, [location.pathname])
  return (
    <div className='panel'>
      <button onClick={toggleHistory} className={`panel__button  ${location.pathname === '/history' ? 'panel__button_return-calc' : 'panel__button_type_history'} panel__button_theme_${theme}`} aria-label='Показать или скрыть историю вычислений'></button>
      <button onClick={deleteLast} className={`panel__button panel__button_type_delete panel__button_theme_${theme}`} aria-label='Удалить последний символ'></button>
    </div>
  );
}

export default ControlPanel;
