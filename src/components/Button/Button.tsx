import React from 'react';
import './Button.css';

function Button({theme}: {theme: string}) {
    return (
        <button className={`button button_theme_${theme}`}>7</button>
    );
}

export default Button;
