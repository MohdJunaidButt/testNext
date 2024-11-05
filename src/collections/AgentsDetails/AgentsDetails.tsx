import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  gridContainer,
  tokens,
} from '@/styles';
import { CircularProgress, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

import PropertyCard from '@/components/Cards/PropertyCard';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import Divider from '@/components/Divider/Divider';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { UseAgentByUsername } from '@/hooks';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import { IAgent } from '@/types/collections/agent';
import { Property } from '@/types/common/THomePage';
import { getAddress } from '@/utils/misc';
type AgenDetailProps = {
  username: string;
  agent?: IAgent | null;
};
export default function AgentsDetails({ username, agent }: AgenDetailProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery('(max-width: 980px)');
  const router = useRouter();
  const { convertCurrency } = useCurrency();

  const [mapUsers, setMapUser] = useState<any | undefined>();
  const [listings, setListings] = useState<[Property]>();
  const { data, loading } = UseAgentByUsername(username);
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  useEffect(() => {
    if (loading === false) {
      setMapUser(data.user);
      setListings(data.properties);
    }
  }, [data, loading]);

  const currentURL = window.location.href;
  const copyToClipboard = () => {
    const textArea = document.createElement('input');
    textArea.value = currentURL;

    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
      appToast.setToast('Profile Link copied to clipboard', {
        ...ToastLikeConfig,
      });
    } catch (err: any) {
      appToast.setToast(
        `'Unable to copy URL to clipboard:', ${err?.message || err}`,
        {
          ...ToastLikeConfig,
          type: 'faisl',
        }
      );
    }

    document.body.removeChild(textArea);
  };

  const renderListingCard = (condo: any, isCarousel: boolean) => {
    return (
      <PropertyCard
        condo={condo}
        isProtected={false}
        isFavorited={isPropertyFavorite(condo.property_id)}
        onToggleFavorite={() =>
          toggleFavorite(
            condo.property_id,
            isPropertyFavorite(condo.property_id)
          )
        }
        key={`${condo.id}-${condo.property_id}`}
        style={{
          cursor: 'pointer',
          ...(isCarousel && {
            marginInline: 'auto',
            marginTop: '3px',
            marginBottom: '20px',
          }),
        }}
        images={
          condo.featured_building_images &&
          condo.featured_building_images[0] &&
          condo.featured_building_images[0].url &&
          condo.featured_building_images[0].url !== '-'
            ? [condo.featured_building_images[0].url]
            : ['/images/property/coming-soon.jpg']
        }
        tag={
          condo.property_details?.selling_category &&
          condo.property_details?.selling_category !== '-'
            ? condo.property_details?.selling_category
            : condo.property_details?.selling_status
        }
        variant={'small'}
        salePriceFrom={convertCurrency(
          condo.property_details.sales_price_from,
          true,
          '$XXX,XXX'
        )}
        salePriceTo={convertCurrency(
          condo.property_details.sales_price_to,
          true,
          '$XXX,XXX'
        )}
        onClick={() => {
          router.push(`/property/${condo.property_details.slug}`);
        }}
        propertyName={condo.property_details.project_development_name}
        propertySlug={condo.property_details.slug}
        propertyLocation={getAddress(
          condo?.property_details?.address,
          condo?.property_details?.city
        )}
        footerJSX={
          <PropertyCardFooter
            totalFloors={condo.property_details.total_floor_plans}
            availableFloors={condo.property_details.available_plans_dynamic}
            unavailableFloors={
              condo.property_details.total_floor_plans -
              condo.property_details.available_plans_dynamic
            }
          />
        }
      />
    );
  };

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      {!loading ? (
        <ResponsiveContainer>
          <>
            <Text
              text='Agent Details'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              textAlign='left'
              styles={{ mb: { xs: '30px', sm: '50px' } }}
            />
            <GridContainer
              spacing={isMobile ? 0 : 3.5}
              styles={{
                rowGap: '30px',
              }}
            >
              <>
                <Grid item xs={12} sm={5} md={4}>
                  <Box
                    sx={{
                      aspectRatio: '1/1',
                    }}
                  >
                    <Image
                      src={mapUsers?.profile.image_url}
                      alt='agent'
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '12px',
                        overflow: 'hidden',
                      }}
                      loading={'lazy'}
                      priority
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  md={8}
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  sx={{ rowGap: '15px' }}
                >
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                    alignItems={'flex-start'}
                    width={'100%'}
                    gap={1.5}
                  >
                    <Text
                      text={mapUsers?.profile.name}
                      token={
                        isMobile
                          ? tokens.FS20FW800LH22_72EB
                          : tokens.FS32FW500LH43_71SB
                      }
                      color={colors.black21}
                      textAlign='left'
                      styles={{
                        lineHeight: '40px',
                        wordBreak: 'break-word',
                        flexShrink: 1,
                      }}
                    />
                    {isMobile && (
                      <Button
                        variant='grey'
                        onClick={() => {
                          copyToClipboard();
                        }}
                        text='Copy profile link'
                        token={tokens.FS14FW500LH19R}
                        justifyContent='center'
                        icon={'/icons/chain-black.svg'}
                        iconAlt={'/icons/chain-white.svg'}
                        iconSize={{ width: 15, height: 15 }}
                        style={{
                          height: '40px',
                          padding: { xs: '7px 13px', sm: '7px 17px' },
                          flexShrink: 0,
                        }}
                        borderRadius='8px'
                      />
                    )}
                  </Box>
                  <Text
                    text={mapUsers?.profile?.description!}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='left'
                    styles={{ maxWidth: '700px', lineHeight: '1.75' }}
                  />

                  <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
                    <Box
                      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                      flexDirection={'column'}
                      marginRight={'30px'}
                      alignItems={'flex-start'}
                    >
                      <Text
                        text='Phone No'
                        token={tokens.FS14FW500LH19R}
                        color={colors.grey96}
                        textAlign='left'
                        styles={{ marginBottom: '5px' }}
                      />{' '}
                      <Text
                        text={mapUsers?.profile.mobile_no}
                        token={tokens.FS14FW500LH19R}
                        color={colors.black21}
                        textAlign='left'
                      />
                    </Box>
                    <Box
                      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                      flexDirection={'column'}
                      marginRight={'30px'}
                      alignItems={'flex-start'}
                    >
                      <Text
                        text='Email'
                        token={tokens.FS14FW500LH19R}
                        color={colors.grey96}
                        textAlign='left'
                        styles={{ marginBottom: '5px' }}
                      />{' '}
                      <Text
                        text={mapUsers?.email}
                        token={tokens.FS14FW500LH19R}
                        color={colors.black21}
                        textAlign='left'
                      />
                    </Box>
                  </Box>
                  {!isMobile && (
                    <Button
                      variant='grey'
                      onClick={() => {
                        copyToClipboard();
                      }}
                      text='Copy profile link'
                      token={tokens.FS14FW500LH19R}
                      justifyContent='center'
                      icon={'/icons/chain-black.svg'}
                      iconAlt={'/icons/chain-white.svg'}
                      iconSize={{ width: 20, height: 20 }}
                      style={{ height: '50px' }}
                      borderRadius='8px'
                    />
                  )}
                </Grid>
              </>
            </GridContainer>
            {isMobile && <Divider styles={{ marginTop: '50px' }} />}
            <Box marginTop={isMobile ? '30px' : '50px'}>
              <Text
                text='Listings'
                token={
                  isMobile
                    ? tokens.FS20FW800LH22_72EB
                    : tokens.FS24FW400LH32_78R
                }
                color={colors.black21}
                textAlign='left'
                styles={{ fontWeight: 800 }}
              />
              {listings && listings.length > 0 ? (
                !isTab ? (
                  <Box flexWrap={'wrap'} {...gridContainer} marginTop={'20px'}>
                    {listings.map((item: Property, index: number) =>
                      renderListingCard(item, false)
                    )}
                  </Box>
                ) : (
                  <Box marginTop={'20px'}>
                    <EmblaCarousel>
                      {listings &&
                        listings.map((item: Property) => (
                          <div className='embla__slide' key={item.id}>
                            {renderListingCard(item, true)}
                          </div>
                        ))}
                    </EmblaCarousel>
                  </Box>
                )
              ) : (
                <Stack
                  alignItems={'center'}
                  justifyContent={'center'}
                  sx={{ height: { xs: '200px', sm: '400px' } }}
                >
                  <NoListingFound />
                </Stack>
              )}
            </Box>
          </>
        </ResponsiveContainer>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          marginTop={'50px'}
        >
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
}
