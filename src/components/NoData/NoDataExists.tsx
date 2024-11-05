import Image from '@/components/Image/Image';
import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

interface Props extends BoxProps {
  imgSize?: { width: string; height: string };
  containerHeight?: string;
}

const NoDataExists = ({
  containerHeight = '150px',
  imgSize = { width: '85px', height: '85px' },
  ...otherProps
}: Props) => {
  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      {...flexDirection.column}
      height={containerHeight}
      gap={'10px'}
      sx={{ ...otherProps }}
    >
      <Image
        src='/icons/no-data.svg'
        alt='error-tick'
        width={imgSize.width}
        height={imgSize.height}
      />
      <Text
        text={'No Result Exists'}
        token={tokens.FS14FW500LH19R}
        color={colors.grey96}
        textAlign='left'
      />
    </Box>
  );
};

export default NoDataExists;
