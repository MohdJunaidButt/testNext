import { Text } from '@/components';
import HorizPropertyCard from '@/components/HorizPropertyCard/HorizPropertyCard';
import useCurrency from '@/hooks/useCurrency';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from '@/styles';
import { getAddress } from '@/utils/misc';
import { Box, IconButton, Stack, SwipeableDrawer } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  totalSearchedResults: number;
  properties: any;
  isLoading: boolean;
  open: boolean;
  toggleOpen: () => void;
};

const ListViewDrawer = ({
  totalSearchedResults = 0,
  properties,
  isLoading,
  open,
  toggleOpen,
}: Props) => {
  const { convertCurrency } = useCurrency();
  const { t } = useTranslation();

  return (
    <SwipeableDrawer
      anchor={'right'}
      open={open}
      onClose={toggleOpen}
      onOpen={toggleOpen}
      sx={{
        '& .MuiDrawer-paper': {
          ...displayFlexAlignItemsCenterJustifyContentFlexStart,
          ...flexDirection.column,
          alignItems: 'flex-start',
          width: { xs: '100%', sm: '550px' },
        },
      }}
    >
      <IconButton
        onClick={toggleOpen}
        sx={{
          position: 'absolute',
          top: 20,
          right: 10,
        }}
      >
        <Image
          src={'/icons/close.svg'}
          alt='image'
          width={13}
          height={13}
          sizes='100%'
          style={{ height: '100%' }}
          loading='eager'
        />
      </IconButton>
      {isLoading ? (
        <Box width={'100%'}>
          <Stack width='100%' sx={{ padding: { xs: '13px', sm: '20px' } }}>
            <Box mb={'5px'} width='50%' height='22px' bgcolor={colors.greyDE} />
            <Box width='20%' height='17px' bgcolor={colors.greyDE} />
          </Stack>
          {[...Array(5)].map((_, ind) => (
            <Stack
              key={ind}
              direction='row'
              width='100%'
              sx={{ padding: { xs: '13px', sm: '13px 20px' } }}
            >
              <Box
                flexShrink={0}
                bgcolor={colors.greyDE}
                borderRadius={'10px'}
                overflow='hidden'
                sx={{
                  width: { xs: '120px', sm: '155px' },
                  height: { xs: '120px', sm: '155px' },
                }}
              />
              <Stack pl={'15px'} flex={'1 1 100%'} spacing={'10px'}>
                <Stack
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: '10px',
                  }}
                >
                  <Box
                    height='22px'
                    bgcolor={colors.greyDE}
                    sx={{
                      width: { xs: '80%', sm: '60%' },
                    }}
                  />
                  <Box
                    height='32px'
                    bgcolor={colors.greyDE}
                    borderRadius={'16px'}
                    sx={{
                      width: { xs: '35%', sm: '25%' },
                      height: { xs: '27px', sm: '32px' },
                    }}
                  />
                </Stack>
                <Box width='60%' height='20px' bgcolor={colors.greyDE} />
                <Box width='35%' height='25px' bgcolor={colors.greyDE} />
                <Stack
                  direction='row'
                  alignItems={'center'}
                  spacing={'15px'}
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                  }}
                >
                  <Box width='19%' height='13px' bgcolor={colors.greyDE} />
                  <Box width='19%' height='13px' bgcolor={colors.greyDE} />
                </Stack>
                <Box width='60%' height='17px' bgcolor={colors.greyDE} />
              </Stack>
            </Stack>
          ))}
        </Box>
      ) : (
        <>
          <Box
            sx={{
              padding: { xs: '13px', sm: '20px' },
            }}
          >
            <Text
              text={t('Searched listings on map')}
              token={tokens.FS16FW600LH21_86R}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={`${totalSearchedResults.toString()} ${t('results')}`}
              token={tokens.FS14FW500LH19R}
              color={colors.grey96}
              textAlign='left'
              styles={{ marginTop: '5px' }}
            />
          </Box>
          <Box
            sx={{
              overflowY: 'auto',
              overflowX: 'hidden',
              width: 'auto',
            }}
          >
            {properties.length > 0 ? (
              properties.map((property: any) => (
                <HorizPropertyCard
                  key={property.id}
                  title={property?.property_details.project_development_name}
                  priceFrom={convertCurrency(
                    property.property_details.sales_price_from,
                    true,
                    '$XXX,XXX'
                  )}
                  priceTo={convertCurrency(
                    property.property_details.sales_price_to,
                    true,
                    '$XXX,XXX'
                  )}
                  totalFloors={property?.property_details.total_floor_plans.toString()}
                  availableFloors={
                    property.property_details.available_plans_dynamic
                  }
                  address={getAddress(
                    property.property_details.address,
                    property.property_details.city
                  )}
                  status={
                    property?.property_details.selling_category
                      ? property?.property_details.selling_category === '-'
                        ? property?.property_details.selling_status
                        : property?.property_details.selling_status
                      : property?.property_details.selling_status
                  }
                  slug={property.property_details.slug}
                  image={
                    (property?.featured_building_images?.[0]?.url !== '-' &&
                      property?.featured_building_images?.[0]?.url) ||
                    '/images/property/coming-soon.jpg'
                  }
                />
              ))
            ) : (
              <Text
                text={t('No listing found against searched criteria')}
                token={tokens.FS16FW500LH21_86R}
                color={colors.grey96}
                textAlign='center'
                styles={{ marginTop: '20px' }}
              />
            )}
          </Box>
        </>
      )}
    </SwipeableDrawer>
  );
};

export default ListViewDrawer;
