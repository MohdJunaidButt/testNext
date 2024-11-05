import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { Text } from '@/components/Text';
import { colors, tokens } from '@/styles';
import { Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const APIError = () => {
  const router = useRouter();
  return (
    <ResponsiveContainer>
      <Stack
        my={3}
        spacing={2}
        height='600px'
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Image
          src={'/images/error/505.svg'}
          alt='server error'
          width={0}
          height={0}
          sizes='100%'
          style={{
            width: '100%',
            height: '350px',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
          priority
        />
        <Text
          text={'We applogize for the inconvenience. Please try again later.'}
          color={colors.black21}
          token={tokens.FS20FW800LH32_78EB}
          textAlign='left'
        />
        <Text
          text={'Try again?'}
          color={colors.black2D}
          token={tokens.FS16FW500LH18M}
          textAlign='left'
          cursor='pointer'
          redirect={router.pathname}
          styles={{ textDecoration: 'underline' }}
        />
      </Stack>
    </ResponsiveContainer>
  );
};

export default APIError;
