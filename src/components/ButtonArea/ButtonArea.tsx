import React from 'react';
import './ButtonArea.css';
import Button from '../Button/Button';
import { subtraction } from '../../assets/subtraction.svg';
import { division } from '../../assets/division.svg';
import { multiplication } from '../../assets/multiplication.svg';
import { addition } from '../../assets/addition.svg';
import { equal } from '../../assets/equal.svg';

function ButtonArea({theme}: {theme: string}) {
  interface Content {
    label: string | HTMLImageElement;
    value?: string ;
  }
 /*  const labelsArr: Array<Content> = [
    {
      label: 'C',
    },
    {}
    'C', '()', '%', '/', '7', '8', '9'] */
  return (
    <section aria-label='Кнопки'>
      <Button theme={theme} />
    </section>
  );
}

export default ButtonArea;
