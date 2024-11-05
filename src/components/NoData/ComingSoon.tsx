import Image from '@/components/Image/Image';
import {
  displayFlexAlignItemsCenterJustifyContentCenter,
  flexDirection,
} from '@/styles';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

interface Props extends BoxProps {
  imgSize?: { width: string; height: string };
  containerHeight?: string;
}

const ComingSoonData = ({
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
        src='/images/app/comingsoon.png'
        alt='coming soon'
        width={imgSize.width}
        height={imgSize.height}
      />
    </Box>
  );
};

export default ComingSoonData;
