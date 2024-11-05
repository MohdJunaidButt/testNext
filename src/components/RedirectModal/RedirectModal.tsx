import { Text } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import Image from '@/components/Image/Image';
import { colors, tokens } from '@/styles';
import { DialogContent, DialogTitle, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const RedirectModal = ({
  open,
  toggleDialog,
}: {
  open: boolean;
  toggleDialog: () => void;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <DialogWrapper maxWidth='xs' fullWidth open={open} onClose={toggleDialog}>
      <DialogContent style={{ padding: '20px', position: 'relative' }}>
        <Stack
          alignItems={'end'}
          sx={{ position: 'absolute', top: 10, right: 10 }}
        >
          <DialogCloseButton toggleClose={toggleDialog} />
        </Stack>
        <Stack
          direction='row'
          spacing={1}
          mb={3}
          alignItems={'center'}
          justifyContent='center'
        >
          <Image
            width='25px'
            height='25px'
            alt='icon'
            src={'/icons/lock-blue.svg'}
            style={{ marginInline: 'auto' }}
          />
          <Text
            text={t('Login is Required')}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              fontSize: '20px',
              mb: 3,
            }}
          />
        </Stack>
        <Text
          text={t(`You're required to login to have access to the content`)}
          token={tokens.FS16FW500LH21_86R}
          color={colors.black21}
        />
        <Stack direction='row' spacing={2} width='100%' mt={3}>
          <Button
            text={t('Login')}
            justifyContent='center'
            onClick={() => {
              router.push(
                `/auth/login?redirect=${encodeURIComponent(router.asPath)}`
              );
            }}
            token={tokens.FS16FW500LH21_86R}
            variant={'blue'}
            borderRadius='8px'
            maxWidth
            style={{ height: '55px' }}
          />
          <Button
            text={t('Signup')}
            justifyContent='center'
            onClick={() => {
              router.push(
                `/auth/signup?redirect=${encodeURIComponent(router.asPath)}`
              );
            }}
            token={tokens.FS16FW500LH21_86R}
            variant={'black'}
            borderRadius='8px'
            maxWidth
            style={{ height: '55px' }}
          />
        </Stack>
      </DialogContent>
    </DialogWrapper>
  );
};

export default RedirectModal;
