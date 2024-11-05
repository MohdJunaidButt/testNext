/* eslint-disable react-hooks/exhaustive-deps */
import {
  DefaultCondosFilter,
  developmentStatus,
  listingType,
  sellingStatus,
} from '@/collections/Condos/Variables/DefaultFilter';
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import SearchFilterDialog from '@/collections/SearchFilterDialog/SearchFilterDialog';
import { GridContainer, Text } from '@/components';
import BedroomSelector from '@/components/BedrooomSelector/BedroomSelector';
import Button from '@/components/Button/Button';
import PlaceholderDataPropertyCard from '@/components/Cards/PlaceholderDataPropertyCard';
import CitySearchableFilter from '@/components/CitySearchableFilter/CitySearchableFilter';
import Divider from '@/components/Divider/Divider';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import MultiSelect from '@/components/MultiSelect/MultiSelect';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import { OccupationPicker } from '@/components/OccupationPicker/Occupation';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import Select from '@/components/Select/Select';
import URL from '@/config/index';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import { addProperty } from '@/store/slices/compareSlice';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  gridContainer,
  tokens,
} from '@/styles';
import { IShortPropData } from '@/types/collections/MapSearch';
import { FilterRange } from '@/types/common/filterRange';
import ObjectToPrams from '@/utils/ObjectToParams';
import {
  getOnlyChangeFilter,
  getValueObjectId,
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
import debounce from 'lodash/debounce';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';
import { useDispatch, useSelector } from 'react-redux';

export default function CompareProperties({
  filterRanges,
  properties,
  cities,
}: {
  cities: any;
  filterRanges: Array<FilterRange>;
  properties?: IShortPropData;
}) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const SelectedProperties = useSelector(
    (state: any) => state.Properties.SelectedProperties
  );
  const { convertCurrency } = useCurrency();
  const { t } = useTranslation();
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const router = useRouter();
  const dispatch = useDispatch();

  let defaultFilterValues = {
    ...DefaultCondosFilter,
    ...filterRanges.reduce((acc: any, filter: FilterRange) => {
      const { filter_type, min, max } = filter;
      acc[filter_type] = { min, max };
      return acc;
    }, {}),
    limit: 16,
  };
  const [filter, setFilter] = useState({
    ...defaultFilterValues,
    page: 1,
  });
  const [loading, setLoading] = useState(false);
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(0);
  const [isClear, setIsClear] = useState(false);
  const [state, setState] = useState<{
    fetchMore: boolean;
    data: any;
  }>({
    fetchMore: properties?.totalResults === 16,
    data: properties?.data || [],
  });
  const [selectedPropertyData, setSelectedPropertyData] = useState<any>(
    SelectedProperties ?? []
  );
  const [fetching, setFetching] = useState(false);

  const { ref, inView } = useInView();
  const cancelTokenSourceRef = useRef<any>(null);

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
      };
      if (!isClear && page === 1 && Object.keys(myFilter).length === 0) return;
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
            limit: 16,
            page,
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
  const debouncedFetch = useCallback(debounce(fetchData, 800), []);
  useEffect(() => {
    debouncedFetch(filter, isClear);
  }, [filter, debouncedFetch, isClear]);

  useEffect(() => {
    if (fetching) return;
    if (inView && state.fetchMore)
      setFilter((st: any) => ({ ...st, page: st.page + 1 }));
  }, [inView, state.fetchMore]);

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
    <Box marginTop={'30px'}>
      <ResponsiveContainer>
        <GridContainer>
          <Grid item xs={12}>
            <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
              <Text
                text={t('Compare Properties')}
                color={colors.black21}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS36FW700LH49_18B
                }
                textAlign='left'
                styles={{ marginBottom: '10px', marginRight: '10px' }}
              />
              <Image
                src={'/icons/paste.svg'}
                alt='paste'
                width={24}
                height={24}
              />
            </Box>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
              gap={'15px'}
            >
              <SearchWithSuggestions
                handleClearSearch={() => {
                  const queryParams = router.query;
                  if (Object.keys(queryParams).length > 0) {
                    router.push(router.pathname);
                  }
                }}
                handleSelectedProperty={handeLSearchProperty}
                width={isMobile ? '100%' : '400px'}
                barVer={'bgGreyEBRnd'}
                searchUrl='/properties/pages-search/'
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
                alignItems='stretch'
                sx={{ gap: '15px', marginBlock: '30px' }}
                flexWrap='wrap'
              >
                <Select
                  label=''
                  selectedId={getValueObjectId(filter.type, listingType)}
                  onChange={(e) => handleFilterChange('type', e)}
                  options={[
                    {
                      id: 1,
                      label: t('Type'),
                      value: '-',
                      disabled: true,
                    },
                    ...listingType,
                  ]}
                  size='medium'
                  innerStyles={{ minWidth: '100px' }}
                />
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
                      (el: any) => el.filter_type === 'sales_price'
                    )?.[0]?.min
                  }
                  max={
                    filterRanges?.filter(
                      (el: any) => el.filter_type === 'sales_price'
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
                      (el: any) => el.filter_type === 'price_per_sqft'
                    )?.[0]?.min
                  }
                  max={
                    filterRanges?.filter(
                      (el: any) => el.filter_type === 'price_per_sqft'
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
                      (el: any) => el.filter_type === 'unit_size'
                    )?.[0]?.min
                  }
                  max={
                    filterRanges?.filter(
                      (el: any) => el.filter_type === 'unit_size'
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
                <MultiSelect
                  label={t('Development Status')}
                  options={developmentStatus}
                  onChange={(val: string) =>
                    handleFilterChange('construction_status', val)
                  }
                  value={filter.construction_status}
                  size='medium'
                />
                <OccupationPicker
                  value={filter.occupancy}
                  onChange={(val: string) =>
                    handleFilterChange('occupancy', val)
                  }
                  fullWidth={false}
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
            <Divider styles={{ marginTop: '30px' }} />
            {loading ? (
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                marginTop={'30px'}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Stack
                  direction='row'
                  flexWrap='wrap'
                  alignItems='center'
                  justifyContent='space-between'
                  my={'30px'}
                >
                  {selectedPropertyData.length === 0 && (
                    <Text
                      text={t('No property selected')}
                      color={colors.grey8F}
                      token={tokens.FS20FW500LH22_72SB}
                      textAlign='left'
                      styles={{ fontSize: { xs: '16px', md: '20px' } }}
                    />
                  )}
                  <Button
                    onClick={() => {
                      router.push('/compare-props');
                    }}
                    variant={'blue'}
                    token={
                      isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW500LH18M
                    }
                    justifyContent='center'
                    text={t('Compare Now')}
                    disabled={selectedPropertyData.length < 2}
                    style={{
                      whiteSpace: 'nowrap',
                      height: 'fit-content',
                      marginLeft: 'auto',
                    }}
                  />
                </Stack>
                {selectedPropertyData && selectedPropertyData.length > 0 && (
                  <EmblaCarousel>
                    {selectedPropertyData.map((property: any, idx: number) => (
                      <div className='embla__slide' key={property.id}>
                        <PlaceholderDataPropertyCard
                          isFavorited={isPropertyFavorite(property.property_id)}
                          onToggleFavorite={() =>
                            toggleFavorite(
                              property.property_id,
                              isPropertyFavorite(property.property_id)
                            )
                          }
                          key={property.property_id}
                          onClick={() =>
                            router.push(
                              `/property/${property.property_details.slug}`
                            )
                          }
                          images={
                            property.featured_building_images?.[0]?.url !== '-'
                              ? [property.featured_building_images?.[0]?.url]
                              : ['/images/property/coming-soon.jpg']
                          }
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
                          name={
                            property.property_details.project_development_name
                          }
                          slug={property.property_details.slug}
                          address={`${property.property_details.address}, ${property.property_details.city}`}
                          tag={
                            property.property_details?.selling_category &&
                            property.property_details?.selling_category !== '-'
                              ? property.property_details?.selling_category
                              : property.property_details?.selling_status
                          }
                          isCompare={true}
                          variant='small'
                          isSelected={true}
                          onSelect={() => {
                            setSelectedProperty(selectedProperty - 1);
                            let item = selectedPropertyData.filter(
                              (item: any) =>
                                item.id !== selectedPropertyData[idx]?.id
                            );
                            setSelectedPropertyData(item);
                            dispatch(addProperty(item));
                            appToast.setToast(
                              'Property removed from comparison',
                              {
                                ...ToastLikeConfig,
                              }
                            );
                          }}
                          totalFloors={
                            property.property_details.total_floor_plans
                          }
                          availableFloors={
                            property.property_details.available_plans_dynamic
                          }
                          availability={`${
                            +property.property_details.total_floor_plans -
                            +property.property_details.available_plans_dynamic
                          }`}
                        />
                      </div>
                    ))}
                  </EmblaCarousel>
                )}
                <Divider styles={{ marginBlock: isMobile ? '30px' : '50px' }} />
                {state.data.length !== 0 ? (
                  <Box {...gridContainer} flexWrap={'wrap'} marginTop={'25px'}>
                    {state.data.map((item: any, index: any) => {
                      return (
                        <PlaceholderDataPropertyCard
                          isFavorited={isPropertyFavorite(item.property_id)}
                          onToggleFavorite={() =>
                            toggleFavorite(
                              item.property_id,
                              isPropertyFavorite(item.property_id)
                            )
                          }
                          key={index}
                          onClick={() => {
                            router.push(
                              `/property/${item.property_details.slug}`
                            );
                          }}
                          images={
                            item.featured_building_images &&
                            item.featured_building_images?.[0]?.url !== '-'
                              ? [item.featured_building_images[0].url]
                              : ['/images/property/coming-soon.jpg']
                          }
                          salePriceFrom={convertCurrency(
                            item.property_details.sales_price_from,
                            true,
                            '$XXX,XXX'
                          )}
                          salePriceTo={convertCurrency(
                            item.property_details.sales_price_to,
                            true,
                            '$XXX,XXX'
                          )}
                          name={item.property_details.project_development_name}
                          slug={item.property_details.slug}
                          address={`${item.property_details.address}, ${item.property_details.city}`}
                          tag={
                            item.property_details?.selling_category &&
                            item.property_details?.selling_category !== '-'
                              ? item.property_details?.selling_category
                              : item.property_details?.selling_status
                          }
                          isCompare={true}
                          variant='small'
                          isSelected={
                            selectedPropertyData.filter(
                              (el: any) => el.id === item.id
                            )?.length > 0
                          }
                          onSelect={() => {
                            let property = selectedPropertyData.filter(
                              (el: any) => el.id === item.id
                            )?.[0];

                            if (property) {
                              setSelectedProperty(selectedProperty - 1);
                              let item = selectedPropertyData.filter(
                                (el: any) => el.id !== property.id
                              );
                              setSelectedPropertyData(item);
                              dispatch(addProperty(item));
                              appToast.setToast(
                                'Property removed from comparison',
                                {
                                  ...ToastLikeConfig,
                                  type: 'success',
                                }
                              );
                            } else if (selectedPropertyData.length < 3) {
                              let arr: any = [...selectedPropertyData, item];
                              setSelectedPropertyData([
                                ...selectedPropertyData,
                                item,
                              ]);
                              dispatch(addProperty(arr));
                              setSelectedProperty(selectedProperty + 1);
                              appToast.setToast(
                                'Property added for comparison',
                                {
                                  ...ToastLikeConfig,
                                }
                              );
                            } else {
                              appToast.setToast(
                                'You can compare 3 Properties only',
                                {
                                  ...ToastLikeConfig,
                                  type: 'fail',
                                }
                              );
                            }
                          }}
                          totalFloors={item.property_details.total_floor_plans}
                          availableFloors={
                            item.property_details.available_plans_dynamic
                          }
                          availability={`${
                            +item.property_details.total_floor_plans -
                            +item.property_details.available_plans_dynamic
                          }`}
                        />
                      );
                    })}
                  </Box>
                ) : (
                  <Box mt={7}>
                    <NoListingFound />
                  </Box>
                )}
              </>
            )}
          </Grid>
        </GridContainer>
      </ResponsiveContainer>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentCenter}
        my={state.fetchMore ? 5 : 0}
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
        />
      )}
    </Box>
  );
}
