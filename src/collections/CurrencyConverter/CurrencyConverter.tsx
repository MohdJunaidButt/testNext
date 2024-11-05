/* eslint-disable react-hooks/exhaustive-deps */
import { updateCurrency } from '@/store/slices';
import { tokens } from '@/styles';
import { currencyList } from '@/utils/appInfo';
import { FormControl, MenuItem, Select as MuiSelect } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

type CurrencyValue = {
  label: string;
  id: string;
  value: string;
  symbol: string;
};

export default function CurrencyConverter() {
  let defCurrency = localStorage.getItem('currency');

  const [currencies] = useState<Array<CurrencyValue>>(currencyList);
  const dispatch = useDispatch();
  const [fromCurrency, setFromCurrency] = useState(
    (defCurrency && JSON.parse(defCurrency as string)?.label) || 'CAD'
  );
  const [converting, setConverting] = useState(false);

  // Conversion -> https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
  const handleChangeCurrency = async (e: any) => {
    // let oldCurrency = fromCurrency;
    setFromCurrency(e.target.value);
    setConverting(true);
    if (e.target.value === 'CAD') {
      dispatch(
        updateCurrency({
          label: e.target.value,
          value: 1.0,
          symbol: currencies.find((el) => el.value === e.target.value)?.symbol,
        })
      );
      localStorage.setItem(
        'currency',
        JSON.stringify({
          label: e.target.value,
          value: 1.0,
          symbol: currencies.find((el) => el.value === e.target.value)?.symbol,
        })
      );
      setConverting(false);
    } else {
      try {
        const { data } = await axios.get(
          `https://api.frankfurter.app/latest?amount=1&from=CAD&to=${e.target.value}`
        );
        dispatch(
          updateCurrency({
            label: e.target.value,
            value: parseFloat(data.rates[e.target.value].toFixed(2)),
            symbol: currencies.find((el) => el.value === e.target.value)
              ?.symbol,
          })
        );
        localStorage.setItem(
          'currency',
          JSON.stringify({
            label: e.target.value,
            value: parseFloat(data.rates[e.target.value].toFixed(2)),
            symbol: currencies.find((el) => el.value === e.target.value)
              ?.symbol,
          })
        );
      } catch (error) {
        console.error('Error Fetching', error);
      } finally {
        setConverting(false);
      }
    }
  };

  return (
    <FormControl
      variant='standard'
      sx={{
        justifyContent: 'center',
        '& .MuiMenu-paper': {
          boxShadow: 'none',
        },
      }}
    >
      <MuiSelect
        labelId='demo-simple-select-standard-label'
        id='demo-simple-select-standard'
        value={fromCurrency}
        onChange={handleChangeCurrency}
        label='Currency'
        sx={{
          '&::before,::after,svg': {
            display: 'none',
          },
          '& .MuiSelect-select': {
            padding: '0px !important',
          },
          ...tokens.FS12FW600LH16SG,
        }}
        disabled={converting}
      >
        {currencies.map((el, idx) => (
          <MenuItem
            key={`currency-${el.id}`}
            value={el.value}
            sx={{
              ...tokens.FS12FW600LH16SG,
              ...(idx < currencies.length - 1 && { paddingBottom: '10px' }),
            }}
          >
            {el.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
}
