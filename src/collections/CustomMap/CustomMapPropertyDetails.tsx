import { Text } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MarkerIcon } from './MarkerIcon';

export default function CustomMapPropertyDetails() {
  const [zoomLevel, setZoomLevel] = useState(9);
  const mapRef = useRef();
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const locations = [
    { name: 'Location 1', position: [51.50468231156, -0.08734166600333994] },
    { name: 'Location 2', position: [51.50425824571023, -0.0884038207732374] },
    {
      name: 'Location 3',
      position: [51.505353462831415, -0.08953034855949228],
    },
  ];

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
        {locations.map((location, index) => (
          <Box zIndex={999999} key={index}>
            <Marker
              position={[location.position[0], location.position[1]]}
              icon={MarkerIcon([25, 25])}
              title={location.name}
            >
              <Popup>
                <Card sx={{ maxWidth: 200 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image='/images/property/coming-soon.jpg'
                    title={location.name}
                  />
                  <CardContent>
                    <Text
                      text='John House'
                      token={tokens.FS14FW600LH16SB}
                      color={colors.black21}
                      textAlign='left'
                      styles={{ marginBottom: '5px' }}
                    />
                    <Box
                      {...displayFlexAlignItemsCenterJustifyContentCenter}
                      gap={'5px'}
                    >
                      <Text
                        text='At london Park.'
                        token={tokens.FS11FW400LH18R}
                        color={colors.grey96}
                        textAlign='left'
                      />
                      <Button
                        variant='blackOutlined'
                        onClick={() => {}}
                        text='Details'
                        justifyContent='center'
                        token={tokens.FS11FW400LH18R}
                        style={{ height: 'fit-content', padding: '3px 10px' }}
                        borderRadius='20px'
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Popup>
            </Marker>
          </Box>
        ))}
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          position={'relative'}
          left={10}
          top={10}
          zIndex={999}
          alignItems={'baseline'}
        >
          <Box
            padding={'20px'}
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            width='65%'
            gap={'15px'}
          >
            <Button
              variant='primary'
              onClick={() => {}}
              text='Sold Comparables'
              token={tokens.FS14FW500LH19R}
              justifyContent='center'
              style={{ width: '100%', flex: 1 }}
              borderRadius='10px'
            />
            <Button
              variant='white'
              onClick={() => {}}
              text='Rent Comparables'
              token={tokens.FS14FW500LH19R}
              justifyContent='center'
              style={{ width: '100%', flex: 1 }}
              borderRadius='10px'
            />
          </Box>
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          sx={{ cursor: 'pointer' }}
          position={'relative'}
          right={10}
          bottom={'-485px'}
          zIndex={999}
          justifyContent={'flex-end'}
        >
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
                  console.error('Error retrieving location:', error.message);
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
          <Box
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              setZoomLevel(zoomLevel - 1);
              (mapRef.current as any).setZoom(zoomLevel - 1);
            }}
          >
            <Image
              src='/icons/map-zoom-out.svg'
              alt='map-zoon-out'
              width='70px'
              height='70px'
              style={{ marginRight: '20px' }}
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
              width='70px'
              height='70px'
            />
          </Box>
        </Box>
      </MapContainer>
    </>
  );
}
