import React from 'react';
import './CalcShell.css';
import Screen from '../Screen/Screen';
import ButtonArea from '../ButtonArea/ButtonArea';

function CalcShell({theme, changeTheme }: {theme:string, changeTheme(): void}) {
    return (
        <main className={`calc-shell calc-shell_theme_${theme}`}>
            <Screen theme={theme} changeTheme={changeTheme}/>
            <ButtonArea theme={theme}/>
        </main>
    );
}

export default CalcShell;
