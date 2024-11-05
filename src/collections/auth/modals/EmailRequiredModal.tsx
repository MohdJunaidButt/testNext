import { Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { forgotPass } from '@/store/slices/index';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  tokens,
} from '@/styles';
import { DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
interface EmailRequiredModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}
export default function EmailRequiredModal({
  isOpen,
  handleClose,
  handleSubmit,
}: EmailRequiredModalProps) {
  const [email, setEmail] = useState('');
  const {t} = useTranslation();

  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const ForgotIt = async () => {
    try {
      let body = {
        email: email,
      };
      const send = await forgotPass(body);
      if (send) handleSubmit();
    } catch (e) {
      appToast.setToast(`${e}`, {
        ...ToastLikeConfig,
        type: 'fail',
      });
      handleClose();
    }
  };
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <DialogWrapper open={isOpen} maxWidth={'xs'} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          padding: '13px 15px',
          ...displayFlexAlignItemsCenterJustifyContentFlexEnd,
        }}
      >
        <DialogCloseButton toggleClose={handleClose} />
      </DialogTitle>
      <DialogContent style={{ padding: '0px 14px 16px' }}>
        <Text
          text={t('Email Required')}
          token={tokens.FS20FW600LH22_72SB}
          color={colors.black21}
          styles={{ marginBottom: '30px', fontSize: '20px' }}
        />
        <Text
          text={t('A confirmation mail would be send on your email for password change.')}
          token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
          color={colors.grey96}
          styles={{
            width: '70%',
            margin: 'auto',
          }}
        />
        <TextInputWithBorder
          label=''
          placeholder={t('Enter your email')}
          onChange={(e) => {
            setEmail(e);
          }}
          borderRadius='8px'
          styles={{
            marginTop: '30px',
            bgcolor: colors.greyF6,
            border: 'none',
            marginBottom: '10px',
          }}
        />{' '}
        <Button
          text={t('Send OTP')}
          maxWidth
          justifyContent='center'
          onClick={() => ForgotIt()}
          token={tokens.FS16FW500LH21_86R}
          variant='blue'
          borderRadius='8px'
          style={{ height: '65px' }}
        />
      </DialogContent>
    </DialogWrapper>
  );
}
