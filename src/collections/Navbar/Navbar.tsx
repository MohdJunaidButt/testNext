import { Text } from '@/components';
import Button from '@/components/Button/Button';
import ComingSoonTag from '@/components/ComingSoonTag/ComingSoon';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  APP_NAV_LINKS,
  NAV_LINKS_EN,
  NAV_LINKS_ES,
  NAV_LINKS_FR,
} from '@/resources';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  AccordionProps,
  AccordionSummaryProps,
  Box,
  CircularProgress,
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionSummary as MuiAccordionSummary,
  Stack,
  SwipeableDrawer,
  alpha,
  styled,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
import CurrencyConverter from '@/collections/CurrencyConverter/CurrencyConverter';
import LangTrans from '@/collections/LanguageTrans/LangTrans';
import NotificationSummaryManager from '@/collections/NotificationSummaryManager/NotificationSummaryManager';
import Logo from '@/components/Logo/Logo';
import { RootState } from '@/store';
import { authFailed, updateCurrency } from '@/store/slices';
import { currencyList, languages } from '@/utils/appInfo';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import AvatarWithMenu from '../AvatarWithMenu/AvatarWithMenu';

const filterUniqueObjects = (arr: any, prop: string) => {
  const uniqueMap = new Map();

  for (const item of arr) {
    const key = item[prop];
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  }

  return [...uniqueMap.values()];
};

