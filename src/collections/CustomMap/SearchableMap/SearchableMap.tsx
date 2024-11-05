import { Box, CircularProgress, alpha, useMediaQuery } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

import Button from '@/components/Button/Button';
import Select from '@/components/Select/Select';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';

import {
  DefaultCondosFilter,
  developmentStatus,
  listingType,
  sellingStatus,
} from '@/collections/Condos/Variables/DefaultFilter';
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import ViewMapWithClustering from '@/collections/CustomMap/SearchableMap/ViewWithCluster';
import SearchFilterDialog from '@/collections/SearchFilterDialog/SearchFilterDialog';
import { Text } from '@/components';
import BedroomSelector from '@/components/BedrooomSelector/BedroomSelector';
import Image from '@/components/Image/Image';
import RangeSelector from '@/components/RangeSelector/RangeSelector';
import url from '@/config/index';
import { getDistinct } from '@/services/api';
import { IPropertiesOnMap } from '@/types/collections/MapSearch';
import { IListing } from '@/types/store/listing';
import ObjectToPrams from '@/utils/ObjectToParams';
import {
  getOnlyChangeFilter,
  getValueObjectId,
} from '@/utils/varaibles/FilterVariables';
import axios from 'axios';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

interface SearchPropOnMapProps {
  mapContainerStyles?: React.CSSProperties;
  showFilters?: boolean;
  showSearch?: boolean;
  mapData?: any;
}

