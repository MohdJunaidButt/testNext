import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, alpha } from '@mui/material';
import Image from '../Image/Image';
import { Text } from '../Text';
interface ToastProps {
  show: boolean;
  type: 'success' | 'fail';
  text: string;
}
export function Toast({ show, type, text }: ToastProps) {
  return (
    <Box
      boxShadow={'0px 15px 23px #00000005'}
      position={'fixed'}
      top={10}
      right={10}
      zIndex={100000000}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      bgcolor={colors.whiteFF}
      border={`1px solid #00000017`}
      borderRadius={'14px'}
      sx={{
        transform: `translateY(${show ? 0 : '20px'})`,
        transition: 'opacity 0.5s ease, transform 0.5s ease',
        opacity: show ? 1 : 0,
        height: { xs: '60px', md: '70px' },
        width: { xs: '95%', md: 'max-content' },
        marginInline: { xs: 'auto', sm: 'unset' },
        minWidth: { xs: 'unset', sm: '400px' },
        padding: { xs: '15px 30px', md: '25px 40px' },
        boxShadow: `${alpha(colors.blueC2, 0.3)} 0px 2px 8px 0px`,
        border: `1px solid ${colors.greyD931}`,
      }}
    >
      <Image
        src={
          type === 'success'
            ? '/icons/toast-success.svg'
            : '/icons/toast-fail.svg'
        }
        alt={type}
        height='23px'
        width='23px'
        style={{ marginRight: '15px' }}
      />
      <Text
        text={text}
        token={tokens.FS20FW400LH22_72R}
        color={colors.black21}
        styles={{
          fontSize: { xs: '16px', sm: '18px', md: '20px' },
        }}
      />
    </Box>
  );
}
