import { Text } from '@/components';
import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box } from '@mui/material';

interface AuthContentDisplayCardProps {
  image: string;
  title: string;
  description: string;
  style?: React.CSSProperties;
  isMobile?: boolean;
}

export default function AuthContentDisplayCard({
  description,
  image,
  title,
  style,
  isMobile,
}: AuthContentDisplayCardProps) {
  return (
    <Box
      style={style}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      flexDirection={'column'}
    >
      <Image
        src='/images/auth/group-properties.svg'
        alt='group-properties'
        height={isMobile ? '230px' : '348px'}
        width='100%'
      />

      <Text
        text={title}
        token={isMobile ? tokens.FS20FW800LH32_78EB : tokens.FS32FW800LH43_71EB}
        color={colors.whiteFF}
        styles={{ marginBottom: '10px' }}
      />
      <Text
        text={description}
        token={isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
        color={colors.greyDE}
      />
    </Box>
  );
}
