import React from 'react';
import './Screen.css';

function Screen({ theme, changeTheme }: { theme: string, changeTheme(): void }) {
  return (
    <section aria-label='Экран' className='screen'>
      <button onClick={changeTheme} className={`screen__theme-button screen__theme-button_theme_${theme}`} />
      <form className='screen__form'>
        <p className='screen__line screen__line_type_task'>1 + 1222233 - 3334 + 3353535 + 5566.565 + 44444 + 54444545</p>
        <input className={`screen__line screen__line_type_input screen__line_theme_${theme}`} autoFocus/>
      </form>

    </section>
  );
}

export default Screen;
