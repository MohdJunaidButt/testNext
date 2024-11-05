import { Text } from '@/components';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';

interface KeyFactsTileProps {
  style?: React.CSSProperties;
  description: string;
  title: string;
  image: string;
}

export default function KeyFactsTile({
  style,
  description,
  image,
  title,
}: KeyFactsTileProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <Box
      width={'100%'}
      borderRadius={'8px'}
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
      alignItems={isMobile ? 'baseline' : 'flex-start'}
      padding={'15px 15px'}
      style={style}
      flexDirection={'column'}
      bgcolor={colors.greyC0}
      height='100%'
    >
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        marginBottom={'20px'}
        gap={'10px'}
        alignItems='stretch'
      >
        <Box
          height={isMobile ? '12px' : '15px'}
          width={isMobile ? '12px' : '15px'}
        >
          <Image
            src={image}
            alt='image'
            width={0}
            height={0}
            sizes='100%'
            style={{ width: '100%', height: '100%' }}
          />
        </Box>
        <Text
          text={title}
          token={isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R}
          color={colors.black21}
          textAlign='left'
        />
      </Box>
      <Text
        text={description}
        token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW400LH18R}
        color={colors.black21}
        textAlign='left'
      />
    </Box>
  );
}
