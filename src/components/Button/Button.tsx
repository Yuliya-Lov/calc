import React from 'react';
import './Button.css';
import { Content } from '../../types/intefaces';

function Button({ theme, content, handleSimbol }: { theme: string, content: Content, handleSimbol(val: string): void }) {

  function handleButtonSimbol(e: React.MouseEvent<HTMLButtonElement>): void {
    const val = e.currentTarget.value;
    console.log(val)
    handleSimbol(val);
  }
  return (
    <button type="button" value={content.value} onClick={handleButtonSimbol} className={`button button_visual_${content.visual} button_theme_${theme}`}>{
      content.label
        ? <img src={content.label} alt={content.value} />
        : content.value}
    </button>
  );
}

export default Button;
