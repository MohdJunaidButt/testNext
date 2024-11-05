import { Text } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
interface SuccessEmailVerificationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}
export default function SuccessEmailVerificationModal({
  isOpen,
  handleClose,
  handleSubmit,
}: SuccessEmailVerificationModalProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const router = useRouter();
  return (
    <DialogWrapper
      maxWidth={'xs'}
      fullWidth={true}
      open={isOpen}
      onClose={() => handleClose()}
    >
      <DialogTitle
        sx={{
          padding: isMobile ? '15px' : '20px 27px',
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        <DialogCloseButton toggleClose={handleClose} />
      </DialogTitle>
      <DialogContent style={{ padding: isMobile ? '0px 15px 15px' : '27px' }}>
        <Box
          width={'100%'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          flexDirection={'column'}
          marginBottom={isMobile ? '27px' : '65px'}
        >
          <Image
            src='/icons/success-tick.svg'
            alt='success-tick'
            width='73px'
            height='73px'
          />
          <Text
            text={t('Successfully Verified!')}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              marginTop: isMobile ? '16px' : '43px',
              marginBottom: '14px',
              fontSize: '20px',
            }}
          />
          <Text
            text={t(
              'Your email was successfully verified. Press continue to login'
            )}
            token={tokens.FS16FW500LH18M}
            color={colors.grey96}
            styles={{ width: '80%', margin: 'auto' }}
          />
        </Box>
        <Button
          text={t('Continue')}
          justifyContent='center'
          onClick={() => {
            handleSubmit();
          }}
          token={tokens.FS16FW500LH21_86R}
          variant='blue'
          borderRadius='8px'
          maxWidth
          style={{ height: '65px', marginBottom: '10px' }}
        />
        <Button
          text={t('Go to home page')}
          justifyContent='center'
          onClick={() => {
            handleClose();
            router.push('/');
          }}
          token={tokens.FS16FW500LH21_86R}
          variant='grey'
          borderRadius='8px'
          maxWidth
          style={{ height: '65px' }}
        />
      </DialogContent>
    </DialogWrapper>
  );
}
