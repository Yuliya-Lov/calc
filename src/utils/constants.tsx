import subtraction from '../assets/subtraction.svg';
import division from '../assets/division.svg';
import multiplication from '../assets/multiplication.svg';
import addition from '../assets/addition.svg';
import equal from '../assets/equal.svg';
import { Content } from '../types/intefaces';

export const buttonArr: Array<Content> = [
  {
    visual: 'red',
    value: 'C'
  },
  {
    visual: 'blue',
    value: '+/-'
  },
  {
    visual: 'blue',
    value: '%'
  },
  {
    visual: 'blue',
    label: division,
    value: '/'
  },
  {
    visual: 'standart',
    value: '7'
  },
  {
    visual: 'standart',
    value: '8'
  },
  {
    visual: 'standart',
    value: '9'
  },
  {
    visual: 'blue',
    label: multiplication,
    value: '*'
  },
  {
    visual: 'standart',
    value: '4'
  },
  {
    visual: 'standart',
    value: '5'
  },
  {
    visual: 'standart',
    value: '6'
  },
  {
    visual: 'blue',
    label: subtraction,
    value: '-'
  },
  {
    visual: 'standart',
    value: '1'
  },
  {
    visual: 'standart',
    value: '2'
  },
  {
    visual: 'standart',
    value: '3'
  },
  {
    visual: 'blue',
    label: addition,
    value: '+'
  },
  {
    visual: 'standart',
    value: '0'
  },
  {
    visual: 'standart',
    value: '00'
  },
  {
    visual: 'standart',
    value: '.'
  },
  {
    visual: 'blue-background',
    label: equal,
    value: '='
  }]

  export const nums: Array<string> = ['0', '00', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  export const actions: Array<string> = ['+', '-', '*', '/'];
  export const converters: Array<string> = ['+/-', '%'];

  export const cleaners:Array<string> = ['Escape','C', 'Backspace'];

  export const equalizers:Array<string> = ['=', 'Enter' ];
