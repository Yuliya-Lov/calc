import React from 'react';
import './Screen.css';

function Screen({ theme, changeTheme }: { theme: string, changeTheme(): void }) {
  return (
    <section aria-label='Экран' className='screen'>
      <button onClick={changeTheme} className={`screen__theme-button screen__theme-button_type_${theme}`} />
      <div className='screen__line-container'>
        <p className='screen__line screen__line_type_task'>1 + 12222333334 + 3353535 + 5566.565 + 44444 + r54444545</p>
        <p className={`screen__line screen__line_type_active screen__line_theme_${theme}`}>5</p>
      </div>

    </section>
  );
}

export default Screen;
