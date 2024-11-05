import { SearchBar, TextInputWithNoBorders } from '@/components';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box } from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function CustomMapViewPropertyOnMap() {
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const [zoomLevel, setZoomLevel] = useState(9);
  const mapRef = useRef();

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
      <MapContainer
        ref={mapRef as any}
        center={[51.505, -0.09]}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{ height: 650, width: '100%', borderRadius: '8px' }}
        zoomControl={false}
        minZoom={3}
      >
        <TileLayer url={tileLayerUrl} />
      </MapContainer>
      <Box
        position={'relative'}
        top={'-650px'}
        marginBottom={'-250px'}
        zIndex={500}
        padding={'50px'}
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        alignItems='start'
        width='inherit'
      >
        <Box width={'50%'}>
          <Box width={'40%'}>
            <SearchBar
              placeholder='Search'
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
              styles={{ minWidth: '170px' }}
            />{' '}
          </Box>
        </Box>
        <Box width={'50%'}>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentCenter}
            flexDirection={'column'}
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            width={'100%'}
          >
            <TextInputWithNoBorders
              label='City'
              onChange={() => {}}
              placeholder='Toronto'
              backgroundColor={colors.whiteFF}
              borderRadius='8px'
            />
            <TextInputWithNoBorders
              label='Price'
              onChange={() => {}}
              placeholder='2000$'
              backgroundColor={colors.whiteFF}
              borderRadius='8px'
              styles={{ marginTop: '10px' }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
