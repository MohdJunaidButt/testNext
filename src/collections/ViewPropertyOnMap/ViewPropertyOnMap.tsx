import { Text } from '@/components';
import { colors, tokens } from '@/styles';
import { Place } from '@/types/common/places';
import { Box, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useTranslation } from 'react-i18next';

const MapWithNoSSR = dynamic(() => import('../CustomMap/CustomMap'), {
  ssr: false,
});
export default function ViewPropertyOnMap({
  showFilters,
  showSearch,
  latitude,
  longitude,
  isCondo,
  mapRef,
  currentPosition,
  fullScreenMap,
  height,
  mapHeight,
  zoomLevelProp,
  showPlacesAround,
  places,
}: {
  showFilters: boolean;
  showSearch: boolean;
  latitude?: any;
  longitude?: any;
  isCondo?: boolean;
  currentPosition?: boolean;
  height?: number;
  mapHeight?: number;
  fullScreenMap?: boolean;
  mapRef: React.RefObject<HTMLDivElement>;
  zoomLevelProp?: number;
  showPlacesAround?: boolean;
  places?: Place[];
}) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <Box
      ref={mapRef}
      width={'100%'}
      marginTop={isMobile ? '30px' : '35px'}
      zIndex={2}
      height={height || 600}
      id={'map-view'}
    >
      <Text
        text={t('Map View')}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          marginBottom: isMobile ? '10px' : '15px',
        }}
        color={colors.black21}
        textAlign='left'
      />
      <MapWithNoSSR
        mapHeadingText={false}
        bottomNavButtonsPlacement='flex-end'
        showFilters={showFilters}
        showSearch={showSearch}
        longitude={longitude}
        latitude={latitude}
        isCondo={isCondo}
        currentPosition={currentPosition}
        fullScreenMap={fullScreenMap}
        zoomLevelProp={zoomLevelProp}
        showPlacesAround={showPlacesAround}
        places={places}
        height={mapHeight}
      />
    </Box>
  );
}
