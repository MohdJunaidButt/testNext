import ContactCard from '@/collections/ContactCard/ContactCard';
import KeyFacts from '@/collections/KeyFacts/KeyFacts';
import MortgageCalculator from '@/collections/MortgageCalculator/MortgageCalculator-dump';
import PropertyDetails from '@/collections/PropertyDetails/PropertyDetails';
import PropertyDetailsMapView from '@/collections/PropertyDetailsMapView/PropertyDetailsMapView';
import PropertyHeading from '@/collections/PropertyHeading/PropertyHeading';
import PropertySummaryTiles from '@/collections/PropertySummaryTiles/PropertySummaryTiles';
import Rooms from '@/collections/Rooms/Rooms';
import SchoolsNearBy from '@/collections/SchoolsNearBy/SchoolsNearBy';
import SoldComparableNear from '@/collections/SoldComparableNear/SoldComparableNear';
import TilesImagesCollageExtended from '@/collections/TilesImagesGenerator/TilesImagesCollageExtended/TilesImagesCollageExtended';
import { formatPrice } from '@/commonFunctions/commonFunctions';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import ComingSoonData from '@/components/NoData/ComingSoon';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { SingleHouse } from '@/types';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  Grid,
  useMediaQuery,
} from '@mui/material';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HousePage({ house }: SingleHouse) {
  const { currency } = useSelector((st: RootState) => st.Auth);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isLG = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isLaptop = useMediaQuery('(min-width:1024px) and (max-width: 1439px)');
  const isLaptopLarge = useMediaQuery(
    '(min-width:1440px) and (max-width: 1919px)'
  );
  const IsXLManual = useMediaQuery('(min-width:1920px)');
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const [showContactUsModal, setShowContactUsModal] = useState(false);
  const [isOpenContactUsDrawer, setIsOpenContactUsDrawer] = useState(false);
  const mapRef = useRef(null);

  let images: any =
    house?.featured_building_images &&
    house?.featured_building_images?.[0] &&
    house?.featured_building_images[0]?.url &&
    house?.featured_building_images[0]?.url !== '-'
      ? [house?.featured_building_images[0]?.url]
      : [];

  if (house?.building_images)
    images = images
      .concat(house?.building_images.map((image) => image.url))
      .filter((el: string) => el !== '-');

  return (
    <>
      <Drawer
        anchor='right'
        open={isOpenContactUsDrawer}
        onClose={() => {
          setIsOpenContactUsDrawer(false);
        }}
        sx={{
          width: '400px',
          '& .MuiDrawer-paper': {
            width: '400px',
          },
        }}
      >
        <ContactCard
          isLaptop={isLaptopLarge}
          isXL={IsXLManual}
          maxContentHeight={
            IsXLManual ? 5200 : isLaptopLarge ? 5400 : isLaptop ? 6050 : 6000
          }
          isMobile={isMobile}
          handleSubmit={() => setIsOpenContactUsDrawer(false)}
        />
      </Drawer>
      <TilesImagesCollageExtended
        images={
          images.length > 0
            ? images
            : [...Array(5)].map((_) => '/images/property/coming-soon.jpg')
        }
        label={house?.property_details.selling_status || ''}
      />
      <ResponsiveContainer>
        <>
          <Box my={3}>
            <Divider />
          </Box>
          <GridContainer spacing={3}>
            <>
              <Grid item xs={12} lg={7.5}>
                {house && (
                  <PropertyHeading
                    mapRef={mapRef}
                    title={house.property_details?.project_development_name}
                    price={
                      house.property_details.sales_price_from === '0' ||
                      house.property_details.sales_price_to === '0'
                        ? '0'
                        : `${formatPrice(
                            house.property_details.sales_price_from,
                            currency.symbol
                          )}-${formatPrice(
                            house.property_details.sales_price_to,
                            currency.symbol
                          )}`
                    }
                    developers={house.developers}
                    sellingStatus={house.property_details.selling_status}
                    address={`${house.property_details.address}, ${house.property_details.city}`}
                    publishDate={house.property_details.last_updated_date}
                    id={house.property_id}
                  />
                )}
                {isMobile && (
                  <Button
                    text={`Let's get connected!`}
                    justifyContent='center'
                    onClick={() => {
                      setShowContactUsModal(!showContactUsModal);
                    }}
                    token={tokens.FS16FW500LH18M}
                    variant='blue'
                    borderRadius='8px'
                    style={{
                      width: '100%',
                      height: '60px',
                      marginBlock: '30px',
                    }}
                  />
                )}
                <Box
                  marginTop={isMobile ? '30px' : '35px'}
                  {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                >
                  <Text
                    text='More Details'
                    color={colors.black21}
                    token={
                      isMobile
                        ? tokens.FS16FW600LH21_86R
                        : tokens.FS20FW500LH22_72SB
                    }
                    styles={{
                      fontSize: isMobile ? '16px' : '18px',
                      marginBottom: isMobile ? '10px' : '15px',
                    }}
                  />
                </Box>

                <PropertySummaryTiles />
                {house?.property_details?.description ? (
                  <Text
                    text={house?.property_details?.description}
                    color={colors.grey9C}
                    token={
                      isMobile
                        ? tokens.FS14FW400LH19R
                        : tokens.FS16FW300LH21_86R
                    }
                    textAlign='left'
                  />
                ) : (
                  <ComingSoonData />
                )}
                <Rooms />
                <KeyFacts />
                {/* <HomeValue /> */}
                <PropertyDetails />
                <PropertyDetailsMapView />
                <SoldComparableNear />
                <SchoolsNearBy />
                <MortgageCalculator propertyPrice={'80000'} />
              </Grid>
              <Grid item display={{ sm: 'none', lg: 'block' }} md={4.5}>
                <ContactCard
                  isLaptop={isLaptopLarge}
                  isXL={IsXLManual}
                  maxContentHeight={
                    IsXLManual
                      ? 5100
                      : isLaptopLarge
                      ? 5400
                      : isLaptop
                      ? 6050
                      : 6000
                  }
                  isMobile={isMobile}
                />
              </Grid>

              {(isLG || isMD) && !isMobile && (
                <Box
                  position={'fixed'}
                  bottom={isMD ? 120 : 10}
                  right={isMD ? 10 : 10}
                >
                  <Button
                    text="Let's get connected!"
                    justifyContent='center'
                    onClick={() => {
                      isMobile
                        ? setShowContactUsModal(!showContactUsModal)
                        : setIsOpenContactUsDrawer(true);
                    }}
                    token={
                      isMobile
                        ? tokens.FS14FW600LH16SB
                        : tokens.FS16FW600LH21_86R
                    }
                    variant='blue'
                    borderRadius='50px'
                    style={{
                      width: 'fit-content',
                      height: isMobile ? '40px' : '45px',
                      zIndex: 99999,
                    }}
                  />
                </Box>
              )}
            </>
          </GridContainer>
        </>
      </ResponsiveContainer>
      <Dialog
        open={showContactUsModal}
        onClose={() => {
          setShowContactUsModal(!showContactUsModal);
        }}
        fullScreen
        maxWidth={'xs'}
      >
        <DialogContent>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexEnd}
            width={'100%'}
            onClick={() => {
              setShowContactUsModal(false);
            }}
          >
            Close
          </Box>
          <ContactCard
            isMobile={isMobile}
            isLaptop={isLaptopLarge}
            isXL={IsXLManual}
            maxContentHeight={
              IsXLManual ? 5200 : isLaptopLarge ? 5400 : isLaptop ? 6050 : 5000
            }
            handleSubmit={() => setShowContactUsModal(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
