import ViewMapWithClustering from '@/collections/CustomMap/SearchableMap/ViewWithCluster';
import { fetchFixedMapsProperties } from '@/services/api';
import { torontoCord } from '@/utils/appInfo';
import { Box, SxProps, Theme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

type Props = {
  height: number;
  styles?: SxProps<Theme>;
  locations?: any;
  zoomLevelProp?: number;
  mapCenter: [number, number];
};

const FixedMap = ({
  height,
  styles,
  locations,
  zoomLevelProp = 9,
  mapCenter,
}: Props) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isDsk = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const [zoomLevel] = useState(zoomLevelProp);
  const [listings, setListings] = useState(locations || []);
  const mapRef = useRef();

  useEffect(() => {
    (async () => {
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
    })();
    (async () => {
      const response = await fetchFixedMapsProperties();
      if (response?.data?.length > 0) {
        let mapData = response.data.map((el: any) => ({
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
          projImage: el?.featured_building_images?.[0]?.url || '',
        }));
        setListings((st: any) => st.concat(mapData));
      }
    })();
  }, []);

  return (
    <Box
      width='100vw'
      height={height}
      position='relative'
      sx={{
        ...styles,
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      <Box
        position='absolute'
        top={0}
        left={0}
        height={isTab && !isMobile ? '320px' : isMobile ? 200 : height + 100}
        sx={{
          background:
            isTab && !isMobile
              ? `linear-gradient(to bottom, rgba(255,255,255,1) 50%,rgba(255,255,255,0) 100%)`
              : isMobile
              ? `linear-gradient(to bottom, rgba(255,255,255,1) 70%,rgba(255,255,255,0) 100%)`
              : `linear-gradient(to right, rgba(255,255,255,1) 80%,rgba(255,255,255,0) 100%)`,
          '& .leaflet-popup-tip-container': {
            display: 'none',
          },
          zIndex: 401,
          width: { xs: '100vw', md: '65vw', lg: '63vw', xl: '60vw' },
        }}
      />
      <MapContainer
        ref={mapRef as any}
        center={mapCenter}
        zoom={zoomLevel}
        scrollWheelZoom={false}
        style={{
          height,
          width: isTab ? '100vw' : isDsk ? '65vw' : '55vw',
          marginLeft: 'auto',
          float: 'right',
          zIndex: 400,
        }}
        zoomControl={false}
        minZoom={3}
      >
        <TileLayer url={tileLayerUrl} />
        <ViewMapWithClustering
          data={listings}
          mapHeight={`${height + 30}px`}
          zoomBtnSize='small'
          zoomPosition='end'
        />
      </MapContainer>
    </Box>
  );
};

export default FixedMap;
