import { Text } from '@/components/Text';
import { colors, tokens } from '@/styles';
import { Box, SxProps, Theme } from '@mui/material';
import React from 'react';

const ComingSoonTag = ({ sx }: { sx?: SxProps<Theme> }) => {
  return (
    <>
      <Text
        text={'Coming Soon'}
        color={colors.whiteFF}
        token={tokens.FS11FW400LH18R}
        styles={{
          borderRadius: '10px',
          backgroundColor: colors.blueC2,
          paddingInline: '7px',
          position: 'absolute',
          top: -13,
          right: '-10px',
          fontSize: '6.5px',
          lineHeight: '14px',
          ...sx,
        }}
      />
    </>
  );
};

export default ComingSoonTag;
