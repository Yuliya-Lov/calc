import React from 'react';
import { ReactNode } from 'react';
import './History.css'

function History({theme, exArr }: { theme: string, exArr: Array<string> }) {
  return (
    <section aria-label='История вычислений' className={`history history_theme_${theme}`}>
      <ul className='history__list'>
        {exArr.map((item: string): ReactNode => {
          return (
            <li key={exArr.indexOf(item)} className={`history__item history__item_theme_${theme}`}>{item}</li>
          )
        })
        }
      </ul>
      <button className={`history__clean-button history__clean-button_theme_${theme}`}>Отчистить историю</button>
    </section>
  );
}

export default History;
