import Image from '@/components/Image/Image';
import { displayFlexAlignItemsCenterJustifyContentCenter } from '@/styles';
import Box from '@mui/material/Box';
import React from 'react';

const NoListingFound = () => {
  return (
    <Box {...displayFlexAlignItemsCenterJustifyContentCenter}>
      <Image
        src={'/images/property/no-property.svg'}
        alt='No Property Found'
        width={'170px'}
        height={'fit-content'}
        style={{
          marginInline: 'auto',
          width: { xs: '170px', sm: '190px', md: '220px' },
        }}
      />
    </Box>
  );
};

export default NoListingFound;