export default function NavBar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, isAuthenticating } = useSelector(
    (state: RootState) => state.Auth
  );

  const { currency } = useSelector((state: RootState) => state.Auth);

  const { t, i18n } = useTranslation();
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const [navLinks] = useState<
    { linkTo: string; linkName: string; showIsComing: false }[]
  >(filterUniqueObjects([...NAV_LINKS_EN], 'linkName'));

  const [showDrawer, setShowDrawer] = useState(false);

  const toggleDrawer = () => setShowDrawer(!showDrawer);

  useEffect(() => {
    const handleScroll = () => {
      let subNavbar = document.getElementById('navbar');
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
    if (!isTab) return;
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (showDrawer) document.body.classList.add('no-scroll');
    else document.body.classList.remove('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showDrawer]);

  const renderMenuPanel = () => {
    return (
      <Box
        height={'100%'}
        sx={{
          overflowY: 'auto',
        }}
      >
        <Stack
          direction='row'
          alignItems={'center'}
          spacing={'5px'}
          justifyContent={'space-between'}
          p={'13px 15px'}
          sx={{
            boxShadow: '0px 4px 18px 0px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Logo width='100px' />
        </Stack>
        <Stack mt={1.5} p={'10px 15px'} spacing={1}>
          {/* <Stack
            direction='row'
            justifyContent={'space-between'}
            alignItems={'center'}
            mb={3}
          >
            <CurrencyConverter />
            <LangTrans />
          </Stack> */}
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              aria-controls='panel1d-content'
              id='panel1d-header'
            >
              <Text
                text={t('Listings')}
                color={colors.black21}
                token={tokens.FS20FW600LH22_72SB}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  textDecoration: 'underline',
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              {[
                APP_NAV_LINKS.comingSoon,
                APP_NAV_LINKS.condos,
                APP_NAV_LINKS.houses,
                APP_NAV_LINKS.preConstruction,
                APP_NAV_LINKS.compareProps,
              ].map((el, idx, arr) => (
                <Text
                  key={`${el.linkTo}-${idx}`}
                  text={t(el.linkName)}
                  color={colors.black21Light}
                  token={tokens.FS20FW600LH22_72SB}
                  redirect={el.linkTo}
                  handleClick={() => toggleDrawer()}
                  textAlign='left'
                  styles={{
                    fontSize: '15px',
                    ...(idx !== arr.length - 1 && { marginBottom: '10px' }),
                  }}
                />
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              aria-controls='panel1d-content'
              id='panel1d-header'
            >
              <Text
                text={'Other Pages'}
                color={colors.black21}
                token={tokens.FS20FW600LH22_72SB}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  textDecoration: 'underline',
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              {[
                APP_NAV_LINKS.agents,
                APP_NAV_LINKS.developers,
                APP_NAV_LINKS.browseMap,
              ].map((el, idx, arr) => (
                <Text
                  key={`${el.linkTo}-${idx}`}
                  text={t(el.linkName)}
                  color={colors.black21Light}
                  token={tokens.FS20FW600LH22_72SB}
                  redirect={el.linkTo}
                  handleClick={() => toggleDrawer()}
                  textAlign='left'
                  styles={{
                    fontSize: '15px',
                    marginBottom: '10px',
                  }}
                />
              ))}
              {[
                APP_NAV_LINKS.marketTrends,
                APP_NAV_LINKS.resale,
                APP_NAV_LINKS.rent,
              ].map((el, idx, arr) => (
                <Stack
                  key={`${el.linkTo}-${idx}`}
                  mb={idx !== arr.length - 1 ? '10px' : 0}
                  direction={'row'}
                  spacing={'20px'}
                  alignItems='center'
                >
                  <Text
                    text={t(el.linkName)}
                    color={colors.black21Light}
                    token={tokens.FS20FW600LH22_72SB}
                    textAlign='left'
                    styles={{
                      fontSize: '15px',
                    }}
                  />
                  <ComingSoonTag
                    sx={{
                      position: 'relative',
                      inset: 0,
                      fontSize: '8px',
                      padding: '2px 8px',
                    }}
                  />
                </Stack>
              ))}
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              aria-controls='panel1d-content'
              id='panel1d-header'
            >
              <Text
                text={'Site Pages'}
                color={colors.black21}
                token={tokens.FS20FW600LH22_72SB}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  textDecoration: 'underline',
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                mb={'10px'}
                direction={'row'}
                spacing={'20px'}
                alignItems='center'
              >
                <Text
                  text={'About Us'}
                  color={colors.black21Light}
                  token={tokens.FS20FW600LH22_72SB}
                  textAlign='left'
                  styles={{
                    fontSize: '15px',
                  }}
                />
                <ComingSoonTag
                  sx={{
                    position: 'relative',
                    inset: 0,
                    fontSize: '8px',
                    padding: '2px 8px',
                  }}
                />
              </Stack>
              <Text
                text={'Contact Us'}
                color={colors.black21Light}
                token={tokens.FS20FW600LH22_72SB}
                redirect={'/contact-us'}
                handleClick={() => toggleDrawer()}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  marginBottom: '10px',
                }}
              />
              <Text
                text={'Privacy Policy'}
                color={colors.black21Light}
                token={tokens.FS20FW600LH22_72SB}
                redirect={'/privacy-policy'}
                handleClick={() => toggleDrawer()}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  marginBottom: '10px',
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary aria-controls='lang-content' id='lang-header'>
              <Text
                text={
                  languages
                    .find((el) => el.value === i18n.language)
                    ?.label?.split('-')[1]
                }
                color={colors.black21}
                token={tokens.FS20FW600LH22_72SB}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  textDecoration: 'underline',
                  textTransform: 'capitalize',
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              <Text
                text={'English'}
                color={colors.black21Light}
                token={tokens.FS20FW600LH22_72SB}
                handleClick={changeLanguage('eng')}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  marginBottom: '10px',
                }}
              />
              <Text
                text={'French'}
                color={colors.black21Light}
                token={tokens.FS20FW600LH22_72SB}
                handleClick={changeLanguage('fr')}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  marginBottom: '10px',
                }}
              />
              <Text
                text={'Mandarin'}
                color={colors.black21Light}
                token={tokens.FS20FW600LH22_72SB}
                handleClick={changeLanguage('zh')}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  marginBottom: '10px',
                }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded={true}>
            <AccordionSummary aria-controls='curr-content' id='curr-header'>
              <Text
                text={
                  currencyList.find((el) => el.value === currency.label)?.label
                }
                color={colors.black21}
                token={tokens.FS20FW600LH22_72SB}
                textAlign='left'
                styles={{
                  fontSize: '15px',
                  textDecoration: 'underline',
                }}
              />
            </AccordionSummary>
            <AccordionDetails>
              {currencyList.map((el) => (
                <Text
                  key={el.id}
                  text={el.label}
                  color={colors.black21Light}
                  token={tokens.FS20FW600LH22_72SB}
                  handleClick={handleCurrencyChange(el.value)}
                  textAlign='left'
                  styles={{
                    fontSize: '15px',
                    marginBottom: '10px',
                  }}
                />
              ))}
            </AccordionDetails>
          </Accordion>

          {user ? (
            <Button
              text='Logout'
              onClick={() => {
                localStorage.removeItem('token');
                dispatch(authFailed());
                toggleDrawer();
                // router.push('/');
              }}
              variant='black'
              justifyContent='center'
              token={tokens.FS12FW600LH16SG}
              style={{
                width: '100%',
                marginTop: '30px',
                height: '40px',
              }}
            />
          ) : (
            <Fragment>
              <Button
                text='Login'
                onClick={() => {
                  router.push('/auth/login');
                }}
                variant='black'
                justifyContent='center'
                token={tokens.FS12FW600LH16SG}
                style={{
                  width: '100%',
                  marginTop: '30px',
                  height: '40px',
                }}
              />
            </Fragment>
          )}
        </Stack>
      </Box>
    );
  };

  const renderNavContent = (
    <>
      {isTab ? (
        <Fragment>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            gap={'15px'}
          >
            <Logo width={isTab ? '110px' : '120px'} />
            <Stack direction='row' alignItems={'center'} spacing={'10px'}>
              {user && <AvatarWithMenu />}
              <Box
                width={'20px'}
                onClick={toggleDrawer}
                display='flex'
                alignItems='center'
              >
                <Image
                  src={'/icons/burger.svg'}
                  alt='burger'
                  width={0}
                  height={0}
                  sizes='100%'
                  style={{ width: '100%', height: '100%' }}
                />
              </Box>
            </Stack>
          </Box>
          {/* {!router.pathname.includes('browse-map') && (
            <BottomNavbar locale={locale} isLoggedIn={isLoggedIn} />
          )} */}
        </Fragment>
      ) : (
        <Stack
          direction={'row'}
          alignItems={'center'}
          justifyContent={
            router.pathname.includes('browse-map') || isTab
              ? 'space-between'
              : 'flex-end'
          }
          width={'100%'}
          spacing={'16px'}
        >
          {(router.pathname.includes('browse-map') || isTab) && (
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              gap={'15px'}
              justifyContent='flex-start'
            >
              <Logo width='115px' />
            </Box>
          )}
          {isTab ? (
            <Box
              width={'20px'}
              marginRight={'5px'}
              onClick={toggleDrawer}
              display='flex'
              alignItems='center'
            >
              <Image
                src={'/icons/burger.svg'}
                alt='burger'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
          ) : (
            <Stack
              direction='row'
              alignItems='stretch'
              spacing={'16px'}
              height='100%'
              justifyContent={'flex-end'}
            >
              <Box
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                gap={'20px'}
                height='auto'
              >
                {navLinks.map((link, key) => {
                  return (
                    <Box key={key} position='relative'>
                      <Text
                        redirect={!link.showIsComing ? link.linkTo : undefined}
                        cursor='pointer'
                        text={t(link.linkName)}
                        color={
                          router.pathname.includes(link.linkTo) &&
                          !link.showIsComing
                            ? colors.blueC2
                            : colors.black21
                        }
                        token={tokens.FS12FW600LH16SG}
                      />
                      {link.showIsComing && <ComingSoonTag />}
                    </Box>
                  );
                })}
              </Box>
              <CurrencyConverter />
              <LangTrans />
              {isAuthenticating ? (
                <CircularProgress size={20} />
              ) : user ? (
                <>
                  <NotificationSummaryManager />
                  <AvatarWithMenu />
                </>
              ) : (
                <Box width={'100px'}>
                  <Button
                    text='Login'
                    onClick={() => {
                      router.push('/auth/login');
                    }}
                    variant='black'
                    justifyContent='center'
                    token={tokens.FS12FW600LH16SG}
                    maxWidth
                  />
                </Box>
              )}
            </Stack>
          )}
        </Stack>
      )}
    </>
  );

  const changeLanguage = (lang: string) => () => {
    localStorage.setItem('locale', lang);
    i18n.changeLanguage(lang);
    toggleDrawer();
  };

  const handleCurrencyChange = (curr: string) => async () => {
    toggleDrawer();

    if (curr === 'CAD') {
      dispatch(
        updateCurrency({
          label: curr,
          value: 1.0,
          symbol: currencyList.find((el) => el.value === curr)?.symbol,
        })
      );
      localStorage.setItem(
        'currency',
        JSON.stringify({
          label: curr,
          value: 1.0,
          symbol: currencyList.find((el) => el.value === curr)?.symbol,
        })
      );
    } else {
      try {
        const { data } = await axios.get(
          `https://api.frankfurter.app/latest?amount=1&from=CAD&to=${curr}`
        );
        dispatch(
          updateCurrency({
            label: curr,
            value: parseFloat(data.rates[curr].toFixed(2)),
            symbol: currencyList.find((el) => el.value === curr)?.symbol,
          })
        );
        localStorage.setItem(
          'currency',
          JSON.stringify({
            label: curr,
            value: parseFloat(data.rates[curr].toFixed(2)),
            symbol: currencyList.find((el) => el.value === curr)?.symbol,
          })
        );
      } catch (error) {
        console.error('Error Fetching', error);
      }
    }
  };

  return (
    <Box
      width='inherit'
      id='navbar'
      position={'relative'}
      className='navbarIndex-500'
      sx={{
        transition: 'top 0.3s ease',
        borderBottom: `1px solid ${colors.greyDE}`,
      }}
    >
      <Box height={'100%'}>
        <Box
          py={'10px'}
          position={'sticky'}
          bgcolor={alpha(colors.whiteFF, 0.6)}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
        >
          {router.pathname.includes('browse-map') ? (
            <Box px={'15px'} width='100%'>
              {renderNavContent}
            </Box>
          ) : (
            <ResponsiveContainer>{renderNavContent}</ResponsiveContainer>
          )}
        </Box>
      </Box>
      {showDrawer && (
        <SwipeableDrawer
          anchor={'right'}
          open={showDrawer}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
          sx={{
            '& .MuiDrawer-paper': {
              width: '300px',
            },
          }}
        >
          {renderMenuPanel()}
        </SwipeableDrawer>
      )}
    </Box>
  );
}

const returnLocalNavlinks = (locale: string) => {
  switch (locale) {
    case 'en': {
      return NAV_LINKS_EN;
    }
    case 'es': {
      return NAV_LINKS_ES;
    }
    case 'fr': {
      return NAV_LINKS_FR;
    }
    default: {
      return NAV_LINKS_EN;
    }
  }
};

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: '0.8rem', color: colors.black21Light }}
      />
    }
    {...props}
  />
))(() => ({
  padding: 0,
  minHeight: '30px',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginBlock: '10px',
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: '0 15px 15px',
}));
