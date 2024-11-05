import { GridContainer, Text, TextInputWithBorder, Toast } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { CreatProfile, UpdatePass } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Divider, Grid, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EmailOTPVerificationModal from '../auth/modals/EmailOTPVerificationModal';
import FailedEmailVerificationModal from '../auth/modals/FailedEmailVerificationModal';
import SuccessEmailVerificationModal from '../auth/modals/SuccessEmailVerificationModal';
export default function SecuritySection() {
  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };
  const { t } = useTranslation();

  const [loading, setLoading] = useState<string | null>(null);

  const [inputEmail, setInputEmail] = useState('');
  const [isOpenEmailVerificationOTPModal, setIsOpenEmailVerificationOTPModal] =
    useState(false);
  const [
    isOpenFailEmailOTPVerificationModal,
    setIsOpenFailEmailOTPVerificationModal,
  ] = useState(false);
  const [
    isOpenSuccessEmailOTPVerificationModal,
    setIsOpenSuccessEmailOTPVerificationModal,
  ] = useState(false);
  const [inputOTP, setInputOTP] = useState('');
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [showPass, setShowPass] = useState({
    currShow: false,
    newShow: false,
  });
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const handleChange = (name: any, event: any) => {
    setData((prevBody: any) => ({
      ...prevBody,
      [name]: event,
    }));
  };
  const resendEmailVerification = () => {
    if (process.env.BASE_URL) {
      const apiURL = process.env.BASE_URL + '/auth/resend-code';
      axios
        .post(apiURL, {
          email: email,
        })
        .then(() => setIsOpenEmailVerificationOTPModal(true))
        .catch(() => setInputOTP(''));
    }
  };
  const handleVerifyAccount = () => {
    if (process.env.BASE_URL && process.env.VERIFY_ACCOUNT) {
      const apiURL = process.env.BASE_URL + process.env.VERIFY_ACCOUNT;
      axios
        .post(apiURL, {
          code: inputOTP,
        })
        .then(() => {
          setIsOpenSuccessEmailOTPVerificationModal(true);
          setEmail('');
        })
        .catch(() => {
          setIsOpenFailEmailOTPVerificationModal(true);
          setInputOTP('');
        });
    }
  };

  const updatePassword = async () => {
    if (data.currentPassword.trim() === '' || data.newPassword.trim() === '')
      return;
    setLoading('password');
    const update: any = await UpdatePass(data);
    if (update?.type === 'ERROR')
      appToast.setToast(update.message, {
        ...ToastLikeConfig,
        type: 'fail',
      });
    else {
      appToast.setToast('Password Updated', {
        ...ToastLikeConfig,
      });
      setData({ currentPassword: '', newPassword: '' });
    }
    setLoading(null);
  };

  const updateEmail = async () => {
    if (
      email.trim() === '' ||
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      appToast.setToast('Invalid email', {
        ...ToastLikeConfig,
        type: 'fail',
      });
      return;
    }
    try {
      setLoading('email');
      const update = await CreatProfile({ email: email });
      if (update && update.status === 200) {
        appToast.setToast('Email Updated', {
          ...ToastLikeConfig,
        });
        setError('');
      } else {
        appToast.setToast('Email already exists', {
          ...ToastLikeConfig,
          type: 'fail',
        });
      }
    } catch (e: any) {
      appToast.setToast(e?.response?.data?.message || 'Something went wrong', {
        ...ToastLikeConfig,
        type: 'fail',
      });
    } finally {
      setLoading(null);
    }
  };
  return (
    <>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        flexDirection={'column'}
        alignItems={'flex-start'}
        gap={'9px'}
      >
        <Text
          token={
            isMobile ? tokens.FS20FW800LH22_72EB : tokens.FS32FW800LH43_71EB
          }
          text={t('Security')}
          color={colors.black21}
          textAlign='left'
        />
        <Text
          token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW400LH18R}
          text={t('Update your security settings')}
          color={colors.grey9C}
          textAlign='left'
          styles={{
            fontSize: isMobile ? '16px' : '18px',
          }}
        />
      </Box>
      <Box marginTop={isMobile ? '32px' : '50px'}>
        <GridContainer spacing={isMobile ? 1 : 2} justifyContent='flex-start'>
          <>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{
                  columnGap: { xs: '20px', sm: '37px' },
                  rowGap: '5px',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
                alignItems='baseline'
              >
                <Text
                  text={t('Current Password')}
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '82px' }}
                />
                <TextInputWithBorder
                  label=''
                  placeholder={t('Enter current password')}
                  onChange={(e) => {
                    handleChange('currentPassword', e);
                  }}
                  type={showPass.currShow ? 'text' : 'password'}
                  borderRadius='8px'
                  value={data.currentPassword}
                  styles={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '290px',
                  }}
                  endIcon={
                    <div
                      onClick={() => {
                        setShowPass((prevValue) => ({
                          ...prevValue,
                          currShow: !showPass.currShow,
                        }));
                      }}
                    >
                      <Image
                        style={{ cursor: 'pointer' }}
                        width={'20px'}
                        height={'20px'}
                        alt='icon'
                        src={'/icons/eye-black.svg'}
                      />
                    </div>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{
                  columnGap: { xs: '20px', sm: '37px' },
                  rowGap: '5px',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
                alignItems='baseline'
              >
                <Text
                  text={t('New Password')}
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '134px' }}
                />
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  {...flexDirection.column}
                  alignItems='end'
                  gap={isMobile ? '23px' : '9px'}
                  sx={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '290px',
                  }}
                >
                  <TextInputWithBorder
                    label=''
                    placeholder={t('Enter new password')}
                    onChange={(e) => {
                      handleChange('newPassword', e);
                    }}
                    value={data.newPassword}
                    type={showPass.newShow ? 'text' : 'password'}
                    borderRadius='8px'
                    styles={{
                      width: '100%',
                    }}
                    endIcon={
                      <div
                        onClick={() => {
                          setShowPass((prevValue) => ({
                            ...prevValue,
                            newShow: !showPass.newShow,
                          }));
                        }}
                      >
                        <Image
                          style={{ cursor: 'pointer' }}
                          width={'20px'}
                          height={'20px'}
                          alt='icon'
                          src={'/icons/eye-black.svg'}
                        />
                      </div>
                    }
                  />
                  <Button
                    token={tokens.FS16FW500LH18M}
                    text={t('Update Password')}
                    onClick={updatePassword}
                    variant='black'
                    isLoading={(loading && loading === 'password') || false}
                    justifyContent='center'
                    borderRadius='8px'
                    style={{ height: '52px', width: '100%' }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ marginBlock: '20px' }} />
            </Grid>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                flexDirection={isMobile ? 'column' : 'row'}
                alignItems={'baseline'}
                sx={{
                  columnGap: { sm: '20px', md: '37px' },
                  rowGap: '9px',
                }}
              >
                <Text
                  text={t('Email')}
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '134px' }}
                />
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  {...flexDirection.column}
                  gap={'15px'}
                  sx={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '290px',
                  }}
                >
                  <TextInputWithBorder
                    label=''
                    value={email}
                    placeholder={t('Email')}
                    onChange={(e) => {
                      setEmail(e);
                    }}
                    borderRadius='8px'
                    type='email'
                    styles={{ width: '100%' }}
                  />
                  <Button
                    token={tokens.FS16FW500LH18M}
                    text={t('Update Email')}
                    onClick={updateEmail}
                    variant='black'
                    isLoading={(loading && loading === 'email') || false}
                    justifyContent='center'
                    borderRadius='8px'
                    style={{ width: '100%', height: '52px' }}
                  />
                  {error && <p style={{ color: 'red' }}>{error}</p>}
                </Box>
              </Box>
            </Grid>
          </>
        </GridContainer>
      </Box>{' '}
      {isMobile && (
        <Box
          height={'100%'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          marginTop={'50px'}
        >
          <Button
            token={tokens.FS16FW500LH18M}
            text={t('Cancel')}
            onClick={() => {}}
            variant='blackOutlined'
            justifyContent='center'
            borderRadius='8px'
            style={{ height: '52px', width: '50%' }}
          />
          <Button
            token={tokens.FS16FW500LH18M}
            text={t('Save')}
            onClick={() => {}}
            variant='blue'
            justifyContent='center'
            borderRadius='8px'
            style={{ marginLeft: '10px', height: '52px', width: '50%' }}
          />
        </Box>
      )}
      <EmailOTPVerificationModal
        isOpen={isOpenEmailVerificationOTPModal}
        handleClose={() => setIsOpenEmailVerificationOTPModal(false)}
        handleSubmit={() => {
          setIsOpenEmailVerificationOTPModal(false);
          handleVerifyAccount();
        }}
        emailRecipient={inputEmail}
        handleOTPChange={(OTP: string) => {
          setInputOTP(inputOTP + OTP);
        }}
        OTPValue={inputOTP}
      />
      <SuccessEmailVerificationModal
        isOpen={isOpenSuccessEmailOTPVerificationModal}
        handleClose={() => {
          setIsOpenSuccessEmailOTPVerificationModal(false);
        }}
        handleSubmit={() => {
          setIsOpenSuccessEmailOTPVerificationModal(false);
        }}
      />
      <FailedEmailVerificationModal
        isOpen={isOpenFailEmailOTPVerificationModal}
        handleClose={() => {
          setIsOpenFailEmailOTPVerificationModal(false);

          setIsOpenEmailVerificationOTPModal(true);
        }}
        handleSubmit={() => {
          setIsOpenFailEmailOTPVerificationModal(false);
          resendEmailVerification();
          setIsOpenEmailVerificationOTPModal(true);
        }}
      />
    </>
  );
}
