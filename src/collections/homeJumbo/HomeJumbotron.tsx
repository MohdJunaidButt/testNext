import SearchWithSuggestionsNew from '@/collections/CustomMap/SearchableMap/SearchWithSuggestionsNew';
import { Text } from '@/components';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

export default function HomeJumbotron() {
  const { user } = useSelector((state: RootState) => state.Auth);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const router = useRouter();
  const { t } = useTranslation();

  const handleRegister = () => router.push('/auth/signup');

  return (
    <>
      <Text
        text={t('Find Your Dream Home Today With Us!')}
        token={
          isTab && !isMobile
            ? tokens.FS48FW800LH61_49B
            : isMobile
            ? tokens.FS40FW800LH49_18EB
            : tokens.FS60FW800LH90_08EB
        }
        color={colors.black21}
        textAlign='left'
        styles={{
          maxWidth: { xs: '690px', md: '630px', lg: '650px' },
          ...(isTab && { fontFamily: 'Manrope-ExtraBold' }),
          lineHeight: { xs: '1.3', sm: '1.6', md: '1.5', lg: '1.6' },
        }}
      />
      {!user && (
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          justifyContent={'flex-start'}
          sx={{
            marginTop: { xs: '13px', sm: '35px', md: '50px' },
          }}
        >
          <Image
            src={'/icons/profile.svg'}
            alt='register'
            width={isMobile ? 15 : 20}
            height={isMobile ? 15 : 20}
            style={{ marginRight: '10px' }}
          />
          <Text
            text={t('Register to get notified')}
            color={colors.black21}
            token={tokens.FS16FW500LH18M}
            styles={{
              borderBottom: '1px solid #000',
              paddingBottom: '3px',
              fontSize: { xs: '13px', sm: '16px' },
            }}
            handleClick={handleRegister}
            redirect='/auth/signup'
            cursor='pointer'
          />
        </Box>
      )}
      <Box
        sx={{
          maxWidth: { xs: '500px', md: '580px' },
          marginTop: '20px',
        }}
      >
        <SearchWithSuggestionsNew />
      </Box>
    </>
  );
}
