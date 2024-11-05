import { Text } from '@/components';
import Button from '@/components/Button/Button';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from '@/styles';
import { IDeveloper } from '@/types/collections/developer';
import { transformDataForMap } from '@/utils/extra/mapTransformData';
import { Avatar, Box, Stack, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  id?: string;
  developer: IDeveloper;
};

const DealerProfile = ({ id, developer }: Props) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const router = useRouter();
  const { convertCurrency } = useCurrency();
  const { t } = useTranslation();

  const { toggleFavorite, isPropertyFavorite } = UseFavorites();
  const ShowPropsOnMap = dynamic(() => import('./ShowPropOnMap'), {
    ssr: false,
  });

  const RenderListingType = ({
    title,
    props,
    isMobile,
    tagType,
  }: {
    title: string;
    tagType: 'construction' | 'selling';
    isMobile: boolean;
    props: Array<any> | [];
  }) => {
    return (
      <Box my={4}>
        <Text
          text={title}
          token={
            isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
          }
          color={colors.black21}
          styles={{ marginBottom: '20px' }}
          textAlign='left'
        />
        {props.length !== 0 ? (
          <EmblaCarousel>
            {props?.map((property: any, ind: number) => (
              <div className='embla__slide' key={ind}>
                <PropertyCard
                  condo={property}
                  isProtected={false}
                  key={`${property.id}${ind}`}
                  style={{
                    cursor: 'pointer',
                    marginBottom: '20px',
                    marginInline: 'auto',
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
                    tagType === 'construction'
                      ? property.property_details.construction_status
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
                      totalFloors={property.property_details.total_floor_plans}
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
            ))}
          </EmblaCarousel>
        ) : (
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            sx={{ height: { xs: '200px', sm: '400px' } }}
          >
            <NoListingFound />
          </Stack>
        )}
      </Box>
    );
  };

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            {...flexDirection.column}
            alignItems='start'
            mb={isMobile ? '30px' : '50px'}
          >
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              gap={'30px'}
              sx={{ marginBottom: isMobile ? '10px' : '20px' }}
            >
              <Avatar
                src={developer?.logo}
                alt={'Company Listing'}
                sx={{
                  width: '55px',
                  height: '55px',
                  '& img': {
                    objectFit: 'contain',
                  },
                }}
              />
              <Text
                text={`${developer.name}'s ${t('Listing')}`}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS36FW700LH49_18B
                }
                color={colors.black21}
                textAlign='left'
              />
            </Box>
            <Text
              text={`${t('All properties listed by')} ${developer.name}`}
              token={
                isMobile ? tokens.FS16FW400LH18R : tokens.FS24FW400LH32_78R
              }
              color={colors.grey96}
              styles={{ marginBottom: isMobile ? '15px' : '30px' }}
              textAlign='left'
            />
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              gap={isMobile ? '10px' : '15px'}
              marginBottom={isMobile ? '30px' : '50px'}
              flexWrap='wrap'
            >
              <Button
                variant='light_yellow'
                onClick={() => {}}
                text={`Pre Construction (${
                  developer.pre_construction?.length || 0
                })`}
                justifyContent='center'
                borderRadius='40px'
                token={isMobile ? tokens.FS12FW400LH18R : tokens.FS14FW500LH19R}
                style={{
                  height: isMobile ? '33px' : '40px',
                }}
              />
              <Button
                variant='light_blue'
                onClick={() => {}}
                text={`Sold Out(${developer.sold_out?.length || 0})`}
                justifyContent='center'
                borderRadius='40px'
                token={isMobile ? tokens.FS12FW400LH18R : tokens.FS14FW500LH19R}
                style={{
                  height: isMobile ? '33px' : '40px',
                }}
              />
              <Button
                variant='light_red'
                onClick={() => {}}
                text={`Selling (${developer.selling.length || 0})`}
                justifyContent='center'
                borderRadius='40px'
                token={isMobile ? tokens.FS12FW400LH18R : tokens.FS14FW500LH19R}
                style={{
                  height: isMobile ? '33px' : '40px',
                }}
              />
            </Box>
            <Box width='100%' height={isMobile ? 300 : 650}>
              <ShowPropsOnMap
                properties={transformDataForMap(developer.properties)}
                height={isMobile ? 300 : 650}
              />
            </Box>
          </Box>
          <RenderListingType
            title='Pre Construction'
            props={developer.pre_construction}
            isMobile={isMobile}
            tagType='construction'
          />
          <RenderListingType
            title='Sold Out'
            props={developer.sold_out}
            isMobile={isMobile}
            tagType='selling'
          />
          <RenderListingType
            title='Selling'
            props={developer.selling}
            isMobile={isMobile}
            tagType='selling'
          />
        </>
      </ResponsiveContainer>
    </Box>
  );
};

export default DealerProfile;
