import { formatPrice } from '@/commonFunctions/commonFunctions';
import { Text } from '@/components';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Slider, Stack, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface MortgageCalculatorProps {
  propertyPrice: string;
}

const calcMortgage = (
  actualPrice: number,
  term: number,
  rate: number,
  downPayment: number
) => {
  const prinLoanAmt = actualPrice - downPayment;
  const annualRate = (parseFloat((rate / 100).toFixed(2)) / 0.12).toFixed(2);
  const ratePowN = Math.pow(1 + parseFloat(annualRate), term * 12);
  return +(
    (prinLoanAmt * parseFloat(annualRate) * ratePowN) /
    (ratePowN - 1)
  ).toFixed(0);
};

export default function MortgageCalculator({
  propertyPrice,
}: MortgageCalculatorProps) {
  console.log('propertyPrice', propertyPrice);
  const { currency } = useSelector((st: RootState) => st.Auth);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const [monthlyRent, setMonthlyRent] = useState(5000);
  const [term, setTerm] = useState(20);
  const [ratePercentage, setRatePercentage] = useState(5);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(40);
  const [homePricePercentage, setHomePricePercentage] = useState(10);

  useEffect(() => {
    setMonthlyRent(
      calcMortgage(
        +propertyPrice * (homePricePercentage / 100),
        term,
        ratePercentage,
        +propertyPrice *
          (homePricePercentage / 100) *
          (downPaymentPercentage / 100)
      )
    );
  }, [
    term,
    ratePercentage,
    downPaymentPercentage,
    homePricePercentage,
    propertyPrice,
  ]);

  return (
    <Stack
      direction='row'
      spacing={'30px'}
      width='100%'
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Stack spacing={'13px'}>
        {renderMortgageTile({
          currentSliderPosition: homePricePercentage,
          changeSliderPosition: (_event, newValue) => {
            setHomePricePercentage(newValue as number);
          },
          title: 'Price',
          description:
            formatPrice(
              parseInt(
                (+propertyPrice * (homePricePercentage / 100)).toFixed(0)
              ),
              currency.symbol
            ) || propertyPrice,
          // description:
          //   formatPrice(
          //     parseInt(
          //       (+propertyPrice * (homePricePercentage / 100)).toFixed(0)
          //     ),
          //     currency.symbol
          //   ) || propertyPrice,
          isMobile,
          min: 0,
          max: 100,
        })}
        {renderMortgageTile({
          currentSliderPosition: term,
          changeSliderPosition: (_event, newValue) => {
            if (+newValue > 0) setTerm(newValue as number);
          },
          title: 'Amortization',
          description: term.toString() + ' yrs',
          isMobile,
          min: 1,
          max: 30,
        })}
        {renderMortgageTile({
          currentSliderPosition: ratePercentage,
          changeSliderPosition: (_event, newValue) => {
            if (+newValue > 0) setRatePercentage(newValue as number);
          },
          title: 'Rate',
          description: `${ratePercentage}%`,
          isMobile,
          min: 2,
          max: 10,
        })}
        {renderMortgageTile({
          currentSliderPosition: downPaymentPercentage,
          changeSliderPosition: (_event, newValue) => {
            if (+newValue > 0) setDownPaymentPercentage(newValue as number);
          },
          title: 'Down Payment',
          description: formatPrice(
            (
              +(+propertyPrice * (homePricePercentage / 100)).toFixed(0) *
              (downPaymentPercentage / 100)
            ).toFixed(0),
            currency.symbol
          )!,
          extraDescription: `${downPaymentPercentage}%`,
          isMobile,
          min: 1,
          max: 80,
        })}
      </Stack>
      <Stack spacing={'8px'} alignItems={'center'} borderRadius={'8px'}>
        <Text
          text={'Monthly Payment'}
          token={isMobile ? tokens.FS12FW600LH18M : tokens.FS14FW600LH16SB}
          color={colors.black21}
        />
        <Text
          text={formatPrice(monthlyRent, currency.symbol)}
          token={tokens.FS32FW800LH43_71EB}
          color={colors.black21}
          styles={{
            fontSize: { xs: '24px', sm: '28px' },
          }}
        />
      </Stack>
    </Stack>
  );
}

interface renderMortgageTileProps {
  changeSliderPosition: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  currentSliderPosition: number;
  title: string;
  description: string;
  extraDescription?: string;
  isMobile: boolean;
  min: number;
  max: number;
  steps?: number;
}

const renderMortgageTile = ({
  currentSliderPosition,
  changeSliderPosition,
  title,
  description,
  extraDescription = undefined,
  isMobile,
  min,
  max,
  steps = 1,
}: renderMortgageTileProps) => {
  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
      flexDirection={'column'}
      alignItems={'flex-start'}
      gap='3px'
      width={'inherit'}
    >
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        alignItems={'center'}
        gap={'3px'}
      >
        <Text
          text={title}
          token={isMobile ? tokens.FS12FW600LH18M : tokens.FS16FW600LH21_86SB}
          color={colors.black21}
          textAlign='left'
          styles={{
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: '20px',
          }}
        />
        <Text
          text={`(${
            extraDescription ? `${extraDescription} - ` : ''
          }${description})`}
          token={isMobile ? tokens.FS12FW600LH18M : tokens.FS20FW800LH22_72EB}
          color={colors.black21}
          textAlign='left'
          styles={{
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: '20px',
          }}
        />
      </Box>
      <Slider
        aria-label={title}
        value={currentSliderPosition}
        onChange={changeSliderPosition}
        step={steps}
        min={min}
        max={max}
        sx={{
          maxWidth: '240px',
          '&.MuiSlider-root': {
            padding: '15px 0',
          },
        }}
      />
    </Box>
  );
};
