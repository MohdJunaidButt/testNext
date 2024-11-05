/* eslint-disable react-hooks/exhaustive-deps */
import {
  developmentStatus,
  sellingStatus,
} from '@/collections/Condos/Variables/DefaultFilter';
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import SearchFilterDialog from '@/collections/SearchFilterDialog/SearchFilterDialog';
import { GridContainer } from '@/components';
import BedroomSelector from '@/components/BedrooomSelector/BedroomSelector';
import Button from '@/components/Button/Button';
import MultiSelect from '@/components/MultiSelect/MultiSelect';
import { OccupationPicker } from '@/components/OccupationPicker/Occupation';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import Select from '@/components/Select/Select';
import {
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { FilterRange } from '@/types/common/filterRange';
import {
  getOnlyChangeFilter,
  getValueObjectId,
  processFilterObject,
} from '@/utils/varaibles/FilterVariables';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const HouseFilters = ({
  cities,
  filterRanges,
  defaultFilterValues,
  clearAllFilters,
}: {
  cities: Array<{ id: number; label: string; value: string }>;
  filterRanges: Array<FilterRange>;
  defaultFilterValues: any;
  clearAllFilters: () => void;
}) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const router = useRouter();

  const [reload, setReload] = useState(0);
  const [filter, setFilter] = useState(defaultFilterValues);
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);

  function CallFilterApi(clear = false) {
    clearAllFilters();
    // if (clear) return;
    if (clear) return router.replace('/houses');

    let url = '/houses?';
    let myFilter: any = {
      ...getOnlyChangeFilter(filter, defaultFilterValues),
    };
    if (Object.keys(myFilter).length === 0) return;
    myFilter = processFilterObject(myFilter);
    const queryString = new URLSearchParams({
      ...myFilter,
    }).toString();
    router.push(url + queryString);
  }

  const applyFilter = () => CallFilterApi();
  const clearFilter = () => {
    setFilter({
      ...defaultFilterValues,
      ...filterRanges.reduce((acc: any, filter: FilterRange) => {
        const { filter_type, min, max } = filter;
        acc[filter_type] = { min, max };
        return acc;
      }, {}),
    });
    CallFilterApi(true);
  };

  const handleDialogFilters = (filters: any, isClear = false) => {
    if (isClear) return clearFilter();
    let url = '/houses?';

    let myFilter: any = {
      ...getOnlyChangeFilter(filters, defaultFilterValues),
    };
    if (Object.keys(myFilter).length === 0) return;
    myFilter = processFilterObject(myFilter);
    const queryString = new URLSearchParams({
      ...myFilter,
    }).toString();
    router.push(url + queryString);
  };

  // Updating filter values, with url ones if present
  useEffect(() => {
    const queryParams = router.query;
    if (Object.keys(queryParams).length > 0) {
      let params: any = { ...queryParams };
      for (const key in params) {
        if (params.hasOwnProperty(key)) {
          let value = params[key];
          if (
            typeof value === 'string' &&
            value.includes('-') &&
            !isNaN(+value.split('-')[0])
          )
            value = { min: +value.split('-')[0], max: +value.split('-')[1] };
          params[key] = value;
        }
      }
      setFilter({ ...defaultFilterValues, ...params });
    }
  }, [router.query]);

  useEffect(() => {
    if (reload === 0) return;
    applyFilter();
  }, [reload]);

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
      return { ...old, ...customData };
    });
    setReload((old) => {
      return old === 0 ? 1 : old + 1;
    });
  }
  return (
    <>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        width={'100%'}
        gap={'15px'}
        my={2}
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
          // searchUrl='/properties/searchGlobal?type=house'
          searchUrl='/properties/pages-search?type=house'
        />
        {isMobile && (
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
        )}

        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          <Button
            text='Apply Filters'
            token={tokens.FS13FW400LH18R}
            variant='blue'
            onClick={applyFilter}
            justifyContent='center'
            disabled={
              Object.keys({
                ...getOnlyChangeFilter(filter, defaultFilterValues),
              }).length === 0
            }
            style={{ marginRight: '10px', minWidth: '117px' }}
          />
          <Button
            text='Reset Filters'
            token={tokens.FS13FW400LH18R}
            variant='blackOutlined'
            onClick={clearFilter}
            justifyContent='center'
            style={{ minWidth: '117px' }}
            // disabled={
            //   Object.keys({
            //     ...getOnlyChangeFilter(filter, defaultFilterValues),
            //   }).length === 0
            // }
          />
        </Box>
      </Box>
      {!isMobile && (
        <Box style={{ marginTop: '30px', marginBottom: '50px' }}>
          <GridContainer spacing={2} justifyContent='flex-start'>
            <>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <RangeSelector
                  fieldTitle='Price Range'
                  fieldName='sales_price'
                  onSliderChange={(e, v) => {
                    if (typeof v === 'number') return;
                    let [min, max] = v;
                    setFilter({
                      ...filter,
                      sales_price: {
                        min,
                        max,
                      },
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
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <RangeSelector
                  fieldTitle='Price per sqft'
                  fieldName='price_per_sqft'
                  onSliderChange={(e, v) => {
                    if (typeof v === 'number') return;
                    setFilter({
                      ...filter,
                      price_per_sqft: {
                        min: v[0],
                        max: v[1],
                      },
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
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <RangeSelector
                  fieldTitle='Unit Size'
                  fieldName='unit_size'
                  onSliderChange={(e, v) => {
                    if (typeof v === 'number') return;
                    setFilter({
                      ...filter,
                      unit_size: {
                        min: v[0],
                        max: v[1],
                      },
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
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <BedroomSelector
                  value={filter.bedroom}
                  onChange={(val: string) => {
                    setFilter((st: any) => ({
                      ...st,
                      bedroom:
                        st.bedroom === ''
                          ? val
                          : st.bedroom.split(',').includes(val)
                          ? st.bedroom
                              .split(',')
                              .filter((el: string) => el !== val)
                              .join(',')
                          : st.bedroom + ',' + val,
                    }));
                  }}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <MultiSelect
                  label={'Selling Status'}
                  options={sellingStatus}
                  onChange={(val: string) => {
                    setFilter((old: any) => {
                      return { ...old, selling_status: val };
                    });
                  }}
                  value={filter.selling_status}
                  style={{
                    width: '100%',
                  }}
                  size='medium'
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <OccupationPicker
                  value={filter.occupancy}
                  onChange={(val: string) =>
                    setFilter((st: any) => ({ ...st, occupancy: val }))
                  }
                  fullWidth={false}
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <MultiSelect
                  label={'Development Status'}
                  options={developmentStatus}
                  onChange={(val: string) => {
                    setFilter((old: any) => {
                      return { ...old, construction_status: val };
                    });
                  }}
                  value={filter.construction_status}
                  style={{
                    width: '100%',
                  }}
                  size='medium'
                />
              </Grid>
              <Grid item xs={6} md={4} lg={3} xl={2}>
                <Select
                  label=''
                  selectedId={getValueObjectId(filter.city, cities)}
                  onChange={(e) => {
                    setFilter((old: any) => {
                      return { ...old, city: e };
                    });
                  }}
                  options={[
                    {
                      id: 1,
                      label: 'City',
                      value: 'city',
                      disabled: true,
                    },
                    ...cities,
                  ]}
                  style={{
                    width: '100%',
                  }}
                  size='medium'
                />
              </Grid>
            </>
          </GridContainer>
        </Box>
      )}
      {isMobile && isShowMoreFilters && (
        <SearchFilterDialog
          initialfilters={filter}
          open={isShowMoreFilters}
          toggleDialog={() => setIsShowMoreFilters(!isShowMoreFilters)}
          handleSubmit={handleDialogFilters}
          filterRanges={filterRanges}
          preventFilters={['type']}
        />
      )}
    </>
  );
};

export default HouseFilters;
