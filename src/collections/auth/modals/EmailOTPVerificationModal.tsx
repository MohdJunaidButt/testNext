import { Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import {
  Box,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
interface EmailOTPVerificationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: (otp: string) => void;
  emailRecipient: string;
  handleOTPChange: (OTP: string) => void;
  OTPValue: string;
}
export default function EmailOTPVerificationModal({
  isOpen,
  handleClose,
  handleSubmit,
  emailRecipient,
  handleOTPChange,
  OTPValue,
}: EmailOTPVerificationModalProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [otp, setOtp] = useState('');

  return (
    <DialogWrapper open={isOpen} onClose={() => handleClose()}>
      <DialogTitle
        sx={{
          padding: isMobile ? '19px' : '21px 27px',
          ...displayFlexAlignItemsCenterJustifyContentSpaceBetween,
          gap: '10px',
          alignItems: 'start',
        }}
      >
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          {...flexDirection.column}
          gap={isMobile ? '7px' : '14px'}
          alignItems='start'
        >
          <Text
            text={t('Email Confirmation')}
            token={
              isMobile ? tokens.FS16FW600LH21_86R : tokens.FS24FW800LH32_78EB
            }
            color={colors.black21}
            textAlign='left'
          />{' '}
          <Text
            text={`${t('An email has been sent on ')}${emailRecipient}. ${t(
              'Please enter the code sent to you on your email!'
            )}`}
            token={isMobile ? tokens.FS12FW500LH18M : tokens.FS16FW500LH18M}
            color={colors.grey96}
            textAlign='left'
          />
        </Box>
        <DialogCloseButton toggleClose={handleClose} />
      </DialogTitle>
      <DialogContent sx={{ padding: '10px' }}>
        <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            marginBottom={'80px'}
            marginTop={'80px'}
            width={'70%'}
          >
            <TextInputWithBorder
              label=''
              placeholder=''
              onChange={(value: string) => {
                setOtp(value);
              }}
              borderRadius='8px'
              width={isMobile ? '36px' : '64px'}
              height={isMobile ? '36px' : '64px'}
              styles={{
                bgcolor: colors.greyF6,
                border: 'none',
              }}
              allowSingleInput
              inputStyleToken={
                isMobile ? tokens.FS20FW500LH22_72SB : tokens.FS32FW500LH43_71SB
              }
            />
            <TextInputWithBorder
              label=''
              placeholder=''
              onChange={(value: string) => setOtp(otp + value)}
              borderRadius='8px'
              width={isMobile ? '36px' : '64px'}
              height={isMobile ? '36px' : '64px'}
              styles={{
                bgcolor: colors.greyF6,
                border: 'none',
              }}
              allowSingleInput
              inputStyleToken={
                isMobile ? tokens.FS20FW500LH22_72SB : tokens.FS32FW500LH43_71SB
              }
            />
            <TextInputWithBorder
              label=''
              placeholder=''
              onChange={(value: string) => setOtp(otp + value)}
              borderRadius='8px'
              width={isMobile ? '36px' : '64px'}
              height={isMobile ? '36px' : '64px'}
              styles={{
                bgcolor: colors.greyF6,
                border: 'none',
              }}
              allowSingleInput
              inputStyleToken={
                isMobile ? tokens.FS20FW500LH22_72SB : tokens.FS32FW500LH43_71SB
              }
            />
            <TextInputWithBorder
              label=''
              placeholder=''
              onChange={(value: string) => setOtp(otp + value)}
              borderRadius='8px'
              width={isMobile ? '36px' : '64px'}
              height={isMobile ? '36px' : '64px'}
              styles={{
                bgcolor: colors.greyF6,
                border: 'none',
              }}
              allowSingleInput
              inputStyleToken={
                isMobile ? tokens.FS20FW500LH22_72SB : tokens.FS32FW500LH43_71SB
              }
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: colors.greyF6,
          padding: isMobile ? '15px 19px' : '27px',
        }}
      >
        <Button
          text={t('Cancel')}
          justifyContent='center'
          onClick={() => handleClose()}
          token={tokens.FS16FW500LH21_86R}
          variant='grey'
          borderRadius='7px'
          width='150px'
          style={{ height: isMobile ? '44px' : '52px' }}
        />
        <Button
          text={t('Verify')}
          justifyContent='center'
          onClick={() => handleSubmit(otp)}
          token={tokens.FS16FW500LH21_86R}
          variant='blue'
          borderRadius='7px'
          width='150px'
          style={{ height: isMobile ? '44px' : '52px' }}
        />
      </DialogActions>
    </DialogWrapper>
  );
}
