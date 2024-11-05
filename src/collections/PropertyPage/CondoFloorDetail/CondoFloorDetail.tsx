import AcknowledgementDialog from '@/collections/AcknowledgementDialog/AcknowledgementDialog';
import ContactCard from '@/collections/ContactCard/ContactCard';
import DepositStructure from '@/collections/DepositStructure/DepositStructure';
import FloorReservationDialog from '@/collections/FloorReservationDialog/FloorReservationDialog';
import MoreFloorPlans from '@/collections/MoreFloorPlans/MoreFloorPlans';
import PriceDetails from '@/collections/PriceDetails/PriceDetails';
import PricePerSquareFoot from '@/collections/PricePerSquareFoot/PricePerSquareFoot';
import PropertySummaryTiles from '@/collections/PropertySummaryTiles/PropertySummaryTiles';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import {
  Box,
  Dialog,
  DialogContent,
  Drawer,
  Grid,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import useCurrency from '@/hooks/useCurrency';
import { FloorPlan, SingleCondo } from '@/types/common/condos';
import { useEffect, useState } from 'react';

export default function CondoFloorDetails({ condo }: SingleCondo) {
  const { convertCurrency } = useCurrency();

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isLaptop = useMediaQuery('(min-width:1024px) and (max-width: 1439px)');
  const isMaxWidth = useMediaQuery('(min-width:1600px)');
  const isLaptopLarge = useMediaQuery(
    '(min-width:1440px) and (max-width: 1919px)'
  );
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isLg = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  const IsXLManual = useMediaQuery('(min-width:1920px)');
  const [showContactUsModal, setShowContactUsModal] = useState(false);

  const [isOpenFloorReservationDialog, setIsOpenFloorReservationDialog] =
    useState(false);
  const [isOpenAcknowledgementDialog, setIsOpenAcknowledgementDialog] =
    useState(false);
  const [isOpenContactUsDrawer, setIsOpenContactUsDrawer] = useState(false);
  const [isReserveBtnFixed, setIsReserveBtnFixed] = useState(false);
  const [floorData, setFloorData] = useState<any>([]);

  const router = useRouter();

  const [selectedFloor, setSelectedFloor] = useState<FloorPlan | null>(null);

  useEffect(() => {
    setFloorData(condo?.floor_plans ? [...condo?.floor_plans] : []);
  }, [condo?.floor_plans]);
  useEffect(() => {
    if (floorData) {
      // among this floorData there is a selected floor with id so find that floor and set it to selected floor
      let selectedFloor = floorData?.find(
        (item: any) => item.id == router.query.floorPlan
      );
      setSelectedFloor(selectedFloor);
    }
  }, [floorData, router.query.floorPlan]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        const footerEle = window.document.getElementById('needFurtherHelp');
        if (!isLg && footerEle) {
          const footerRect = footerEle.getBoundingClientRect();
          return setIsReserveBtnFixed(
            !(
              footerRect.top + 30 >= 0 &&
              footerRect.top + 30 <= window.innerHeight
            )
          );
        }
        setIsReserveBtnFixed(true);
      } else setIsReserveBtnFixed(false);
    };
    window.addEventListener('scroll', handleScroll);
  }, [isLg]);

  return (
    <Box
      id='header'
      sx={{
        marginBottom: { xs: '30px', sm: '40px' },
      }}
    >
      <ResponsiveContainer>
        <GridContainer
          spacing={3}
          styles={{
            position: 'relative',
          }}
        >
          <>
            <Grid item xs={12} lg={7.5} xl={8} id='contact-sideDiv'>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                mt={'30px'}
                gap={'10px'}
                flexWrap='wrap'
                alignItems='baseline'
              >
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  gap={'10px'}
                >
                  <Text
                    text={`${condo?.property_details.project_development_name}`}
                    color={colors.blueC2}
                    token={
                      isMobile
                        ? tokens.FS16FW600LH21_86SB
                        : tokens.FS20FW600LH22_72SB
                    }
                    cursor='pointer'
                    redirect={`/property/${condo?.property_details.slug}`}
                    textAlign='left'
                    styles={{
                      fontSize: isMobile ? '16px' : '24px',
                      textDecoration: 'underline',
                    }}
                  />
                  <Text
                    text={` -> `}
                    color={colors.black21}
                    token={
                      isMobile
                        ? tokens.FS16FW600LH21_86SB
                        : tokens.FS20FW600LH22_72SB
                    }
                    textAlign='left'
                    styles={{
                      fontSize: isMobile ? '16px' : '24px',
                    }}
                  />
                  <Text
                    text={`${selectedFloor?.name || ''}`}
                    color={colors.black21}
                    token={
                      isMobile
                        ? tokens.FS16FW600LH21_86SB
                        : tokens.FS20FW600LH22_72SB
                    }
                    textAlign='left'
                    styles={{
                      fontSize: isMobile ? '16px' : '28px',
                    }}
                  />
                </Box>
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  {...flexDirection.column}
                  alignItems={'end'}
                >
                  <Text
                    text={
                      selectedFloor?.total_price
                        ? `${convertCurrency(selectedFloor?.total_price, true)}`
                        : 'Un-Available'
                    }
                    color={colors.blueC2}
                    token={
                      isMobile
                        ? tokens.FS16FW600LH21_86R
                        : tokens.FS28FW500LH42_56B
                    }
                    textAlign='left'
                    styles={{
                      fontSize: isMobile ? '18px' : '28px',
                    }}
                  />
                  {selectedFloor?.price_per_sqft !== 0 && (
                    <Text
                      text={`${
                        selectedFloor
                          ? `${convertCurrency(
                              selectedFloor.price_per_sqft,
                              true
                            )}/sq.ft`
                          : '-'
                      }`}
                      color={colors.black21}
                      token={
                        isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW400LH18R
                      }
                      textAlign='left'
                      styles={{
                        fontSize: isMobile ? '14px' : '20px',
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                borderRadius='15px'
                height={isMobile ? 'fit-content' : '1000px'}
                width={'100%'}
                marginTop={'30px'}
                sx={{
                  ...(isMobile && {
                    '& img': {
                      objectFit: 'contain',
                      objectPosition: 'top center',
                    },
                  }),
                }}
              >
                <Image
                  src={
                    selectedFloor?.image
                      ? selectedFloor?.image
                      : '/images/property/coming-soon.jpg'
                  }
                  alt='floorPlan'
                  width={0}
                  height={0}
                  sizes='100%'
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                  }}
                  loading='eager'
                />
              </Box>
              <Text
                text={`${condo?.property_details?.description}`}
                color={colors.grey63}
                token={
                  isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW300LH21_86R
                }
                textAlign='left'
                styles={{ marginTop: '30px', marginBottom: '17px' }}
              />
              <PropertySummaryTiles selectedFloor={selectedFloor} />
              <PricePerSquareFoot
                projectPrice={`${
                  selectedFloor?.price_per_sqft !== 0
                    ? convertCurrency(selectedFloor?.price_per_sqft, true)
                    : '-'
                }`}
                neighborhoodAvg={convertCurrency(
                  condo?.property_details?.neighbourhood_avg_ppf,
                  true,
                  '-'
                )}
                cityAvg={convertCurrency(
                  condo?.property_details?.city_average_ppf,
                  true,
                  '-'
                )}
              />
              <PriceDetails
                selectedFloor={selectedFloor}
                parkingCost={condo?.property_details.parking_cost}
                mtPerMonth={condo?.property_details?.building_maint_fee}
                lockerCost={condo?.property_details.locker_cost}
              />
              {condo?.property_details?.deposit_structure && (
                <DepositStructure
                  deposit={condo?.property_details?.deposit_structure}
                />
              )}
              {/*<Rooms />*/}
              <MoreFloorPlans data={condo} />
            </Grid>
            <Grid
              item
              lg={4.5}
              xl={4}
              // style={{ marginTop: '40px' }}
              id='condo-contactcard'
              sx={{
                position: 'relative',
                marginTop: '40px',
                maxWidth: '504px',
              }}
            >
              {/* {!isReserveBtnFixed && ( */}
              <Button
                text='Reserve This Condo'
                onClick={() => {
                  setIsOpenFloorReservationDialog(true);
                }}
                variant='blue'
                justifyContent='center'
                token={isMD ? tokens.FS16FW500LH18ML : tokens.FS16FW500LH18M}
                style={{
                  height: '40px',
                  mb: { md: '20px' },
                  ...(!isReserveBtnFixed && { marginLeft: 'auto' }),
                  position: isReserveBtnFixed ? 'fixed' : 'relative',
                  display: {
                    xs: !isReserveBtnFixed ? 'none' : 'block',
                    lg: 'block',
                  },
                  top: {
                    xs: isReserveBtnFixed ? 70 : 0,
                    md: isReserveBtnFixed ? '80px' : '0',
                  },
                  right: {
                    xs: isReserveBtnFixed ? 10 : 0,
                    md: isReserveBtnFixed
                      ? isMaxWidth
                        ? 'calc(((100% - 1600px) / 2) + 20px)'
                        : '20px'
                      : '0',
                  },
                  zIndex: 222,
                }}
              />
              {/* )} */}
              {!isLg && (
                <>
                  <ContactCard
                    id={condo?.id}
                    condo={condo}
                    isLaptop={isLaptopLarge}
                    isXL={false}
                    isMobile={isMobile}
                    maxContentHeight={
                      IsXLManual
                        ? 3800
                        : isLaptopLarge
                        ? 3900
                        : isLaptop
                        ? 4000
                        : 4400
                    }
                  />
                </>
              )}
            </Grid>
            {(isLg || isMD) && (
              <Box
                position={'fixed'}
                bottom={10}
                // bottom={isMD ? 120 : 10}
                right={isMD ? 10 : 10}
                zIndex={999}
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
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  variant='blue'
                  borderRadius='50px'
                  style={{
                    width: 'fit-content',
                    height: isMobile ? '40px' : '45px',
                    zIndex: 9999,
                  }}
                />
              </Box>
            )}
          </>
        </GridContainer>
      </ResponsiveContainer>{' '}
      <Drawer
        anchor='right'
        open={isOpenContactUsDrawer}
        onClose={() => {
          setIsOpenContactUsDrawer(false);
        }}
        sx={{
          // width: '400px',
          '& .MuiDrawer-paper': {
            width: '400px',
          },
        }}
      >
        <ContactCard
          id={condo?.id}
          condo={condo}
          isLaptop={isLaptopLarge}
          isXL={IsXLManual}
          maxContentHeight={
            IsXLManual ? 3800 : isLaptopLarge ? 3900 : isLaptop ? 4000 : 4400
          }
          handleSubmit={() => setIsOpenContactUsDrawer(false)}
        />
      </Drawer>{' '}
      <FloorReservationDialog
        condo={condo}
        isOpen={isOpenFloorReservationDialog}
        handleClose={(finalStep: boolean) => {
          setIsOpenFloorReservationDialog(false);

          if (finalStep) {
            setIsOpenAcknowledgementDialog(true);
          }
        }}
        selectedFloor={selectedFloor}
      />
      <AcknowledgementDialog
        isOpen={isOpenAcknowledgementDialog}
        handleClose={() => {
          setIsOpenAcknowledgementDialog(false);
        }}
        message='Your reservation request was successfully
submitted for review.'
        icon='/icons/success-thumb.svg'
      />
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
            id={condo?.id}
            condo={condo}
            isMobile={isMobile}
            isLaptop={isLaptopLarge}
            isXL={IsXLManual}
            maxContentHeight={
              IsXLManual ? 2350 : isLaptopLarge ? 2600 : isLaptop ? 3000 : 2400
            }
            handleSubmit={() => setShowContactUsModal(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
