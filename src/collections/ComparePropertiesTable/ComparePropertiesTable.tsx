import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import DataTable, { TableRowDataProp } from '@/components/Table/Table';
import useCurrency from '@/hooks/useCurrency';
import { filterProperty, getComparison, removeProperty } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, CircularProgress, Grid, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function ComparePropertiesTable() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmMobile = useMediaQuery('(max-width: 400px)');
  const dispatch = useDispatch();
  const router = useRouter();

  const { t } = useTranslation();

  const SelectedProperties = useSelector(
    (state: any) => state.Properties.SelectedProperties
  );
  const { convertCurrency, currSymbol } = useCurrency();

  const [propertyCompareData, setpropertyCompareData] = useState([]);
  const [propertyCompareDataMore, setpropertyCompareDataMore] = useState([]);
  const [tempUseMoreProps, setTempUseMoreProps] = useState(0);
  const [propertiesIds, setproperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCompareProps = async () => {
    setLoading(true);
    let arr: any = [];
    SelectedProperties.map((item: any) => {
      arr = [...arr, item.property_id];
    });
    let response = await getComparison(arr);
    if (response) {
      const ProperData = {
        ids: response.property_ids,
        title: response.titles,
      };
      let newData = ProperData.ids.map((id: number, index: number) => ({
        id: id,
        title: ProperData.title[index].split('|')[0],
      }));
      setproperties(newData);
      const mappedData: any = [];
      let checkValues = 0;
      for (const [property, values] of Object.entries(response)) {
        if (checkValues === 0 && Array.isArray(values))
          checkValues = values?.length;
        if (property !== 'property_ids' && property !== 'titles') {
          let subArray: any = [];
          subArray.push({
            align: 'center',
            data: (
              <Text
                text={property.replace(/_/g, ' ')}
                token={tokens.FS18FW600LH18R}
                color={colors.black21}
                styles={{
                  textTransform: 'capitalize',
                  fontSize: { xs: '14px', sm: '16px', lg: '18px' },
                }}
              />
            ),
          });
          if (values === null) {
            for (let i = 0; i < checkValues; i++) {
              subArray.push({
                align: 'center',
                data: (
                  <Text
                    text={'-'}
                    token={tokens.FS16FW500LH18M}
                    color={colors.black21}
                    styles={{
                      fontSize: { xs: '14px', sm: '16px', lg: '18px' },
                    }}
                  />
                ),
              });
            }
          }
          values !== null &&
            (values as string[]).forEach((value) => {
              subArray.push({
                align: 'center',
                data: (
                  <Text
                    text={
                      property === 'price_from' || property === 'price_to'
                        ? convertCurrency(value, true, '$XXX,XXX')
                        : value
                    }
                    token={tokens.FS16FW500LH18M}
                    color={colors.black21}
                    styles={{
                      fontSize: { xs: '14px', sm: '16px', lg: '18px' },
                    }}
                  />
                ),
              });
            });
          mappedData.push(subArray);
        }
      }
      if (mappedData[0].length === 3) setpropertyCompareData(mappedData);
      else if (mappedData[0].length === 4) {
        setTempUseMoreProps(1);
        setpropertyCompareDataMore(mappedData);
      } else if (mappedData[0].length === 2) {
        setTempUseMoreProps(1);
        setpropertyCompareDataMore(mappedData);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    getCompareProps();
  }, [currSymbol]);
  const propertyCompareDataHeading = [
    {
      align: 'center',
      data: (
        <Text
          text={t('Property Title')}
          token={tokens.FS20FW600LH22_72SB}
          color={colors.black21}
          styles={{
            fontSize: { xs: '16px', sm: '18px', lg: '20px' },
          }}
        />
      ),
    },
    ...propertiesIds.map((item: { id: any; title: string }) => {
      return {
        align: 'center',
        data: (
          <Box
            onClick={() => {
              dispatch(filterProperty(item.id));
              router.push('/compare');
            }}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
          >
            <Text
              text={item.title}
              token={tokens.FS20FW600LH22_72SB}
              color={colors.blueC2}
              styles={{
                fontSize: { xs: '16px', sm: '18px', lg: '20px' },
              }}
            />
            <Image
              src='/icons/search-black-round.svg'
              alt='search-round'
              width='30px'
              height='30px'
              style={{ marginLeft: '10px', cursor: 'pointer' }}
            />
          </Box>
        ),
      };
    }),
  ];

  const propertyCompareDataHeadingMore = [
    {
      align: 'center',
      data: (
        <Text
          text={t('Property Title')}
          token={tokens.FS20FW600LH22_72SB}
          color={colors.black21}
          styles={{
            fontSize: { xs: '16px', sm: '18px', lg: '20px' },
          }}
        />
      ),
    },
    ...propertiesIds.map(
      (
        item: {
          id: any;
          title: string;
        },
        index
      ) => {
        return {
          align: 'center',
          data: (
            <Box
              onClick={() => {
                dispatch(filterProperty(item.id));
                router.push('/compare');
              }}
              {...displayFlexAlignItemsCenterJustifyContentCenter}
            >
              <Text
                text={item.title}
                token={tokens.FS20FW600LH22_72SB}
                color={colors.blueC2}
                styles={{
                  fontSize: { xs: '16px', sm: '18px', lg: '20px' },
                }}
              />

              <Image
                src='/icons/search-black-round.svg'
                alt='search-round'
                width='30px'
                height='30px'
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              />
            </Box>
          ),
        };
      }
    ),
  ];

  return (
    <>
      {!loading ? (
        <Box marginTop={isMobile ? '30px' : '50px'}>
          <ResponsiveContainer>
            <GridContainer>
              <Grid item xs={12}>
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  width={'100%'}
                  marginBottom={'20px'}
                  flexWrap='wrap'
                  sx={{
                    ...(isSmMobile && {
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '15px',
                    }),
                  }}
                >
                  <Text
                    text={t('Compare Properties')}
                    color={colors.black21}
                    token={
                      isMobile
                        ? tokens.FS24FW800LH32_78EB
                        : tokens.FS36FW700LH49_18B
                    }
                    textAlign='left'
                  />
                  <Button
                    onClick={() => {
                      dispatch(removeProperty());
                      router.push('/compare');
                    }}
                    variant={'blue'}
                    token={
                      isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW500LH18M
                    }
                    justifyContent='center'
                    text={t('Compare New')}
                    style={{
                      whiteSpace: 'nowrap',
                      height: '40px',
                      marginLeft: 'auto',
                    }}
                  />
                </Box>
                <DataTable
                  headers={
                    tempUseMoreProps === 0
                      ? (propertyCompareDataHeading as TableRowDataProp)
                      : (propertyCompareDataHeadingMore as TableRowDataProp)
                  }
                  rowData={
                    tempUseMoreProps === 0
                      ? (propertyCompareData as TableRowDataProp[])
                      : (propertyCompareDataMore as TableRowDataProp[])
                  }
                  customHeadStyles={{
                    backgroundColor: colors.whiteFF,
                    border: `1px solid ${colors.greyEC}`,
                  }}
                  customRowStyles={{
                    backgroundColor: colors.whiteFF,
                    border: `1px solid ${colors.greyEC}`,
                    padding: {
                      xs: '8px 13px',
                      sm: '13px 15px',
                      md: '17px 20px',
                    },
                  }}
                  style={{
                    border: `1px solid ${colors.greyEC}`,
                    borderRadius: '8px',
                    '& table': {
                      minWidth: '850px !important',
                    },
                  }}
                />
              </Grid>
            </GridContainer>
          </ResponsiveContainer>
        </Box>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop={'50px'}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
