import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function NeedFurtherHelp() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box id='needFurtherHelp' my={isMobile ? '30px' : '40px'}>
      <ResponsiveContainer>
        <GridContainer justifyContent='space-between'>
          <>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              flexDirection={'column'}
              width={'100%'}
              sx={{
                gap: { xs: '15px', sm: '25px' },
              }}
            >
              <Text
                text={`${t('Need Further Help')}?`}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS36FW700LH49_18B
                }
                color={colors.black21}
              />
              <Text
                text={t(
                  'Feel free to contact without any hesitation, We are available 24/7 for your assistance.'
                )}
                token={
                  isMobile ? tokens.FS14FW500LH19R : tokens.FS20FW400LH22_72R
                }
                color={colors.grey96}
                styles={{
                  width: isMobile ? '80%' : '50%',
                }}
              />
              <Box width={'fit-content'} height={'45px'}>
                <Button
                  text={t('Contact Us')}
                  onClick={() => {
                    router.push('/contact-us');
                  }}
                  variant='blackOutlined'
                  token={
                    isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M
                  }
                  justifyContent='center'
                  maxWidth
                />
              </Box>
            </Box>
          </>
        </GridContainer>
      </ResponsiveContainer>
    </Box>
  );
}
