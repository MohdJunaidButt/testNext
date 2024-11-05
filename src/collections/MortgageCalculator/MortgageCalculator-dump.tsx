import { GridContainer, Text } from '@/components';
import { Box, Grid, Slider, useMediaQuery } from '@mui/material';

import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Fragment, useEffect, useState } from 'react';

interface MortgageCalculatorProps {
  propertyPrice: string;
}

export default function MortgageCalculator({
  propertyPrice,
}: MortgageCalculatorProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const [monthlyRent, setMonthlyRent] = useState(5000);
  const [homePricePercentage, setHomePricePercentage] = useState(10);
  const [termPercentage, setTermPercentage] = useState(20);
  const [ratePercentage, setRatePercentage] = useState(30);
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(40);

  useEffect(() => {
    const LoanAmount =
      (+propertyPrice * homePricePercentage) / 100 -
      (+propertyPrice * downPaymentPercentage) / 100;

    setMonthlyRent(LoanAmount);
  }, [
    homePricePercentage,
    termPercentage,
    ratePercentage,
    downPaymentPercentage,
    propertyPrice,
  ]);

  return (
    <Box
      border={`1px solid ${colors.greyE1}`}
      borderRadius={'8px'}
      paddingRight={isMobile ? '10px' : '0px'}
      sx={{ paddingBottom: isMobile ? '20px' : '0px' }}
    >
      <GridContainer spacing={isMobile ? 1 : 4} justifyContent='flex-start'>
        <>
          <Grid item xs={12} sm={9} md={8} lg={8}>
            <GridContainer spacing={isMobile ? 1 : 2}>
              <>
                <Grid item xs={6}>
                  {renderMortgageTile({
                    currentSliderPosition: homePricePercentage,
                    changeSliderPosition: (event, newValue) => {
                      setHomePricePercentage(newValue as number);
                    },
                    title: 'Home Price',
                    description: (+propertyPrice * (homePricePercentage / 100))
                      .toFixed(0)
                      .toString(),
                    isMobile,
                  })}
                </Grid>
                <Grid item xs={6}>
                  {renderMortgageTile({
                    currentSliderPosition: termPercentage,
                    changeSliderPosition: (event, newValue) => {
                      setTermPercentage(newValue as number);
                    },
                    title: 'Term',
                    description:
                      (+20 * (termPercentage / 100)).toFixed(0).toString() +
                      ' Years',
                    isMobile,
                  })}
                </Grid>
                <Grid item xs={6}>
                  {renderMortgageTile({
                    currentSliderPosition: ratePercentage,
                    changeSliderPosition: (event, newValue) => {
                      setRatePercentage(newValue as number);
                    },
                    title: 'Rate',
                    description: `${ratePercentage} %`,
                    isMobile,
                  })}
                </Grid>
                <Grid item xs={6}>
                  {renderMortgageTile({
                    currentSliderPosition: downPaymentPercentage,
                    changeSliderPosition: (event, newValue) => {
                      setDownPaymentPercentage(newValue as number);
                    },
                    title: 'Down Payment',
                    description: (
                      +propertyPrice *
                      (downPaymentPercentage / 100)
                    )
                      .toFixed(0)
                      .toString(),
                    extraDescription: `${downPaymentPercentage} %`,
                    isMobile,
                  })}
                </Grid>
              </>
            </GridContainer>
          </Grid>
          <Grid item xs={12} sm={3} md={4} lg={4}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              flexDirection={'column'}
              border={`1px solid ${colors.greyE1}`}
              borderRadius={'8px'}
              height={isTab ? '88%' : '84%'}
              margin={isTab ? '15px 15px 15px 15px' : '20px 20px 0px 0px'}
              padding={isTab ? '20px' : '0px'}
            >
              <Text
                text={'$ ' + monthlyRent.toString()}
                token={
                  isTab ? tokens.FS32FW800LH43_71EB : tokens.FS32FW800LH43_71EB
                }
                color={colors.black21}
              />
              <Text
                text={'Monthly Rent'}
                token={tokens.FS16FW400LH18R}
                color={colors.black21}
              />
            </Box>
          </Grid>
        </>
      </GridContainer>
    </Box>
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
}

const renderMortgageTile = ({
  currentSliderPosition,
  changeSliderPosition,
  title,
  description,
  extraDescription = undefined,
  isMobile,
}: renderMortgageTileProps) => {
  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
      flexDirection={'column'}
      alignItems={'flex-start'}
      padding='15px'
    >
      <Text
        text={title}
        token={isMobile ? tokens.FS12FW500LH18M : tokens.FS14FW400LH19R}
        color={colors.grey96}
        textAlign='left'
      />
      <Box
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        marginTop={'10px'}
        width={'100%'}
      >
        <Text
          text={description}
          token={isMobile ? tokens.FS14FW600LH16SB : tokens.FS20FW800LH22_72EB}
          color={colors.black21}
          textAlign='left'
          styles={{ fontSize: { xs: '14px', sm: '18px' } }}
        />
        {extraDescription && (
          <Text
            text={extraDescription}
            token={
              isMobile ? tokens.FS14FW600LH16SB : tokens.FS20FW800LH22_72EB
            }
            color={colors.black21}
            textAlign='right'
            styles={{ fontSize: { xs: '14px', sm: '18px' } }}
          />
        )}
      </Box>
      <Slider
        aria-label={title}
        value={currentSliderPosition}
        onChange={changeSliderPosition}
        sx={{ marginTop: '10px' }}
      />
    </Box>
  );
};
