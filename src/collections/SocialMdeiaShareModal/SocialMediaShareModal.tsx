import { Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { colors, tokens } from '@/styles';
import {
  Box,
  DialogContent,
  IconButton,
  Paper,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  RedditIcon,
  RedditShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  description: string;
}

interface FormDataProps {
  email: string;
  password: string;
}

export default function SocialShareModal({
  isOpen,
  handleClose,
  description,
}: ModalProps) {
  const { slug } = useRouter().query;
  const shareUrl = window.location.href;
  const title =
    typeof document !== 'undefined'
      ? document.title
      : 'Check out this awesome content!';

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };
  const copyClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        appToast.setToast('Link copied to clipboard', {
          ...ToastLikeConfig,
        });
      })
      .catch((err) => {
        appToast.setToast(`Failed to copied, ${err}`, {
          ...ToastLikeConfig,
        });
      });
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
            text='Share'
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              marginBottom: { xs: '15px', sm: '30px' },
              fontSize: '20px',
            }}
          />
          <Stack justifyContent={'center'} direction='row' spacing={'15px'}>
            <FacebookShareButton
              url={shareUrl}
              title={`${description} : Check this amazing listing of ubrealty`}
            >
              <FacebookIcon size={60} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={`${description} : Check this amazing listing of ubrealty`}
            >
              <TwitterIcon size={60} round={true} />
            </TwitterShareButton>
            <RedditShareButton
              url={shareUrl}
              title={`${description} : Check this amazing listing of ubrealty`}
            >
              <RedditIcon size={60} round={true} />
            </RedditShareButton>
            <EmailShareButton
              url={shareUrl}
              title={`${description} : Check this amazing listing of ubrealty`}
            >
              <EmailIcon size={60} round={true} />
            </EmailShareButton>
          </Stack>
          <TextInputWithBorder
            label=''
            onChange={() => {}}
            placeholder='link'
            borderRadius='10px'
            styles={{ marginTop: '20px' }}
            size={'small'}
            value={shareUrl}
            isReadOnly={true}
            endIcon={
              <Button
                variant='black'
                onClick={copyClipboard}
                token={tokens.FS16FW500LH18M}
                text='Copy'
                justifyContent='center'
                borderRadius='8px'
                lowPadding
                style={{
                  padding: '5px 10px',
                  ...tokens.FS13FW500LH18R,
                }}
              />
            }
          />
        </DialogContent>
      </DialogWrapper>
    </>
  );
}

const SocialIconItem = ({
  icon,
  handleClick,
  alt,
}: {
  icon: string;
  alt: string;
  handleClick?: () => void;
}) => {
  return (
    <IconButton
      sx={{
        backgroundColor: colors.greyF6,
        '&:hover': {
          backgroundColor: colors.greyEC,
        },
        padding: '20px',
      }}
    >
      <Image src={icon} alt={alt} width={30} height={30} />
    </IconButton>
  );
};
