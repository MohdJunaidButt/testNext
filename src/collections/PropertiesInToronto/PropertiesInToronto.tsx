import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import { fetchHomePageTorontoProperties } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  flexDirection,
  tokens,
} from '@/styles';
import { PropertyType } from '@/types/common/THomePage';
import { FetchArgs } from '@/types/common/properties';
import { Box, CircularProgress, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function PropertiesInToronto({ torontoPropertiesData }: any) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { convertCurrency } = useCurrency();

  const { t } = useTranslation();

  const [selectedButton, setSelectedButton] = useState('condos');
  const [isLoading, setIsLoading] = useState(false);
  const [TorontoPropertiesData, setTorontoPropertiesData] = useState<any>(
    torontoPropertiesData
  );
  const [initialLoad, setInitialLoad] = useState(true);
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();
  const router = useRouter();

  const handleSelectedButtonState = (value: string) => {
    setSelectedButton(value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    let torontoPropertiesFetchArgs: FetchArgs = {
      city: 'toronto',
      type:
        selectedButton === 'condos' ? PropertyType.CONDO : PropertyType.HOUSE,
      limit: 16,
      page: 1,
    };
    fetchHomePageTorontoProperties(torontoPropertiesFetchArgs)
      .then((res) => {
        setTorontoPropertiesData({ ...res });
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (initialLoad) return setInitialLoad(false);
    handleSearch();
  }, [selectedButton]);

  return (
    <section
      style={{
        marginBottom: isMobile ? '30px' : '40px',
        marginTop: isMobile ? '50px' : '40px',
      }}
    >
      <GridContainer justifyContent='space-between'>
        <>
          <Box width={'100%'} mb={isMobile ? '10px' : '20px'}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              {...flexDirection.column}
              alignItems={isMobile ? 'flex-start' : 'center'}
              gap={isMobile ? '10px' : '20px'}
            >
              <Text
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS48FW800LH61_49B
                }
                text={t('Properties In Toronto')}
                color={colors.black21}
                textAlign='left'
              />
              <Box
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                width={'100%'}
                justifyContent={isMobile ? 'flex-start' : 'center'}
              >
                <Button
                  token={
                    isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW500LH21_86R
                  }
                  variant={
                    selectedButton === 'houses' ? 'black' : 'blackOutlined'
                  }
                  text={t('Houses')}
                  onClick={() => {
                    handleSelectedButtonState('houses');
                  }}
                  justifyContent='center'
                  marginRight='10px'
                  disabled={isLoading}
                />
                <Button
                  token={
                    isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW500LH21_86R
                  }
                  variant={
                    selectedButton === 'condos' ? 'black' : 'blackOutlined'
                  }
                  text={t('Condos')}
                  onClick={() => {
                    handleSelectedButtonState('condos');
                  }}
                  justifyContent='center'
                  marginRight='10px'
                  disabled={isLoading}
                />
              </Box>
              <Box
                width={'100%'}
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                justifyContent={isMobile ? 'flex-start' : 'center'}
                alignItems={isMobile ? 'flex-start' : 'center'}
              >
                {' '}
                <Text
                  color={colors.grey8F}
                  token={
                    isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW500LH21_86R
                  }
                  text={
                    t(
                      `Embrace the anticipation of Toronto's property offerings`
                    ) + '.'
                  }
                  textAlign='left'
                  styles={{ marginRight: '10px' }}
                />
                <Stack
                  alignItems='center'
                  flexShrink={0}
                  direction='row'
                  spacing={'7px'}
                >
                  <Link href={`/${selectedButton}?city=Toronto`}>
                    <Text
                      color={colors.black21}
                      token={
                        isMobile
                          ? tokens.FS13FW400LH18R
                          : tokens.FS16FW600LH21_86R
                      }
                      text={t('View All')}
                      cursor='pointer'
                    />
                  </Link>
                  <Image
                    src={'/icons/arrowRightCircular.svg'}
                    width={24}
                    height={24}
                    alt='arrowRightCircular'
                    style={{ cursor: 'pointer' }}
                  />
                </Stack>
              </Box>
            </Box>
          </Box>
        </>
      </GridContainer>

      {isLoading ? (
        <Box
          height='375px'
          {...displayFlexAlignItemsCenterJustifyContentCenter}
        >
          <CircularProgress />
        </Box>
      ) : TorontoPropertiesData && TorontoPropertiesData?.data?.length === 0 ? (
        <NoListingFound />
      ) : (
        <EmblaCarousel>
          {TorontoPropertiesData &&
            TorontoPropertiesData.data?.map((property: any, ind: any) => {
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
                    onClick={() => {
                      router.push(
                        `/property/${property.property_details.slug}`
                      );
                    }}
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
      )}
    </section>
  );
}
