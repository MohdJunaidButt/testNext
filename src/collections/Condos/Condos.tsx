/* eslint-disable react-hooks/exhaustive-deps */
import {
  DefaultCondosFilter,
  developmentStatus,
  sellingStatus,
} from '@/collections/Condos/Variables/DefaultFilter';
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import SearchFilterDialog from '@/collections/SearchFilterDialog/SearchFilterDialog';
import { GridContainer, Text } from '@/components';
import BedroomSelector from '@/components/BedrooomSelector/BedroomSelector';
import Button from '@/components/Button/Button';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import CitySearchableFilter from '@/components/CitySearchableFilter/CitySearchableFilter';
import Divider from '@/components/Divider/Divider';
import MultiSelect from '@/components/MultiSelect/MultiSelect';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import { OccupationPicker } from '@/components/OccupationPicker/Occupation';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import URL from '@/config/index';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  gridContainer,
  tokens,
} from '@/styles';
import { FilterRange } from '@/types/common/filterRange';
import ObjectToPrams from '@/utils/ObjectToParams';
import {
  getOnlyChangeFilter,
  processFilterObject,
} from '@/utils/varaibles/FilterVariables';
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

export default function Condos({
  condos,
  cities,
  filterRanges,
}: {
  condos: any;
  cities: any;
  filterRanges: Array<FilterRange>;
}) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const router = useRouter();
  const { t } = useTranslation();

  let defaultFilterValues = {
    ...DefaultCondosFilter,
    ...filterRanges.reduce((acc: any, filter: FilterRange) => {
      const { filter_type, min, max } = filter;
      acc[filter_type] = { min, max };
      return acc;
    }, {}),
  };
  const { convertCurrency } = useCurrency();

  const { ref, inView } = useInView();
  const [filter, setFilter] = useState({
    ...defaultFilterValues,
    page: 1,
  });
  const [fetching, setFetching] = useState(false);
  const [isClear, setIsClear] = useState(false);
  const cancelTokenSourceRef = useRef<any>(null);
  const [state, setState] = useState<{
    fetchMore: boolean;
    data: any;
  }>({
    fetchMore: condos.totalResults === 16,
    data: condos?.data || [],
  });

  const fetchData = useCallback(
    async (currentFilters: any, isClear?: boolean) => {
      if (cancelTokenSourceRef.current)
        cancelTokenSourceRef.current.cancel(
          'Request canceled due to new request'
        );
      const source = axios.CancelToken.source();
      cancelTokenSourceRef.current = source;
      let { page, ...filters } = currentFilters;
      let myFilter: any = {
        ...getOnlyChangeFilter(filters, defaultFilterValues),
        type: 'condo',
      };
      if (!isClear && page === 1 && Object.keys(myFilter).length === 0) return;
      if (!myFilter?.selling_status) {
        myFilter = {
          ...myFilter,
          selling_status: 'Selling,Pending,Registration',
        };
      }
      if (myFilter.sales_price) {
        let sales_price = myFilter.sales_price;
        if (
          typeof sales_price === 'string' &&
          +sales_price.split('-')[1] >= 5000000
        )
          sales_price = sales_price.split('-')[0] + '-' + 500000000000000;

        if (typeof sales_price === 'object' && sales_price.max >= 5000000)
          sales_price = { min: sales_price.min, max: 500000000000000 };

        myFilter = {
          ...myFilter,
          sales_price,
        };
      }
      myFilter = processFilterObject(myFilter);
      try {
        setFetching(true);
        const { status, data } = await URL.get(
          `/properties/pages-properties?${ObjectToPrams({
            ...myFilter,
            page,
            limit: 16,
          })}`,
          { cancelToken: source.token }
        );
        if (status !== 200) return;
        setState((st) => ({
          fetchMore: data.totalResults === 16,
          data: page === 1 ? data.data : [...st.data, ...data.data],
        }));
      } catch (err) {
        if (axios.isCancel(err)) return;
        else console.error('Fetch error:', err);
      } finally {
        setTimeout(() => setFetching(false), 1000);
      }
    },
    []
  );
  const debouncedFetch = useCallback(
    debounce(fetchData, filter.page === 1 ? 400 : 100),
    []
  );
  useEffect(() => {
    debouncedFetch(filter, isClear);
  }, [filter, debouncedFetch, isClear]);

  const { toggleFavorite, isPropertyFavorite } = UseFavorites();
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);

  const clearFilter = () => {
    setFilter({
      ...DefaultCondosFilter,
      ...filterRanges.reduce((acc: any, filter: FilterRange) => {
        const { filter_type, min, max } = filter;
        acc[filter_type] = { min, max };
        return acc;
      }, {}),
      page: 1,
    });
    setIsClear(true);
  };

  useEffect(() => {
    if (fetching) return;
    if (inView && state.fetchMore)
      setFilter((st: any) => ({ ...st, page: st.page + 1 }));
  }, [inView, state.fetchMore]);

  function handeLSearchProperty(value: any) {
    if (value.type === 'title') {
      router.replace(`/property/${value.slug}`);
      return;
    }
    let customData: any = {
      address: '',
      city: '',
      title: '',
    };
    customData[value.type] = value.label;
    setFilter((old: any) => {
      return { ...old, ...customData, page: 1 };
    });
  }

  const handleFilterChange = (label: string, value: any) => {
    let { page, ...getChangedFilters } = getOnlyChangeFilter(
      filter,
      defaultFilterValues
    );
    if (Object.keys.length === 1 && label in getChangedFilters) {
      if (typeof value === 'object' && 'min' in value && 'max' in value) {
        if (
          value.min === defaultFilterValues[label].min &&
          value.max === defaultFilterValues[label].max
        )
          setIsClear(true);
        if (typeof value === 'string' && value === defaultFilterValues[label])
          setIsClear(true);
      }
    }
    setFilter((old: any) => ({ ...old, [label]: value, page: 1 }));
  };

  return (
    <Box mt={'30px'}>
      <ResponsiveContainer>
        <GridContainer>
          <Grid item xs={12}>
            <Text
              text={t('Explore Condos for yourself')}
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <Box
              {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
              width={'100%'}
              gap={'15px'}
              my={2}
            >
              <SearchWithSuggestions
                handleSelectedProperty={handeLSearchProperty}
                handleClearSearch={clearFilter}
                width={isMobile ? '100%' : '400px'}
                barVer={'bgGreyEBRnd'}
                searchUrl='/properties/pages-search?type=condo'
              />
              {isMobile ? (
                <Button
                  variant='white'
                  onClick={() => {
                    setIsShowMoreFilters(!isShowMoreFilters);
                  }}
                  text=''
                  icon='/icons/filter-btn-black.svg'
                  iconAlt='/icons/filter-btn-black.svg'
                  iconSize={{ width: 20, height: 20 }}
                  justifyContent='center'
                  borderRadius='12px'
                  token={tokens.FS20FW600LH22_72SB}
                  style={{ height: '50px' }}
                />
              ) : (
                <Button
                  text={t('Reset Filters')}
                  token={tokens.FS13FW400LH18R}
                  variant='blackOutlined'
                  onClick={clearFilter}
                  justifyContent='center'
                  style={{ minWidth: '117px' }}
                />
              )}
            </Box>
            {!isMobile && (
              <Stack
                direction='row'
                alignItems='center'
                sx={{ gap: '15px', marginBlock: '30px' }}
                flexWrap='wrap'
              >
                <RangeSelector
                  fieldTitle={t('Price Range')}
                  fieldName='sales_price'
                  onSliderChange={(e, v) => {
                    if (typeof v === 'number') return;
                    let [min, max] = v;
                    handleFilterChange('sales_price', {
                      min,
                      max,
                    });
                  }}
                  sliderValue={[filter.sales_price.min, filter.sales_price.max]}
                  min={
                    filterRanges?.filter(
                      (el) => el.filter_type === 'sales_price'
                    )?.[0]?.min
                  }
                  max={
                    filterRanges?.filter(
                      (el) => el.filter_type === 'sales_price'
                    )?.[0]?.max
                  }
                  isPrice={true}
                />
                <RangeSelector
                  fieldTitle={t('Price per sqft')}
                  fieldName='price_per_sqft'
                  onSliderChange={(e, v) => {
                    if (typeof v === 'number') return;
                    handleFilterChange('price_per_sqft', {
                      min: v[0],
                      max: v[1],
                    });
                  }}
                  sliderValue={[
                    filter.price_per_sqft.min,
                    filter.price_per_sqft.max,
                  ]}
                  min={
                    filterRanges?.filter(
                      (el) => el.filter_type === 'price_per_sqft'
                    )?.[0]?.min
                  }
                  max={
                    filterRanges?.filter(
                      (el) => el.filter_type === 'price_per_sqft'
                    )?.[0]?.max
                  }
                  isPrice={true}
                />
                <RangeSelector
                  fieldTitle={t('Unit Size')}
                  fieldName='unit_size'
                  onSliderChange={(e, v) => {
                    if (typeof v === 'number') return;
                    handleFilterChange('unit_size', {
                      min: v[0],
                      max: v[1],
                    });
                  }}
                  sliderValue={[filter.unit_size.min, filter.unit_size.max]}
                  min={
                    filterRanges?.filter(
                      (el) => el.filter_type === 'unit_size'
                    )?.[0]?.min
                  }
                  max={
                    filterRanges?.filter(
                      (el) => el.filter_type === 'unit_size'
                    )?.[0]?.max
                  }
                />
                <BedroomSelector
                  value={filter.bedroom}
                  onChange={(val: string) => {
                    let bedroomVal =
                      filter.bedroom === ''
                        ? val
                        : filter.bedroom.split(',').includes(val)
                        ? filter.bedroom
                            .split(',')
                            .filter((el: string) => el !== val)
                            .join(',')
                        : filter.bedroom + ',' + val;
                    handleFilterChange('bedroom', bedroomVal);
                  }}
                  fullWidth={false}
                />
                <MultiSelect
                  label={t('Selling Status')}
                  options={sellingStatus}
                  onChange={(val: string) =>
                    handleFilterChange('selling_status', val)
                  }
                  value={filter.selling_status}
                  size='medium'
                />
                <OccupationPicker
                  value={filter.occupancy}
                  onChange={(val: string) =>
                    handleFilterChange('occupancy', val)
                  }
                  fullWidth={false}
                />
                <MultiSelect
                  label={t('Development Status')}
                  options={developmentStatus}
                  onChange={(val: string) =>
                    handleFilterChange('construction_status', val)
                  }
                  value={filter.construction_status}
                  size='medium'
                />
                <CitySearchableFilter
                  value={filter.city}
                  cities={cities}
                  onChange={({ label }) => {
                    handleFilterChange('city', label);
                  }}
                  fullWidth={false}
                />
              </Stack>
            )}
            <Divider styles={{ marginBlock: '30px' }} />
            {state.data.length > 0 ? (
              <Box {...gridContainer} flexWrap={'wrap'} marginTop={'25px'}>
                {state.data.map((condo: any, ind: number) => {
                  return (
                    <PropertyCard
                      condo={condo}
                      isFavorited={isPropertyFavorite(condo.property_id)}
                      onToggleFavorite={() =>
                        toggleFavorite(
                          condo.property_id,
                          isPropertyFavorite(condo.property_id)
                        )
                      }
                      isProtected={false}
                      key={`${condo.id}${ind}`}
                      style={{
                        cursor: 'pointer',
                      }}
                      images={
                        condo.featured_building_images &&
                        condo.featured_building_images?.[0]?.url !== '-'
                          ? [condo.featured_building_images[0].url]
                          : ['/images/property/coming-soon.jpg']
                      }
                      tag={
                        condo?.property_details.selling_category
                          ? condo?.property_details.selling_category === '-'
                            ? condo?.property_details.selling_status
                            : condo?.property_details.selling_status
                          : condo?.property_details.selling_status
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
                      onClick={() =>
                        router.push(`/property/${condo.property_details.slug}`)
                      }
                      propertyName={
                        condo.property_details.project_development_name
                      }
                      propertySlug={condo.property_details.slug}
                      propertyLocation={
                        `${condo?.property_details?.address}, ${condo?.property_details?.city}` ||
                        '-'
                      }
                      footerJSX={
                        <PropertyCardFooter
                          totalFloors={condo.property_details.total_floor_plans}
                          availableFloors={
                            condo.property_details.available_plans_dynamic
                          }
                          unavailableFloors={
                            condo.property_details.total_floor_plans -
                            condo.property_details.available_plans_dynamic
                          }
                        />
                      }
                    />
                  );
                })}
              </Box>
            ) : (
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                sx={{ height: { xs: '200px', sm: '400px' } }}
              >
                <NoListingFound />
              </Stack>
            )}
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
      {isMobile && isShowMoreFilters && (
        <SearchFilterDialog
          initialfilters={filter}
          open={isShowMoreFilters}
          toggleDialog={() => setIsShowMoreFilters(!isShowMoreFilters)}
          handleSubmit={(filters: any, isClear?: boolean) =>
            isClear
              ? clearFilter()
              : setFilter((prevSt: any) => {
                  return { ...prevSt, ...filters, page: 1 };
                })
          }
          filterRanges={filterRanges}
          preventFilters={['type']}
        />
      )}
    </Box>
  );
}
