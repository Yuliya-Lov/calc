import React from 'react';
import './ButtonArea.css';
import Button from '../Button/Button';
import {buttonArr} from '../../utils/constants';

function ButtonArea({ theme, handleSimbol}: { theme: string, handleSimbol(e:React.MouseEvent<HTMLButtonElement>): void}) {
  return (
    <section aria-label='Кнопки' className={`button-area button-area_theme_${theme}`}>
      {buttonArr.map((item, index) => {
        return <Button key={index} theme={theme} content={item} handleSimbol={handleSimbol} />
      })}
    </section>
  );
}

export default ButtonArea;
