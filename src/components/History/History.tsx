import { ReactNode } from 'react';
import './History.css';

function History({theme, historyArr, clearHistory }: { theme: string, historyArr: Array<string>, clearHistory() :void}) {
  return (
    <section aria-label='История вычислений' className={`history history_theme_${theme}`}>
      <ul className={`history__list history__list_theme_${theme}`}>
        {historyArr.map((item: string): ReactNode => {
          return (
            <li key={Math.floor(Math.random()*10000)} className={`history__item history__item_theme_${theme}`}>{item}</li>
          )
        })
        }
      </ul>
      <button onClick={clearHistory} className={`history__clean-button history__clean-button_theme_${theme}`}>Отчистить историю</button>
    </section>
  );
}

export default History;
