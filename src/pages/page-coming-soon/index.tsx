import Button from '@/components/Button/Button';
import { colors, tokens } from '@/styles';
import { Box, Typography } from '@mui/material';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

const CondoPage: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{`Ubrealty | Coming Soon`}</title>
      </Head>
      <Box height='100%' position='relative' minHeight='700px'>
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
                fontSize: { xs: '86px', sm: '148px', md: '206px' },
                fontWeight: 200,
                textTransform: 'uppercase',
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                lineHeight: '0.9',
              }}
            >
              Coming Soon!
            </Typography>
            <Typography
              variant='h2'
              component='span'
              sx={{
                fontFamily: "'Manrope-Regular', sans-serif",
                fontSize: { xs: '12px', sm: '16px', md: '20px' },
                fontWeight: 400,
                textTransform: 'uppercase',
                position: 'absolute',
                padding: '10px 5px',
                display: 'inline-block',
                background: colors.whiteFF,
                left: 0,
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                // bottom: 0,
                zIndex: 22,
              }}
            >
              Something extraordinary is brewing. Stay tuned...
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CondoPage;
