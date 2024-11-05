import {
  EmailInputField,
  PasswordInputField,
  PhoneInputField,
  Toast,
  UserInputField,
} from '@/components';
import Button from '@/components/Button/Button';
import RowRadioGroup from '@/components/RowRadioGroup/RowRadioGroup';
import { Text } from '@/components/Text';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { authSuccess } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Divider, Stack, useMediaQuery } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import url, { setAuthToken } from '../../../config/index';
import EmailOTPVerificationModal from '../modals/EmailOTPVerificationModal';
import FailedEmailVerificationModal from '../modals/FailedEmailVerificationModal';
import SuccessEmailVerificationModal from '../modals/SuccessEmailVerificationModal';

export default function SignUpForm() {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const [inputName, setInputName] = useState('');
  const [isRealtor, setIsRealtor] = useState<boolean | null>(null);
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputOTP, setInputOTP] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isOpenEmailVerificationOTPModal, setIsOpenEmailVerificationOTPModal] =
    useState(false);
  const [
    isOpenSuccessEmailOTPVerificationModal,
    setIsOpenSuccessEmailOTPVerificationModal,
  ] = useState(false);
  const [
    isOpenFailEmailOTPVerificationModal,
    setIsOpenFailEmailOTPVerificationModal,
  ] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const router = useRouter();
  const dispatch = useDispatch();
  const { redirect } = router.query;

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const handleSignUp = () => {
    if (
      inputEmail === '' ||
      inputName === '' ||
      inputPassword === '' ||
      inputPhoneNumber === '' ||
      captchaToken === null
    )
      return appToast.setToast(t('Please enter your details for signup'), {
        ...ToastLikeConfig,
      });
    if (process.env.BASE_URL && process.env.SIGNUP) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

      const isValid = emailRegex.test(inputEmail);

      if (isValid) {
        setIsValidEmail(true);
        setIsAuthenticating(true);
        const apiURL = process.env.BASE_URL + process.env.SIGNUP;
        axios
          .post(apiURL, {
            name: inputName,
            last_name: inputName,
            mobile_no: inputPhoneNumber.toString(),
            email: inputEmail,
            password: inputPassword,
            ...((isRealtor === true || isRealtor === false) && {
              is_retailer: isRealtor,
            }),
          })
          .then(() => {
            setIsAuthenticating(false);
            setIsOpenEmailVerificationOTPModal(true);
          })
          .catch((res) => {
            setIsAuthenticating(false);
            setSignUpSuccess(res.response.data.message);
          });
      } else {
        setIsValidEmail(isValid);
      }
    }
  };
  const handleOTPSubmit = (otp: string) => {
    if (process.env.BASE_URL && process.env.VERIFY_ACCOUNT) {
      const apiURL = process.env.BASE_URL + process.env.VERIFY_ACCOUNT;
      axios
        .post(apiURL, {
          code: +otp,
        })
        .then(() => setIsOpenSuccessEmailOTPVerificationModal(true))
        .catch(() => {
          setIsOpenFailEmailOTPVerificationModal(true);
          setInputOTP('');
        })
        .finally(() => setIsOpenEmailVerificationOTPModal(false));
    }
  };

  const resendEmailVerification = () => {
    if (process.env.BASE_URL) {
      const apiURL = process.env.BASE_URL + '/auth/resend-code';
      axios
        .post(apiURL, {
          email: inputEmail,
        })
        .then(() => setIsOpenEmailVerificationOTPModal(true))
        .catch(() => setInputOTP(''));
    }
  };

  const verify = (val: string | null) => {
    if (val) setCaptchaToken(val);
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
      appToast.setToast(t('Login Success'), {
        ...ToastLikeConfig,
      });
      // localStorage.setItem('authContent', JSON.stringify(authContent));
      localStorage.setItem('token', getAuth.data.authentication);
      dispatch(authSuccess(getAuth.data.user));
      setAuthToken();
      if (redirect) router.push(redirect as string);
      else router.push('/');
    },
    scope: 'email profile',
  });

  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      {...flexDirection.column}
      sx={{
        rowGap: { xs: '20px', sm: '30px' },
        padding: '15px',
      }}
    >
      <Toast
        show={signUpSuccess !== null}
        text={signUpSuccess === null ? '' : signUpSuccess}
        type='fail'
      />
      <EmailOTPVerificationModal
        isOpen={isOpenEmailVerificationOTPModal}
        emailRecipient={inputEmail}
        OTPValue={inputOTP}
        handleClose={() => setIsOpenEmailVerificationOTPModal(false)}
        handleSubmit={handleOTPSubmit}
        handleOTPChange={(OTP: string) => setInputOTP(inputOTP + OTP)}
      />
      <SuccessEmailVerificationModal
        isOpen={isOpenSuccessEmailOTPVerificationModal}
        handleClose={() => {
          setIsOpenSuccessEmailOTPVerificationModal(false);
          if (redirect) router.push(redirect as string);
          else router.push('/auth/login');
        }}
        handleSubmit={() => {
          setIsOpenSuccessEmailOTPVerificationModal(false);
          if (redirect) router.push(redirect as string);
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
      <Box>
        <Box marginTop='30px' display='flex' justifyContent='center'>
          <Box
            height={'100%'}
            sx={{
              ...displayFlexAlignItemsCenterJustifyContentCenter,
              borderRadius: '100%',
              padding: '30px',
              backgroundColor: colors.greyF6,
            }}
          >
            <Image
              src='/icons/shaking-hand.svg'
              alt='shaking-hand'
              width={40}
              height={40}
              loading={'eager'}
              priority
            />
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
              color={colors.grey9C}
              styles={{
                marginBottom: { sm: '5px' },
                fontSize: { xs: '13px', sm: '16px' },
              }}
            />
            <Text
              text={t('Explore, Connect, and Settle Down in Your Dream Space.')}
              token={tokens.FS16FW500LH18M}
              color={colors.grey9C}
              styles={{
                fontSize: { xs: '13px', sm: '16px' },
              }}
            />
          </Box>
          <Box width={'100%'}>
            <Box marginTop='20px'>
              <UserInputField
                styles={{ width: '100%' }}
                onChange={(input: string) => setInputName(input)}
              />
            </Box>
            <Box marginTop='10px'>
              <PhoneInputField
                styles={{ width: '100%' }}
                onChange={(input: string) => setInputPhoneNumber(input)}
              />
            </Box>
            <Box marginTop='10px'>
              <EmailInputField
                styles={{ width: '100%' }}
                onChange={(text: string) => setInputEmail(text)}
              />
              {!isValidEmail && (
                <p style={{ color: 'red' }}>Email is invalid.</p>
              )}
            </Box>
            <Box marginTop='10px'>
              <PasswordInputField
                styles={{ width: '100%' }}
                onChange={(text: string) => setInputPassword(text)}
              />
            </Box>
            <Stack
              mt={'10px'}
              direction={'row'}
              spacing={1}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text
                text={t('Are you a realtor?')}
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
                color={colors.grey9C}
              />
              <RowRadioGroup
                label=''
                size='small'
                options={[
                  { id: 1, label: t('Yes'), value: 'yes' },
                  { id: 2, label: t('No'), value: 'no' },
                ]}
                handleOnChange={(val: string) => setIsRealtor(val === 'yes')}
              />
            </Stack>
            {process.env.GOOGLE_CAPTCHA && (
              <Stack mt={'10px'} width='100%'>
                <ReCAPTCHA
                  sitekey={process.env.GOOGLE_CAPTCHA || ''}
                  onChange={verify}
                />
              </Stack>
            )}
            <Box
              marginTop='20px'
              {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
              height={'60px'}
            >
              <Button
                variant='black'
                onClick={handleSignUp}
                token={
                  isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M
                }
                text={t('Signup')}
                justifyContent='center'
                borderRadius='17px'
                maxWidth
                isLoading={isAuthenticating}
              />
            </Box>
            <Box marginTop='20px'>
              <Divider>
                <Text
                  text={t('or')}
                  token={tokens.FS14FW400LH19R}
                  color={colors.grey9C}
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
            text={t('Already have an account? ')}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW500LH21_86R}
            color={colors.grey96}
          />
          <Text
            text={t('Login')}
            token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW600LH21_86R}
            color={colors.blueC2}
            cursor='pointer'
            redirect={
              redirect
                ? `/auth/login?redirect=${redirect as string}`
                : `/auth/login`
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
            loading={'eager'}
            priority
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
        loading={'eager'}
        priority
      />
    </Box>
  );
};
