import { GridContainer, Text } from '@/components';
import { colors, tokens } from '@/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface PricePerSquareFootProps {
  projectPrice: string;
  neighborhoodAvg: string;
  cityAvg: string;
}

export default function PricePerSquareFoot({
  projectPrice,
  neighborhoodAvg,
  cityAvg,
}: PricePerSquareFootProps) {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text={t('Price per Square Foot')}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        color={colors.black21}
        textAlign='left'
        styles={{
          marginBottom: isMobile ? '10px' : '15px',
          fontSize: isMobile ? '16px' : '18px',
        }}
      />
      <GridContainer justifyContent='flex-start' styles={{ rowGap: '10px' }}>
        <>
          <Grid
            item
            sm={4}
            xl={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Text
              text={projectPrice}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS40FW800LH49_18EB
              }
              styles={{ marginBottom: '7px' }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={t('This project')}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
          <Grid
            item
            sm={4}
            xl={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Text
              text={neighborhoodAvg}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS40FW800LH49_18EB
              }
              styles={{ marginBottom: '7px' }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={t('Neighborhood Avg')}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
          <Grid
            item
            sm={4}
            xl={3}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <Text
              text={cityAvg}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS40FW800LH49_18EB
              }
              styles={{ marginBottom: '7px' }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text={t('City Avg')}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
          <Box
            sx={{
              ...(isMobile
                ? {
                    display: 'flex',
                    alignItems: 'start',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '15px',
                    width: '100%',
                    maxWidth: '450px',
                  }
                : { display: 'none' }),
            }}
          >
            <Box>
              <Text
                text={projectPrice}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS40FW800LH49_18EB
                }
                styles={{ marginBottom: '7px' }}
                color={colors.black21}
                textAlign='left'
              />

              <Text
                text={t('This project')}
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey63}
                textAlign='left'
              />
            </Box>
            <Box>
              <Text
                text={neighborhoodAvg}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS40FW800LH49_18EB
                }
                styles={{ marginBottom: '7px' }}
                color={colors.black21}
                textAlign='left'
              />

              <Text
                text={t('Neighborhood Avg')}
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey63}
                textAlign='left'
              />
            </Box>
            <Box>
              <Text
                text={cityAvg}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS40FW800LH49_18EB
                }
                styles={{ marginBottom: '7px' }}
                color={colors.black21}
                textAlign='left'
              />

              <Text
                text={t('City Avg')}
                token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW500LH19R}
                color={colors.grey63}
                textAlign='left'
              />
            </Box>
          </Box>
        </>
      </GridContainer>
    </Box>
  );
}
