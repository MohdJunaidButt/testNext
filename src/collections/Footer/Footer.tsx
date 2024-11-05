import { GridContainer, Text } from '@/components';
import ComingSoonTag from '@/components/ComingSoonTag/ComingSoon';
import Divider from '@/components/Divider/Divider';
import Logo from '@/components/Logo/Logo';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import {
  Box,
  IconButton,
  Divider as MaterialDivider,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation('common');

  const renderDynamicMenu = (items: any) => {
    return (
      <Box
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        {...flexDirection.column}
        alignItems={'flex-start'}
        gap={'10px'}
      >
        <Text
          text={t(items.heading)}
          token={
            isMobile ? tokens.FS16FW600LH21_86SB : tokens.FS20FW600LH22_72SB
          }
          color={colors.black21}
        />
        {items.subSections.map((subSection: any, index: number) => (
          <Stack
            key={index}
            alignItems={'center'}
            direction={'row'}
            spacing={1}
          >
            <Text
              key={index}
              text={t(subSection.label)}
              cursor='pointer'
              token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
              color={colors.black21}
              redirect={
                !subSection.isComingSoon ? subSection.navLink : undefined
              }
            />
            {subSection.isComingSoon && (
              <ComingSoonTag
                sx={{
                  position: 'relative',
                  inset: 0,
                }}
              />
            )}
          </Stack>
        ))}
      </Box>
    );
  };

  const renderFooterItems = () => {
    return (
      <>
        <Box
          height={'100%'}
          sx={{
            width: {
              xs: 'max-content',
              sm: 'max-content',
              md: '25%',
              lg: '20%',
            },
          }}
        >
          {renderDynamicMenu(footerItems[0])}
        </Box>
        <Box
          height={'100%'}
          sx={{
            width: {
              xs: 'max-content',
              sm: 'max-content',
              md: '25%',
              lg: '20%',
            },
          }}
        >
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            {...flexDirection.column}
            alignItems={'flex-start'}
            gap={'15px'}
          >
            <Text
              text={t('Contact')}
              token={
                isMobile ? tokens.FS16FW600LH21_86SB : tokens.FS20FW600LH22_72SB
              }
              color={colors.black21}
            />
            <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
              <Image
                src={'/icons/call.svg'}
                alt='phone'
                width={isMobile ? 17 : 20}
                height={isMobile ? 17 : 20}
                loading={'lazy'}
              />
              <Text
                text={'647-910-9000'}
                cursor='pointer'
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
                color={colors.black21}
                styles={{ marginLeft: '10px' }}
              />
            </Box>
            <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
              <Image
                src={'/icons/mail.svg'}
                alt='mail'
                width={isMobile ? 17 : 20}
                height={isMobile ? 17 : 20}
                loading={'lazy'}
              />
              <Text
                text={'info@ubrealty.com'}
                cursor='pointer'
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
                color={colors.black21}
                styles={{ marginLeft: '10px' }}
              />
            </Box>
            <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
              <Image
                src={'/icons/privacy.svg'}
                alt='mail'
                width={isMobile ? 17 : 20}
                height={isMobile ? 17 : 20}
                loading={'lazy'}
              />
              <Text
                text={t('Privacy Policy')}
                cursor='pointer'
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
                color={colors.black21}
                redirect='/privacy-policy'
                styles={{ marginLeft: '10px' }}
              />
            </Box>
            <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
              <Image
                src={'/icons/iconmonstr-email-15.svg'}
                alt='mail'
                width={isMobile ? 17 : 20}
                height={isMobile ? 17 : 20}
                loading={'lazy'}
              />
              <Text
                text={t('Contact Us')}
                cursor='pointer'
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M}
                color={colors.black21}
                redirect='/contact-us'
                styles={{ marginLeft: '10px' }}
              />
            </Box>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
              gap={isMobile ? '7px' : '10px'}
              marginTop={'10px'}
              marginLeft={'-12px'}
            >
              <IconButton>
                <Image
                  style={{ cursor: 'pointer' }}
                  src={'/icons/facebook-black.svg'}
                  alt='facebook'
                  width={isMobile ? 17 : 20}
                  height={isMobile ? 17 : 20}
                  loading={'lazy'}
                />
              </IconButton>
              <IconButton>
                <Image
                  style={{ cursor: 'pointer' }}
                  src={'/icons/instagram-black.svg'}
                  alt='instagram'
                  width={isMobile ? 17 : 20}
                  height={isMobile ? 17 : 20}
                  loading={'lazy'}
                />
              </IconButton>
              <IconButton>
                <Image
                  style={{ cursor: 'pointer' }}
                  src={'/icons/twitter-black.svg'}
                  alt='twitter'
                  width={isMobile ? 17 : 20}
                  height={isMobile ? 17 : 20}
                  loading={'lazy'}
                />
              </IconButton>
              <IconButton>
                <Image
                  style={{ cursor: 'pointer' }}
                  src={'/icons/icons8-linkedin.svg'}
                  alt='twitter'
                  width={isMobile ? 17 : 20}
                  height={isMobile ? 17 : 20}
                  loading={'lazy'}
                />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <Box>
      <Divider />
      <Box marginTop={isMobile ? '40px' : '50px'}>
        <ResponsiveContainer>
          <GridContainer justifyContent='space-between'>
            <>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                alignItems={'flex-start'}
                width={'100%'}
                height={'100%'}
                minHeight={'170px'}
                gap={2}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Box
                  sx={{
                    width: {
                      xs: '100%',
                      sm: '35%',
                      md: '30%',
                      lg: '35%',
                    },
                  }}
                >
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                    flexDirection={'column'}
                    alignItems={'flex-start'}
                  >
                    <Logo width='120px' />
                    <Text
                      text={t(
                        `Ubrealty makes every effort to ensure accurate information, however, Ubrealty is not liable for the use or misuse of the site's information.`
                      )}
                      token={
                        isMobile
                          ? tokens.FS14FW500LH19R
                          : tokens.FS16FW500LH18ML
                      }
                      color={colors.black21}
                      textAlign='left'
                      styles={{ marginTop: '15px' }}
                    />
                    <Text
                      text={t(
                        `The information on www.Ubrealty.com is neither intended to be nor does it take the place of legal, tax or accounting advice and users are strongly recommended to obtain independent legal, tax or accounting advice. The information displayed on Ubrealty is for reference only.`
                      )}
                      token={
                        isMobile
                          ? tokens.FS14FW500LH19R
                          : tokens.FS16FW500LH18ML
                      }
                      styles={{ marginTop: '10px' }}
                      color={colors.black21}
                      textAlign='left'
                    />
                  </Box>
                </Box>
                {!isMobile ? (
                  renderFooterItems()
                ) : (
                  <Stack
                    direction={'row'}
                    alignItems={'flex-start'}
                    spacing={2}
                    justifyContent={'space-between'}
                    width='100%'
                    mt={2}
                    sx={{
                      '& > *': {
                        flex: 1,
                      },
                    }}
                  >
                    {renderFooterItems()}
                  </Stack>
                )}
              </Box>
            </>
          </GridContainer>
        </ResponsiveContainer>
        <MaterialDivider sx={{ mt: { xs: '30px', sm: '50px' } }} />
        <ResponsiveContainer>
          <GridContainer justifyContent='space-between'>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              width={'100%'}
              sx={{
                my: { xs: '20px', sm: '30px' },
              }}
            >
              <Box>
                <Text
                  text={
                    t('Copyright') +
                    ' © Ubrealty Inc ' +
                    new Date().getFullYear() +
                    `. ${t('All Rights Reserved')}.`
                  }
                  color={colors.black21}
                  token={
                    isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R
                  }
                  styles={{ display: 'inline' }}
                />
              </Box>
            </Box>
          </GridContainer>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}

const footerItems = [
  {
    heading: 'Menu',
    subSections: [
      { label: 'Browse Map', navLink: '/browse-map', isComingSoon: false },
      { label: 'Condos', navLink: '/condos', isComingSoon: false },
      { label: 'Houses', navLink: '/houses', isComingSoon: false },
      {
        label: 'Pre-Construction',
        navLink: 'pre-construction',
        isComingSoon: false,
      },
      { label: 'Coming Soon', navLink: '/coming-soon', isComingSoon: false },
      { label: 'Resale', navLink: '/page-coming-soon', isComingSoon: true },
      { label: 'For Rent', navLink: '/page-coming-soon', isComingSoon: true },
    ],
  },
];
