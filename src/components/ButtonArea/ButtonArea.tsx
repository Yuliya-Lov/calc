import React from 'react';
import './ButtonArea.css';
import Button from '../Button/Button';
import {buttonArr} from '../../utils/constants';

function ButtonArea({ theme }: { theme: string }) {
  return (
    <section aria-label='Кнопки' className={`button-area button-area_theme_${theme}`}>
      {buttonArr.map((item, index) => {
        return <Button key={index} theme={theme} content={item} />
      })}
    </section>
  );
}

export default ButtonArea;
