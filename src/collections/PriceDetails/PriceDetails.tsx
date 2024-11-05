import {
  formatPrice,
  getMyPriceFromString,
} from '@/commonFunctions/commonFunctions';
import { GridContainer, Text } from '@/components';
import useCurrency from '@/hooks/useCurrency';
import { RootState } from '@/store';
import { colors, tokens } from '@/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import KeyFactsTile from '../KeyFactsTile/KeyFactsTile';
export default function PriceDetails({
  selectedFloor,
  parkingCost,
  lockerCost,
  mtPerMonth,
}: any) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  // const { currency } = useSelector((st: RootState) => st.Auth);
  const { convertCurrency } = useCurrency();

  const keyFacts = [
    {
      image: '/icons/tag-dollar.svg',
      title: 'Price',
      description: ` ${convertCurrency(selectedFloor?.price, true, '$0')}`,
    },
    {
      image: '/icons/locker.svg',
      title: 'Locker Price',
      description: `${convertCurrency(lockerCost, true, '-')}`,
    },
    {
      image: '/icons/locker.svg',
      title: 'Building mt fee / month',
      description: `${mtPerMonth}`,
    },
    {
      image: '/icons/scale.svg',
      title: 'mt. fee /month',
      description: `${convertCurrency(
        selectedFloor?.maintenance_fee_per_month,
        true,
        '-'
      )}`,
    },
    {
      image: '/icons/garage.svg',
      title: 'Parking',
      description: `${convertCurrency(parkingCost, true, '-')}`,
    },
  ];
  return (
    <Box width={'100%'} marginTop={'35px'}>
      <Text
        text='Price Details'
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          marginBottom: isMobile ? '10px' : '15px',
          fontSize: isMobile ? '16px' : '18px',
        }}
        color={colors.black21}
        textAlign='left'
      />

      <GridContainer spacing={2} justifyContent='flex-start'>
        <>
          {keyFacts.map((keyFact, index) => (
            <Grid key={index} item xs={12} sm={6} md={6} lg={4} xl={3}>
              <KeyFactsTile
                image={keyFact.image}
                description={keyFact.description}
                title={keyFact.title}
              />
            </Grid>
          ))}
        </>
      </GridContainer>
    </Box>
  );
}
