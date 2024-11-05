// components/ProtectedRoute.js
import { Text } from '@/components';
import { APP_NAV_LINKS } from '@/resources';
import { RootState } from '@/store';
import { colors, tokens } from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
const ProtectedRoute = ({ children }: any | ReactElement<any, any>) => {
  const router = useRouter();
  const { isAuthenticating, user } = useSelector(
    (state: RootState) => state.Auth
  );
  // const userIsAuthenticated = localStorage.getItem('token'); // Replace with your authentication logic
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  useEffect(() => {
    // Check the user's authentication and authorization status here
    if (!user) {
      // Redirect the user to the login or error page
      router.replace(
        `${APP_NAV_LINKS.login.linkTo}?redirect=${encodeURIComponent(
          router.asPath
        )}`
      ); // Replace with your desired route
    }
  }, []);

  if (isAuthenticating)
    return (
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={'/logo/ubrealty.svg'}
          alt='ubrealty'
          width={0}
          height={0}
          sizes='100%'
          style={{ width: '100%', height: '100%', maxWidth: '240px' }}
        />
      </Box>
    );
  if (user) {
    return <>{children}</>;
  } else {
    return (
      <Text
        text='Please login'
        token={isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B}
        color={colors.black21}
      />
    );
  }
};

export default ProtectedRoute;
