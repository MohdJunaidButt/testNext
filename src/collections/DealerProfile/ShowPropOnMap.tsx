import ViewMapWithClustering from '@/collections/CustomMap/SearchableMap/ViewWithCluster';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
} from '@/styles';
import { Box, CircularProgress, alpha, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const ShowPropOnMap = ({
  properties,
  height,
}: {
  properties: any;
  height: number;
}) => {
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const [fetchingProp, setFetchingProp] = useState(true);
  const [zoomLevel] = useState(10);
  const mapRef = useRef();

  useEffect(() => {
    (async () => {
      setFetchingProp(true);
      const apiKey = process.env.MAP_TILER_KEY;
      try {
        const response = await axios.get(
          `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${apiKey}`
        );
        const tileLayerUrl = response.data.tiles[0];
        setTileLayerUrl(tileLayerUrl);
      } catch (error) {
        console.error('Error fetching tile layer:', error);
      } finally {
        setFetchingProp(false);
      }
    })();
  }, []);

  return (
    <Box position='relative'>
      <MapContainer
        ref={mapRef as any}
        center={
          properties.length > 0
            ? properties[0].position
            : [43.6748081, -79.3996562]
        }
        zoom={zoomLevel}
        scrollWheelZoom={false}
        zoomControl={false}
        minZoom={3}
        style={{
          height,
          width: '100%',
        }}
      >
        <TileLayer url={tileLayerUrl} />
        <ViewMapWithClustering data={properties} mapHeight={'650px'} />
      </MapContainer>
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
    </Box>
  );
};

export default ShowPropOnMap;
