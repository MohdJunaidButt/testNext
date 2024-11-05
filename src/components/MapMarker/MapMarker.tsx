import { MarkerIcon } from '@/components/MapMarker/MarkerIcon';
import { Text } from '@/components/Text';
import { colors, tokens } from '@/styles';
import { Box, Card, CardContent, CardMedia, Stack } from '@mui/material';
import React from 'react';
import { Marker, Popup } from 'react-leaflet';

type MapMarkerProps = {
  position: [number, number];
  title: string;
  subtitle?: string;
  image: string;
  markerImg: string;
  propId: string;
  propSlug: string;
  projType: string;
  propStatus?: string;
};

const MapMarker = ({
  position,
  title,
  subtitle,
  image,
  markerImg,
  propSlug,
  propStatus,
  projType,
}: MapMarkerProps) => {
  return (
    <Box zIndex={1000}>
      <Marker
        position={[position[0], position[1]]}
        icon={MarkerIcon([22, 22], markerImg)}
        title={title}
      >
        <Popup>
          <Card
            sx={{
              width: { xs: 170, md: 180, lg: 190 },
              position: 'relative',
              borderRadius: '7px',
              cursor: 'pointer',
            }}
            onClick={() => window.open(`/property/${propSlug}`, '_blank')}
          >
            <CardMedia
              component={'img'}
              sx={{ height: { xs: 180, md: 190, lg: 200 } }}
              image={image}
              alt={title}
            />
            {propStatus && propStatus !== '' && (
              <Stack
                alignItems={'center'}
                justifyContent={'center'}
                sx={{
                  position: 'absolute',
                  top: 7,
                  left: 7,
                  borderRadius: '49px',
                  backgroundColor: colors.blueC2,
                  padding: '5px 12px',
                }}
              >
                <Text
                  text={propStatus}
                  token={tokens.FS12FW600LH16SG}
                  color={colors.whiteFF}
                  textAlign='left'
                  styles={{
                    width: 'max-content',
                    fontSize: { xs: '11px', sm: '12px' },
                  }}
                />
              </Stack>
            )}
            <CardContent
              sx={{
                padding: '7px 9px',
                '&.MuiCardContent-root:last-child': {
                  padding: '7px 9px',
                },
                position: 'absolute',
                bottom: 7,
                left: 7,
                right: 7,
                borderRadius: '4px',
                backgroundColor: colors.whiteFF,
              }}
            >
              <Text
                text={title}
                token={tokens.FS14FW600LH16SB}
                color={colors.black21}
                textAlign='left'
                styles={{
                  margin: '0 0 5px 0 !important',
                  width: { xs: '135px', md: '145px', lg: '155px' },
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: { xs: '12px', md: '13px', lg: '13px' },
                  '&:hover': {
                    color: colors.blueC2,
                  },
                }}
                cursor='pointer'
              />
              {subtitle && (
                <Text
                  text={subtitle}
                  token={tokens.FS12FW500LH18M}
                  color={colors.grey96}
                  textAlign='left'
                  styles={{
                    width: '180px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: { xs: '11px', md: '12px' },
                  }}
                />
              )}
              {/* <Box
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                gap={'5px'}
                mt={'10px'}
              >
                <Button
                  variant='blackOutlined'
                  onClick={handleDetailClick}
                  text='Details'
                  justifyContent='center'
                  token={tokens.FS11FW400LH18R}
                  maxWidth
                  style={{
                    height: 'fit-content',
                    padding: { xs: '2px 7px', md: '3px 10px' },
                    '& p': {
                      margin: '0 !important',
                    },
                  }}
                  borderRadius='20px'
                />
              </Box> */}
            </CardContent>
          </Card>
        </Popup>
      </Marker>
    </Box>
  );
};

export default MapMarker;
