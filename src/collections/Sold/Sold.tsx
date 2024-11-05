/* eslint-disable react-hooks/exhaustive-deps */
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import { GridContainer, ResponsiveCarousal, Text } from '@/components';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import Divider from '@/components/Divider/Divider';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import useCurrency from '@/hooks/useCurrency';
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
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

type SoldProps = {
  soldPropertiesData: any;
};

export default function Sold({ soldPropertiesData: propsData }: SoldProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmMob = useMediaQuery('(min-width:465px) and (max-width: 650px)');
  const router = useRouter();
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();
  const { convertCurrency } = useCurrency();

  const [params, setParams] = useState({
    page: 1,
    limit: 16,
    selling_status: 'Selling',
  });

  const [fetching, setFetching] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { ref, inView } = useInView();
  const [state, setState] = useState<{
    fetchMore: boolean;
    data: any;
    filteredResultCount: number;
  }>({
    fetchMore:
      propsData?.filtered_results_count === 0 ||
      propsData?.filtered_results_count <= propsData?.totalResults
        ? false
        : true,
    data: propsData?.data || [],
    filteredResultCount: propsData?.filtered_results_count,
  });

  useEffect(() => {
    setState({
      fetchMore:
        propsData?.filtered_results_count === 0 ||
        propsData?.filtered_results_count <= propsData?.totalResults
          ? false
          : true,
      data: propsData?.data || [],
      filteredResultCount: propsData?.filtered_results_count,
    });
  }, [propsData]);

  useEffect(() => {
    if (initialLoad) return setInitialLoad(false);

    const fetchMoreCondos = async (params?: any) => {
      try {
        setFetching(true);
        let propParams: any = { ...params };
        if (router.query) propParams = { ...propParams, ...router.query };
        const props: any = await fetchFilteredProperties(
          ObjectToPrams(propParams)
        );
        setState((st) => ({
          ...st,
          fetchMore:
            props.data.length === 0 || props.data.length < 12 ? false : true,
          data:
            params.page === 1 || st.data.length === 0
              ? props.data
              : [...st.data, ...props.data],
        }));
        setTimeout(() => setFetching(false), 1000);
      } catch (e) {
        setState((st) => ({ ...st, fetchMore: false }));
        setTimeout(() => setFetching(false), 1000);
      }
    };
    fetchMoreCondos(params);
  }, [params]);

  useEffect(() => {
    if (inView && !fetching && state.fetchMore) {
      setParams((st) => ({ ...st, page: params.page + 1 }));
    }
  }, [inView, fetching, state.fetchMore]);

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
          ...(isCarousel && {
            marginInline: 'auto',
            marginTop: '3px',
            marginBottom: '25px',
          }),
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
        salePriceFrom={convertCurrency(
          condo.property_details.sales_price_from,
          true,
          '$XXX,XXX'
        )}
        salePriceTo={convertCurrency(
          condo.property_details.sales_price_to,
          true,
          '$XXX,XXX'
        )}
        onClick={() => {
          router.push(`/property/${condo.property_details.slug}`);
        }}
        propertyName={condo.property_details.project_development_name}
        propertySlug={condo.property_details.slug}
        propertyLocation={
          `${condo.property_details.address}, ${condo.property_details.city}` ||
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

  function handeLSearchProperty(value: any) {
    router.push(`${router.pathname}?${value.type}=${value.label}`);
  }

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <GridContainer>
          <Grid item xs={12}>
            <Text
              text='Selling'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <SearchWithSuggestions
              handleClearSearch={() => {
                const queryParams = router.query;
                if (Object.keys(queryParams).length > 0) {
                  router.push(router.pathname);
                }
              }}
              handleSelectedProperty={handeLSearchProperty}
              width={isMobile ? '100%' : '500px'}
              barVer={'bgGreyEBRnd'}
              searchUrl='/properties/searchGlobal?construction_status=construction'
            />

            <Divider styles={{ marginBlock: isSmMob ? '30px' : '50px' }} />
            {/* <Text
              text={`Showing ${state.data.length} of ${state.filteredResultCount} results`}
              color={colors.grey96}
              token={tokens.FS14FW500LH19R}
              textAlign='left'
            /> */}

            <Box mt={'50px'} width='100%'>
              {state.data.length > 0 ? (
                isMobile ? (
                  <ResponsiveCarousal
                    centerSlidePercentage={isSmMob ? 68 : 90}
                    carousalWidth={'100vw'}
                    indicatorCustomPlacementMargin={'15px'}
                  >
                    {state.data.map((condo: any) =>
                      renderListingCard(condo, isMobile)
                    )}
                  </ResponsiveCarousal>
                ) : (
                  <Box flexWrap={'wrap'} {...gridContainer}>
                    {state.data.map((condo: any) =>
                      renderListingCard(condo, !isMobile)
                    )}
                  </Box>
                )
              ) : (
                <NoListingFound />
              )}
            </Box>
          </Grid>
        </GridContainer>
      </ResponsiveContainer>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentCenter}
        my={5}
        ref={ref}
      >
        {fetching && state.fetchMore && <CircularProgress />}
      </Box>
    </Box>
  );
}
