import { GridContainer, Text } from '@/components';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import ContactForm from '@/pages/contact-us/ContactForm';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        marginBlock: { xs: '30px', sm: '50px' },
      }}
    >
      <ResponsiveContainer>
        <>
          <GridContainer justifyContent='flex-start'>
            <Grid item xs={12}>
              <Text
                text={t('Contact Us')}
                color={colors.black21}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS36FW700LH49_18B
                }
                textAlign='left'
                styles={{ marginBottom: { xs: '30px', sm: '50px' } }}
              />
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                {...flexDirection.column}
                alignItems='start'
                gap={'10px'}
                sx={{ marginBottom: { xs: '30px', sm: '50px' } }}
              >
                <Typography
                  {...tokens.FS36FW700LH49_18B}
                  color={colors.black21}
                  textAlign={'left'}
                  sx={{
                    maxWidth: '25ch',
                  }}
                >
                  {t('Hi User feel free to get in touch with us')} ! {` `}
                  <span style={{ verticalAlign: 'middle' }}>
                    <Image
                      src='/icons/shaking-hand.svg'
                      alt='shaking-hand'
                      width={40}
                      height={40}
                      loading='eager'
                      priority
                    />
                  </span>
                </Typography>
              </Box>
            </Grid>
          </GridContainer>
          <ContactForm />
        </>
      </ResponsiveContainer>
    </Box>
  );
}
