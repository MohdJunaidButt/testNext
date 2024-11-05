import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface PropertyCardFooterProps {
  totalFloors: number;
  availableFloors: number;
  unavailableFloors: number;
}

const PropertyCardFooter = ({
  totalFloors,
  availableFloors,
  unavailableFloors,
}: PropertyCardFooterProps) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      spacing={'7px'}
      justifyContent={'space-between'}
    >
      <Stack direction={'row'} spacing={'3px'} alignItems={'baseline'}>
        <Image
          src={'/icons/floors.png'}
          alt='stairs'
          style={{ marginRight: '4px' }}
          width={10}
          height={10}
        />
        <Text
          text={`${totalFloors} Floors`}
          color={colors.grey96}
          token={tokens.FS12FW400LH18R}
          cursor='pointer'
          styles={{ whiteSpace: 'nowrap' }}
        />
      </Stack>
      <Stack direction={'row'} spacing={'3px'} alignItems={'baseline'}>
        <Image
          src={'/icons/bluedot.svg'}
          alt='blue-dot'
          style={{ marginRight: '4px' }}
          width={10}
          height={10}
        />
        <Text
          text={`${availableFloors} available`}
          color={colors.grey96}
          token={tokens.FS12FW400LH18R}
          cursor='pointer'
          styles={{ whiteSpace: 'nowrap' }}
        />
      </Stack>
      <Stack direction={'row'} spacing={'3px'} alignItems={'baseline'}>
        <Image
          src={'/icons/greydot.svg'}
          alt='grey-dot'
          style={{ marginRight: '4px' }}
          width={10}
          height={10}
        />
        <Text
          text={`${unavailableFloors} unavailable`}
          color={colors.grey96}
          token={tokens.FS12FW400LH18R}
          cursor='pointer'
          styles={{ whiteSpace: 'nowrap' }}
        />
      </Stack>
    </Stack>
  );
};

export default PropertyCardFooter;
