import React from 'react';
import './ButtonArea.css';
import Button from '../Button/Button';
import  subtraction  from '../../assets/subtraction.svg';
import division  from '../../assets/division.svg';
import  multiplication  from '../../assets/multiplication.svg';
import addition  from '../../assets/addition.svg';
import  equal  from '../../assets/equal.svg';

function ButtonArea({ theme }: { theme: string }) {
  interface Content {
    label?: string,
    value: string,
  }
  const buttonArr: Array<Content> = [
    { value: 'C' },
    { value: '( )' },
    { value: '%' },
    {
      label: division,
      value: ' / '
    },
    { value: '7' },
    { value: '8' },
    { value: '9' },
    {
      label: multiplication,
      value: ' * '
    },
    { value: '4' },
    { value: '5' },
    { value: '6' },
    {
      label: subtraction,
      value: ' - '
    },
    { value: '1' },
    { value: '2' },
    { value: '3' },
    {
      label: addition,
      value: ' + '
    },
    {
      value: '+/-'
    },
    { value: '0' },
    { value: '.' },
    {
      label: equal,
      value: ' = '
    }]
  return (
    <section aria-label='Кнопки' className={`button-area button-area_theme_${theme}`}>
      {buttonArr.map((item, index) => {
        return <Button  key={index} theme={theme} content={item}/>
      })}
    </section>
  );
}

export default ButtonArea;
