import { formatPrice } from '@/commonFunctions/commonFunctions';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import DataTable, { TableRowDataProp } from '@/components/Table/Table';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { SingleCondo } from '@/types/common/condos';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function FloorPlanTable({ condo }: SingleCondo) {
  const { currency } = useSelector((st: RootState) => st.Auth);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const router = useRouter();
  const [tableData, setTableData] = useState<any>([]);
  const [floorData, setFloorData] = useState<any>([]);

  useEffect(() => setFloorData(condo?.floor_plans), [condo?.floor_plans]);
  useEffect(() => {
    let createData = () => {
      let tempTableData = floorData?.map((item: any) => {
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
            data: `${formatPrice(item?.price, currency.symbol)}`,
          },
          {
            align: 'center',
            data: item.status ? (
              <Box height={'17px'} width={'17px'}>
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
              <Box height={'17px'} width={'17px'}>
                <Image
                  src={'/icons/red-circle.svg'}
                  alt='red-circle'
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
            align: 'center',
            data: (
              <Button
                text='Details'
                variant='blue'
                onClick={() => {}}
                justifyContent='center'
                token={tokens.FS14FW500LH19R}
              />
            ),
          },
          {
            id: condo?.id,
            floor_plan_id: item?.id,
          },
        ];
      });
      setTableData(tempTableData);
    };
    if (floorData) createData();
  }, [condo?.id, floorData]);

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text={
          condo?.property_details?.project_development_name + ' Floor plans'
        }
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        color={colors.black21}
        textAlign='left'
        styles={{
          marginBottom: isMobile ? '5px' : '17px',
          fontSize: isMobile ? '16px' : '18px',
        }}
      />
      <GridContainer spacing={3} justifyContent='flex-start' alignItems='end'>
        <>
          <Grid item xs={12} sm={3} md={3} lg={4} xl={3}>
            <Box>
              <Text
                text={condo?.property_details?.total_floor_plans}
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
                text='Total Floors'
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey96}
                textAlign='left'
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={3} md={3} lg={4} xl={3}>
            <Box>
              <Text
                text={condo?.property_details.available_plans_dynamic}
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
                text='Available Floors'
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey96}
                textAlign='left'
              />
            </Box>
          </Grid>
        </>
      </GridContainer>
      <Box
        marginTop={'50px'}
        {...displayFlexAlignItemsCenterJustifyContentFlexEnd}
        gap={1.5}
      >
        <Select
          label=''
          selectedId={4}
          options={[
            {
              id: 4,
              value: 'filter',
              label: 'Filter Floor Plans',
              disabled: true,
            },
            { id: 1, value: 'yes', label: 'Yes' },
            { id: 2, value: 'no', label: 'No' },
            { id: 3, value: 'mixed', label: 'Mixed' },
          ]}
          innerStyles={{
            borderRadius: '50px',
            width: '100%',
            minWidth: '160px',
          }}
        />
        <Select
          label=''
          options={[
            {
              id: 4,
              value: 'showAll',
              label: 'Show All Floors',
              disabled: true,
            },
            { id: 1, value: 'yes', label: 'Yes' },
            { id: 2, value: 'no', label: 'No' },
            { id: 3, value: 'mixed', label: 'Mixed' },
          ]}
          selectedId={4}
          innerStyles={{
            borderRadius: '50px',
            width: '100%',
            minWidth: '160px',
          }}
        />
      </Box>
      <DataTable
        headers={[
          { align: 'left', data: 'Suit name' },
          { align: 'center', data: 'Suit Type' },
          { align: 'center', data: 'Size' },
          { align: 'center', data: 'View' },
          { align: 'center', data: 'Price' },
          { align: 'center', data: 'Status' },
          { align: 'center', data: '' },
        ]}
        style={{
          marginTop: '20px',
          border: `1px solid ${colors.greyE1}`,
          borderRadius: '8px',
        }}
        rowData={tableData as TableRowDataProp[]}
        handleRowSelection={() => {}}
        handleColSelection={(colNumber, rowData) => {
          if (colNumber === 6) {
            router.push(
              `/property/condo-floor-detail/${rowData[7].id}?floorPlan=${rowData[7].floor_plan_id}`
            );
          }
        }}
      />
    </Box>
  );
}
