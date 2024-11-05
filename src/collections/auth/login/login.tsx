import { GridContainer, ResponsiveCarousal, Text } from '@/components';
import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';
import AuthContentDisplayCard from '../commonComponents/AuthContentDisplayCard';
import LoginForm from '../loginForm/loginForm';

export default function Login() {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  return (
    <GridContainer
      styles={{
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <>
        {!isTab && (
          <Grid item md={5}>
            <Box
              sx={{
                backgroundImage: "url('/images/auth/login-bg.png')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: { xs: 'cover', md: '100vh' },
                width: '100%',
                height: { xs: '370px', sm: '550px', md: '100vh' },
                ...displayFlexAlignItemsCenterJustifyContentCenter,
              }}
            >
              <Box width={'80%'}>
                <ResponsiveCarousal
                  centerSlidePercentage={100}
                  showArrows={false}
                  indicatorCustomPlacementMargin='17px'
                  pillIndicator
                  altIndicatorTheme
                >
                  <Box
                    key={1}
                    width={'100%'}
                    marginBottom={isMobile ? '20px' : '40px'}
                  >
                    <AuthContentDisplayCard
                      image='/images/property/grouped/1.png'
                      title={t('View Listings')}
                      description={t(
                        'Beyond the Front Door: Discover Spaces That Inspire, Communities That Welcome, and the Perfect Place to Call Home'
                      )}
                      isMobile={isMobile}
                    />
                  </Box>
                  <Box
                    key={2}
                    min-width={'850px'}
                    marginBottom={isMobile ? '20px' : '40px'}
                  >
                    <Box
                      min-width={'850px'}
                      {...displayFlexAlignItemsCenterJustifyContentCenter}
                    >
                      <Image
                        src={'/icons/user-graphic.svg'}
                        alt='user'
                        height={isMobile ? '230px' : '348px'}
                        width='100%'
                      />
                    </Box>
                    <Text
                      text={t('View Agents')}
                      token={
                        isMobile
                          ? tokens.FS20FW800LH32_78EB
                          : tokens.FS32FW800LH43_71EB
                      }
                      color={colors.whiteFF}
                      styles={{ marginBottom: '10px' }}
                    />
                    <Text
                      text={t(
                        'From First Click to Final Key Turn: Navigating Your Path to the Perfect Home with Expertise, Ease, and Enthusiasm'
                      )}
                      token={
                        isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R
                      }
                      color={colors.greyDE}
                    />
                  </Box>
                </ResponsiveCarousal>
              </Box>
            </Box>
          </Grid>
        )}
        <Grid
          item
          xs={12}
          md={7}
          justifyContent={isMobile ? 'center' : 'flex-end'}
          sx={{
            height: '100%',
            overflowY: 'auto',
            zIndex: 22,
          }}
        >
          <LoginForm />
        </Grid>
        <Box position={'fixed'} top={0} right={0} zIndex={21}>
          <Image
            src='/icons/auth-graphics-1.svg'
            alt='auth-graphics'
            height='150px'
            width='130px'
          />
        </Box>
      </>
    </GridContainer>
  );
}
