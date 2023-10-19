import React from 'react';
import './Button.css';
import {Content} from '../../types/intefaces';

function Button({theme, content}: {theme: string, content: Content}) {
    return (
        <button className={`button button_visual_${content.visual} button_theme_${theme}`}>{
          content.label
          ? <img src={content.label} alt={content.value}/>
          : content.value}
          </button>
    );
}

export default Button;
