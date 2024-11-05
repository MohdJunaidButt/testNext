import PlacesLegend from '@/collections/CustomMap/PlacesLegend';
import {
  GridContainer,
  SearchBar,
  Text,
  TextInputWithNoBorders,
} from '@/components';
import Image from '@/components/Image/Image';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import Select from '@/components/Select/Select';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { Place } from '@/types/common/places';
import { getIcon } from '@/utils/extra/mapTypeCount';
import { Box, Card, CardContent, useMediaQuery } from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MarkerIcon } from './MarkerIcon';

interface CustomMapProps {
  mapHeadingText?: boolean;
  mapContainerStyles?: React.CSSProperties;
  overlayContainerStyles?: React.CSSProperties;
  bottomNavButtonsPlacement?: 'flex-start' | 'center' | 'flex-end';
  showFilters?: boolean;
  showSearch?: boolean;
  longitude?: number;
  latitude?: number;
  isCondo?: boolean;
  currentPosition?: boolean;
  fullScreenMap?: boolean;
  zoomLevelProp?: number;
  showPlacesAround?: boolean;
  places?: Place[];
  height?: number;
}

export default function CustomMap({
  mapContainerStyles,
  mapHeadingText = true,
  overlayContainerStyles,
  bottomNavButtonsPlacement = 'flex-start',
  showFilters,
  longitude,
  latitude,
  isCondo,
  currentPosition,
  fullScreenMap,
  zoomLevelProp = 15,
  showPlacesAround = false,
  places = [],
  height = 600,
}: CustomMapProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [isShowMoreFilters, setIsShowMoreFilters] = useState(true);
  const [isShowFullScreenMap, setIsShowFullScreenMap] = useState(false);
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const [zoomLevel, setZoomLevel] = useState(zoomLevelProp);
  const mapRef = useRef();

  // get enviorment variable

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

  return (
    <>
      {mapHeadingText && (
        <ResponsiveContainer>
          <GridContainer justifyContent='space-between'>
            <Text
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS48FW800LH61_49B
              }
              text='Find Properties Near You'
              color={colors.black21}
              textAlign='left'
              styles={{ marginBottom: '50px' }}
            />
          </GridContainer>
        </ResponsiveContainer>
      )}
      <MapContainer
        ref={mapRef as any}
        center={longitude && latitude ? [latitude, longitude] : [43.7, -79.42]}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{
          height,
          width: '100%',
          zIndex: 2,
          ...mapContainerStyles,
        }}
        zoomControl={false}
        minZoom={3}
      >
        <TileLayer url={tileLayerUrl} />
        <PlacesLegend places={places || []} />
        <Box zIndex={999999}>
          <Marker
            position={
              longitude && latitude
                ? [latitude as any, longitude as any]
                : [43.7, -79.42]
            }
            icon={MarkerIcon([24, 24], isCondo as boolean)}
          ></Marker>
        </Box>
        {showPlacesAround &&
          places
            .filter((el) => getIcon(el.primary_type))
            .map((place) => (
              <Box key={place.id} zIndex={999999}>
                <Marker
                  position={[place.latitude as any, place.longitude as any]}
                  icon={MarkerIcon(
                    [20, 20],
                    false,
                    place.primary_type as string
                  )}
                >
                  <Popup>
                    <Card sx={{ maxWidth: { xs: 170, sm: 200 } }}>
                      <CardContent
                        sx={{
                          '&.MuiCardContent-root:last-child': {
                            padding: '20px 15px 15px',
                          },
                        }}
                      >
                        <Text
                          text={place.display_name}
                          token={tokens.FS14FW600LH16SB}
                          color={colors.black21}
                          textAlign='left'
                          styles={{
                            marginBottom: '5px',
                            fontSize: { xs: '13px', sm: '14px' },
                          }}
                        />
                        <Box
                          {...displayFlexAlignItemsCenterJustifyContentCenter}
                          gap={'5px'}
                        >
                          <Text
                            text={place.primary_type.split('_').join(' ')}
                            token={tokens.FS11FW400LH18R}
                            color={colors.grey96}
                            textAlign='left'
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </Popup>
                </Marker>
              </Box>
            ))}
        {showFilters && (
          <Box
            position={'relative'}
            left={10}
            top={10}
            sx={overlayContainerStyles}
            zIndex={999}
          >
            <SearchBar
              placeholder='Which city are you interested in?'
              backGroundColor={colors.whiteFF}
              color={colors.black21}
              onChange={() => {}}
              token={tokens.FS16FW600LH21_86R}
              width='100%'
              borderRadius='8px'
              height='70px'
              noBorder
              iconWidth={19}
              iconHeight={19}
              styles={{ width: '40%' }}
            />
          </Box>
        )}
        {showFilters && (
          <Box position={'absolute'} right={10} top={10} zIndex={999}>
            <Box
              bgcolor={isShowMoreFilters ? colors.black21 : colors.whiteFF}
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              flexDirection={'column'}
              borderRadius={'8px'}
              width={'200px'}
              paddingY={'10px'}
              mb={'10px'}
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
                width='24px'
                height='24px'
                alt='more-filters-icon'
                style={{ marginBottom: '8px' }}
              />
              <Text
                text={isShowMoreFilters ? 'Hide Filters' : 'More Filters'}
                token={tokens.FS16FW500LH18M}
                color={isShowMoreFilters ? colors.whiteFF : colors.black21}
              />
            </Box>
            {isShowMoreFilters && (
              <>
                <Box
                  width={'200px'}
                  bgcolor={colors.whiteFF}
                  padding={'5px'}
                  marginBottom={'10px'}
                >
                  <Text
                    text={'Property Type'}
                    color={colors.grey96}
                    token={tokens.FS14FW400LH19R}
                    textAlign='left'
                  />
                  <Select
                    options={[{ id: 1, label: '1', value: '1' }]}
                    style={{
                      width: '95%',
                      backgroundColor: 'white',
                    }}
                    isRemoveBorder
                    label=''
                  />{' '}
                </Box>
                <Box
                  width={'200px'}
                  bgcolor={colors.whiteFF}
                  padding={'5px'}
                  marginBottom={'10px'}
                >
                  <Text
                    text={'For Sale'}
                    color={colors.grey96}
                    token={tokens.FS14FW400LH19R}
                    textAlign='left'
                  />
                  <Select
                    options={[{ id: 1, label: '1', value: '1' }]}
                    style={{
                      width: '95%',
                      backgroundColor: 'white',
                    }}
                    isRemoveBorder
                    label=''
                  />{' '}
                </Box>
                <Box
                  width={'200px'}
                  bgcolor={colors.whiteFF}
                  padding={'5px'}
                  marginBottom={'10px'}
                >
                  <Text
                    text={'Price'}
                    color={colors.grey96}
                    token={tokens.FS14FW400LH19R}
                    textAlign='left'
                  />
                  <Select
                    options={[{ id: 1, label: '1', value: '1' }]}
                    style={{
                      width: '95%',
                      backgroundColor: 'white',
                    }}
                    isRemoveBorder
                    label=''
                  />{' '}
                </Box>
                <TextInputWithNoBorders
                  label='City'
                  onChange={() => {}}
                  placeholder='Please enter'
                  backgroundColor={colors.whiteFF}
                  borderRadius='8px'
                  styles={{ marginBottom: '10px', width: '200px' }}
                />
                <Box
                  width={'200px'}
                  bgcolor={colors.whiteFF}
                  padding={'5px'}
                  marginBottom={'10px'}
                >
                  <Text
                    text={'Bedrooms'}
                    color={colors.grey96}
                    token={tokens.FS14FW400LH19R}
                    textAlign='left'
                  />
                  <Select
                    options={[{ id: 1, label: '1', value: '1' }]}
                    style={{
                      width: '95%',
                      backgroundColor: 'white',
                    }}
                    isRemoveBorder
                    label=''
                  />{' '}
                </Box>
                <Box
                  width={'200px'}
                  bgcolor={colors.whiteFF}
                  padding={'5px'}
                  marginBottom={'10px'}
                >
                  <Text
                    text={'Bathrooms'}
                    color={colors.grey96}
                    token={tokens.FS14FW400LH19R}
                    textAlign='left'
                  />
                  <Select
                    options={[
                      { id: 1, label: '1', value: '1' },
                      { id: 2, label: '2', value: '2' },
                      { id: 3, label: '3', value: '3' },
                    ]}
                    style={{
                      width: '95%',
                      backgroundColor: 'white',
                    }}
                    isRemoveBorder
                    label=''
                  />{' '}
                </Box>{' '}
                <TextInputWithNoBorders
                  label='Size in SQFT'
                  onChange={() => {}}
                  placeholder='Please enter'
                  backgroundColor={colors.whiteFF}
                  borderRadius='8px'
                  styles={{ marginBottom: '10px', width: '200px' }}
                />{' '}
                <TextInputWithNoBorders
                  label='Project Name/ Builder'
                  onChange={() => {}}
                  placeholder='Please enter'
                  backgroundColor={colors.whiteFF}
                  borderRadius='8px'
                  styles={{ marginBottom: '10px', width: '200px' }}
                />{' '}
                <TextInputWithNoBorders
                  label='Neighborhood'
                  onChange={() => {}}
                  placeholder='Please enter'
                  backgroundColor={colors.whiteFF}
                  borderRadius='8px'
                  styles={{ marginBottom: '10px', width: '200px' }}
                />
              </>
            )}
          </Box>
        )}
        <Box
          position={'absolute'}
          bottom={10}
          left={bottomNavButtonsPlacement === 'flex-start' ? 10 : 0}
          zIndex={999}
          sx={{ cursor: 'pointer' }}
        >
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            marginRight={bottomNavButtonsPlacement === 'flex-end' ? '10px' : 0}
            justifyContent={bottomNavButtonsPlacement}
          >
            {currentPosition && (
              <Box
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      (mapRef.current as any).flyTo(
                        [position.coords.latitude, position.coords.longitude],
                        9
                      );
                      setZoomLevel(9);
                    },
                    (error) => {
                      console.error(
                        'Error retrieving location:',
                        error.message
                      );
                    }
                  );
                }}
              >
                <Image
                  src='/icons/map-geolocation.svg'
                  alt='map-location'
                  width='70px'
                  height='70px'
                  style={{ marginRight: '20px' }}
                />
              </Box>
            )}
            {fullScreenMap && (
              <Box
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsShowFullScreenMap(true);
                }}
              >
                <Image
                  src='/icons/map-fullscreen.svg'
                  alt='map-fullscreen'
                  width='70px'
                  height='70px'
                  style={{ marginRight: '20px' }}
                />
              </Box>
            )}

            <Box
              sx={{ cursor: 'pointer', marginLeft: '1rem' }}
              onClick={() => {
                setZoomLevel(zoomLevel - 1);
                (mapRef.current as any).setZoom(zoomLevel - 1);
              }}
            >
              <Image
                src='/icons/map-zoom-out.svg'
                alt='map-zoon-out'
                width='40px'
                height='40px'
                style={{ marginRight: '10px' }}
              />
            </Box>
            <Box
              sx={{ cursor: 'pointer' }}
              onClick={() => {
                setZoomLevel(zoomLevel + 1);
                (mapRef.current as any).setZoom(zoomLevel + 1);
              }}
            >
              <Image
                src='/icons/map-zoom-in.svg'
                alt='map-zoom-in'
                width='40px'
                height='40px'
              />
            </Box>
          </Box>
        </Box>
      </MapContainer>
    </>
  );
}
