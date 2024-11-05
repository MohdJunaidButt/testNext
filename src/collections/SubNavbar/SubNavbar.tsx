import SearchWithSuggestions from '@/collections/CustomMap/SearchableMap/SearchWithSuggestions';
import { GridContainer, Text } from '@/components';
import ComingSoonTag from '@/components/ComingSoonTag/ComingSoon';
import Logo from '@/components/Logo/Logo';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { APP_NAV_LINKS } from '@/resources';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import {
  Box,
  Grid,
  Menu,
  MenuItem,
  Stack,
  alpha,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function SubNavBar({ locale }: any) {
  const { t } = useTranslation('common');

  const [navLinks] = useState<
    {
      linkTo: string;
      linkName: string;
      showIsComing: boolean;
      isPrivate: boolean;
    }[]
  >([
    APP_NAV_LINKS.comingSoon,
    APP_NAV_LINKS.condos,
    APP_NAV_LINKS.houses,
    APP_NAV_LINKS.preConstruction,
    APP_NAV_LINKS.compareProps,
    APP_NAV_LINKS.resale,
    APP_NAV_LINKS.rent,
  ]);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => event && setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const router = useRouter();
  const pathName = router.pathname;

  // useEffect(() => {
  //   let navData = [...returnLocalNavlinks(selectedLanguage)];
  //   setNavlinks(
  //     navData as Array<{
  //       linkTo: string;
  //       linkName: string;
  //       showComingTag: false;
  //     }>
  //   );
  // }, [locale, selectedLanguage]);

  useEffect(() => {
    const handleScroll = () => {
      let subNavbar = document.getElementById('subNavbar');
      if (subNavbar) {
        if (window.scrollY >= 50) {
          subNavbar.style.position = 'fixed';
          subNavbar.style.top = '0';
          subNavbar.style.width = '100%';
          subNavbar.style.background = colors.whiteFF;
        } else {
          subNavbar.style.background = alpha(colors.whiteFF, 0.6);
          subNavbar.style.position = 'relative';
          subNavbar.style.top = 'auto';
          subNavbar.style.width = 'auto';
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  return (
    <>
      {!isMobile && (
        <Box
          id='subNavbar'
          paddingY={'10px'}
          className={'navbarIndex-500'}
          position={'relative'}
          bgcolor={alpha(colors.whiteFF, 0.6)}
          sx={{
            transition: 'top 0.3s ease',
            borderBottom: `1px solid ${colors.greyDE}`,
          }}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
        >
          <ResponsiveContainer>
            <GridContainer justifyContent={'space-between'}>
              <>
                <Grid item xs={3} lg={9}>
                  <Box
                    width={'100%'}
                    height={'100%'}
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                    gap={2}
                    justifyContent={'start'}
                    paddingRight={'15px'}
                  >
                    <Logo />
                    <Stack
                      direction='row'
                      alignItems='center'
                      sx={{
                        gap: '16px',
                      }}
                      ml={'15px'}
                    >
                      {(isDesktop ? navLinks.slice(0, 4) : navLinks).map(
                        (link, idx) => {
                          return (
                            <Box
                              key={`${link.linkTo}-${idx}`}
                              position='relative'
                            >
                              <Text
                                redirect={
                                  !link.showIsComing ? link.linkTo : undefined
                                }
                                cursor='pointer'
                                text={t(link.linkName)}
                                color={
                                  pathName.includes(link.linkTo) &&
                                  !link.showIsComing
                                    ? colors.blueC2
                                    : colors.black21
                                }
                                token={
                                  isDesktop
                                    ? tokens.FS14FW600LH16SB
                                    : tokens.FS16FW600LH21_86R
                                }
                                styles={{ whiteSpace: 'nowrap' }}
                              />
                              {link.showIsComing && <ComingSoonTag />}
                            </Box>
                          );
                        }
                      )}
                      {isDesktop && (
                        <Fragment>
                          <Stack
                            direction='row'
                            alignItems='center'
                            spacing={0.75}
                            onClick={handleClick}
                            sx={{
                              '&, &:*': {
                                cursor: 'pointer',
                              },
                            }}
                          >
                            <Text
                              cursor='pointer'
                              text={'More'}
                              color={colors.black21}
                              token={
                                isDesktop
                                  ? tokens.FS14FW600LH16SB
                                  : tokens.FS16FW600LH21_86R
                              }
                              styles={{ whiteSpace: 'nowrap' }}
                            />
                            <Image
                              src={
                                Boolean(anchorEl)
                                  ? '/icons/chevron-up.svg'
                                  : '/icons/chevron-down.svg'
                              }
                              alt='upload'
                              width={10}
                              height={10}
                              sizes={'100%'}
                            />
                          </Stack>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            autoFocus={false}
                            sx={{
                              marginTop: '10px',
                              '& .MuiPaper-root': {
                                borderRadius: '10px',
                                boxShadow:
                                  '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
                                border: `1px solid ${colors.greyE1}`,
                              },
                            }}
                            transformOrigin={{
                              horizontal: 'left',
                              vertical: 'top',
                            }}
                            anchorOrigin={{
                              horizontal: 'left',
                              vertical: 'bottom',
                            }}
                            elevation={0}
                          >
                            {[
                              APP_NAV_LINKS.compareProps,
                              APP_NAV_LINKS.resale,
                              APP_NAV_LINKS.rent,
                            ].map((link, idx, arr) => {
                              return (
                                <MenuItem
                                  key={`${link.linkTo}-${idx}`}
                                  onClick={() => {
                                    handleClose();
                                    router.push(link.linkTo);
                                  }}
                                >
                                  <Text
                                    redirect={
                                      !link.showIsComing
                                        ? link.linkTo
                                        : undefined
                                    }
                                    cursor='pointer'
                                    text={link.linkName}
                                    color={
                                      pathName.includes(link.linkTo) &&
                                      !link.showIsComing
                                        ? colors.blueC2
                                        : colors.black21
                                    }
                                    token={
                                      isDesktop
                                        ? tokens.FS14FW600LH16SB
                                        : tokens.FS16FW600LH21_86R
                                    }
                                    styles={{
                                      whiteSpace: 'nowrap',
                                      marginRight: '7px',
                                    }}
                                  />
                                  {link.showIsComing && (
                                    <ComingSoonTag
                                      sx={{
                                        position: 'relative',
                                        inset: 0,
                                      }}
                                    />
                                  )}
                                </MenuItem>
                              );
                            })}
                          </Menu>
                        </Fragment>
                      )}
                    </Stack>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={4}
                  lg={3}
                  {...displayFlexAlignItemsCenterJustifyContentFlexEnd}
                >
                  <SearchWithSuggestions
                    width={isMobile ? 'fit-content' : '270px'}
                    handleSelectedProperty={({
                      label,
                      type,
                      slug,
                    }: {
                      label: string;
                      type: string;
                      slug: string;
                      propertyType: string | null;
                    }) => {
                      if (type === 'title') router.replace(`/property/${slug}`);
                      else router.replace(`/condos?${type}=${label}`);
                    }}
                    handleClearSearch={() => {}}
                    searchUrl='/properties/homepage-navbar1/'
                    barVer='navSearch'
                  />
                </Grid>
              </>
            </GridContainer>
          </ResponsiveContainer>
        </Box>
      )}
    </>
  );
}

// const returnLocalNavlinks = (locale: string) => {
//   switch (locale) {
//     case 'en': {
//       return SUB_NAV_LINKS_EN;
//     }
//     case 'es': {
//       return SUB_NAV_LINKS_ES;
//     }
//     default: {
//       return SUB_NAV_LINKS_EN;
//     }
//   }
// };
