export const cleaner = (task: string): string => task = '';
export const deleteLast = (task: string): string => task = task.slice(0, task.length - 1);


export const writeTask = (task: string, simb: string): string => {
  const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
  const actions = ['+', '-', '*', '/'];
  const converters = ['+/-', '%'];
  if (task.length === 0) {
    if (nums.includes(simb) && !(simb !== '.')) {
      return task.concat(simb);
    }
    return task;
  }

  if (task.length > 0) {
    const endSimb = task[task.length - 1];
    if (nums.includes(endSimb)) {
      if (nums.includes(simb)) {
        return task.concat(simb);
      }
      if (actions.includes(simb)) {
        endSimb === '.'
          ? deleteLast(task).concat(' ', simb)
          : task.concat(' ', simb);
      }
      if (converters.includes(simb)) {
        endSimb === '.'
          ? deleteLast(task).concat(' ', simb)
          : task.concat(' ', simb);
      }
      if (nums.includes(simb)) {
        return task.concat(simb);
      }
    }
    return task;
  }
  return task;
}
