import { Text } from '@/components';
import HorizPropertyCard from '@/components/HorizPropertyCard/HorizPropertyCard';
import useCurrency from '@/hooks/useCurrency';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from '@/styles';
import { getAddress } from '@/utils/misc';
import { Avatar, Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  totalSearchedResults: number;
  properties: any;
  isLoading: boolean;
};

const CustomDrawer = ({
  totalSearchedResults = 0,
  properties,
  isLoading,
}: Props) => {
  const { convertCurrency } = useCurrency();
  const { t } = useTranslation();

  const [open, setOpen] = useState(true);
  const toggleOpen = () => setOpen((st) => !st);

  return (
    <Box
      sx={{
        ...(open ? { width: '550px' } : { width: '0px' }),
        position: 'absolute',
        transition: 'width 0.3s ease-in-out',
        top: 64,
        height: 'calc(100vh - 65px)',
        right: 0,
        zIndex: 1290,
      }}
    >
      <Box
        height='inherit'
        width='inherit'
        sx={{
          position: 'relative',
          backgroundColor: '#fff',
        }}
      >
        <Box
          onClick={toggleOpen}
          sx={{
            cursor: 'pointer',
            padding: '5px',
            width: '2.25rem',
            height: '4rem',
            position: 'absolute',
            top: '20%',
            left: '-34px',
            zIndex: 999,
            backgroundColor: colors.whiteFF,
            ...displayFlexAlignItemsCenterJustifyContentCenter,
            borderTopLeftRadius: '15px',
            borderBottomLeftRadius: '15px',
          }}
        >
          <Avatar
            src={
              open
                ? '/icons/chevron-right-2-black.svg'
                : '/icons/chevron-left-2-black.svg'
            }
            alt={'toggle sidebar'}
            sx={{ width: '13px', height: '13px' }}
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          {...flexDirection.column}
          alignItems={'start'}
          height='100%'
          width='100%'
          sx={{
            overflowY: 'auto',
          }}
        >
          {isLoading ? (
            <Box width={'100%'}>
              <Stack p={'20px'} width='100%'>
                <Box
                  mb={'5px'}
                  width='50%'
                  height='22px'
                  bgcolor={colors.greyDE}
                />
                <Box width='20%' height='17px' bgcolor={colors.greyDE} />
              </Stack>
              {[...Array(5)].map((_, ind) => (
                <Stack key={ind} direction='row' width='100%' p={'13px 20px'}>
                  <Box
                    flexShrink={0}
                    width='155px'
                    height='155px'
                    bgcolor={colors.greyDE}
                    borderRadius={'10px'}
                    overflow='hidden'
                  />
                  <Stack pl={'15px'} flex={'1 1 100%'} spacing={'10px'}>
                    <Stack
                      direction='row'
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Box width='60%' height='22px' bgcolor={colors.greyDE} />
                      <Box
                        width='25%'
                        height='32px'
                        bgcolor={colors.greyDE}
                        borderRadius={'16px'}
                      />
                    </Stack>
                    <Box width='50%' height='20px' bgcolor={colors.greyDE} />
                    <Box width='35%' height='25px' bgcolor={colors.greyDE} />
                    <Stack
                      direction='row'
                      alignItems={'center'}
                      spacing={'15px'}
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
              <Box p={'20px'}>
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
                sx={{ overflowY: 'auto', overflowX: 'hidden' }}
                width={'550px'}
              >
                {properties.length > 0 ? (
                  properties.map((property: any) => (
                    <HorizPropertyCard
                      key={property.id}
                      title={
                        property?.property_details.project_development_name
                      }
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
        </Box>
      </Box>
    </Box>
  );
};

export default CustomDrawer;
