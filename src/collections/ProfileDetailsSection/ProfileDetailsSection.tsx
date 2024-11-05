import DeleteProfile from '@/collections/DeleteProfile/DeleteProfile';
import { GridContainer, Text, TextInputWithBorder, Toast } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { RootState } from '@/store';
import {
  CreatProfile,
  UpdateProfilePicture,
  authSuccess,
  getProfieData,
  // updateProfileImg,
  updateProfileInfo,
} from '@/store/slices';
import { updateProfileImage } from '@/store/slices/AuthSlice';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Avatar,
  Box,
  CircularProgress,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
export default function ProfileDetailsSection() {
  const fileInputRef: any = useRef(null);
  const dispatch: any = useDispatch();
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  // let data = useSelector((state: any) => state.profileData.data);
  const { user } = useSelector((state: RootState) => state.Auth);

  const router = useRouter();
  const [value, setValue] = useState(0);
  let loadingData = useSelector((state: any) => state.profileData.loading);

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const [image, setImage] = useState<string>(user?.profile?.image_url);
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState<any>({
    name: user?.profile?.name ?? '',
    mobile_no: user?.profile?.mobile_no ?? '',
    experience: user?.profile?.experience ?? '',
    twitter_url: user?.profile?.twitter_url ?? '',
    facebook_url: user?.profile?.facebook_url ?? '',
    instagram_url: user?.profile?.instagram_url ?? '',
    youtube_url: user?.profile?.youtube_url ?? '',
    location: user?.profile?.location ?? '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showDeleteSection, setShowDeleteSection] = useState(false);
  const [showProfilePictureDialog, setShowProfilePictureDialog] =
    useState(false);

  const handleToggleSection = () => setShowDeleteSection((st) => !st);
  const toggleProfilePictureDialog = () =>
    setShowProfilePictureDialog((st) => !st);

  const handleChange = (name: any, event: any) => {
    setBody((prevBody: any) => ({
      ...prevBody,
      [name]: event,
    }));
  };

  const handleImageUpload = async (e: any) => {
    try {
      const selectedFile = await e.target.files[0];
      setLoading(true);
      const imageUpdate = await UpdateProfilePicture(e.target.files[0]);
      setImage(imageUpdate.data.image);
      dispatch(updateProfileImage(imageUpdate.data.image));
      setShowProfilePictureDialog(false);
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 1000);
    } catch (er) {
      appToast.setToast(`Error: ${er}`, {
        ...ToastLikeConfig,
        type: 'fail',
      });
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {
    try {
      setLoading(true);
      const resp = await CreatProfile(body);
      dispatch(authSuccess(resp.data.user));
      // dispatch(updateProfileInfo(body));
      setUpdateSuccess(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 1000);
    } catch (e) {
      console.log(e, 'ERROR');
    } finally {
      setLoading(false);
    }
  };
  return showDeleteSection ? (
    <DeleteProfile
      isMobile={isMobile}
      toggleDeleteSection={handleToggleSection}
    />
  ) : (
    <>
      <GridContainer>
        <>
          <Grid item xs={12} sm={8}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              flexDirection={isMobile ? 'column' : 'row'}
              columnGap={'20px'}
            >
              <Box
                display='flex'
                alignItems='center'
                justifyContent='center'
                width='127px'
                height='127px'
                minWidth='127px'
                borderRadius='50%'
                sx={{
                  ...(image && {
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    backgroundRepeat: 'no-repeat',
                  }),
                  boxShadow: 'inset 0 0 0 2000px rgba(255, 255, 255, 0.48)',
                }}
              >
                <IconButton
                  disableRipple
                  aria-label='upload picture'
                  onClick={toggleProfilePictureDialog}
                  // component="label"
                  sx={{
                    width: '127px',
                    height: '127px',
                    padding: 0,
                  }}
                >
                  {!image && (
                    <Image
                      width={85}
                      height={85}
                      alt='icon'
                      style={{ borderRadius: '20px' }}
                      src={'/icons/camera.svg'}
                      // src={`${process.env.BASE_URL}/images/${image}`}
                    />
                  )}

                  {/* <input
                    hidden
                    accept="image/*"
                    type="file"
                    disabled={loading}
                    onChange={handleImageUpload}
                  /> */}
                </IconButton>
              </Box>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                flexDirection={'column'}
                alignItems={isMobile ? 'center' : 'flex-start'}
                gap={'9px'}
              >
                <Text
                  token={
                    isMobile
                      ? tokens.FS20FW800LH22_72EB
                      : tokens.FS32FW800LH43_71EB
                  }
                  text={t('Profile')}
                  color={colors.black21}
                  textAlign='left'
                  styles={{ marginTop: isMobile ? '10px' : '0px' }}
                />
                <Text
                  token={
                    isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW400LH18R
                  }
                  text={t('Update your photo and personal details')}
                  color={colors.grey9C}
                  textAlign='left'
                  styles={{
                    marginTop: isMobile ? '10px' : '0px',
                    fontSize: isMobile ? '16px' : '18px',
                  }}
                />
              </Box>
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
                isLoading={loading}
                onClick={() => {
                  update();
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
            <Grid item xs={12} sm={8} md={8} lg={7}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{ gap: { xs: '20px', lg: '37px' } }}
              >
                <Text
                  text={t('Name')}
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '82px' }}
                />
                <TextInputWithBorder
                  label=''
                  value={body.name ?? ''}
                  placeholder={t('Name')}
                  onChange={(e: any) => {
                    handleChange('name', e);
                  }}
                  borderRadius='8px'
                  styles={{
                    maxWidth: isMobile ? '100%' : '500px',
                    width: '100%',
                  }}
                />
              </Box>
            </Grid>
            <Grid item sm={12} sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Divider sx={{ marginBlock: '20px' }} />
            </Grid>
            <Grid item xs={12} sm={8} md={8} lg={7}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{
                  gap: { xs: '20px', lg: '37px' },
                  justifyContent: { xs: 'space-between', md: 'start' },
                }}
              >
                <Text
                  text={t('Phone No')}
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '82px' }}
                />
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentCenter}
                  gap={'10px'}
                  sx={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '500px',
                  }}
                >
                  <TextInputWithBorder
                    label=''
                    value={body.mobile_no ?? ''}
                    placeholder={t('Phone No')}
                    onChange={(e: any) => {
                      handleChange('mobile_no', e);
                    }}
                    borderRadius='8px'
                    styles={{
                      width: '100%',
                    }}
                  />
                </Box>
              </Box>
            </Grid>
            <Grid item sm={12} sx={{ width: '100%' }}>
              <Divider sx={{ marginBlock: '20px' }} />
            </Grid>
            <Grid item xs={12}>
              <TextInputWithBorder
                label=''
                value={body.experience}
                placeholder={t('Tell us about your experience')}
                onChange={(e: any) => {
                  handleChange('experience', e);
                }}
                borderRadius='8px'
                width='100%'
                multiline={true}
                rows={6}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBlock: '20px' }} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInputWithBorder
                label=''
                value={body.facebook_url}
                placeholder={t('Facebook URL')}
                onChange={(e: any) => {
                  handleChange('facebook_url', e);
                }}
                borderRadius='8px'
                startIcon={
                  <Image
                    src={'/icons/facebook.svg'}
                    alt='user'
                    width={20}
                    height={20}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInputWithBorder
                label=''
                value={body.twitter_url}
                placeholder={t('Twitter URL')}
                onChange={(e: any) => {
                  handleChange('twitter_url', e);
                }}
                borderRadius='8px'
                startIcon={
                  <Image
                    src={'/icons/twitter.svg'}
                    alt='user'
                    width={20}
                    height={20}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInputWithBorder
                label=''
                value={body.instagram_url}
                placeholder={t('Instagram URL')}
                onChange={(e: any) => {
                  handleChange('instagram_url', e);
                }}
                borderRadius='8px'
                startIcon={
                  <Image
                    src={'/icons/instagram-black.svg'}
                    alt='user'
                    width={20}
                    height={20}
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextInputWithBorder
                label=''
                value={body.youtube_url}
                placeholder={t('Youtube URL')}
                onChange={(e: any) => {
                  handleChange('youtube_url', e);
                }}
                borderRadius='8px'
                startIcon={
                  <Image
                    src={'/icons/youtube.svg'}
                    alt='user'
                    width={20}
                    height={20}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBlock: '20px' }} />
            </Grid>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{
                  columnGap: { xs: '20px', lg: '37px' },
                  rowGap: '10px',
                  justifyContent: { xs: 'space-between', md: 'start' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'flex-start', sm: 'center' },
                }}
              >
                <Text
                  text={t('Location')}
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '82px' }}
                />

                <TextInputWithBorder
                  label=''
                  value={body.location}
                  placeholder={t('Location')}
                  onChange={(e: any) => {
                    handleChange('location', e);
                  }}
                  borderRadius='8px'
                  styles={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '780px',
                  }}
                  // endIcon={
                  //   <IconButton
                  //     sx={{
                  //       gap: "10px",
                  //       backgroundColor: "rgba(150, 150, 150, 0.17)",
                  //       borderRadius: "10px",
                  //     }}
                  //   >
                  //     <Image
                  //       src={"/icons/map.svg"}
                  //       alt="user"
                  //       width={20}
                  //       height={20}
                  //     />
                  //     <Text
                  //       text="Select on map"
                  //       token={tokens.FS16FW600LH21_86R}
                  //       color={colors.black21}
                  //       textAlign="left"
                  //       styles={{ minWidth: "82px" }}
                  //     />
                  //   </IconButton>
                  // }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ marginBlock: '20px' }} />
            </Grid>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                style={{ cursor: 'pointer' }}
                onClick={handleToggleSection}
              >
                <Box height={'24px'} width={'24px'} marginRight={'10px'}>
                  <Image
                    src={'/icons/trashcan.svg'}
                    alt='trash-can'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
                <Text
                  text={t('Delete Account')}
                  token={tokens.FS16FW600LH21_86R}
                  color={colors.red00}
                  textAlign='left'
                  cursor='pointer'
                  styles={{ fontSize: isMobile ? '15px' : '18px' }}
                />
              </Box>
            </Grid>
          </>
        </GridContainer>
      </Box>
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
            disabled={loading}
            onClick={() => {
              update();
            }}
            variant='blue'
            justifyContent='center'
            borderRadius='8px'
            style={{ marginLeft: '10px', height: '52px', width: '50%' }}
          />
        </Box>
      )}
      {showProfilePictureDialog && (
        <DialogWrapper
          open={showProfilePictureDialog}
          onClose={toggleProfilePictureDialog}
          fullWidth={true}
          maxWidth={isMobile ? 'xs' : 'sm'}
        >
          <DialogTitle
            sx={{
              padding: '21px 17px 11px',
              ...displayFlexAlignItemsCenterJustifyContentFlexEnd,
            }}
          >
            <DialogCloseButton toggleClose={toggleProfilePictureDialog} />
          </DialogTitle>
          <DialogContent
            sx={{
              padding: '0px 17px 37px',
            }}
          >
            <Text
              token={tokens.FS16FW600LH21_86R}
              text='Update Profile Picture'
              color={colors.black21}
              textAlign='center'
              styles={{
                fontSize: isMobile ? '16px' : '20px',
                marginBottom: '35px',
              }}
            />
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              gap={'10px'}
              width='100%'
              flexDirection={isMobile ? 'column-reverse' : 'row'}
              sx={{
                position: 'relative',
              }}
            >
              <Button
                token={tokens.FS16FW500LH18M}
                text='Remove Profile Picture'
                onClick={() => {}}
                variant='grey'
                justifyContent='center'
                borderRadius='8px'
                style={{
                  height: isMobile ? '57px' : '65px',
                  whiteSpace: 'nowrap',
                  maxWidth: { xs: '200px', sm: '214px' },
                  ...(isMobile && { width: '100%' }),
                  ...(!isMobile && { flex: 1 }),
                }}
              />

              <Button
                token={tokens.FS16FW500LH18M}
                text='Upload New'
                // component="label"
                isLoading={loading}
                onClick={() => {
                  fileInputRef.current.click();
                }}
                variant='blue'
                justifyContent='center'
                borderRadius='8px'
                style={{
                  height: isMobile ? '57px' : '65px',
                  maxWidth: { xs: '200px', sm: '214px' },
                  ...(isMobile && { width: '100%' }),
                  ...(!isMobile && { flex: 1 }),
                }}
              ></Button>
              <input
                hidden
                accept='image/*'
                type='file'
                disabled={loading}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            </Box>
          </DialogContent>
        </DialogWrapper>
      )}
      <Toast
        show={updateSuccess}
        text={updateSuccess === null ? '' : 'Successfully updated'}
        type='success'
      />
    </>
  );
}
