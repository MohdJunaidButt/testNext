import { GridContainer, Text } from '@/components';
import BedroomSelector from '@/components/BedrooomSelector/BedroomSelector';
import Button from '@/components/Button/Button';
import CitySearchableFilter from '@/components/CitySearchableFilter/CitySearchableFilter';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { FilterRange } from '@/types/common/filterRange';
import {
  Box,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

type SearchFilterDialogProps = {
  initialfilters: any;
  filterRanges: Array<FilterRange>;
  cities?: Array<{
    label: string;
    value: string;
    longitude: number;
    latitude: number;
    id: number;
  }>;
  open: boolean;
  toggleDialog: () => void;
  handleSubmit: (filters: any, isClear?: boolean) => void;
  preventFilters?: Array<string>;
};

const SearchFilterDialog = ({
  open,
  toggleDialog,
  handleSubmit,
  initialfilters,
  filterRanges,
  preventFilters,
  cities,
}: SearchFilterDialogProps) => {
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [filters, setFilters] = useState(initialfilters);
  const { t } = useTranslation();

  useEffect(() => {
    setFilters((st: any) => ({ ...st, ...initialfilters }));
  }, [initialfilters]);

  const handleSliderChange = (e: Event, v: number | number[]) => {
    const name = (e.target as HTMLInputElement).name;
    const [min, max] = v as number[];
    handleFilterValue(name, { min, max });
  };

  const handleFilterValue = (fieldName: string, val: any) =>
    setFilters((st: any) => ({ ...st, [fieldName]: val }));

  const handleOccupancyFilter = (val: number) => () => {
    let occupancy = filters.occupancy;
    if (occupancy) {
      occupancy = occupancy.split(',').includes(val.toString())
        ? occupancy
            .split(',')
            .filter((el: string) => el !== val.toString())
            .join(',')
        : occupancy + ',' + val;
      handleFilterValue('occupancy', occupancy);
    } else handleFilterValue('occupancy', val.toString());
  };

  return (
    <DialogWrapper
      open={open}
      onClose={toggleDialog}
      fullWidth={true}
      maxWidth={isTab ? 'xs' : 'sm'}
      sx={{
        '& .MuiDialog-paper': {
          margin: '15px',
          width: '100%',
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: '21px 17px 11px',
          ...displayFlexAlignItemsCenterJustifyContentSpaceBetween,
        }}
      >
        <Text
          text={t('Filter Property By')}
          token={tokens.FS16FW600LH21_86R}
          color={colors.black21}
          textAlign='left'
        />
        <DialogCloseButton toggleClose={toggleDialog} />
      </DialogTitle>
      <DialogContent
        sx={{
          padding: '0px 17px',
          overflow: 'auto',
          marginBottom: '20px',
        }}
      >
        <Box mb={'15px'} mt={'5px'}>
          <GridContainer spacing={1.5} justifyContent='flex-start'>
            <>
              {cities && (
                <Grid item xs={12} sm={6}>
                  <CitySearchableFilter
                    value={filters.city}
                    cities={cities}
                    onChange={({ label, latitude, longitude }) => {
                      handleFilterValue('city', label);
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <RangeSelector
                  fieldTitle={t('Price Range')}
                  fieldName='sales_price'
                  bgcolor={colors.whiteFF}
                  onSliderChange={handleSliderChange}
                  sliderValue={[
                    filters.sales_price.min,
                    filters.sales_price.max,
                  ]}
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
                  isFullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RangeSelector
                  fieldTitle={t('Price per sqft')}
                  fieldName='price_per_sqft'
                  bgcolor={colors.whiteFF}
                  onSliderChange={handleSliderChange}
                  sliderValue={[
                    filters.price_per_sqft.min,
                    filters.price_per_sqft.max,
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
                  isFullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <RangeSelector
                  fieldTitle={t('Unit Size')}
                  fieldName='unit_size'
                  bgcolor={colors.whiteFF}
                  onSliderChange={handleSliderChange}
                  sliderValue={[filters.unit_size.min, filters.unit_size.max]}
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
                  isFullWidth={true}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BedroomSelector
                  value={filters.bedroom}
                  onChange={(val: string) => {
                    let bedValue =
                      filters.bedroom === ''
                        ? val
                        : filters.bedroom.split(',').includes(val)
                        ? filters.bedroom
                            .split(',')
                            .filter((el: string) => el !== val)
                            .join(',')
                        : filters.bedroom + ',' + val;
                    handleFilterValue('bedroom', bedValue);
                  }}
                />
              </Grid>
              {!preventFilters?.includes('type') && (
                <Grid item xs={12} sx={{ paddingTop: '20px' }}>
                  <Stack spacing={'10px'} mb={'8px'}>
                    <Text
                      text={t('Type')}
                      color={colors.black21}
                      token={tokens.FS14FW600LH16SB}
                      textAlign='left'
                    />
                    <Stack
                      flexWrap='wrap'
                      spacing={'8px'}
                      direction='row'
                      alignItems={'center'}
                    >
                      <Button
                        token={tokens.FS13FW500LH18R}
                        variant={
                          filters.type.split(',').includes('condo')
                            ? 'black'
                            : 'blackOutlined'
                        }
                        text={'Condo'}
                        onClick={() => {
                          let condoType = filters.type
                            .split(',')
                            .includes('condo');
                          handleFilterValue(
                            'type',
                            condoType
                              ? filters.type
                                  .split(',')
                                  .filter((el: string) => el !== 'condo')
                                  .join(',')
                              : filters.type.length > 0
                              ? filters.type + ',condo'
                              : 'condo'
                          );
                        }}
                        justifyContent='center'
                        style={{
                          padding: '6px 12px',
                          borderRadius: '49px',
                          minWidth: '80px',
                        }}
                      />
                      <Button
                        token={tokens.FS13FW500LH18R}
                        variant={
                          filters.type.split(',').includes('house')
                            ? 'black'
                            : 'blackOutlined'
                        }
                        text={'House'}
                        onClick={() => {
                          let houseType = filters.type
                            .split(',')
                            .includes('house');
                          handleFilterValue(
                            'type',
                            houseType
                              ? filters.type
                                  .split(',')
                                  .filter((el: string) => el !== 'house')
                                  .join(',')
                              : filters.type.length > 0
                              ? filters.type + ',house'
                              : 'house'
                          );
                        }}
                        justifyContent='center'
                        style={{
                          padding: '6px 12px',
                          borderRadius: '49px',
                          minWidth: '80px',
                        }}
                      />
                    </Stack>
                  </Stack>
                </Grid>
              )}
              {!preventFilters?.includes('selling_status') && (
                <Grid item xs={12} sx={{ paddingTop: '20px' }}>
                  <Text
                    text={t('Selling Status')}
                    color={colors.black21}
                    token={tokens.FS14FW600LH16SB}
                    textAlign='left'
                  />
                  <Stack
                    flexWrap='wrap'
                    columnGap={'8px'}
                    direction='row'
                    alignItems={'center'}
                    rowGap={'8px'}
                    mt={'10px'}
                  >
                    <Button
                      token={tokens.FS13FW500LH18R}
                      variant={
                        filters.selling_status
                          .split(',')
                          .includes('Registration')
                          ? 'black'
                          : 'blackOutlined'
                      }
                      text={'Registration'}
                      onClick={() => {
                        let consStatus = filters.selling_status
                          .split(',')
                          .includes('Registration');
                        handleFilterValue(
                          'selling_status',
                          consStatus
                            ? filters.selling_status
                                .split(',')
                                .filter((el: string) => el !== 'Registration')
                                .join(',')
                            : filters.selling_status.length > 0
                            ? filters.selling_status + ',Registration'
                            : 'Registration'
                        );
                      }}
                      justifyContent='center'
                      style={{
                        padding: '6px 12px',
                        borderRadius: '49px',
                        minWidth: '80px',
                      }}
                    />
                    <Button
                      token={tokens.FS13FW500LH18R}
                      variant={
                        filters.selling_status.split(',').includes('Pending')
                          ? 'black'
                          : 'blackOutlined'
                      }
                      text={'Pending'}
                      onClick={() => {
                        let consStatus = filters.selling_status
                          .split(',')
                          .includes('Pending');
                        handleFilterValue(
                          'selling_status',
                          consStatus
                            ? filters.selling_status
                                .split(',')
                                .filter((el: string) => el !== 'Pending')
                                .join(',')
                            : filters.selling_status.length > 0
                            ? filters.selling_status + ',Pending'
                            : 'Pending'
                        );
                      }}
                      justifyContent='center'
                      style={{
                        padding: '6px 12px',
                        borderRadius: '49px',
                        minWidth: '80px',
                      }}
                    />
                    <Button
                      token={tokens.FS13FW500LH18R}
                      variant={
                        filters.selling_status.split(',').includes('Sold Out')
                          ? 'black'
                          : 'blackOutlined'
                      }
                      text={'Sold Out'}
                      onClick={() => {
                        let consStatus = filters.selling_status
                          .split(',')
                          .includes('Sold Out');
                        handleFilterValue(
                          'selling_status',
                          consStatus
                            ? filters.selling_status
                                .split(',')
                                .filter((el: string) => el !== 'Sold Out')
                                .join(',')
                            : filters.selling_status.length > 0
                            ? filters.selling_status + ',Sold Out'
                            : 'Sold Out'
                        );
                      }}
                      justifyContent='center'
                      style={{
                        padding: '6px 12px',
                        borderRadius: '49px',
                        minWidth: '80px',
                      }}
                    />
                    <Button
                      token={tokens.FS13FW500LH18R}
                      variant={
                        filters.selling_status.split(',').includes('Selling')
                          ? 'black'
                          : 'blackOutlined'
                      }
                      text={'Selling'}
                      onClick={() => {
                        let consStatus = filters.selling_status
                          .split(',')
                          .includes('Selling');
                        handleFilterValue(
                          'selling_status',
                          consStatus
                            ? filters.selling_status
                                .split(',')
                                .filter((el: string) => el !== 'Selling')
                                .join(',')
                            : filters.selling_status.length > 0
                            ? filters.selling_status + ',Selling'
                            : 'Selling'
                        );
                      }}
                      justifyContent='center'
                      style={{
                        padding: '6px 12px',
                        borderRadius: '49px',
                        minWidth: '80px',
                      }}
                    />
                  </Stack>
                </Grid>
              )}
              {!preventFilters?.includes('construction_status') && (
                <Grid item xs={12} sx={{ paddingTop: '20px' }}>
                  <Stack spacing={'10px'}>
                    <Text
                      text={t('Development Status')}
                      color={colors.black21}
                      token={tokens.FS14FW600LH16SB}
                      textAlign='left'
                    />
                    <Stack
                      flexWrap='wrap'
                      columnGap={'8px'}
                      direction='row'
                      alignItems={'center'}
                      rowGap={'8px'}
                      mt={'10px'}
                    >
                      <Button
                        token={tokens.FS13FW500LH18R}
                        variant={
                          filters.construction_status
                            .split(',')
                            .includes('completed')
                            ? 'black'
                            : 'blackOutlined'
                        }
                        text={'Completed'}
                        onClick={() => {
                          let consStatus = filters.construction_status
                            .split(',')
                            .includes('completed');
                          handleFilterValue(
                            'construction_status',
                            consStatus
                              ? filters.construction_status
                                  .split(',')
                                  .filter((el: string) => el !== 'completed')
                                  .join(',')
                              : filters.construction_status.length > 0
                              ? filters.construction_status + ',completed'
                              : 'completed'
                          );
                        }}
                        justifyContent='center'
                        style={{
                          padding: '6px 12px',
                          borderRadius: '49px',
                          minWidth: '80px',
                        }}
                      />
                      <Button
                        token={tokens.FS13FW500LH18R}
                        variant={
                          filters.construction_status
                            .split(',')
                            .includes('pre-construction')
                            ? 'black'
                            : 'blackOutlined'
                        }
                        text={'Pre-Construction'}
                        onClick={() => {
                          let consStatus = filters.construction_status
                            .split(',')
                            .includes('pre-construction');
                          handleFilterValue(
                            'construction_status',
                            consStatus
                              ? filters.construction_status
                                  .split(',')
                                  .filter(
                                    (el: string) => el !== 'pre-construction'
                                  )
                                  .join(',')
                              : filters.construction_status.length > 0
                              ? filters.construction_status +
                                ',pre-construction'
                              : 'pre-construction'
                          );
                        }}
                        justifyContent='center'
                        style={{
                          padding: '6px 12px',
                          borderRadius: '49px',
                          minWidth: '80px',
                        }}
                      />
                      <Button
                        token={tokens.FS13FW500LH18R}
                        variant={
                          filters.construction_status
                            .split(',')
                            .includes('under construction')
                            ? 'black'
                            : 'blackOutlined'
                        }
                        text={'Under Construction'}
                        onClick={() => {
                          let consStatus = filters.construction_status
                            .split(',')
                            .includes('under construction');
                          handleFilterValue(
                            'construction_status',
                            consStatus
                              ? filters.construction_status
                                  .split(',')
                                  .filter(
                                    (el: string) => el !== 'under construction'
                                  )
                                  .join(',')
                              : filters.construction_status.length > 0
                              ? filters.construction_status +
                                ',under construction'
                              : 'under construction'
                          );
                        }}
                        justifyContent='center'
                        style={{
                          padding: '6px 12px',
                          borderRadius: '49px',
                          minWidth: '80px',
                        }}
                      />
                    </Stack>
                  </Stack>
                </Grid>
              )}
              <Grid item xs={12} sx={{ padddingTop: '20px' }}>
                <Stack spacing={'20px'}>
                  <Text
                    text={t('Occupancy Year')}
                    color={colors.black21}
                    token={tokens.FS14FW600LH16SB}
                    textAlign='left'
                  />
                  <Box
                    maxHeight={'200px'}
                    sx={{
                      overflowY: 'auto',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: '10px',
                      paddingRight: '10px',
                      marginTop: '10px !important',
                    }}
                  >
                    {getYearsBetween(1970, 2035).map((el) => (
                      <Button
                        key={el}
                        token={tokens.FS13FW500LH18R}
                        variant={
                          filters?.occupancy?.split(',').includes(el.toString())
                            ? 'black'
                            : 'blackOutlined'
                        }
                        text={el.toString()}
                        onClick={handleOccupancyFilter(el)}
                        justifyContent='center'
                        style={{
                          padding: '6px 12px',
                          borderRadius: '49px',
                          height: 'max-content',
                          width: '100%',
                        }}
                      />
                    ))}
                  </Box>
                </Stack>
              </Grid>
            </>
          </GridContainer>
        </Box>
        <Box
          mt={4}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          gap={'10px'}
          width='100%'
          sx={{
            position: 'relative',
            ...(isTab && { flexWrap: 'wrap' }),
          }}
        >
          <Button
            token={tokens.FS16FW500LH18M}
            text={t('Apply Filters')}
            onClick={() => {
              toggleDialog();
              handleSubmit(filters);
            }}
            variant='blue'
            justifyContent='center'
            borderRadius='8px'
            style={{
              height: '45px',
              width: '100%',
              ...(!isTab && { flex: 1 }),
            }}
          />
          <Button
            token={tokens.FS16FW500LH18M}
            text={t('Reset Filters')}
            onClick={() => {
              toggleDialog();
              handleSubmit(null, true);
            }}
            variant='grey'
            justifyContent='center'
            borderRadius='8px'
            style={{
              height: '45px',
              whiteSpace: 'nowrap',
              width: '100%',
              ...(!isTab && { flex: 1 }),
            }}
          />
        </Box>
      </DialogContent>
    </DialogWrapper>
  );
};

function getYearsBetween(startYear: number, endYear: number) {
  startYear = Number(startYear);
  endYear = Number(endYear);

  if (isNaN(startYear) || isNaN(endYear)) {
    console.error('Invalid input: Please provide valid years.');
    return [];
  }
  const years = [];
  const latestYear = Math.max(startYear, endYear);
  const earliestYear = Math.min(startYear, endYear);

  for (let year = latestYear; year >= earliestYear; year--) {
    years.push(year);
  }

  return years;
}
export default SearchFilterDialog;
