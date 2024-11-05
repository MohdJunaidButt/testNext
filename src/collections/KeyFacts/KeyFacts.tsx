import { GridContainer, Text } from '@/components';
import useCurrency from '@/hooks/useCurrency';
import { colors, tokens } from '@/styles';
import { SingleCondo } from '@/types/common/condos';
import { extractNumberFromString } from '@/utils/misc';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import KeyFactsTile from '../KeyFactsTile/KeyFactsTile';
export default function KeyFacts({ condo }: SingleCondo) {
  const { t } = useTranslation();
  const { convertCurrency } = useCurrency();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  console.log('condo', condo);
  const keyFacts = [
    {
      image: '/icons/percentage.svg',
      title: 'Tax',
      description: condo?.property_details?.est_property_tax,
    },
    {
      image: '/icons/building.svg',
      title: 'Listing Type',
      description: condo?.property_details?.listing_type,
    },
    {
      image: '/icons/calender.svg',
      title: 'Occupancy',
      description: condo?.property_details?.occupancy,
    },
    {
      image: '/icons/developmentStatus.svg',
      title: 'Development Status',
      description: condo?.property_details?.construction_status,
    },
    {
      image: '/icons/garage.svg',
      title: 'Parking',
      description: convertCurrency(
        condo?.property_details?.parking_cost,
        true,
        '-'
      ),
    },
    {
      image: '/icons/house-with-basement.svg',
      title: 'Building Maint. Fee',
      description: convertCurrency(
        condo?.property_details?.building_maint_fee,
        true,
        '-'
      ),
    },
    {
      image: '/icons/house-with-basement.svg',
      title: 'Last Updated',
      description: condo?.property_details?.last_updated_date,
    },
    {
      image: '/icons/data-source.svg',
      title: 'Locker Cost',
      description: convertCurrency(
        condo?.property_details?.locker_cost,
        true,
        '-'
      ),
    },
  ];

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text={t('Key Facts')}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        color={colors.black21}
        textAlign='left'
        styles={{
          marginBottom: isMobile ? '10px' : '15px',
          fontSize: isMobile ? '16px' : '18px',
        }}
      />
      <GridContainer spacing={isMobile ? 1 : 1.5} justifyContent='flex-start'>
        <>
          {keyFacts.map((keyFact, index) => (
            <Grid key={index} item xs={6} sm={4} xl={3}>
              <KeyFactsTile
                image={keyFact.image}
                description={keyFact.description as string}
                title={t(keyFact.title)}
              />
            </Grid>
          ))}
        </>
      </GridContainer>
    </Box>
  );
}
