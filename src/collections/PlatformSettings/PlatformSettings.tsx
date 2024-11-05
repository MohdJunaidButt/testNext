import { GridContainer, Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';

import { Toast } from '@/components';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';

import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { RootState } from '@/store';
import {
  authSuccess,
  getProfieData,
  profileUpdate,
  updateMe,
} from '@/store/slices';
import { Box, Divider, Grid, Switch, useMediaQuery } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function PlatformSettings() {
  const dispatch: any = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { user } = useSelector((state: RootState) => state.Auth);
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  // let USERID = useSelector((state: any) => state.profileData.data?.id);
  // let loading = useSelector((state: any) => state.profileData.loading);
  // let USERDATA = useSelector((state: any) => state.profileData.data);

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const [platformData, setPlatformData] = useState({
    receive_notifications_listings:
      user?.profile?.receive_notifications_listings ?? false,
    receive_notifications_favourites:
      user?.profile?.receive_notifications_favourites ?? false,
    receive_notifications_sales:
      user?.profile?.receive_notifications_sales ?? false,
  });

  // useEffect(() => {
  //   if (USERDATA) {
  //     setPlatformData({
  //       receive_notifications_listings:
  //         USERDATA.profile.receive_notifications_listings,
  //       receive_notifications_favourites:
  //         USERDATA.profile.receive_notifications_favourites,
  //       receive_notifications_sales:
  //         USERDATA.profile.receive_notifications_sales,
  //     });
  //   }
  // }, [loading, USERDATA]);

  const sendPlatFormSetting = async () => {
    try {
      const updateSetting = await profileUpdate(platformData);
      if (updateSetting && updateSetting.data && updateSetting.data.user) {
        appToast.setToast(`Platform Settings Updated`, {
          ...ToastLikeConfig,
        });
        dispatch(authSuccess(updateSetting.data.user));
        // dispatch(updateMe(updateSetting.data.user));
      } else {
        appToast.setToast(`Something went wrong`, {
          ...ToastLikeConfig,
          type: 'fail',
        });
        // console.error('Fetching profile data failed.');
      }
      // const action: any = await dispatch(getProfieData());
      // if (getProfieData.fulfilled.match(action)) {
      //   setUpdateSuccess(true);
      //   setTimeout(() => {
      //     setUpdateSuccess(false);
      //   }, 3000);
      // } else {
      //   console.error('Fetching profile data failed.');
      // }
    } catch (e) {
      appToast.setToast(`Error: ${e}`, {
        ...ToastLikeConfig,
        type: 'fail',
      });
    }
  };
  return (
    <>
      <GridContainer>
        <>
          <Grid item xs={12} sm={8}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'9px'}
            >
              <Text
                token={
                  isMobile
                    ? tokens.FS20FW800LH22_72EB
                    : tokens.FS32FW800LH43_71EB
                }
                text={t('Platform Settings')}
                color={colors.black21}
                textAlign='left'
              />
              <Text
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW400LH18R}
                text={t('Other settings you might change.')}
                color={colors.grey9C}
                textAlign='left'
                styles={{
                  fontSize: isMobile ? '16px' : '18px',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4} display={{ xs: 'none', sm: 'block' }}>
            <Box
              height={'100%'}
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              justifyContent={'flex-end'}
            >
              <Button
                token={tokens.FS16FW500LH18M}
                text={t('Cancel')}
                onClick={() => {}}
                variant='blackOutlined'
                justifyContent='center'
                borderRadius='8px'
                style={{ height: '40px' }}
              />
              <Button
                token={tokens.FS16FW500LH18M}
                text={t('Save')}
                onClick={() => {
                  sendPlatFormSetting();
                }}
                variant='blue'
                justifyContent='center'
                borderRadius='8px'
                style={{ marginLeft: '10px', height: '40px' }}
              />
            </Box>
          </Grid>
        </>
      </GridContainer>
      <Box marginTop={isMobile ? '30px' : '50px'}>
        <GridContainer spacing={isMobile ? 1 : 2} justifyContent='flex-start'>
          <>
            <Grid item xs={10} sm={11}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
              >
                <Text
                  text={t(
                    'Receive email from ubrealty for notifications listings'
                  )}
                  token={
                    isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M
                  }
                  color={colors.black21}
                  textAlign='left'
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Switch
                checked={platformData.receive_notifications_listings}
                onChange={(e) => {
                  setPlatformData((prev: any) => ({
                    ...prev,
                    receive_notifications_listings: e.target?.checked,
                  }));
                }}
              />
            </Grid>
          </>
        </GridContainer>
      </Box>{' '}
      <Divider color={colors.greyE1} style={{ marginTop: '10px' }} />
      <Box marginTop={'10px'}>
        <GridContainer spacing={isMobile ? 1 : 2} justifyContent='flex-start'>
          <>
            <Grid item xs={10} sm={11}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
              >
                <Text
                  text={t('Receive email from ubrealty for favorite listings')}
                  token={
                    isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M
                  }
                  color={colors.black21}
                  textAlign='left'
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Switch
                checked={platformData.receive_notifications_favourites}
                onChange={(e) => {
                  setPlatformData((prev: any) => ({
                    ...prev,
                    receive_notifications_favourites: e.target?.checked,
                  }));
                }}
              />
            </Grid>
          </>
        </GridContainer>
      </Box>{' '}
      <Divider color={colors.greyE1} style={{ marginTop: '10px' }} />
      <Box marginTop={'10px'}>
        <GridContainer spacing={isMobile ? 1 : 2} justifyContent='flex-start'>
          <>
            <Grid item xs={10} sm={11}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
              >
                <Text
                  text={t('Receive email from ubrealty for sales listings')}
                  token={
                    isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M
                  }
                  color={colors.black21}
                  textAlign='left'
                />
              </Box>
            </Grid>
            <Grid item xs={1}>
              <Switch
                checked={platformData.receive_notifications_sales}
                onChange={(e) => {
                  setPlatformData((prev: any) => ({
                    ...prev,
                    receive_notifications_sales: e.target?.checked,
                  }));
                }}
              />
            </Grid>
          </>
        </GridContainer>
      </Box>{' '}
      {isMobile && (
        <Box
          height={'100%'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          marginTop={'30px'}
        >
          <Button
            token={tokens.FS16FW500LH18M}
            text='Cancel'
            onClick={() => {}}
            variant='blackOutlined'
            justifyContent='center'
            borderRadius='8px'
            style={{ height: '52px', width: '50%' }}
          />
          <Button
            token={tokens.FS16FW500LH18M}
            text='Save'
            onClick={() => {}}
            variant='blue'
            justifyContent='center'
            borderRadius='8px'
            style={{ marginLeft: '10px', height: '52px', width: '50%' }}
          />
        </Box>
      )}
      <Toast
        show={updateSuccess}
        text={updateSuccess === null ? '' : 'Platform setting updated'}
        type='success'
      />
    </>
  );
}
