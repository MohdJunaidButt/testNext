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
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
interface FailedEmailVerificationModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
}
export default function FailedEmailVerificationModal({
  isOpen,
  handleClose,
  handleSubmit,
}: FailedEmailVerificationModalProps) {
  const router = useRouter();
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

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
            src='/icons/error-cross.svg'
            alt='error-tick'
            width='73px'
            height='73px'
          />
          <Text
            text={t('Verification Failed!')}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              marginTop: isMobile ? '16px' : '43px',
              marginBottom: '14px',
              fontSize: '20px',
            }}
          />
          <Text
            text={t('Your email Failed to verified. please try again')}
            token={tokens.FS16FW500LH18M}
            color={colors.grey96}
            styles={{ width: '80%', margin: 'auto' }}
          />
        </Box>
        <Button
          text={t('Try Again')}
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
