import React from 'react';
import './ControlPanel.css'

function ControlPanel({ theme, toggleHistory }: { theme: string, toggleHistory():void}) {
  return (
    <div className='panel'>
      <button onClick={toggleHistory} className={`panel__button  panel__button_type_history panel__button_theme_${theme}`} aria-label='Показать или скрыть историю вычислений'></button>
      <button className={`panel__button panel__button_type_delete panel__button_theme_${theme}`} aria-label='Удалить последний символ'></button>
    </div>
  );
}

export default ControlPanel;
