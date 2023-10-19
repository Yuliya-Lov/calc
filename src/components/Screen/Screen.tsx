import React from 'react';
import './Screen.css';

function Screen({ result, task, theme, changeTheme }: { result: string | undefined, task: Array<string | undefined>, theme: string, changeTheme(): void }) {
  return (
    <section aria-label='Экран' className='screen'>
      <button onClick={changeTheme} className={`screen__theme-button screen__theme-button_theme_${theme}`} />
      <form className='screen__form'>
        <p className='screen__line screen__line_type_task'>{task.join('')}</p>
        <p className={`screen__line screen__line_type_input screen__line_theme_${theme}`}>{result}</p>
      </form>

    </section>
  );
}

export default Screen;
