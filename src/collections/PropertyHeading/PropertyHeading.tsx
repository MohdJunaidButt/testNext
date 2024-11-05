import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';

import { Developers } from '@/types/common/condos';
import { Box, Grid, IconButton, Stack, useMediaQuery } from '@mui/material';

import SocialShareModal from '@/collections/SocialMdeiaShareModal/SocialMediaShareModal';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import UseFavorites from '@/hooks/useFavorites';
import { addFavorite, removeFavorite } from '@/services/api';
import { AppDispatch, RootState } from '@/store';
import { fetchUserFavoritesAsync } from '@/store/slices/favorities';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

type IPropertyHeadingProps = {
  title: string;
  price: string;
  sellingStatus: string;
  address: string;
  publishDate: string;
  id: number;
  developers: Developers[];
  mapRef?: React.RefObject<HTMLDivElement>;
};

export default function PropertyHeading({
  mapRef,
  title,
  price,
  sellingStatus,
  address,
  publishDate,
  id,
  developers,
}: IPropertyHeadingProps) {
  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const { t } = useTranslation();

  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.Auth);
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();

  useEffect(() => setIsLoggedIn(user ? true : false), [user]);

  const toggleShareModal = () => setShareModal((st) => !st);

  return (
    <>
      <GridContainer>
        <>
          <Grid item xs={8} sm={8} md={5.5} lg={7}>
            <Stack
              spacing={'7px'}
              justifyContent={'space-between'}
              height='100%'
            >
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                gap={isMobile ? '10px' : '30px'}
              >
                <Text
                  text={title}
                  color={colors.black21}
                  token={
                    isMobile
                      ? tokens.FS16FW600LH21_86SB
                      : tokens.FS32FW800LH43_71EB
                  }
                  textAlign='left'
                  styles={{
                    fontSize: { xs: '16px', sm: '24px', md: '28px' },
                  }}
                />
                <Stack direction='row' alignItems={'center'} spacing={'5px'}>
                  <IconButton
                    onClick={() => {
                      if (isLoggedIn)
                        toggleFavorite(id, isPropertyFavorite(id));
                      else
                        appToast.setToast('Login To Add To Favorite', {
                          ...ToastLikeConfig,
                        });
                    }}
                  >
                    <Image
                      src={
                        isPropertyFavorite(id)
                          ? '/icons/share.svg'
                          : '/icons/fav.svg'
                      }
                      alt='fav'
                      width={isMobile ? 15 : 20}
                      height={isMobile ? 15 : 20}
                    />
                  </IconButton>
                  <IconButton onClick={toggleShareModal}>
                    <Image
                      src={'/icons/share.svg'}
                      alt='fav'
                      width={isMobile ? 15 : 20}
                      height={isMobile ? 15 : 20}
                    />
                  </IconButton>
                </Stack>
              </Box>
              <Stack>
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  // marginTop={isMobile ? '5px' : '7px'}
                  gap={'10px'}
                >
                  <Box
                    width={isMobile ? '15px' : '18px'}
                    // height={isMobile ? '20px' : '25px'}
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  >
                    <Image
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{
                        height: '100%',
                        width: '100%',
                        maxWidth: '18px',
                        maxHeight: '18px',
                      }}
                      src={'/icons/location-pin-blue.svg'}
                      alt='pin'
                    />
                  </Box>
                  <Text
                    text={address}
                    color={colors.grey96}
                    token={
                      isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW500LH18M
                    }
                    textAlign='left'
                    styles={{ fontSize: isMobile ? '13px' : '17px' }}
                  />
                </Box>
                {developers.length > 0 && (
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                    gap={'10px'}
                    mt={'3px'}
                  >
                    <Box
                      width={'18px'}
                      height={'25px'}
                      sx={{ display: isMobile ? 'none' : 'block' }}
                    />
                    <p
                      style={{
                        ...(isMobile
                          ? tokens.FS13FW400LH18R
                          : tokens.FS16FW600LH21_86SB),
                        color: colors.grey96,
                        fontSize: isMobile ? '10px' : '14px',
                      }}
                    >
                      <span
                        style={{
                          paddingRight: '8px',
                        }}
                      >
                        By
                      </span>
                      {developers.map((developer, index) => (
                        <>
                          {index > 0 && (
                            <span
                              style={{
                                paddingInline: '8px',
                              }}
                            >
                              &
                            </span>
                          )}
                          <span
                            style={{
                              color: colors.blueC2,
                              cursor: 'pointer',
                              textDecoration: 'underline',
                            }}
                          >
                            {developer.name}
                          </span>
                        </>
                      ))}
                      <span></span>
                    </p>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={4} sm={4} md={6.5} lg={5}>
            <Box display='flex' alignItems='end' flexDirection='column'>
              <Text
                text={price === '0' ? sellingStatus : price}
                color={colors.blueC2}
                token={
                  isMobile
                    ? tokens.FS16FW600LH21_86SB
                    : tokens.FS32FW800LH43_71SB
                }
                textAlign='right'
                styles={{
                  fontSize: { xs: '16px', sm: '24px', md: '28px' },
                }}
              />
              <Text
                text={t('Price')}
                color={colors.black21}
                token={isMobile ? tokens.FS11FW400LH18R : tokens.FS14FW400LH19R}
                textAlign='right'
              />
            </Box>
            <Box mt={'10px'} marginLeft='auto' width='fit-content'>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                flexDirection={'column'}
              >
                <Text
                  text={publishDate}
                  color={colors.black21}
                  token={
                    isMobile ? tokens.FS13FW500LH18R : tokens.FS14FW600LH16SB
                  }
                />
                <Text
                  text={t('Publish Date')}
                  color={colors.grey9C}
                  token={
                    isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW400LH19R
                  }
                />
              </Box>
            </Box>
          </Grid>
        </>
      </GridContainer>
      {shareModal && (
        <SocialShareModal
          isOpen={shareModal}
          handleClose={toggleShareModal}
          description={title}
        />
      )}
    </>
  );
}
