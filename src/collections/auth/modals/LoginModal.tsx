import EmailOTPVerificationModal from '@/collections/auth/modals/EmailOTPVerificationModal';
import FailedEmailVerificationModal from '@/collections/auth/modals/FailedEmailVerificationModal';
import SuccessEmailVerificationModal from '@/collections/auth/modals/SuccessEmailVerificationModal';
import { EmailInputField, PasswordInputField, Text } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import { setAuthToken } from '@/config/index';
import { authSuccess } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Alert,
  Box,
  DialogContent,
  Divider,
  Paper,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

interface LoginModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface FormDataProps {
  email: string;
  password: string;
}

export default function LoginModal({ isOpen, handleClose }: LoginModalProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const [formData, setFormData] = useState<FormDataProps>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
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

  const dispatch = useDispatch();

  const handleChange = (field: 'email' | 'password', val: string) =>
    setFormData((st: FormDataProps) => ({
      ...st,
      [field]: val,
    }));

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  const handleLogin = () => {
    if (formData.email.trim() === '' || formData.password.trim() === '') return;
    if (process.env.BASE_URL && process.env.LOGIN) {
      setIsAuthenticating(true);
      const apiURL = process.env.BASE_URL + process.env.LOGIN;
      axios
        .post(apiURL, {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          localStorage.setItem('token', res.data.authentication);
          dispatch(authSuccess(res.data.user));
          setAuthToken();
          setIsAuthenticating(false);
          return handleClose();
        })
        .catch((err) => {
          setIsAuthenticating(false);
          if (
            err?.response?.data?.message &&
            err?.response?.data?.message.includes('verify your email')
          )
            setIsOpenEmailVerificationOTPModal(true);
          else setError(err?.response?.data?.message || 'Something went wrong');
        });
    }
  };

  const resendEmailVerification = () => {
    if (process.env.BASE_URL) {
      const apiURL = process.env.BASE_URL + '/auth/resend-code';
      axios
        .post(apiURL, {
          email: formData.email,
        })
        .then((res) => {
          setIsOpenEmailVerificationOTPModal(true);
        })
        .catch((res) => {});
    }
  };

  const handleOTPSubmit = async (otp: string) => {
    if (process.env.BASE_URL && process.env.VERIFY_ACCOUNT) {
      const apiURL = process.env.BASE_URL + process.env.VERIFY_ACCOUNT;
      axios
        .post(apiURL, {
          code: otp,
        })
        .then((res) => {
          setIsOpenSuccessEmailOTPVerificationModal(true);
        })
        .catch((res) => setIsOpenFailEmailOTPVerificationModal(true))
        .finally(() => setIsOpenEmailVerificationOTPModal(false));
    }
  };

  return (
    <>
      <DialogWrapper
        PaperComponent={Paper}
        scroll='paper'
        maxWidth='sm'
        fullWidth
        open={isOpen}
        sx={{
          '& .MuiDialog-paper': {
            maxWidth: '450px',
            width: '100%',
            margin: '16px',
          },
        }}
      >
        <DialogContent
          sx={{
            padding: '20px',
            width: '100%',
            marginInline: 'auto',
            position: 'relative',
          }}
        >
          <Box position='absolute' top={16} right={16}>
            <DialogCloseButton toggleClose={handleClose} />
          </Box>
          <Text
            text={t('Login')}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              marginBottom: { xs: '15px', sm: '30px' },
              fontSize: '20px',
            }}
          />
          <Text
            text={t(`Login to have access to the content`)}
            token={tokens.FS16FW500LH21_86R}
            color={colors.black21}
          />
          <Box>
            <Box marginTop='20px'>
              <EmailInputField
                styles={{ width: '100%' }}
                onChange={(text: string) => handleChange('email', text)}
              />
            </Box>
            <Box marginTop='10px'>
              <PasswordInputField
                styles={{ width: '100%' }}
                onChange={(text: string) => handleChange('password', text)}
              />
            </Box>
          </Box>
          {error && (
            <Alert severity='error' sx={{ marginBlock: '30px' }}>
              {error}
            </Alert>
          )}
          <Box
            marginTop='30px'
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            height={'60px'}
          >
            <Button
              variant='black'
              onClick={() => handleLogin()}
              token={isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW500LH18M}
              text={t('Login')}
              justifyContent='center'
              maxWidth
              borderRadius='17px'
              isLoading={isAuthenticating}
            />
          </Box>
          <Box sx={{ my: { xs: '20px', sm: '30px' } }}>
            <Divider>
              <Text
                text='or'
                token={tokens.FS14FW400LH19R}
                color={colors.grey9C}
              />
            </Divider>
          </Box>
          <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
            <Text
              text={t('Dont have an account? ')}
              token={
                isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW500LH21_86R
              }
              color={colors.grey9C}
            />
            <Text
              text={t('Signup')}
              token={
                isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW600LH21_86R
              }
              color={colors.blueC2}
              cursor='pointer'
              redirect={`/auth/signup`}
              styles={{ marginLeft: '5px' }}
            />
          </Box>
        </DialogContent>
      </DialogWrapper>
      {isOpenEmailVerificationOTPModal && (
        <EmailOTPVerificationModal
          emailRecipient={formData.email}
          isOpen={isOpenEmailVerificationOTPModal}
          handleClose={() => setIsOpenEmailVerificationOTPModal(false)}
          handleSubmit={handleOTPSubmit}
          handleOTPChange={(v) => {}}
          OTPValue={''}
        />
      )}
      {isOpenSuccessEmailOTPVerificationModal && (
        <SuccessEmailVerificationModal
          isOpen={isOpenSuccessEmailOTPVerificationModal}
          handleClose={() => setIsOpenSuccessEmailOTPVerificationModal(false)}
          handleSubmit={() => setIsOpenSuccessEmailOTPVerificationModal(false)}
        />
      )}
      {isOpenFailEmailOTPVerificationModal && (
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
      )}
    </>
  );
}
