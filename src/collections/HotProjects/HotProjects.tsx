/* eslint-disable react-hooks/exhaustive-deps */
import { ResponsiveCarousal, Text } from '@/components';
import Button from '@/components/Button/Button';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import UseFavorites from '@/hooks/useFavorites';
import { fetchFilteredProperties } from '@/services/api';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  gridContainer,
  tokens,
} from '@/styles';
import ObjectToPrams from '@/utils/ObjectToParams';
import { Box, CircularProgress, Stack, useMediaQuery } from '@mui/material';
import NextImage from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SellingCategory = [
  'All',
  'VIP Sale',
  'Special Promotion',
  'Platinum Access',
  'Deal of the Month',
  'Move in Now',
  '5% Deal',
  '10% Deal',
];

const SellingStatus = ['All', 'Sold Out', 'Selling', 'Registration', 'Pending'];

export default function HotProjects({ hotPropertiesData }: any) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSMMob = useMediaQuery('(min-width:465px) and (max-width: 630px)');

  const [initialFetching, setInitialFetching] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [sellingCategorySelected, setSellingCategorySelected] = useState<
    string[]
  >(['All']);
  const [sellingStatusSelected, setSellingStatusSelected] = useState<string[]>([
    'All',
  ]);

  const [hotProjects, setHotProjects] = useState(hotPropertiesData);

  const { toggleFavorite, isPropertyFavorite } = UseFavorites();
  const handleSellingCategoryClick = async (value: string) => {
    if (value === 'All') {
      setSellingCategorySelected(['All']);
    } else
      setSellingCategorySelected((prevsellingCategorySelected) => {
        let newButtons = prevsellingCategorySelected.filter(
          (el) => el !== 'All'
        );
        if (newButtons.includes(value)) {
          return newButtons.filter((item) => item !== value);
        } else {
          return [...newButtons, value];
        }
      });
  };
  const handleSellingStatusClick = async (value: string) => {
    if (value === 'All') {
      setSellingStatusSelected(['All']);
    } else
      setSellingStatusSelected((prevSellingStatusSelected) => {
        let newButtons = prevSellingStatusSelected.filter((el) => el !== 'All');
        if (newButtons.includes(value)) {
          return newButtons.filter((item) => item !== value);
        } else {
          return [...newButtons, value];
        }
      });
  };

  useEffect(() => {
    if (initialFetching) return setInitialFetching(false);
    const fetchProperties = async () => {
      setIsLoading(true);

      try {
        let fetchArgs: any = {};
        if (sellingCategorySelected.length === 0)
          setSellingCategorySelected(['All']);
        if (sellingStatusSelected.length === 0)
          setSellingStatusSelected(['All']);
        // if (sellingCategorySelected.length > 1 && sellingCategorySelected.includes('All'))
        //   setSellingCategorySelected((st) => st.filter((el) => el !== 'All'));

        let filterSellingCategory = sellingCategorySelected.filter(
          (el: string) => el !== 'All'
        );
        let filterSellingStatus = sellingStatusSelected.filter(
          (el: string) => el !== 'All'
        );

        fetchArgs = {
          ...(filterSellingCategory?.length !== 0 && {
            selling_category: filterSellingCategory.join(','),
          }),
          ...(filterSellingStatus?.length !== 0 && {
            selling_status: filterSellingStatus.join(','),
          }),
          page: 1,
          limit: 16,
          is_hotproject: true,
        };

        const newProperties = await fetchFilteredProperties(
          ObjectToPrams(fetchArgs)
        );
        setHotProjects(newProperties);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch properties data:', error);
        setIsLoading(false);
      }
    };
    // Call the function if sellingCategorySelected is not empty
    fetchProperties();
  }, [sellingCategorySelected, sellingStatusSelected]);

  const renderListingCard = (condo: any, isCarousel: boolean) => {
    return (
      <PropertyCard
        condo={condo}
        isProtected={false}
        isFavorited={isPropertyFavorite(condo.property_id)}
        onToggleFavorite={() =>
          toggleFavorite(
            condo.property_id,
            isPropertyFavorite(condo.property_id)
          )
        }
        key={`${condo.id}-${condo.property_id}`}
        style={{
          cursor: 'pointer',
          ...(isCarousel && { marginInline: 'auto' }),
        }}
        images={
          condo.featured_building_images &&
          condo.featured_building_images[0] &&
          condo.featured_building_images[0].url &&
          condo.featured_building_images[0].url !== '-'
            ? [condo.featured_building_images[0].url]
            : ['/images/property/coming-soon.jpg']
        }
        tag={
          condo.property_details?.selling_category &&
          condo.property_details?.selling_category !== '-'
            ? condo.property_details?.selling_category
            : condo.property_details?.selling_status
        }
        variant={'small'}
        salePriceFrom={condo.property_details.sales_price_from}
        salePriceTo={condo.property_details.sales_price_to}
        onClick={() => {
          router.push(`/property/${condo.property_details.slug}`);
        }}
        propertyName={condo.property_details.project_development_name}
        propertySlug={condo.property_details.slug}
        propertyLocation={
          `${condo?.property_details?.address}, ${condo?.property_details?.city}` ||
          '-'
        }
        footerJSX={
          <PropertyCardFooter
            totalFloors={condo.property_details.total_floor_plans}
            availableFloors={condo.property_details.available_plans_dynamic}
            unavailableFloors={
              condo.property_details.total_floor_plans -
              condo.property_details.available_plans_dynamic
            }
          />
        }
      />
    );
  };

  return (
    <>
      <Box marginTop={'30px'}>
        <Text
          token={
            isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS48FW800LH61_49B
          }
          text='Hot Projects'
          color={colors.black21}
          textAlign='left'
        />
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          marginTop={'20px'}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          {SellingCategory.map((type) => (
            <Button
              key={type}
              token={
                isMobile ? tokens.FS12FW500LH18M : tokens.FS16FW500LH21_86R
              }
              variant={
                sellingCategorySelected.includes(type)
                  ? 'black-light-bg'
                  : 'blackOutlined'
              }
              text={type}
              onClick={() => handleSellingCategoryClick(type)}
              justifyContent='center'
              disabled={isLoading}
            />
          ))}
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          marginTop={'10px'}
          flexWrap={'wrap'}
          gap={'10px'}
        >
          {SellingStatus.map((type) => (
            <Button
              key={type}
              token={
                isMobile ? tokens.FS12FW500LH18M : tokens.FS16FW500LH21_86R
              }
              variant={
                sellingStatusSelected.includes(type) ? 'blue' : 'blackOutlined'
              }
              text={type}
              onClick={() => handleSellingStatusClick(type)}
              justifyContent='center'
              disabled={isLoading}
            />
          ))}
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          marginTop={'20px'}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          <Text
            color={colors.grey8F}
            token={tokens.FS16FW500LH21_86R}
            text={`Company contains ${hotPropertiesData.filtered_results_count} items in popular listings.`}
          />
          {/* <Stack
            direction={'row'}
            alignItems={'center'}
            onClick={() => router.push('/condos')}
          >
            <Text
              color={colors.black21}
              token={tokens.FS16FW600LH21_86R}
              text='View all'
              cursor='pointer'
              styles={{ marginLeft: '10px' }}
            />
            <NextImage
              src={'/icons/arrowRightCircular.svg'}
              width={24}
              height={24}
              alt='arrowRightCircular'
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />
          </Stack> */}
        </Box>
        <Box mt={'50px'} width='100%'>
          {isLoading ? (
            <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
              <CircularProgress />
            </Box>
          ) : hotProjects?.data?.length > 0 ? (
            isMobile || isSMMob ? (
              <ResponsiveCarousal
                centerSlidePercentage={isSMMob ? 65 : 100}
                carousalWidth={'100vw'}
                showIndicators={false}
              >
                {hotProjects.data.map((condo: any) =>
                  renderListingCard(condo, isMobile)
                )}
              </ResponsiveCarousal>
            ) : (
              <Box flexWrap={'wrap'} {...gridContainer}>
                {hotProjects.data.map((condo: any) =>
                  renderListingCard(condo, !isMobile)
                )}
              </Box>
            )
          ) : (
            <NoListingFound />
          )}
        </Box>
      </Box>
    </>
  );
}
