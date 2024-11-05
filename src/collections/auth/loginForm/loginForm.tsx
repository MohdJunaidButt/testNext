import FailedEmailVerificationModal from '@/collections/auth/modals/FailedEmailVerificationModal';
import SuccessEmailVerificationModal from '@/collections/auth/modals/SuccessEmailVerificationModal';
import { EmailInputField, PasswordInputField } from '@/components';
import Button from '@/components/Button/Button';
import { Text } from '@/components/Text';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { authSuccess, confirmOTP, setOTP } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Divider, Stack, useMediaQuery } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import url, { setAuthToken } from '../../../config/index';
import ChangePasswordModal from '../modals/ChangePasswordModal';
import EmailOTPVerificationModal from '../modals/EmailOTPVerificationModal';
import EmailRequiredModal from '../modals/EmailRequiredModal';
export default function LoginForm() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [isOpenForgotPasswordModal, setIsOpenForgotPasswordModal] =
    useState(false);
  const [isOpenEmailVerificationOTPModal, setIsOpenEmailVerificationOTPModal] =
    useState(false);
  const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] =
    useState(false);

  const [otpDialogFor, setOtpDialogFor] = useState('');

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const login = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const getData = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?key=AIzaSyA0Ecxe9KCKv9uxNxknUUddYRQK5Y7_kxI&oauth_token=${codeResponse.access_token}`
      );
      const getAuth = await url.post('/auth/google-login', {
        email: getData.data.email,
        name: getData.data.name,
        is_social_login: true,
      });

      let authContent = {
        authentication: getAuth.data.authentication,
        refresh: getAuth.data.refresh,
      };
      setIsAuthenticating(false);
      appToast.setToast('Login Success', {
        ...ToastLikeConfig,
      });
      localStorage.setItem('token', getAuth.data.authentication);
      dispatch(authSuccess(getAuth.data.user));
      setAuthToken();
      if (redirect) router.push(redirect as string);
      else router.push('/');
    },
    scope: 'email profile',
  });
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [
    isOpenSuccessEmailOTPVerificationModal,
    setIsOpenSuccessEmailOTPVerificationModal,
  ] = useState(false);
  const [
    isOpenFailEmailOTPVerificationModal,
    setIsOpenFailEmailOTPVerificationModal,
  ] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { redirect } = router.query;

  const handleLogin = () => {
    if (inputEmail === '' || inputPassword === '')
      return appToast.setToast(t('Enter email and password to Login'), {
        ...ToastLikeConfig,
      });
    if (process.env.BASE_URL && process.env.LOGIN) {
      setIsAuthenticating(true);
      const apiURL = process.env.BASE_URL + process.env.LOGIN;
      axios
        .post(apiURL, {
          email: inputEmail,
          password: inputPassword,
        })
        .then((res) => {
          setIsAuthenticating(false);
          appToast.setToast(t('Login Success'), {
            ...ToastLikeConfig,
          });
          localStorage.setItem('token', res.data.authentication);
          dispatch(authSuccess(res.data));
          dispatch(authSuccess(res.data.user));

          setAuthToken();
          if (redirect) router.push(redirect as string);
          else router.push('/');
        })
        .catch((err) => {
          if (
            err?.response?.data?.message &&
            err?.response?.data?.message.includes('verify your email')
          )
            setIsOpenEmailVerificationOTPModal(true);
          setOtpDialogFor('verify');
          setIsAuthenticating(false);
          appToast.setToast(err?.response?.data?.message || t('Login Failed'), {
            ...ToastLikeConfig,
            type: 'fail',
          });
        });
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    if (otpDialogFor && otpDialogFor === 'forgot') {
      try {
        const send = await confirmOTP(otp);
        if (send) {
          dispatch(setOTP(otp));
          setIsOpenChangePasswordModal(true);
          setOtpDialogFor('');
        }
      } catch (e) {
        console.log('e', e);
      }
    } else if (otpDialogFor && otpDialogFor === 'verify') {
      if (process.env.BASE_URL && process.env.VERIFY_ACCOUNT) {
        const apiURL = process.env.BASE_URL + process.env.VERIFY_ACCOUNT;
        axios
          .post(apiURL, {
            code: otp,
          })
          .then(() => {
            setIsOpenSuccessEmailOTPVerificationModal(true);
            setOtpDialogFor('');
          })
          .catch(() => setIsOpenFailEmailOTPVerificationModal(true))
          .finally(() => setIsOpenEmailVerificationOTPModal(false));
      }
    }
  };

  const resendEmailVerification = () => {
    if (process.env.BASE_URL) {
      const apiURL = process.env.BASE_URL + '/auth/resend-code';
      axios
        .post(apiURL, {
          email: inputEmail,
        })
        .then(() => {
          setIsOpenEmailVerificationOTPModal(true);
        })
        .catch(() => {
          // setIsOpenFailEmailOTPVerificationModal(true);
        });
    }
  };

  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      {...flexDirection.column}
      sx={{
        rowGap: { xs: '20px', sm: '30px' },
        padding: '15px',
      }}
    >
      <SuccessEmailVerificationModal
        isOpen={isOpenSuccessEmailOTPVerificationModal}
        handleClose={() => {
          setIsOpenSuccessEmailOTPVerificationModal(false);
          if (redirect)
            router.push(`/auth/login?redirect=${redirect as string}`);
          else router.push('/auth/login');
        }}
        handleSubmit={() => {
          setIsOpenSuccessEmailOTPVerificationModal(false);
          if (redirect)
            router.push(`/auth/login?redirect=${redirect as string}`);
          else router.push('/auth/login');
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
      <EmailRequiredModal
        isOpen={isOpenForgotPasswordModal}
        handleClose={() => setIsOpenForgotPasswordModal(false)}
        handleSubmit={() => {
          setIsOpenForgotPasswordModal(false);
          setIsOpenChangePasswordModal(true);
        }}
      />
      <EmailOTPVerificationModal
        emailRecipient={inputEmail}
        isOpen={isOpenEmailVerificationOTPModal}
        handleClose={() => setIsOpenEmailVerificationOTPModal(false)}
        handleSubmit={handleOTPSubmit}
        handleOTPChange={(v) => {}}
        OTPValue={''}
      />
      <ChangePasswordModal
        isOpen={isOpenChangePasswordModal}
        handleClose={() => setIsOpenChangePasswordModal(false)}
      />
      <Box>
        <Box marginTop={'50px'} display='flex' justifyContent='center'>
          <Box
            style={{
              borderRadius: '100%',
              padding: '30px',
              backgroundColor: colors.greyF6,
            }}
            height={'100%'}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
          >
            <Image
              src='/icons/shaking-hand.svg'
              alt='shaking-hand'
              width={40}
              height={40}
              loading='eager'
              priority
            />{' '}
          </Box>
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          {...flexDirection.column}
          maxWidth={'450px'}
        >
          <Box marginTop='20px'>
            <Text
              text={t('Hello There')}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              color={colors.black2D}
            />
          </Box>
          <Box marginTop='20px' width='100%'>
            <Text
              text={t('Every Home Has a Story. Let Us Guide You to Yours.')}
              token={tokens.FS16FW500LH18M}
              color={colors.grey96}
              styles={{
                marginBottom: { sm: '5px' },
                fontSize: { xs: '13px', sm: '16px' },
              }}
            />
            <Text
              text={t('Explore, Connect, and Settle Down in Your Dream Space.')}
              token={tokens.FS16FW500LH18M}
              color={colors.grey96}
              styles={{
                fontSize: { xs: '13px', sm: '16px' },
              }}
            />
          </Box>

          <Box width='100%'>
            <Box marginTop='20px'>
              <EmailInputField
                styles={{ width: '100%' }}
                onChange={(text: string) => setInputEmail(text)}
              />
            </Box>
            <Box marginTop='10px'>
              <PasswordInputField
                styles={{ width: '100%' }}
                onChange={(text: string) => setInputPassword(text)}
              />
            </Box>
            <Box
              marginTop='10px'
              {...displayFlexAlignItemsCenterJustifyContentFlexEnd}
            >
              <Box
                onClick={() =>
                  setIsOpenForgotPasswordModal(!isOpenForgotPasswordModal)
                }
              >
                <Text
                  text={t('Forgot Password')}
                  token={tokens.FS14FW400LH19R}
                  color={colors.grey96}
                  cursor='pointer'
                />
              </Box>
            </Box>
            <Box
              marginTop='20px'
              {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
              height={'60px'}
            >
              <Button
                // disabled={
                //   inputEmail === '' || inputPassword === '' ? true : false
                // }
                variant='black'
                onClick={() => handleLogin()}
                token={
                  isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                }
                text={t('Login')}
                justifyContent='center'
                maxWidth
                borderRadius='17px'
                isLoading={isAuthenticating}
              />
            </Box>

            <Box marginTop='20px'>
              <Divider>
                <Text
                  text='or'
                  token={tokens.FS14FW400LH19R}
                  color={colors.grey96}
                />
              </Divider>
            </Box>
            <Box
              marginTop='20px'
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              gap={'15px'}
            >
              {renderPlatformBox(
                '/icons/google.svg',
                'google',
                isMobile,
                login
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Stack my={'30px'}>
        <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
          <Text
            text={t('Dont have an account? ')}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW500LH21_86R}
            color={colors.grey96}
          />
          <Text
            text={t('Signup')}
            token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW600LH21_86R}
            color={colors.blueC2}
            cursor='pointer'
            redirect={
              redirect
                ? `/auth/signup?redirect=${redirect as string}`
                : `/auth/signup`
            }
            styles={{ marginLeft: '5px' }}
          />
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          mt={'15px'}
          alignItems='center'
        >
          <Image
            src={'/icons/arrow-left.svg'}
            alt={'back'}
            width={isMobile ? 14 : 15}
            height={isMobile ? 14 : 15}
            priority
            loading='eager'
          />
          <Text
            text={t('Back to Home')}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW500LH21_86R}
            color={colors.grey96}
            cursor='pointer'
            redirect={'/'}
            styles={{
              marginLeft: '10px',
              textDecoration: 'underline',
              lineHeight: '0.8',
            }}
          />
        </Box>
      </Stack>
    </Box>
  );
}

const renderPlatformBox = (
  icon: string,
  alt: string,
  isMobile: boolean,
  login: () => void
) => {
  return (
    <Box
      style={{
        borderRadius: '8px',
        background: colors.greyF6,
        cursor: 'pointer',
      }}
      width={isMobile ? 40 : 81}
      height={isMobile ? 40 : 81}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      onClick={login}
    >
      <Image
        src={icon}
        alt={alt}
        width={isMobile ? 20 : 40}
        height={isMobile ? 20 : 40}
        loading='eager'
        priority
      />
    </Box>
  );
};
