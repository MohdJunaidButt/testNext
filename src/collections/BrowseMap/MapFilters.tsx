import LoginModal from '@/collections/auth/modals/LoginModal';
import SearchHistoryModal from '@/collections/BrowseMap/SearchHistoryModal';
import BedroomSelector from '@/components/BedrooomSelector/BedroomSelector';
import Button from '@/components/Button/Button';
import CitySearchableFilter from '@/components/CitySearchableFilter/CitySearchableFilter';
import MoreFilters from '@/components/MoreFilters/MoreFilters';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import useCurrency from '@/hooks/useCurrency';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { FilterRange } from '@/types/common/filterRange';
import {
  getOnlyChangeFilter,
  processFilterObject,
  queryParamsToFilterFormat,
} from '@/utils/varaibles/FilterVariables';
import { Box, Stack } from '@mui/material';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface Props {
  defaultFilters: any;
  cities: Array<{
    id: number;
    label: string;
    value: string;
    longitude: number;
    latitude: number;
  }>;
  filterRanges: Array<FilterRange>;
  handleCityChange: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}

const MapFilters = ({
  defaultFilters,
  cities,
  filterRanges,
  handleCityChange,
}: Props) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { currSymbol } = useCurrency();

  const [filter, setFilter] = useState({
    ...defaultFilters,
    ...queryParamsToFilterFormat(router.query),
  });

  const { user } = useSelector((state: RootState) => state.Auth);
  const [loginDialog, setLoginDialog] = useState(false);
  const [saveSearchModal, setSaveSearchModal] = useState(false);
  const handleFilterChange = (label: string, value: any) =>
    setFilter((old: any) => ({ ...old, [label]: value }));

  const handleClearFilters = () =>
    setFilter((st: any) => ({
      ...defaultFilters,
      latitude: st.latitude,
      longitude: st.longitude,
    }));

  let areFiltersEmpty = () =>
    Object.keys(getOnlyChangeFilter(filter, defaultFilters)).length === 0;

  const debouncedRouterPush = useRef(
    debounce((query) => {
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
    }, 400)
  ).current;

  useEffect(() => {
    const { latitude, longitude } = router.query;
    const changedFilters = processFilterObject(
      getOnlyChangeFilter(filter, defaultFilters)
    );
    debouncedRouterPush({ latitude, longitude, ...changedFilters });
    return () => {
      debouncedRouterPush.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const showSearchModal = () => {
    if (!user) return setLoginDialog((st) => !st);
    setSaveSearchModal((st) => !st);
  };

  return (
    <>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        // alignItems='start'
        gap={'15px'}
        py={'15px'}
        px={'15px'}
        sx={{
          borderBottom: `1px solid ${colors.greyDE}`,
        }}
      >
        <Stack alignItems='center' direction='row' spacing={'5px'}>
          <RangeSelector
            fieldTitle={t('Price Range')}
            fieldName='sales_price'
            onSliderChange={(e, v) => {
              if (typeof v === 'number') return;
              handleFilterChange('sales_price', {
                min: v[0],
                max: v[1],
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
            isPriceFormat={true}
            compType='smRounded'
            isBorderDark={true}
            steps={50000}
            currency={currSymbol}
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
            sliderValue={[filter.price_per_sqft.min, filter.price_per_sqft.max]}
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
            compType='smRounded'
            isBorderDark={true}
            currency={currSymbol}
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
              filterRanges?.filter((el) => el.filter_type === 'unit_size')?.[0]
                ?.min
            }
            max={
              filterRanges?.filter((el) => el.filter_type === 'unit_size')?.[0]
                ?.max
            }
            compType='smRounded'
            isBorderDark={true}
          />
          <BedroomSelector
            value={filter.bedroom}
            fullWidth={false}
            isRounded
            isBorderDark
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
            size='small'
          />
          <CitySearchableFilter
            value={filter.city}
            cities={cities}
            fullWidth={false}
            isRounded
            isBorderDark
            onChange={({ label, latitude, longitude }) => {
              handleFilterChange('city', label);
              handleCityChange({ latitude, longitude });
            }}
            size='small'
          />
          <MoreFilters
            filter={filter}
            handleFilterChange={handleFilterChange}
            fullWidth={false}
            isRounded
            isBorderDark
            size='small'
          />
        </Stack>
        <Stack
          height='100%'
          direction='row'
          alignItems={'center'}
          spacing={'7px'}
        >
          <Button
            text={t('Save Search')}
            token={tokens.FS12FW400LH18R}
            variant='black'
            onClick={showSearchModal}
            justifyContent='center'
            style={{ height: '30px' }}
          />
          <Button
            text={t('Reset Filters')}
            token={tokens.FS12FW400LH18R}
            variant='blue'
            onClick={handleClearFilters}
            justifyContent='center'
            disabled={areFiltersEmpty()}
            style={{ height: '30px' }}
          />
        </Stack>
      </Box>
      {loginDialog && (
        <LoginModal isOpen={loginDialog} handleClose={showSearchModal} />
      )}
      {saveSearchModal && (
        <SearchHistoryModal
          open={saveSearchModal}
          handleToggle={() => setSaveSearchModal((st) => !st)}
        />
      )}
    </>
  );
};

export default MapFilters;
