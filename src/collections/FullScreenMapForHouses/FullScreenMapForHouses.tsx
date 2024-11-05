import { GridContainer, SearchBar, Text } from '@/components';

import PlaceholderDataPropertyCard from '@/components/Cards/PlaceholderDataPropertyCard';

import Button from '@/components/Button/Button';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import Image from '@/components/Image/Image';
import Select from '@/components/Select/Select';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { MarkerIcon } from '../CustomMap/MarkerIcon';

interface FullScreenMapForHousesProps {
  isOpen?: boolean;
  handleClose?: () => void;
}

const locations = [
  { name: 'Location 1', position: [51.50468231156, -0.08734166600333994] },
  { name: 'Location 2', position: [51.50425824571023, -0.0884038207732374] },
  {
    name: 'Location 3',
    position: [51.505353462831415, -0.08953034855949228],
  },
];

export default function FullScreenMapForHouses({
  isOpen = false,
  handleClose,
}: FullScreenMapForHousesProps) {
  const [tileLayerUrl, setTileLayerUrl] = useState('');
  const [zoomLevel, setZoomLevel] = useState(10);
  const mapRef = useRef();
  const router = useRouter();

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
    <Dialog open={isOpen} fullScreen style={{ zIndex: 999 }}>
      <DialogTitle>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          padding={'0px 0px 10px 0px'}
        >
          <SearchBar
            noBorder
            backGroundColor={colors.whiteFF}
            color={colors.black21}
            placeholder='Please enter property name'
            token={tokens.FS24FW400LH32_78R}
            width='80%'
          />
          <DialogCloseButton toggleClose={handleClose} />
        </Box>
        <Divider />
      </DialogTitle>
      <DialogContent>
        <GridContainer
          styles={{ marginTop: '10px' }}
          justifyContent='flex-start'
          spacing={1}
        >
          <>
            <Grid item xs={12} lg={8.5} xl={9}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                flexWrap='wrap'
                rowGap={'12px'}
              >
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'House',
                      label: 'House',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    color: colors.black21,
                    width: 'fit-content',
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />{' '}
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'Price Range',
                      label: 'Price Range',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    color: colors.black21,
                    width: 'fit-content',
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'Price per SQFT',
                      label: 'Price per SQFT',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    color: colors.black21,
                    width: 'fit-content',
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'Size',
                      label: 'Size',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    width: 'fit-content',
                    color: colors.black21,
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'Beds',
                      label: 'Beds',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    width: 'fit-content',
                    color: colors.black21,
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'Baths',
                      label: 'Baths',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    width: 'fit-content',
                    color: colors.black21,
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'Deposits',
                      label: 'Deposits',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    width: 'fit-content',
                    color: colors.black21,
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
                <Select
                  label=''
                  selectedId={1}
                  options={[
                    {
                      id: 1,
                      value: 'More Filters',
                      label: 'More Filters',
                      disabled: true,
                    },
                    { id: 2, value: 'Yes', label: 'Yes' },
                  ]}
                  innerStyles={{
                    padding: '0px 15px 0px 15px',
                    backgroundColor: colors.whiteFF,
                    borderRadius: '50px',
                    width: 'fit-content',
                    color: colors.black21,
                  }}
                  // IconComponent={<div style={{ color: colors.black21 }}>▼</div>}
                  style={{ marginRight: '10px' }}
                />
              </Box>
              <MapContainer
                ref={mapRef as any}
                center={[51.505, -0.09]}
                zoom={9}
                scrollWheelZoom={true}
                style={{ height: '75vh', width: '100%', marginTop: '20px' }}
                zoomControl={false}
              >
                <TileLayer url={tileLayerUrl} />{' '}
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
                                style={{
                                  height: 'fit-content',
                                  padding: '3px 10px',
                                }}
                                borderRadius='20px'
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Popup>
                    </Marker>
                  </Box>
                ))}
              </MapContainer>
              <Box
                sx={{ cursor: 'pointer' }}
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
                position={'relative'}
                right={-30}
                top={'-100px'}
                marginBottom={'-50px'}
                zIndex={999}
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
                position={'relative'}
                right={-120}
                top={'-120px'}
                marginBottom={'-100px'}
                zIndex={999}
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
                position={'relative'}
                right={-210}
                top={'-90px'}
                marginBottom={'-120px'}
                zIndex={999}
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
            </Grid>
            <Grid item xs={12} lg={3.5} xl={3} sx={{ padding: '0px 10px' }}>
              {/* <Text
                text='Showing Results'
                color={colors.black21}
                token={tokens.FS16FW600LH21_86SB}
                styles={{ marginBottom: '10px', paddingLeft: '10px' }}
                textAlign='left'
              /> */}
              <Text
                text='5 Properties in the list'
                color={colors.grey96}
                token={tokens.FS16FW400LH18R}
                styles={{ marginBottom: '30px', paddingLeft: '10px' }}
                textAlign='left'
              />
              {/* <Box sx={{ height: '75vh', overflowY: 'auto' }}>
                <PlaceholderDataPropertyCard
                  variant='small'
                  onClick={() => {
                    router.push('/property/house');
                  }}
                  propertyPrice='9,000'
                  tag='Hot Project'
                />{' '}
                <PlaceholderDataPropertyCard
                  variant='small'
                  onClick={() => {
                    router.push('/property/condo');
                  }}
                  propertyPrice='78,000'
                  tag='Under Construction'
                />{' '}
                <PlaceholderDataPropertyCard
                  variant='small'
                  onClick={() => {
                    router.push('/property/house');
                  }}
                  propertyPrice='9,000'
                  tag='Detached'
                />{' '}
                <PlaceholderDataPropertyCard
                  variant='small'
                  onClick={() => {
                    router.push('/property/house');
                  }}
                  propertyPrice='9,000'
                  tag='Sold'
                />
              </Box> */}
            </Grid>
          </>
        </GridContainer>
      </DialogContent>
    </Dialog>
  );
}
