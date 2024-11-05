import AdditionalInformation from '@/collections/AdditionalInformation/AdditionalInformation';
import ContactCard from '@/collections/ContactCard/ContactCard';
import DepositStructure from '@/collections/DepositStructure/DepositStructure';
import KeyFacts from '@/collections/KeyFacts/KeyFacts';
import MoreFloorPlans from '@/collections/MoreFloorPlans/MoreFloorPlans';
import PDFFiles from '@/collections/PDFFiles/PDFFiles';
import PricePerSquareFoot from '@/collections/PricePerSquareFoot/PricePerSquareFoot';
import PropertyHeading from '@/collections/PropertyHeading/PropertyHeading';
import TilesImagesCollageExtended from '@/collections/TilesImagesGenerator/TilesImagesCollageExtended/TilesImagesCollageExtended';
import ViewPropertyOnMap from '@/collections/ViewPropertyOnMap/ViewPropertyOnMap';
import { formatPrice } from '@/commonFunctions/commonFunctions';
import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import { ImageLabel } from '@/components/ImageLabel';
import ComingSoonData from '@/components/NoData/ComingSoon';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { SingleCondo } from '@/types/common/condos';
import { torontoCord } from '@/utils/appInfo';
import { getPriceAccToCurrency } from '@/utils/convertPriceByCurrency';
import {
  Box,
  Dialog,
  DialogContent,
  Divider,
  Drawer,
  Grid,
  alpha,
  useMediaQuery,
} from '@mui/material';
import moment from 'moment';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function Condo({ condo }: SingleCondo) {
  const { t } = useTranslation();

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

  const [isHeaderTagsFixed, setIsHeaderTagsFixed] = useState(true);

  let images: any =
    condo?.featured_building_images &&
    condo?.featured_building_images?.[0] &&
    condo?.featured_building_images[0]?.url &&
    condo?.featured_building_images[0]?.url !== '-'
      ? [condo?.featured_building_images[0]?.url]
      : [];

  if (condo?.building_images)
    images = images
      .concat(condo?.building_images.map((image) => image.url))
      .filter((el: string) => el !== '-');

  let haveValidFloorPlans = false;
  if (condo?.floor_plans) {
    for (let i = 0; i < condo?.floor_plans?.length; i++)
      if (condo?.floor_plans[i]?.name) {
        haveValidFloorPlans = true;
        break;
      }
  }

  useEffect(() => {
    let tagList = document.getElementById('condo-header-tags');
    const handleScroll = () => {
      if (tagList) {
        tagList.style.transform = 'transition top 0.7s ease-in-out';
        if (window.scrollY >= 51) {
          tagList.style.borderBottom = '0px ';
          tagList.style.paddingBlock = '0px';
          tagList.style.width = isMD ? '100vw' : '100%';
          tagList.style.background = 'transparent';
          tagList.style.position = 'fixed';
          tagList.style.top = isMD ? '49px' : '60px';
          setIsHeaderTagsFixed(false);
        } else {
          tagList.style.borderBottom = `none`;
          tagList.style.background = alpha(colors.whiteFF, 0.6);
          tagList.style.position = 'relative';
          tagList.style.width = 'auto';
          tagList.style.paddingBlock = '10px';
          tagList.style.top = 'auto';
          setIsHeaderTagsFixed(true);
        }
      }
    };
    if (!tagList) return;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLG, isMD]);

  return (
    <Box
      position={'relative'}
      id='header'
      sx={{
        marginBottom: { xs: '30px', sm: '40px' },
      }}
    >
      <Drawer
        anchor='right'
        open={isOpenContactUsDrawer}
        onClose={() => setIsOpenContactUsDrawer(false)}
        sx={{
          width: '400px',
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
            IsXLManual ? 5200 : isLaptopLarge ? 5400 : isLaptop ? 6050 : 6000
          }
          isMobile={isMobile}
          handleSubmit={() => setIsOpenContactUsDrawer(false)}
        />
      </Drawer>
      <Box
        id='condo-header-tags'
        py={'10px'}
        sx={{
          zIndex: 222,
        }}
      >
        <ResponsiveContainer>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            sx={{
              alignItems: { xs: 'flex-start', md: 'center' },
              ...(!isHeaderTagsFixed && {
                justifyContent: isMD ? 'center' : 'flex-start',
              }),
            }}
            flexWrap='wrap'
            gap={'7px'}
          >
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              gap={'7px'}
              sx={{
                ...(!isHeaderTagsFixed && {
                  backgroundColor: 'white',
                  padding: isMD ? '10px 0' : '10px',
                  borderRadius: isMD ? 0 : '8px',
                  marginLeft: isMD ? '0' : '-10px',
                  ...(isMD && {
                    width: '100%',
                  }),
                }),
                flexWrap: 'wrap',
              }}
              flexShrink={0}
              width='fit-content'
            >
              <Link href='#header' scroll={false}>
                <ImageLabel
                  text={t(`Overview`)}
                  token={
                    isMD && !isMobile
                      ? tokens.FS12FW400LH18R
                      : isMobile
                      ? tokens.FS11FW400LH18R
                      : tokens.FS13FW500LH18R
                  }
                  color={colors.whiteFF}
                  border={'transparent'}
                  bgColor={colors.blueC2}
                  borderRadius={'8px'}
                  isRelative
                />
              </Link>
              <Link href='#pdf-files' scroll={false}>
                <ImageLabel
                  text={t('PDF Files')}
                  token={
                    isMD && !isMobile
                      ? tokens.FS12FW400LH18R
                      : isMobile
                      ? tokens.FS11FW400LH18R
                      : tokens.FS13FW500LH18R
                  }
                  border={'transparent'}
                  color={colors.whiteFF}
                  bgColor={colors.black21}
                  borderRadius={'8px'}
                  isRelative
                />
              </Link>
              {haveValidFloorPlans && (
                <Link href='#floor-plans' scroll={false}>
                  <ImageLabel
                    text={`${t('Floor Plans')} (${condo?.floor_plans.length})`}
                    token={
                      isMD && !isMobile
                        ? tokens.FS12FW400LH18R
                        : isMobile
                        ? tokens.FS11FW400LH18R
                        : tokens.FS13FW500LH18R
                    }
                    color={colors.whiteFF}
                    bgColor={colors.black21}
                    borderRadius={'8px'}
                    isRelative
                    border={'transparent'}
                  />
                </Link>
              )}
              <Link href='#map-view' scroll={false}>
                <ImageLabel
                  text={t('Map View')}
                  token={
                    isMD && !isMobile
                      ? tokens.FS12FW400LH18R
                      : isMobile
                      ? tokens.FS11FW400LH18R
                      : tokens.FS13FW500LH18R
                  }
                  color={colors.whiteFF}
                  bgColor={colors.black21}
                  borderRadius={'8px'}
                  isRelative
                  border={'transparent'}
                />
              </Link>
            </Box>
            {!isMobile &&
              isHeaderTagsFixed &&
              condo?.property_details.construction_status &&
              condo?.property_details.construction_status !== '-' && (
                <ImageLabel
                  text={condo?.property_details.construction_status}
                  token={
                    isMD && !isMobile
                      ? tokens.FS12FW400LH18R
                      : isMobile
                      ? tokens.FS11FW400LH18R
                      : tokens.FS13FW500LH18R
                  }
                  color={colors.whiteFF}
                  bgColor={colors.black21}
                  borderRadius={'49px'}
                  isRelative
                  border={'transparent'}
                  icon={'/icons/tag.svg'}
                  iconSize={{ width: 15, height: 15 }}
                  minWidth={isMD ? '180px' : '190px'}
                />
              )}
          </Box>
        </ResponsiveContainer>
      </Box>
      <ResponsiveContainer>
        <>
          <TilesImagesCollageExtended
            images={
              images.length > 0 ? images : ['/images/property/coming-soon.jpg']
            }
            propertyType={condo?.property_details?.property_type || '-'}
            label={
              condo?.property_details.selling_status &&
              condo?.property_details.selling_status !== '-'
                ? condo?.property_details.selling_status
                : condo?.property_details.selling_category
            }
            constructionStatus={condo?.property_details.construction_status}
          />
          <Box width='100%'>
            <Box my={3}>
              <Divider />
            </Box>
            <GridContainer spacing={3}>
              <>
                <Grid item xs={12} lg={7.5} xl={8} id='contact-sideDiv'>
                  {condo && (
                    <PropertyHeading
                      mapRef={mapRef}
                      title={condo.property_details?.project_development_name}
                      price={
                        condo.property_details.sales_price_from === '0' ||
                        condo.property_details.sales_price_to === '0'
                          ? '0'
                          : `${formatPrice(
                              getPriceAccToCurrency(
                                condo.property_details.sales_price_from,
                                currency.value
                              ),
                              currency.symbol
                            )} - ${formatPrice(
                              getPriceAccToCurrency(
                                condo.property_details.sales_price_to,
                                currency.value
                              ),
                              currency.symbol
                            )}`
                      }
                      developers={condo.developers}
                      sellingStatus={
                        condo.property_details.selling_status &&
                        condo.property_details.selling_status !== '-'
                          ? condo.property_details.selling_status
                          : condo.property_details.selling_category
                      }
                      address={`${condo.property_details.address}, ${condo.property_details.city}`}
                      publishDate={
                        moment(condo?.created_on).format('DD-MM-YYYY') || '-'
                      }
                      id={+condo.id}
                    />
                  )}
                  <Box
                    mt={isMobile ? '30px' : '35px'}
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  >
                    <Text
                      text={t('More Details')}
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
                  {condo?.property_details?.description ? (
                    <Text
                      text={condo?.property_details?.description}
                      color={colors.grey63}
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
                  <PricePerSquareFoot
                    projectPrice={`${
                      condo?.property_details?.price_per_square_foot___avg
                        ? formatPrice(
                            getPriceAccToCurrency(
                              condo?.property_details
                                ?.price_per_square_foot___avg,
                              currency.value
                            ),
                            currency.symbol
                          )
                        : '-'
                    }`}
                    neighborhoodAvg={
                      formatPrice(
                        getPriceAccToCurrency(
                          condo?.property_details?.neighbourhood_avg_ppf ?? '',
                          currency.value
                        ),
                        currency.symbol
                      ) || '-'
                    }
                    cityAvg={
                      formatPrice(
                        condo?.property_details?.city_average_ppf,
                        currency.symbol
                      ) || '-'
                    }
                  />
                  <KeyFacts condo={condo} />
                  <MoreFloorPlans data={condo} />
                  <DepositStructure
                    deposit={condo?.property_details.deposit_structure}
                  />
                  <PDFFiles
                    file={
                      condo?.property_details?.complete_package_url as string
                    }
                    title={
                      (condo?.property_details?.pdf_files as string) !== '-'
                        ? (condo?.property_details?.pdf_files as string)
                        : condo?.property_details?.project_development_name!
                    }
                    propId={condo?.id!}
                  />
                  <ViewPropertyOnMap
                    currentPosition={false}
                    fullScreenMap={false}
                    showFilters={false}
                    showSearch={false}
                    latitude={
                      condo?.property_details?.latitude || torontoCord[0]
                    }
                    longitude={
                      condo?.property_details?.longitude || torontoCord[1]
                    }
                    isCondo={true}
                    mapRef={mapRef}
                    height={isMobile ? 370 : 520}
                    mapHeight={isMobile ? 350 : 500}
                    zoomLevelProp={14}
                    showPlacesAround
                    places={condo?.places}
                  />

                  <AdditionalInformation
                    Walk_Score={condo?.property_details?.walk_score || '-'}
                    Transit_Score={
                      condo?.property_details?.transit_score || '-'
                    }
                    height_m={condo?.property_details?.height_m || '-'}
                    height_ft={condo?.property_details?.height_ft || '-'}
                    architects={condo?.property_details?.architects || '-'}
                    interior_designers={
                      condo?.property_details?.interior_designers || '-'
                    }
                    last_updated_date={
                      moment(condo?.updated_on).format('DD-MM-YYYY') || '-'
                    }
                  />
                </Grid>
                <Grid
                  item
                  display={{ xs: 'none', lg: 'block' }}
                  lg={4.5}
                  xl={4}
                  id='condo-contactcard'
                >
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
                </Grid>{' '}
                {(isLG || isMD) && (
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
                        fontSize: { xs: '14px', sm: '16', md: '18px' },
                      }}
                    />
                  </Box>
                )}
              </>
            </GridContainer>
          </Box>
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
            id={condo?.id}
            condo={condo}
            isMobile={isMobile}
            isLaptop={isLaptopLarge}
            isXL={IsXLManual}
            maxContentHeight={
              IsXLManual ? 3900 : isLaptopLarge ? 3900 : isLaptop ? 4000 : 4400
            }
            handleSubmit={() => setShowContactUsModal(false)}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
