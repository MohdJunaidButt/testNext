/* eslint-disable react-hooks/exhaustive-deps */
import CitiesSearchableDropdown from '@/collections/ComingSoon/CitiesSearchableDropdown';
import { Text } from '@/components';
import Button from '@/components/Button/Button';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import { fetchHomePageComingSoonProperties } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  flexDirection,
  tokens,
} from '@/styles';
import { PropertyType } from '@/types/common/THomePage';
import { getPriceAccToCurrency } from '@/utils/convertPriceByCurrency';
import { Box, CircularProgress, Stack, useMediaQuery } from '@mui/material';
import { default as NextImage } from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function ComingSoon({ comingSoonPropertiesData, cities }: any) {
  const { convertCurrency } = useCurrency();
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [selectedButton, setSelectedButton] = useState('condos');
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [comingSoonCondos, setComingSoonCondos] = useState(
    comingSoonPropertiesData
  );
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();

  const router = useRouter();

  const handleSelectedButtonState = (value: string) => setSelectedButton(value);
  const handleSearch = async () => {
    setIsLoading(true);
    let fetchArgs: any = {
      type:
        selectedButton === 'condos' ? PropertyType.CONDO : PropertyType.HOUSE,
      selling_status: 'Registration',
      page: 1,
      limit: 16,
    };
    if (searchQuery)
      fetchArgs = {
        ...fetchArgs,
        city: searchQuery,
      };
    const newProperties = await fetchHomePageComingSoonProperties(fetchArgs);
    setComingSoonCondos(newProperties);
    setIsLoading(false);
  };

  useEffect(() => {
    if (initialLoad) return setInitialLoad(false);
    handleSearch();
  }, [searchQuery, selectedButton]);

  return (
    <Box my={isMobile ? '30px' : '40px'}>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentCenter}
        {...flexDirection.column}
        alignItems={isMobile ? 'flex-start' : 'center'}
      >
        <Text
          token={
            isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS48FW800LH61_49B
          }
          text={t('Coming Soon')}
          color={colors.black21}
          textAlign='left'
        />
        <Box
          mt={isMobile ? '10px' : '20px'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          width={isMobile ? '100%' : 'fit-content'}
        >
          <CitiesSearchableDropdown
            cities={cities}
            onSearch={(query: string) => setSearchQuery(query)}
            onResetSearch={() => setSearchQuery('')}
          />
        </Box>
        <Box
          mt={isMobile ? '10px' : '10px'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          justifyContent={'flex-start'}
        >
          <Button
            token={tokens.FS16FW500LH21_86R}
            variant={selectedButton === 'houses' ? 'black' : 'blackOutlined'}
            text={t('Houses')}
            onClick={() => handleSelectedButtonState('houses')}
            justifyContent='center'
            marginRight='10px'
          />
          <Button
            token={tokens.FS16FW500LH21_86R}
            variant={selectedButton === 'condos' ? 'black' : 'blackOutlined'}
            text={t('Condos')}
            onClick={() => handleSelectedButtonState('condos')}
            justifyContent='center'
            marginRight='10px'
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          mt={isMobile ? '10px' : '20px'}
          justifyContent={'flex-start'}
          alignItems={isMobile ? 'flex-start' : 'center'}
        >
          <Text
            color={colors.grey8F}
            token={tokens.FS16FW500LH21_86R}
            text={t('Prepare to be amazed by our upcoming listings')}
            styles={{ marginRight: '10px' }}
            textAlign='left'
          />
          <Stack
            alignItems='center'
            flexShrink={0}
            direction='row'
            spacing={'5px'}
          >
            <Link href='/coming-soon' passHref>
              <Text
                color={colors.black21}
                token={
                  isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW600LH21_86R
                }
                text={t('View All')}
                cursor='pointer'
              />
            </Link>
            <NextImage
              src={'/icons/arrowRightCircular.svg'}
              width={24}
              height={24}
              alt='arrowRightCircular'
              style={{ marginLeft: '10px' }}
            />
          </Stack>
        </Box>
      </Box>
      <Box mt={isMobile ? '10px' : '20px'} width='100%'>
        {isLoading ? (
          <Box
            {...displayFlexAlignItemsCenterJustifyContentCenter}
            sx={{ height: '427px' }}
          >
            <CircularProgress />
          </Box>
        ) : comingSoonCondos && comingSoonCondos?.data?.length > 0 ? (
          <EmblaCarousel>
            {comingSoonCondos?.data?.map((property: any, ind: any) => {
              return (
                <div className='embla__slide' key={ind}>
                  <PropertyCard
                    condo={property}
                    isProtected={false}
                    key={`${property.id}${ind}`}
                    style={{
                      cursor: 'pointer',
                    }}
                    isFavorited={isPropertyFavorite(property.property_id)}
                    onToggleFavorite={() =>
                      toggleFavorite(
                        property.property_id,
                        isPropertyFavorite(property.property_id)
                      )
                    }
                    images={
                      property.featured_building_images &&
                      property.featured_building_images[0] &&
                      property.featured_building_images[0].url &&
                      property.featured_building_images[0].url !== '-'
                        ? [property.featured_building_images[0].url]
                        : ['/images/property/coming-soon.jpg']
                    }
                    tag={
                      property?.property_details.selling_category
                        ? property?.property_details.selling_category === '-'
                          ? property?.property_details.selling_status
                          : property?.property_details.selling_status
                        : property?.property_details.selling_status
                    }
                    variant={'small'}
                    salePriceFrom={convertCurrency(
                      property.property_details.sales_price_from,
                      true,
                      '$XXX,XXX'
                    )}
                    salePriceTo={convertCurrency(
                      property.property_details.sales_price_to,
                      true,
                      '$XXX,XXX'
                    )}
                    onClick={() =>
                      router.push(`/property/${property.property_details.slug}`)
                    }
                    propertyName={
                      property.property_details.project_development_name
                    }
                    propertySlug={property.property_details.slug}
                    propertyLocation={
                      `${property?.property_details?.address}, ${property?.property_details?.city}` ||
                      '-'
                    }
                    footerJSX={
                      <PropertyCardFooter
                        totalFloors={
                          property.property_details.total_floor_plans
                        }
                        availableFloors={
                          property.property_details.available_plans_dynamic
                        }
                        unavailableFloors={
                          property.property_details.total_floor_plans -
                          property.property_details.available_plans_dynamic
                        }
                      />
                    }
                  />
                </div>
              );
            })}
          </EmblaCarousel>
        ) : (
          <NoListingFound />
        )}
      </Box>
    </Box>
  );
}
