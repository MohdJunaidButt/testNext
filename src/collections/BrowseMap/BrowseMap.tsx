/* eslint-disable react-hooks/exhaustive-deps */
import CustomDrawer from '@/collections/BrowseMap/CustomDrawer';
import ListViewDrawer from '@/collections/BrowseMap/ListViewDrawer';
import MapFilters from '@/collections/BrowseMap/MapFilters';
import { DefaultCondosFilter } from '@/collections/Condos/Variables/DefaultFilter';
import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import ViewMapWithClustering from '@/collections/CustomMap/SearchableMap/ViewWithCluster';
import Button from '@/components/Button/Button';
import URL from '@/config/index';
import useCurrency from '@/hooks/useCurrency';
import { tokens } from '@/styles';
import { Property, PropertyType } from '@/types/common/THomePage';
import { FilterRange } from '@/types/common/filterRange';
import ObjectToPrams from '@/utils/ObjectToParams';
import { torontoCord } from '@/utils/appInfo';
import getNonEmptyFields from '@/utils/getNonEmptyFields';
import { queryParamsToFilterFormat } from '@/utils/varaibles/FilterVariables';
import { Box, Stack, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { LatLngBounds } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { debounce } from 'lodash';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';

const SearchFilterDialog = dynamic(
  () => import('@/collections/SearchFilterDialog/SearchFilterDialog'),
  {
    ssr: false,
  }
);

type IBrowseMapProps = {
  filterRanges: Array<FilterRange>;
  cities: Array<{
    id: number;
    label: string;
    value: string;
    longitude: number;
    latitude: number;
  }>;
};

const BrowseMap = ({ filterRanges, cities }: IBrowseMapProps) => {
  const isLrg = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  const isLrgDesk = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isDsk = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isMob = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const { convPricToDefCurr } = useCurrency();
  const router = useRouter();
  const { query } = router;

  const [listings, setListings] = useState<Property[]>([]);
  const [isFlying, setIsFlying] = useState(false);

  const [showListView, setShowListView] = useState(false);
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [mapCoordinates, setMapCoordinates] = useState<{
    latitude: string;
    longitude: string;
  }>({
    longitude:
      (query?.latitude as string) || '-79.64572906494142,-79.12044525146484',
    latitude:
      (query?.longitude as string) || '43.53884267921116,43.767127021205305',
  });

  const toggleListView = () => setShowListView((st) => !st);

  let defaultFilters = {
    ...DefaultCondosFilter,
    ...filterRanges.reduce((acc: any, filter: FilterRange) => {
      const { filter_type, min, max } = filter;
      acc[filter_type] = { min, max };
      return acc;
    }, {}),
  };

  const [filter, setFilter] = useState({
    ...defaultFilters,
    longitude: '',
    latitude: '',
  });
  const source = useRef(axios.CancelToken.source());
  const mapRef = useRef<any>();

  const [latMin, latMax] = (query?.latitude as string)?.split(',');
  const [lngMin, lngMax] = (query?.longitude as string)?.split(',');

  const currentRequestId = useRef(0);

  const fetchListings = useRef(
    debounce(async (filters, flag = false) => {
      const requestId = ++currentRequestId.current;
      try {
        if (flag) return setIsFlying(false);
        setFetching(true);
        // Cancel the previous request
        if (source.current) {
          source.current.cancel('Operation canceled due to new request.');
        }
        source.current = axios.CancelToken.source();
        if (
          filters.type &&
          filters.type.split(',').includes('house') &&
          filters.type.split(',').includes('condo')
        )
          delete filters.type;
        if (!filters?.selling_status) {
          filters = {
            ...filters,
            selling_status: 'Selling,Pending,Registration',
          };
        }
        if ('sales_price' in filters) {
          const [min, max] = filters.sales_price.split('-');
          filters.sales_price = [
            convPricToDefCurr(min),
            convPricToDefCurr(max),
          ].join('-');
        }
        if ('price_per_sqft' in filters) {
          const [min, max] = filters.price_per_sqft.split('-');
          filters.price_per_sqft = [
            convPricToDefCurr(min),
            convPricToDefCurr(max),
          ].join('-');
        }

        const { data } = await URL.get(
          `/properties/homepage-map?${ObjectToPrams(filters)}`,
          { cancelToken: source.current.token }
        );
        if (requestId === currentRequestId.current) {
          setListings(data.data);
          setFetching(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Previous request canceled', error.message);
        } else {
          console.error('Error fetching listings', error);
        }
      }
    }, 700)
  ).current;

  useEffect(() => {
    fetchListings(router.query, isFlying);
  }, [fetchListings, router.query]);

  const [tileLayerUrl, setTileLayerUrl] = useState('');

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
  }, []);

  const debouncedRouterPush = useRef(
    debounce((query) => {
      router.push({ pathname: router.pathname, query }, undefined, {
        shallow: true,
      });
    }, 400)
  ).current;

  useEffect(() => {
    const queryWithFilter = {
      ...(query && query),
      ...mapCoordinates,
    };
    debouncedRouterPush(queryWithFilter);
    return () => debouncedRouterPush.cancel();
  }, [mapCoordinates]);

  const handleMapCoordChange = ({
    latitude,
    longitude,
  }: {
    latitude: string;
    longitude: string;
  }) => {
    setMapCoordinates({ latitude, longitude });
  };

  const showSelectedPropOnMap = async ({
    label,
    type,
    slug,
  }: {
    label: string;
    type: PropertyType;
    slug: string | null;
    multipleObject?: {
      label?: string;
      type?: string;
    }[];
  }) => {
    handleSearchedResult({
      label,
      type,
      slug,
    });
  };

  const handleSearchedResult = async (value: any) => {
    const searchedResults: any = getNonEmptyFields({
      [value.type]: value.label,
    });

    try {
      source.current.cancel('Operation canceled due to new request.');
      source.current = axios.CancelToken.source();
      const { data } = await URL.get(
        `/properties/homepage-map?${ObjectToPrams({
          ...searchedResults,
        })}`,
        { cancelToken: source.current.token }
      );
      setListings(data.data);
      setIsFlying(true);
      if (data.data.length > 0)
        (mapRef.current as any)?.flyTo(
          [
            +data.data[0].property_details.latitude,
            +data.data[0].property_details.longitude,
          ],
          12
        );
      return;
    } catch (er) {}
  };

  const handleCityChange = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    setIsFlying(true);
    (mapRef.current as any)?.flyTo([latitude, longitude], 12);
  };

  const handleClearSearch = () => {
    router.push(
      { pathname: router.pathname, query: { ...mapCoordinates } },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const handleSearchDialogSubmit = (filters: any, isClear?: boolean) => {
    if (isClear) handleClearSearch();
    else {
      if (filters.city) {
        let getCity = cities.filter((city) => city.label === filters.city)?.[0];
        setIsFlying(true);
        (mapRef.current as any)?.flyTo(
          [getCity.latitude, getCity.longitude],
          12
        );
      }
      setFilter((prevSt: any) => {
        return { ...prevSt, ...filters };
      });
    }
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 52,
        bottom: 0,
        width: '100vw',
        overflow: 'hidden',
        height: '-webkit-fill-available',
      }}
    >
      {!isLrgDesk && (
        <MapFilters
          defaultFilters={defaultFilters}
          cities={cities}
          filterRanges={filterRanges}
          handleCityChange={handleCityChange}
        />
      )}
      <MapContainer
        ref={mapRef as any}
        center={
          [(+latMin + +latMax) / 2, (+lngMin + +lngMax) / 2] || torontoCord
        }
        zoom={12}
        scrollWheelZoom={false}
        zoomControl={false}
        style={{ height: isDsk ? '100%' : 'calc(100% - 65px)', width: '100%' }}
      >
        <TileLayer url={tileLayerUrl} />
        <MapBounds handleMapCoordChange={handleMapCoordChange} />
        <ViewMapWithClustering
          data={
            listings.length > 0
              ? listings.map((el: any) => ({
                  id: el.property_id,
                  propName: el?.property_details.project_development_name || '',
                  position: [
                    +el?.property_details?.latitude,
                    +el?.property_details?.longitude,
                  ],
                  propSlug: el?.property_details?.slug,
                  projType: el?.property_type,
                  projDesc:
                    `${el?.property_details?.address}, ${el?.property_details?.city}` ||
                    '-',
                  projImage:
                    el?.featured_building_images?.[0]?.url ||
                    '/images/property/coming-soon.jpg',
                  propStatus:
                    el?.property_details?.selling_status !== '-'
                      ? el?.property_details?.selling_status
                      : el?.property_details?.construction_status !== '-'
                      ? el?.property_details?.construction_status
                      : '',
                }))
              : []
          }
          mapHeight={'100%'}
          zoomVertPosition='top'
          zoomBtnDirection='column'
          zoomBtnSize='small'
        />
        <Box
          position='absolute'
          top={isMob ? '15px' : '20px'}
          left={isMob ? '15px' : '20px'}
          sx={{
            width: '90%',
            maxWidth: '495px',
          }}
        >
          <SearchWithSuggestions
            handleSelectedProperty={showSelectedPropOnMap}
            handleClearSearch={handleClearSearch}
            width={isMob ? '100%' : '400px'}
            searchUrl='/properties/homepage-navbar1/'
          />
        </Box>
        {isDsk && (
          <Stack
            spacing={'10px'}
            sx={{
              position: 'absolute',
              bottom: '18px',
              left: { xs: '15px', sm: '20px' },
              top: 'calc(50px + 20px + 15px + 100px)',
            }}
            className='btnsOnMapIndex-401'
            id='tabMapOPtions'
          >
            <Button
              variant='black'
              onClick={() => toggleListView()}
              text=''
              icon='/icons/condo-alt.svg'
              iconAlt='/icons/condo-alt.svg'
              iconSize={{ width: 15, height: 15 }}
              justifyContent='center'
              borderRadius='12px'
              token={tokens.FS18FW400LH18R}
              style={{
                height: { xs: '40px' },
                width: { xs: '40px' },
              }}
            />
            <Button
              variant='black'
              onClick={() => setIsShowMoreFilters(!isShowMoreFilters)}
              text=''
              icon='/icons/filter-btn-white.svg'
              iconAlt='/icons/filter-btn-white.svg'
              iconSize={{ width: 15, height: 15 }}
              justifyContent='center'
              borderRadius='12px'
              token={tokens.FS18FW400LH18R}
              style={{
                height: { xs: '40px' },
                width: { xs: '40px' },
              }}
            />
          </Stack>
        )}
        {isShowMoreFilters && (
          <SearchFilterDialog
            initialfilters={filter}
            open={isShowMoreFilters}
            toggleDialog={() => setIsShowMoreFilters(!isShowMoreFilters)}
            handleSubmit={handleSearchDialogSubmit}
            filterRanges={filterRanges}
            cities={cities}
          />
        )}
      </MapContainer>
      {isLrg && (
        <CustomDrawer
          totalSearchedResults={listings.length}
          properties={listings}
          isLoading={fetching}
        />
      )}
      {showListView && (
        <ListViewDrawer
          open={showListView}
          toggleOpen={toggleListView}
          totalSearchedResults={listings.length}
          properties={listings}
          isLoading={fetching}
        />
      )}
    </Box>
  );
};

const getMapBounds = (bounds: LatLngBounds) => {
  const coordinates = {
    latitude:
      bounds.getNorth() < bounds.getSouth()
        ? `${bounds.getNorth()},${bounds.getSouth()}`
        : `${bounds.getSouth()},${bounds.getNorth()}`,
    longitude:
      bounds.getEast() < bounds.getWest()
        ? `${bounds.getEast()},${bounds.getWest()}`
        : `${bounds.getWest()},${bounds.getEast()}`,
  };
  return coordinates;
}; // Component to retrieve and display map bounds
function MapBounds({
  handleMapCoordChange,
}: {
  handleMapCoordChange: ({
    latitude,
    longitude,
  }: {
    latitude: string;
    longitude: string;
  }) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const handleCoordinateChange = () =>
      handleMapCoordChange(getMapBounds(map.getBounds()));

    map.whenReady(handleCoordinateChange);
    map.on('moveend', handleCoordinateChange);
  }, [map]);

  return null;
}

export default BrowseMap;
