import React from 'react';
import './ButtonArea.css';

function ButtonArea({ theme, children }: { theme: string, children: Array<React.ReactNode> }) {
  return (
    <section aria-label='Кнопки' className={`button-area button-area_theme_${theme}`}>
      {children}
    </section>
  );
}

export default ButtonArea;
