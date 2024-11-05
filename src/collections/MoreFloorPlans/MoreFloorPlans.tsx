import AcknowledgementDialog from '@/collections/AcknowledgementDialog/AcknowledgementDialog';
import FloorReservationDialog from '@/collections/FloorReservationDialog/FloorReservationDialog';
import { formatPrice } from '@/commonFunctions/commonFunctions';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import DataTable, { TableRowDataProp } from '@/components/Table/Table';
import useCurrency from '@/hooks/useCurrency';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { FloorPlan } from '@/types/common/condos';
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function MoreFloorPlans({ data }: any) {
  const { t } = useTranslation();

  const { convertCurrency, currSymbol } = useCurrency();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [tableData, setTableData] = useState<any>([]);
  const [selected, setSelected] = useState<any>({});
  const [isFloorPlans, setIsFloorPlans] = useState(true);
  const [isLoadMore, setIsLoadMore] = useState(true);
  const [filters, setFilters] = useState<{
    bedrooms: Array<number>;
    floors: number;
  }>({
    bedrooms: [],
    floors: 1,
  });

  useEffect(() => {
    let createData = () => {
      let filteredFloorPlans =
        filters.bedrooms.length > 0
          ? data.floor_plans?.filter((item: any) =>
              filters.bedrooms.includes(item.number_of_bedrooms)
            )
          : data.floor_plans;
      let isFilterApplied =
        filters.floors !== 1
          ? filteredFloorPlans.filter((item: any) =>
              filters.floors === 2 ? item.status : !item.status
            )
          : filteredFloorPlans;
      let tempTableData = isFilterApplied?.map((item: any) => {
        if (filters.floors === 2) if (!item.status) return null;
        if (filters.floors === 3) if (item.status) return null;
        return [
          {
            align: 'center',
            data: (
              <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
                <Box height={'37px'} width={'37px'} marginRight={'5px'}>
                  <Image
                    src={
                      item.image
                        ? item.image
                        : '/images/property/coming-soon.jpg'
                    }
                    alt='suite'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
                {item?.name}
              </Box>
            ),
          },
          {
            align: 'center',
            data: (
              <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
                <Box height={'15px'} width={'15px'} marginLeft={'5px'}>
                  <Image
                    src={'/icons/bed.svg'}
                    alt='bed'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                <Box marginLeft={'5px'}> {item?.number_of_bedrooms}</Box>
                <Box marginLeft={'5px'}> | </Box>
                <Box height={'15px'} width={'15px'} marginLeft={'5px'}>
                  <Image
                    src={'/icons/shower.svg'}
                    alt='shower'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </Box>
                <Box marginLeft={'5px'}> {item?.number_of_bathrooms}</Box>
              </Box>
            ),
          },
          {
            align: 'center',
            data: `${item?.interior_size} sq ft`,
          },
          {
            align: 'center',
            data: `${item?.exposure}`,
          },
          {
            align: 'center',
            data: `${convertCurrency(item?.total_price, true, '$XXX,XXX')}`,
          },
          {
            align: 'center',
            data: item.status ? (
              <Box height={'17px'} width={'17px'} mx={'auto'}>
                <Image
                  src={'/icons/green-circle.svg'}
                  alt='green-circle'
                  width={0}
                  height={0}
                  sizes='100%'
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            ) : (
              <Box height={'17px'} width={'17px'} mx={'auto'}>
                <Image
                  src={'/icons/red-circle.svg'}
                  alt='un-available'
                  width={0}
                  height={0}
                  sizes='100%'
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Box>
            ),
          },
          {
            align: 'right',
            isDisablePadding: true,
            data: item.status ? (
              <Button
                text={t('Reserve')}
                variant='blue'
                onClick={() => {}}
                justifyContent='center'
                borderRadius='8px'
                token={tokens.FS14FW500LH19R}
              />
            ) : (
              <Button
                text={t('Reserve')}
                variant='blue'
                onClick={() => {}}
                justifyContent='center'
                token={tokens.FS14FW500LH19R}
                borderRadius='8px'
                disabled
              />
            ),
          },
          {
            id: data?.id,
            floor_plan_id: item?.id,
          },
        ];
      });
      setTableData(tempTableData);
    };

    if (!data?.floor_plans?.length) setIsFloorPlans(false);
    else
      data.floor_plans.some((el: any) => !el.name)
        ? setIsFloorPlans(false)
        : createData();
  }, [data, filters, currSymbol]);

  const router = useRouter();
  const [isOpenFloorReservationDialog, setIsOpenFloorReservationDialog] =
    useState(false);
  const [isOpenAcknowledgementDialog, setIsOpenAcknowledgementDialog] =
    useState(false);

  let bedrooms = formatBedroomFilter(data?.floor_plans);

  return (
    <Box mt={'35px'}>
      <Text
        text={`${data?.property_details?.project_development_name} ${t(
          'Floor Plans'
        )}`}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? '16px' : '18px',
        }}
        color={colors.black21}
        textAlign='left'
      />
      <GridContainer
        justifyContent='flex-start'
        styles={{ rowGap: '10px', marginTop: '20px' }}
      >
        <>
          <Grid
            item
            sm={4}
            xl={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Text
              text={data?.property_details?.total_floor_plans || '-'}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS40FW800LH49_18EB
              }
              styles={{ marginBottom: '7px' }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={t('Total Floor Plans')}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
          <Grid
            item
            sm={4}
            xl={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Text
              text={data?.property_details?.available_plans_dynamic || '-'}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS40FW800LH49_18EB
              }
              styles={{ marginBottom: '7px' }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={t('Available Floor Plans')}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
          <Grid
            item
            sm={4}
            xl={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Text
              text={`${formatPrice(
                data?.property_details?.city_average_ppf || '-',
                currSymbol
              )}`}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS40FW800LH49_18EB
              }
              styles={{ marginBottom: '7px' }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={t('City Avg')}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
          <Box
            sx={{
              ...(isMobile
                ? {
                    display: 'flex',
                    alignItems: 'start',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '15px',
                    width: '100%',
                    maxWidth: '450px',
                  }
                : { display: 'none' }),
            }}
          >
            <Box>
              <Text
                text={data?.property_details?.total_floor_plans || '-'}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS40FW800LH49_18EB
                }
                styles={{ marginBottom: '7px' }}
                color={colors.black21}
                textAlign='left'
              />
              <Text
                text={t('Total Floor Plans')}
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey63}
                textAlign='left'
              />
            </Box>
            <Box>
              <Text
                text={data?.property_details?.available_plans_dynamic || '-'}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS40FW800LH49_18EB
                }
                styles={{ marginBottom: '7px' }}
                color={colors.black21}
                textAlign='left'
              />
              <Text
                text={t('Available Floor Plans')}
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey63}
                textAlign='left'
              />
            </Box>
            <Box>
              <Text
                text={`${formatPrice(
                  data?.property_details?.city_average_ppf || '-',
                  currSymbol
                )}`}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS40FW800LH49_18EB
                }
                styles={{ marginBottom: '7px' }}
                color={colors.black21}
                textAlign='left'
              />
              <Text
                text={t('City Avg')}
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey63}
                textAlign='left'
              />
            </Box>
          </Box>
        </>
      </GridContainer>
      {isFloorPlans && (
        <Box width={'100%'} mt={'50px'} id='floor-plans'>
          <Text
            text={t('More Floor Plans')}
            token={
              isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB
            }
            styles={{
              fontSize: isMobile ? '16px' : '18px',
            }}
            color={colors.black21}
            textAlign='left'
          />
          <Box
            mt={'15px'}
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            gap={'15px'}
            sx={{
              backgroundColor: colors.greyD931,
              padding: '15px',
              borderRadius: '10px',
              border: `1px solid ${colors.greyE1}`,
            }}
          >
            {bedrooms.length > 0 && (
              <Stack direction='row' spacing={'7px'} alignItems='center'>
                {bedrooms.map(
                  (bedroom: { label: string; value: number }, idx: number) => (
                    <Button
                      key={idx}
                      token={tokens.FS14FW500LH19R}
                      variant={
                        filters.bedrooms.includes(bedroom.value)
                          ? 'black-light-bg'
                          : 'blackOutlined'
                      }
                      text={bedroom.label}
                      onClick={() => {
                        let tempBedrooms = [...filters.bedrooms];
                        let index = [...filters.bedrooms].indexOf(
                          bedroom.value
                        );
                        if (index > -1) tempBedrooms.splice(index, 1);
                        else tempBedrooms.push(bedroom.value);
                        setFilters({ ...filters, bedrooms: tempBedrooms });
                      }}
                      justifyContent='center'
                      style={{
                        padding: '5px 10px',
                        borderRadius: '10px',
                      }}
                    />
                  )
                )}
              </Stack>
            )}
            <Select
              label=''
              isBorderDark={true}
              selectedId={filters.floors}
              onChange={(e: string) => {
                if (e === 'all') setFilters((st) => ({ ...st, floors: 1 }));
                else if (e === 'available')
                  setFilters((st) => ({ ...st, floors: 2 }));
                else setFilters((st) => ({ ...st, floors: 3 }));
              }}
              options={[
                { id: 1, value: 'all', label: t('All Floors') },
                { id: 2, value: 'available', label: t('Available') },
                { id: 3, value: 'un-available', label: t('Un Available') },
              ]}
              size='small'
              innerStyles={{
                borderRadius: '50px',
              }}
            />
          </Box>
          <Box position='relative'>
            <DataTable
              headers={[
                { align: 'left', data: t('Suit name') },
                { align: 'center', data: t('Bed/Bath') },
                { align: 'center', data: t('Size') },
                { align: 'center', data: t('View') },
                { align: 'center', data: t('Price') },
                { align: 'center', data: t('Status') },
                { align: 'right', data: '', isDisablePadding: true },
                { align: 'left', data: '', isDisablePadding: true },
              ]}
              style={{
                marginTop: '9px',
                border: `1px solid ${colors.greyE1}`,
                borderRadius: '8px',
                '& .MuiTableBody-root': {
                  '& .MuiTableRow-root > .MuiTableCell-root:nth-of-type(7), .MuiTableRow-root > .MuiTableCell-root:nth-of-type(8)':
                    {
                      paddingInline: '0 !important',
                    },
                  '& .MuiTableRow-root > .MuiTableCell-root:nth-of-type(9)': {
                    paddingInline: '5px',
                  },
                },
              }}
              rowData={
                (tableData.length > 10 && isLoadMore
                  ? tableData.slice(0, 10)
                  : tableData) as TableRowDataProp[]
              }
              handleRowSelection={(data1, data2) => {}}
              handleColSelection={(colNumber, rowData) => {
                let isDisabled = data.floor_plans.filter(
                  (el: any) => el.id === rowData[7].floor_plan_id
                )?.[0]?.status;
                if (!isDisabled) return;
                if (colNumber === 6) {
                  let tselectedFloor = data.floor_plans?.find(
                    (item: any) => item.id == rowData[7].floor_plan_id
                  );
                  setSelected(tselectedFloor);
                  setIsOpenFloorReservationDialog(true);
                } else {
                  router.replace(
                    `/property/condo-floor-detail/${rowData[7].id}?floorPlan=${rowData[7].floor_plan_id}`
                  );
                }
              }}
            />
            {tableData.length > 12 && isLoadMore && (
              <Stack
                alignItems='center'
                justifyContent='flex-end'
                position='absolute'
                bottom={'-15px'}
                sx={{
                  width: '100%',
                  height: '140px',
                  zIndex: 2,
                  backgroundImage:
                    'linear-gradient(to top, rgba(255, 255, 255,1) 0%,  rgba(255, 255, 255,1) 30%, rgba(255,255,255,0))',
                }}
                p={'15px'}
              >
                <Button
                  text={`${t('Show All')} (${tableData.length}) ${t(
                    'Floor Plans'
                  )}`}
                  variant='black'
                  onClick={() => {
                    setIsLoadMore(false);
                  }}
                  justifyContent='center'
                  borderRadius='8px'
                  token={tokens.FS14FW500LH19R}
                  style={{ height: 'max-content' }}
                />
              </Stack>
            )}
          </Box>
          <FloorReservationDialog
            condo={data}
            isOpen={isOpenFloorReservationDialog}
            handleClose={(finalStep: boolean) => {
              setIsOpenFloorReservationDialog(false);

              if (finalStep) {
                setIsOpenAcknowledgementDialog(true);
              }
            }}
            selectedFloor={selected}
          />
          <AcknowledgementDialog
            isOpen={isOpenAcknowledgementDialog}
            handleClose={() => {
              setIsOpenAcknowledgementDialog(false);
            }}
            message='Your reservation request was successfully
submitted for review.'
            icon='/icons/success-thumb.svg'
          />
        </Box>
      )}
    </Box>
  );
}

const formatBedroomFilter = (arr: Array<FloorPlan>) => {
  let bedrooms = [
    ...new Set(arr.map((el: FloorPlan) => el.number_of_bedrooms)),
  ];
  let bedroomFilter = bedrooms.map(
    (el: number): { label: string; value: number } => ({
      label: `${el} bed`,
      value: el,
    })
  );
  return bedroomFilter;
};
