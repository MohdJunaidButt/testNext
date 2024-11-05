import { Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import Image from '@/components/Image/Image';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { changePass } from '@/store/slices/index';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Alert,
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import OTPInput from 'react-otp-input';
interface ChangePasswordModalProps {
  isOpen: boolean;
  handleClose: () => void;
}
export default function ChangePasswordModal({
  isOpen,
  handleClose,
}: ChangePasswordModalProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const [pass, setPass] = useState({
    password: '',
    passwordConfirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
  const [isOtpFilled, setIsOtpFilled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const toggleShowPassword = () => setShowPassword((st) => !st);
  const handleChange = (name: any, value: any) => {
    setPass((passw: any) => ({
      ...passw,
      [name]: value,
    }));
  };
  const passwordChange = async () => {
    if (!isOtpFilled) return setError(t('Enter OTP sent to your email'));
    if (pass.password !== pass.passwordConfirm)
      return setError(t('Password and Confirm Password are not same'));

    setLoading(true);
    try {
      const changed = await changePass(otp, pass);
      if (changed) {
        handleClose();
        appToast.setToast(t('Password updated successfully'), {
          ...ToastLikeConfig,
          type: 'success',
        });
      }
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (otp.length === 4) setIsOtpFilled(true);
    else setIsOtpFilled(false);
  }, [otp]);

  return (
    <DialogWrapper open={isOpen} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          padding: isMobile ? '19px' : '15',
          ...displayFlexAlignItemsCenterJustifyContentFlexEnd,
          alignItems: 'end',
        }}
      ></DialogTitle>
      <DialogContent style={{ padding: '0px 14px 16px' }}>
        <Text
          text={t('Change your Password')}
          token={tokens.FS20FW600LH22_72SB}
          color={colors.black21}
          styles={{
            marginBottom: '30px',
            fontSize: '20px',
          }}
        />{' '}
        <Box
          mb={3}
          display='flex'
          sx={{
            '& > div': {
              gap: '10px',
            },
            gap: '10px',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <OTPInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            inputType='number'
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  width: '50px',
                  height: '50px',
                  ...tokens.FS20FW500LH22_72SB,
                  border: 'none',
                  borderRadius: '8px',
                  backgroundColor: colors.greyF6,
                  textAlign: 'center',
                  color: colors.black21,
                  outline: 'none',
                }}
              />
            )}
          />
          <Text
            text={t('Enter OTP sent to your email')}
            token={isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            color={colors.grey9C}
            textAlign='right'
          />
        </Box>
        <TextInputWithBorder
          width='400px'
          label=''
          placeholder={t('Enter New Password')}
          onChange={(e) => {
            handleChange('password', e);
          }}
          borderRadius='8px'
          type={showPassword ? 'text' : 'password'}
          styles={{
            bgcolor: colors.greyF6,
            border: 'none',
            marginBottom: '11px',
          }}
        />
        <TextInputWithBorder
          width='400px'
          label=''
          placeholder={t('Confirm Password')}
          onChange={(e) => {
            handleChange('passwordConfirm', e);
          }}
          borderRadius='8px'
          type={showPassword ? 'text' : 'password'}
          styles={{
            bgcolor: colors.greyF6,
            border: 'none',
          }}
        />{' '}
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          gap={'10px'}
          marginBottom={'20px'}
          alignItems='baseline'
        >
          <IconButton
            onClick={toggleShowPassword}
            disableRipple
            sx={{ alignItems: 'baseline', gap: '5px' }}
          >
            <Image
              width={'17px'}
              height={'100%'}
              alt='icon'
              src={showPassword ? '/icons/eye-close.svg' : '/icons/eye.svg'}
            />
            <Text
              text={showPassword ? t('Hide Password') : t('Show Password')}
              token={tokens.FS14FW400LH19R}
              color={showPassword ? colors.grey9C : colors.blueC2}
              textAlign='left'
            />
          </IconButton>
          <Text
            text={t('Min length is upto 6 character')}
            token={isMobile ? tokens.FS11FW400LH18R : tokens.FS13FW400LH18R}
            color={colors.grey9C}
            textAlign='right'
          />{' '}
        </Box>
        {error && (
          <Alert severity='error' sx={{ marginBottom: '20px' }}>
            {error}
          </Alert>
        )}
        <Button
          text={t('Change Password')}
          justifyContent='center'
          onClick={() => {
            passwordChange();
          }}
          token={tokens.FS16FW500LH21_86R}
          variant={'blue'}
          borderRadius='8px'
          maxWidth
          style={{ height: '65px' }}
          isLoading={loading}
        />
      </DialogContent>
    </DialogWrapper>
  );
}
