import { Text } from '@/components';
import { Box, useMediaQuery } from '@mui/material';

import { colors, tokens } from '@/styles';

export default function SoldComparableNear() {
  const isXL = useMediaQuery((theme: any) => theme.breakpoints.down('xl'));
  const isLG = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmMob = useMediaQuery('(min-width:465px) and (max-width: 600px)');
  const isXsMob = useMediaQuery('(min-width:0px) and (max-width: 465px)');

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text="Sold comparable near John's house"
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? '16px' : '18px',
          marginBottom: isMobile ? '10px' : '15px',
        }}
        color={colors.black21}
        textAlign='left'
      />
    </Box>
  );
}
