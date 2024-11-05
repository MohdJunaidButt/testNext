export const getPriceAccToCurrency = (
  price: number | string,
  currency: number
) => {
  if (typeof price === 'string') {
    if (isNaN(+price)) return '0';
    else return (currency * +price).toFixed(0);
  }
  if (typeof price === 'number') return (currency * +price).toFixed(0);
  return price;
};
