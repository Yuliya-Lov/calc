import React from 'react';
import './CalcShell.css';
import Screen from '../Screen/Screen';
import ButtonArea from '../ButtonArea/ButtonArea';

function CalcShell({theme }: {theme:string}) {
    return (
        <main className={`calc-shell calc-shell_theme_${theme}`}>
            <Screen/>
            <ButtonArea theme={theme}/>
        </main>
    );
}

export default CalcShell;
