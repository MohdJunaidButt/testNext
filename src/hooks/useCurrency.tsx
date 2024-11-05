import {
  formatPrice,
  getMyPriceFromString,
} from '@/commonFunctions/commonFunctions';
import { RootState } from '@/store';
import { getDecimalPlaces } from '@/utils/misc';
import { useSelector } from 'react-redux';

const useCurrency = () => {
  const { currency } = useSelector((st: RootState) => st.Auth);

  const convertCurrency = (
    price: number | string | undefined,
    isPriceFormat: boolean = false,
    invalidFormat: '-' | '$0' | '$XXX,XXX' = '-'
  ) => {
    if (
      price === '0' ||
      price === '-' ||
      !price ||
      isNaN(getMyPriceFromString(`${price}`))
    )
      return invalidFormat === '$0'
        ? `${currency.symbol}0`
        : invalidFormat === '$XXX,XXX'
        ? `${currency.symbol}XXX,XXX`
        : invalidFormat;

    let priceExt = getMyPriceFromString(`${price}`);
    return isPriceFormat
      ? formatPrice(
          (currency.value * priceExt).toFixed(getDecimalPlaces(priceExt)),
          currency.symbol
        )
      : (currency.value * priceExt).toFixed(getDecimalPlaces(priceExt));
  };

  const convPricToDefCurr = (price: number | string) => {
    if (isNaN(getMyPriceFromString(`${price}`))) return price;
    let priceExt = getMyPriceFromString(`${price}`);
    return Math.round(priceExt / currency.value);
  };

  return { convertCurrency, currSymbol: currency.symbol, convPricToDefCurr };
};

export default useCurrency;
