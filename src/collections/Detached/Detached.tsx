import {
  DefaultCondosFilter,
  developmentStatus,
  listingType,
} from '@/collections/Condos/Variables/DefaultFilter';
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import SearchFilterDialog from '@/collections/SearchFilterDialog/SearchFilterDialog';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import Divider from '@/components/Divider/Divider';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import Select from '@/components/Select/Select';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { getValueObjectId } from '@/utils/varaibles/FilterVariables';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Detached() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmMob = useMediaQuery('(min-width:465px) and (max-width: 650px)');
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);
  const router = useRouter();

  const [filter, setFilter] = useState(DefaultCondosFilter);

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <GridContainer>
          <Grid item xs={12}>
            <Text
              text='Detached'
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
                handleClearSearch={() => {
                  const queryParams = router.query;
                  if (Object.keys(queryParams).length > 0) {
                    router.push(router.pathname);
                  }
                }}
                handleSelectedProperty={() => {}}
                width={isMobile ? '100%' : '400px'}
                barVer={'bgGreyEBRnd'}
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
                <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
                  <Button
                    text='Apply Filters'
                    token={tokens.FS13FW400LH18R}
                    variant='blue'
                    onClick={() => {}}
                    justifyContent='center'
                    style={{ marginRight: '10px', minWidth: '117px' }}
                    disabled={true}
                  />
                  <Button
                    text='Reset Filters'
                    token={tokens.FS13FW400LH18R}
                    variant='blackOutlined'
                    onClick={() => {}}
                    justifyContent='center'
                    style={{ minWidth: '117px' }}
                    disabled={true}
                  />
                </Box>
              </Box>
            </Box>
            {!isMobile && (
              <Box style={{ marginTop: '30px', marginBottom: '50px' }}>
                <GridContainer spacing={2} justifyContent='flex-start'>
                  <>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <RangeSelector
                        fieldTitle='Price Range'
                        fieldName='price'
                        onSliderChange={(e, v) => {
                          if (typeof v === 'number') return;
                          let [min, max] = v;
                          setFilter({
                            ...filter,
                            price: {
                              min,
                              max,
                            },
                          });
                        }}
                        sliderValue={[filter.price.min, filter.price.max]}
                        min={DefaultCondosFilter.price.min}
                        max={DefaultCondosFilter.price.max}
                        steps={DefaultCondosFilter.price.steps}
                        isPrice={true}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <RangeSelector
                        fieldTitle='Price per sqft'
                        fieldName='pricePerSqft'
                        onSliderChange={(e, v) => {
                          if (typeof v === 'number') return;
                          setFilter({
                            ...filter,
                            pricePerSqft: {
                              min: v[0],
                              max: v[1],
                            },
                          });
                        }}
                        sliderValue={[
                          filter.pricePerSqft.min,
                          filter.pricePerSqft.max,
                        ]}
                        min={DefaultCondosFilter.pricePerSqft.min}
                        max={DefaultCondosFilter.pricePerSqft.max}
                        steps={DefaultCondosFilter.pricePerSqft.steps}
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
                        sliderValue={[
                          filter.unit_size.min,
                          filter.unit_size.max,
                        ]}
                        min={DefaultCondosFilter.unit_size.min}
                        max={DefaultCondosFilter.unit_size.max}
                        steps={DefaultCondosFilter.unit_size.steps}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <RangeSelector
                        fieldTitle='Beds'
                        fieldName='beds'
                        onSliderChange={(e, v) => {
                          if (typeof v === 'number') return;
                          setFilter({
                            ...filter,
                            beds: {
                              min: v[0],
                              max: v[1],
                            },
                          });
                        }}
                        sliderValue={[filter.beds.min, filter.beds.max]}
                        min={DefaultCondosFilter.beds.min}
                        max={DefaultCondosFilter.beds.max}
                        steps={DefaultCondosFilter.beds.steps}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <RangeSelector
                        fieldTitle='Deposit'
                        fieldName='deposit'
                        onSliderChange={(e, v) => {
                          if (typeof v === 'number') return;
                          let [min, max] = v;
                          setFilter({
                            ...filter,
                            deposit: {
                              min,
                              max,
                            },
                          });
                        }}
                        sliderValue={[filter.deposit.min, filter.deposit.max]}
                        min={DefaultCondosFilter.deposit.min}
                        max={DefaultCondosFilter.deposit.max}
                        steps={50}
                        isPrice={true}
                      />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      {/* <Select
                        label=''
                        selectedId={getValueObjectId(
                          filter.occupancy,
                          occupancyYears
                        )}
                        onChange={(e) => {
                          setFilter((old: any) => {
                            return { ...old, occupancy: e };
                          });
                        }}
                        options={[
                          {
                            id: 1,
                            label: 'Occupancy Year',
                            value: 'year',
                            disabled: true,
                          },
                          ...occupancyYears,
                        ]}
                        style={{
                          width: '100%',
                        }}
                        size='medium'
                      /> */}
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <Select
                        label=''
                        selectedId={getValueObjectId(
                          filter.developmentStatus,
                          developmentStatus
                        )}
                        onChange={(e) => {
                          setFilter((old: any) => {
                            return { ...old, developmentStatus: e };
                          });
                        }}
                        options={[
                          {
                            id: 1,
                            label: 'Development Status',
                            value: 'development',
                            disabled: true,
                          },
                          ...developmentStatus,
                        ]}
                        style={{
                          width: '100%',
                        }}
                        size='medium'
                      />
                    </Grid>
                    <Grid item xs={6} md={4} lg={3} xl={2}>
                      <Select
                        label=''
                        selectedId={getValueObjectId(filter.type, listingType)}
                        onChange={(e) => {
                          setFilter((old: any) => {
                            return { ...old, listingType: e };
                          });
                        }}
                        options={[
                          {
                            id: 1,
                            label: 'Type',
                            value: 'type',
                            disabled: true,
                          },
                          ...listingType,
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
            <Divider styles={{ marginTop: '50px' }} />
            {!isSmMob && !isMobile && (
              <Box
                mt={'50px'}
                // {...gridContainer}
                minHeight={'400px'}
                {...displayFlexAlignItemsCenterJustifyContentCenter}
              >
                <NoListingFound />
              </Box>
            )}
            {(isSmMob || isMobile) && (
              <Box
                mt={'20px'}
                {...displayFlexAlignItemsCenterJustifyContentCenter}
              >
                <NoListingFound />
              </Box>
            )}
          </Grid>
        </GridContainer>
      </ResponsiveContainer>
      {/* {isMobile && isShowMoreFilters && (
        <SearchFilterDialog
          filters={filter}
          setFilters={setFilter}
          open={isShowMoreFilters}
          toggleDialog={() => {
            setIsShowMoreFilters(!isShowMoreFilters);
          }}
          handleSubmit={
            (isClear = false) => {}
            // isClear ? clearFilter() : applyFilter()
          }
        />
      )} */}
    </Box>
  );
}
