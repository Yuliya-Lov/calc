import React from 'react';
import './CalcShell.css';

function CalcShell({theme, children}:{theme:string, children: Array<React.ReactNode>}) {
    return (
        <main className={`calc-shell calc-shell_theme_${theme}`}>
          {children}
        </main>
    );
}

export default CalcShell;
