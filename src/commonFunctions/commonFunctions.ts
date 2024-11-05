export function formatPrice(
  price: string | number | undefined,
  currSymbol: string,
  returnInvalid?: string | undefined
): string {
  try {
    if (price == '0' || price == '-' || !price) return returnInvalid || '-';
    price = typeof price === 'number' ? price.toString() : price;
    if (price) {
      let newPrice = `${price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
      if (!newPrice.startsWith(currSymbol))
        newPrice = `${currSymbol}${newPrice}`;
      return newPrice;
    }
    return '';
  } catch (e) {
    if (price != undefined) return price.toString();
    return '';
  }
}

export const isPriceValid = (from: string, to: string) => {
  if (from === '' || to === '') return false;
  if (from && parseInt(from) === 0) return false;
  if (to && parseInt(to)) return false;
  return true;
};

export const getMyPriceFromString = (str: string): number => {
  let price: any = str.replace(/[$,]/g, '');
  price = parseFloat(price);
  if (isNaN(price)) return 0;
  return price;
};

export const changeSpacestoUnderscore = (str: string) => {
  return str.replace(/\s/g, '_');
};
export const getAvg = (arr: any[]) => {
  try {
    if (arr.length === 0) {
      return 0;
    }
    //     change all strings to numbers
    arr = arr.map((item) => {
      if (typeof item === 'string') {
        return parseFloat(item);
      }
      return item;
    });

    return arr.reduce((a, b) => a + b, 0) / arr.length;
  } catch (e) {
    return 0;
  }
};