export default function SearchPropOnMap({
  mapContainerStyles,
  showFilters,
  mapData,
  showSearch = true,
}: SearchPropOnMapProps) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [properties, setProperties] = useState<IPropertiesOnMap[] | []>([]);
  const [fetchingProp, setFetchingProp] = useState(false);
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(
    isMobile ? false : true
  );
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef();
  const [filter, setFilter] = useState(DefaultCondosFilter);
  const [reload, setReload] = useState(0);
  const [occupancy, setOccupancy] = useState([]);

  function ConstructParams(clearFilter: boolean) {
    if (clearFilter) return 'type=condo';
    let myFilter: any = { ...getOnlyChangeFilter(filter) };
    myFilter = {
      ...(myFilter?.sales_price && {
        sales_price_from: myFilter?.sales_price.min,
        sales_price_to: myFilter?.sales_price.max,
      }),
      ...(myFilter?.unit_size && {
        unit_size: `${myFilter.unit_size.min}-${myFilter.unit_size.max}`,
      }),
      ...(myFilter?.price_per_sqft && {
        price___sq_ft_from: myFilter?.price_per_sqft.min,
        price___sq_ft_to: myFilter?.price_per_sqft.max,
      }),
      ...(myFilter?.selling_status && {
        selling_status: myFilter?.selling_status,
      }),
      ...(myFilter?.bedroom && {
        bedroom: myFilter?.bedroom,
      }),
      ...(myFilter?.construction_status && {
        construction_status: myFilter?.construction_status,
      }),
      ...(myFilter?.address && {
        address: myFilter?.address,
      }),
      ...(myFilter?.city && {
        city: myFilter?.city,
      }),
      ...(myFilter?.title && {
        title: myFilter?.title,
      }),
      ...(myFilter?.type && {
        type: myFilter?.type,
      }),
      ...(myFilter?.occupancy && {
        occupancy: myFilter?.occupancy,
      }),
      ...(myFilter?.address && {
        address: myFilter?.address,
      }),
      ...(myFilter?.city && {
        city: myFilter?.city,
      }),
      ...(myFilter?.title && {
        title: myFilter?.title,
      }),
      ...(myFilter?.type && {
        type: myFilter?.type,
      }),
    };
    return ObjectToPrams(myFilter);
  }

  function ApplyFiler() {
    constructURL(ConstructParams(false));
  }

  function clearFilter() {
    setFilter(DefaultCondosFilter);
    constructURL(ConstructParams(true));
  }
  useEffect(() => {
    if (reload === 0) return;
    ApplyFiler();
  }, [reload]);

  useEffect(() => {
    const fetchTileLayer = async () => {
      const apiKey = process.env.MAP_TILER_KEY;
      try {
        const response = await axios.get(
          `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${apiKey}`
        );
        const tileLayerUrl = response.data.tiles[0];
        setTileLayerUrl(tileLayerUrl);
      } catch (error) {
        console.error('Error fetching tile layer:', error);
      }
    };
    fetchTileLayer();
    (async () => {
      const occupancyList = await getDistinct('occupancy');
      setOccupancy(
        occupancyList.map((el: string, ind: number) => ({
          id: ind + 2,
          label: el,
          value: el,
        }))
      );
    })();
    constructURL(ConstructParams(true));
  }, []);
  const constructURL = async (queryParams = '') => {
    setFetchingProp(true);
    let getFilteredInfo: IPropertiesOnMap[] | [];
    try {
      // Now 'queryParams' contains the constructed query string
      const resp: any = await url.get(`/properties/data?${queryParams}`);
      // Use 'apiUrl' for your API request
      const responseData = !mapData ? resp?.data.data : mapData.properties;

      getFilteredInfo =
        responseData.length > 0
          ? responseData.map((el: IListing) => ({
              id: el.property_id,
              propName: el.property_details.project_development_name,
              position: [
                parseFloat(el.property_details.latitude),
                parseFloat(el.property_details.longitude),
              ],
              projDesc: el.property_details.sales_company,
              propSlug: el.property_details.slug,
              projType: el.property_type,
              projImage:
                el.featured_building_images &&
                el.featured_building_images.length > 0 &&
                el.featured_building_images[0].url !== '-'
                  ? el.featured_building_images[0].url
                  : '/images/property/coming-soon.jpg',
            }))
          : [];
      setProperties(getFilteredInfo);
      if (getFilteredInfo.length > 0) {
        // const positions = getFilteredInfo.slice(0, 3).map((el) => el.position);
        // const avgPositions = calculateAveragePosition(positions);
        const positions = getFilteredInfo[0].position;
        navigator.geolocation.getCurrentPosition(
          () => {
            (mapRef.current as any)?.flyTo([positions[0], positions[1]], 10);
            setZoomLevel(10);
          },
          (error) => console.error('Error retrieving location:', error.message)
        );
      }
    } catch (error) {
      // alert(errorCallback(error));
    } finally {
      setFetchingProp(false);
    }
  };

  function handeLSearchProperty(value: any) {
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

  const showSelectedPropOnMap = async ({
    label,
    type,
    multipleObject,
  }: {
    label: string;
    type: string;
    multipleObject?: {
      label?: string;
      type?: string;
    }[];
  }) => {
    handeLSearchProperty({
      label,
      type,
    });
  };

  return (
    <Box position='relative'>
      <MapContainer
        ref={mapRef as any}
        center={[43.6748081, -79.3996562]}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        zoomControl={false}
        minZoom={3}
        style={{
          height: 650,
          width: '100%',
          zIndex: 1,
          ...mapContainerStyles,
        }}
      >
        <TileLayer url={tileLayerUrl} />
        <ViewMapWithClustering data={properties} mapHeight={'650px'} />
      </MapContainer>
      {showSearch && (
        <Box
          zIndex={2}
          position='absolute'
          top={'20px'}
          left={'20px'}
          sx={{
            width: '90%',
            maxWidth: '495px',
          }}
        >
          <SearchWithSuggestions
            // width={'495px'}
            handleSelectedProperty={showSelectedPropOnMap}
            handleClearSearch={clearFilter}
          />
        </Box>
      )}
      {showFilters && (
        <Box id={'1'} position={'absolute'} right={10} bottom={5} zIndex={2}>
          {isShowMoreFilters && !isMobile && (
            <>
              <Box height={'500px'} overflow={'auto'}>
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
                  <Select
                    label=''
                    selectedId={getValueObjectId(filter?.type, listingType)}
                    onChange={(val) => {
                      setFilter((old: any) => {
                        return { ...old, type: val };
                      });
                    }}
                    options={[
                      {
                        id: 1,
                        label: 'Property Type',
                        value: '-',
                        disabled: true,
                      },
                      ...listingType,
                    ]}
                    size='medium'
                    isRemoveBorder
                    bgColor={colors.whiteFF}
                    style={{
                      width: '100%',
                    }}
                  />
                </Box>
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
                  <RangeSelector
                    fieldTitle='Price Range'
                    fieldName='price'
                    bgcolor={colors.whiteFF}
                    onSliderChange={(e, v, at) => {
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
                    isPriceFormat={true}
                  />
                </Box>
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
                  <RangeSelector
                    fieldTitle='Price per sqft'
                    fieldName='pricePerSqft'
                    bgcolor={colors.whiteFF}
                    onSliderChange={(e, v, at) => {
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
                </Box>
                <Box padding={'5px'} marginBottom={'10px'}>
                  <RangeSelector
                    fieldTitle='Unit Size'
                    fieldName='unit_size'
                    bgcolor={colors.whiteFF}
                    onSliderChange={(e, v, at) => {
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
                    min={DefaultCondosFilter.unit_size.min}
                    max={DefaultCondosFilter.unit_size.max}
                    steps={DefaultCondosFilter.unit_size.steps}
                  />
                </Box>
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
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
                  {/* <RangeSelector
                    fieldTitle='Beds'
                    fieldName='beds'
                    bgcolor={colors.whiteFF}
                    onSliderChange={(e, v, at) => {
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
                    steps={0.5}
                  /> */}
                </Box>
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
                  <Select
                    label=''
                    bgColor={colors.whiteFF}
                    selectedId={getValueObjectId(
                      filter.sellingStatus,
                      sellingStatus
                    )}
                    onChange={(e) => {
                      setFilter((old: any) => {
                        return { ...old, sellingStatus: e };
                      });
                    }}
                    options={[
                      {
                        id: 1,
                        label: 'Selling Status',
                        value: '-',
                        disabled: true,
                      },
                      ...sellingStatus,
                    ]}
                    style={{
                      width: '100%',
                    }}
                    size='medium'
                  />
                </Box>{' '}
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
                  <Box borderRadius={'10px'} bgcolor={'white'}></Box>
                </Box>
                <Box width={'200px'} padding={'5px'} marginBottom={'10px'}>
                  <Select
                    label=''
                    bgColor={colors.whiteFF}
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
                </Box>
              </Box>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                flexDirection={'row'}
                borderRadius={'8px'}
                width={'200px'}
                paddingY={'10px'}
                mb={'10px'}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <Button
                  text='Apply'
                  token={tokens.FS13FW400LH18R}
                  variant='blue'
                  onClick={ApplyFiler}
                  justifyContent='center'
                  style={{ marginRight: '10px', whiteSpace: 'nowrap' }}
                />
                <Button
                  text='Clear'
                  token={tokens.FS13FW400LH18R}
                  variant='black'
                  onClick={clearFilter}
                  justifyContent='center'
                  style={{ marginRight: '10px', whiteSpace: 'nowrap' }}
                />
              </Box>
            </>
          )}
          <Box
            bgcolor={isShowMoreFilters ? colors.black21 : colors.whiteFF}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
            flexDirection={'column'}
            borderRadius={'8px'}
            width={isMobile ? '150px' : '200px'}
            paddingY={'10px'}
            mb={'13px'}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              setIsShowMoreFilters(!isShowMoreFilters);
            }}
          >
            <Image
              src={
                isShowMoreFilters
                  ? '/icons/map-verticalfilters-alt.svg'
                  : '/icons/map-verticalfilters.svg'
              }
              width='22px'
              height='22px'
              alt='more-filters-icon'
              style={{ marginBottom: '8px' }}
            />
            <Text
              text={isShowMoreFilters ? 'Hide Filters' : 'More Filters'}
              token={tokens.FS16FW500LH18M}
              color={isShowMoreFilters ? colors.whiteFF : colors.black21}
            />
          </Box>
        </Box>
      )}
      {fetchingProp && (
        <Box
          width={'100%'}
          height={'100%'}
          position={'absolute'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          zIndex={99999}
          top={0}
          sx={{
            backgroundColor: alpha(colors.black21, 0.6),
            borderRadius: '10px',
          }}
        >
          <CircularProgress size={'2.5rem'} sx={{ color: colors.whiteFF }} />
        </Box>
      )}
      {/* {isMobile && isShowMoreFilters && (
        <SearchFilterDialog
          filters={filter}
          setFilters={setFilter}
          open={isShowMoreFilters}
          toggleDialog={() => {
            setIsShowMoreFilters(!isShowMoreFilters);
          }}
          handleSubmit={(isClear = false) =>
            isClear ? clearFilter() : ApplyFiler()
          }
        />
      )} */}
    </Box>
  );
}

function calculateAveragePosition(positions: [number, number][]) {
  let totalLat = 0;
  let totalLng = 0;

  // Loop through the positions
  positions.forEach((position) => {
    totalLat += position[0];
    totalLng += position[1];
  });

  // Calculate the average latitude and longitude
  const avgLat = totalLat / positions.length;
  const avgLng = totalLng / positions.length;

  return [avgLat, avgLng];
}
