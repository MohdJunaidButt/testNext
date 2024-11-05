import { formatPrice } from '@/commonFunctions/commonFunctions';
import { Text, TextInputWithBorder } from '@/components';
import Select from '@/components/Select/Select';
import { RootState } from '@/store';
import { colors, tokens } from '@/styles';
import {
  calcLandTransferTax,
  calculateAlbertaFees,
} from '@/utils/calcLandTransferTax';
import { getPriceAccToCurrency } from '@/utils/convertPriceByCurrency';
import { Box, Divider, Stack, Tooltip } from '@mui/material';
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';

export default function LandTransferCalculator() {
  const [price, setPrice] = useState('');
  const [mortgagePrice, setMortgagePrice] = useState('');
  const [province, setProvince] = useState('ontario');
  const [tax, setTax] = useState<number>(0);
  const { currency } = useSelector((st: RootState) => st.Auth);

  const handleCalculate = () => {
    if (price) {
      let calcTax = 0;
      if (province === 'alberta') {
        calcTax = calculateAlbertaFees(+price, +mortgagePrice);
      } else {
        calcTax = calcLandTransferTax(
          province,
          +getPriceAccToCurrency(price, +currency.value)
        );
      }
      setTax(+calcTax);
    } else setTax(0);
  };

  return (
    <Fragment>
      <form id='LTC-form' autoComplete='off'>
        <Stack>
          <TextInputWithBorder
            label='Price'
            onChange={(value) => {
              setPrice(value);
              setTimeout(() => {
                handleCalculate();
              }, 0);
            }}
            placeholder='Enter Price'
            borderRadius='10px'
            styles={{ flex: 1 }}
            size={'small'}
            type='number'
            value={price}
            startIcon={
              <Text
                text={currency.symbol}
                token={tokens.FS14FW600LH16SB}
                color={colors.black21}
                textAlign='left'
              />
            }
          />
          {province === 'alberta' && (
            <Box mt={'12px'}>
              <TextInputWithBorder
                label='Mortgage Price'
                onChange={(value) => {
                  setMortgagePrice(value);
                  setTimeout(() => {
                    handleCalculate();
                  }, 0);
                }}
                placeholder='Enter Price'
                borderRadius='10px'
                styles={{ flex: 1 }}
                size={'small'}
                type='number'
                value={mortgagePrice}
                startIcon={
                  <Text
                    text={currency.symbol}
                    token={tokens.FS14FW600LH16SB}
                    color={colors.black21}
                    textAlign='left'
                  />
                }
              />
            </Box>
          )}
          <Stack mt={'20px'} spacing={'7px'}>
            <Text
              text={'Location'}
              token={tokens.FS14FW600LH16SB}
              color={colors.black21}
              textAlign='left'
            />
            <Select
              label=''
              options={states}
              style={{ marginTop: '10px', width: '100%' }}
              size={'medium'}
              onChange={(value: string) => {
                setProvince(value);
                setTimeout(() => {
                  handleCalculate();
                }, 0);
              }}
              placeholder='select location'
              selectedId={1111}
            />
          </Stack>
          {/* <Stack
            mt={'20px'}
            spacing={'7px'}
            direction='row'
            alignItems={'center'}
          >
            <Checkbox
              // checked={false}
              // onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ p: 0 }}
            />
            <Text
              text={`I'm first home buyer`}
              token={tokens.FS14FW600LH16SB}
              color={colors.black21}
              textAlign='left'
            />
          </Stack> */}
          <Stack mt={'30px'} spacing={'10px'}>
            <Box
              display='grid'
              gridTemplateColumns={'repeat(2,1fr)'}
              gap={'20px'}
              alignItems={'center'}
              maxWidth={'320px'}
            >
              <Stack direction='row' spacing={'10px'} alignItems={'center'}>
                <Text
                  text={`Provincial`}
                  token={tokens.FS16FW600LH21_86R}
                  color={colors.black21}
                  textAlign='left'
                  styles={{
                    minWidth: '100px',
                  }}
                />
                <Tooltip
                  title={
                    'Land transfer tax (LTT), typically calculated as a percentage of the purchase price of a home, is required when purchasing a home in Canada. All provinces have a LTT, and the amount varies in each province.'
                  }
                  arrow
                >
                  <Image
                    src={'/icons/info.svg'}
                    width={20}
                    height={20}
                    alt={'info'}
                  />
                </Tooltip>
              </Stack>
              <Text
                text={
                  tax
                    ? formatPrice(tax, currency.symbol)
                    : `${currency.symbol}0`
                }
                token={tokens.FS18FW600LH18R}
                color={colors.black21}
                textAlign='right'
              />
              <Stack direction='row' spacing={'10px'} alignItems={'center'}>
                <Text
                  text={`+ Municipal`}
                  token={tokens.FS16FW600LH21_86R}
                  color={colors.black21}
                  textAlign='left'
                  styles={{
                    minWidth: '100px',
                  }}
                />
                <Tooltip
                  title={
                    'Some municipalities, like Toronto, levy an additional LTT, which is similarly calculated as a percentage of the purchase price of a home.'
                  }
                  arrow
                >
                  <Image
                    src={'/icons/info.svg'}
                    width={20}
                    height={20}
                    alt={'info'}
                  />
                </Tooltip>
              </Stack>
              <Text
                text={
                  tax && province === 'ontario'
                    ? formatPrice(tax, currency.symbol)
                    : `${currency.symbol}0`
                }
                token={tokens.FS18FW600LH18R}
                color={colors.black21}
                textAlign='right'
              />
              <Stack direction='row' spacing={'10px'} alignItems={'center'}>
                <Text
                  text={`- Rebate`}
                  token={tokens.FS16FW600LH21_86R}
                  color={colors.black21}
                  textAlign='left'
                  styles={{
                    minWidth: '100px',
                  }}
                />
                <Tooltip
                  title={
                    'If you are a first-time home buyer in British Columbia or Ontario, you will be eligible for LTT rebates, equal to the value of the LTT up to a maximum amount set by the province.'
                  }
                  arrow
                >
                  <Image
                    src={'/icons/info.svg'}
                    width={20}
                    height={20}
                    alt={'info'}
                  />
                </Tooltip>
              </Stack>
              <Text
                text={`${currency.symbol}0`}
                token={tokens.FS18FW600LH18R}
                color={colors.black21}
                textAlign='right'
              />
            </Box>
            <Divider />
            <Box
              display='grid'
              gridTemplateColumns={'repeat(2,1fr)'}
              gap={'20px'}
              alignItems={'center'}
              maxWidth={'320px'}
            >
              <Text
                text={`Land Transfer Tax`}
                token={tokens.FS16FW600LH21_86R}
                color={colors.blueC2}
                textAlign='left'
                styles={{
                  minWidth: '100px',
                }}
              />
              <Text
                text={
                  province === 'ontario'
                    ? formatPrice(tax + tax, currency.symbol)
                    : formatPrice(tax, currency.symbol) || `${currency.symbol}0`
                }
                token={tokens.FS18FW600LH18R}
                color={colors.blueC2}
                textAlign='right'
              />
            </Box>
          </Stack>
        </Stack>
      </form>
    </Fragment>
  );
}

const states = [
  // {
  //   id: 1122,
  //   label: 'Alberta',
  //   value: 'alberta',
  // },
  {
    id: 1111,
    label: 'Ontario',
    value: 'ontario',
  },
  {
    id: 1121,
    label: 'British Columbia',
    value: 'british-columbia',
  },
];
