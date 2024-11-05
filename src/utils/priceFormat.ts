export const FormatNumber = (number: number): string => {
  if (number >= 1000000) {
    const formattedNumber = (number / 1000000).toFixed(2);
    return formattedNumber.endsWith('.00')
      ? formattedNumber.replace('.00', '') + 'M'
      : formattedNumber + 'M';
  } else if (number >= 1000) {
    const formattedNumber = (number / 1000).toFixed(2);
    return formattedNumber.endsWith('.00')
      ? formattedNumber.replace('.00', '') + 'K'
      : formattedNumber + 'K';
  } else {
    return number.toFixed(2).endsWith('.00')
      ? number.toFixed(0)
      : number.toFixed(2);
  }
};

export const formatNumber = (min: number, max: number) => {
  let minNew =
    min.toString()[0] +
    [...Array(min.toString().length - 1)].map(() => '0').join('');

  let maxNew =
    +max.toString()[1] > 5
      ? (+max.toString()[0] + 1).toString() +
        [...Array(max.toString().length - 1)].map(() => '0').join('')
      : `${max.toString()[0]}5` +
        [...Array(max.toString().length - 2)].map(() => '0').join('');

  return [+minNew, +maxNew];
};
