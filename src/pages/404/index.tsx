import Button from '@/components/Button/Button';
import { colors, tokens } from '@/styles';
import { Box, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const Custom404 = () => {
  const router = useRouter();
  return (
    <Box height='100%' position='relative' minHeight='700px'>
      <Head>
        <title>404 - The Page can&apos;t be found</title>
      </Head>
      <Box
        position='absolute'
        top='50%'
        left='50%'
        sx={{
          transform: 'translate(-50%,-50%)',
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box
          position='relative'
          margin='0px auto 60px'
          zIndex={-1}
          sx={{ height: { xs: '148px', sm: '200px' } }}
        >
          <Typography
            variant='h1'
            component='span'
            sx={{
              fontFamily: "'Manrope-ExtraLight', sans-serif",
              fontSize: { xs: '86px', sm: '148px', md: '236px' },
              fontWeight: 200,
              textTransform: 'uppercase',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Oops!
          </Typography>
          <Typography
            variant='h2'
            component='span'
            sx={{
              fontFamily: "'Manrope-Regular', sans-serif",
              fontSize: { xs: '16px', sm: '28px' },
              fontWeight: 400,
              textTransform: 'uppercase',
              position: 'absolute',
              padding: '10px 5px',
              display: 'inline-block',
              background: colors.whiteFF,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            {`404 - The Page can't be found`}
          </Typography>
        </Box>

        <Button
          variant='black'
          onClick={() => router.replace('/')}
          text='Back to home'
          token={tokens.FS14FW500LH19R}
          justifyContent='center'
          icon={'/icons/arrow-right-white.svg'}
          iconAlt={'/icons/arrow-right-long-black.svg'}
          iconSize={{ width: 20, height: 20 }}
          style={{ height: '50px', marginInline: 'auto' }}
          borderRadius='45px'
          iconReverse={true}
        />
      </Box>
    </Box>
  );
};

export default Custom404;
