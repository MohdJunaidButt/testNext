import { GridContainer, Text } from '@/components';
import { Box, Grid, Stack, useMediaQuery } from '@mui/material';

import { colors, tokens } from '@/styles';
import { useTranslation } from 'react-i18next';

interface AdditionalInformationProps {
  Walk_Score: string;
  Transit_Score: string;
  height_m: string;
  height_ft: string;
  architects: string;
  interior_designers: string;
  last_updated_date: string;
}

export default function AdditionalInformation({
  Walk_Score,
  Transit_Score,
  height_m,
  height_ft,
  architects,
  interior_designers,
  last_updated_date,
}: AdditionalInformationProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '50px'}>
      <Text
        text={t('Additional Information')}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        color={colors.black21}
        textAlign='left'
        styles={{ marginBottom: '15px' }}
      />
      <GridContainer
        spacing={isMobile ? 1 : 2}
        styles={{ justifyContent: 'start', rowGap: isMobile ? '1rem' : '2rem' }}
      >
        <>
          <Grid item xs={6} sm={6} lg={4}>
            <RenderInfo title={t('WALK SCORE')} description={Walk_Score} />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <RenderInfo
              title={t('TRANSIT SCORE')}
              description={Transit_Score}
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <RenderInfo title={t('ARCHITECT')} description={architects} />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <RenderInfo
              title={t('INTERIOR DESIGNER')}
              description={interior_designers}
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <RenderInfo title={t('HEIGHT (M)')} description={height_m} />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <RenderInfo title={t('HEIGHT (FT)')} description={height_ft} />
          </Grid>
          <Grid item xs={12}>
            <Text
              text={`${t('Date last updated')} : ${last_updated_date}`}
              token={tokens.FS14FW400LH19R}
              color={colors.grey63}
              textAlign='left'
            />
          </Grid>
        </>
      </GridContainer>
    </Box>
  );
}

const RenderInfo = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <Stack direction={'column'} spacing={1} alignItems={'baseline'}>
      <Text
        text={title}
        token={tokens.FS14FW400LH19R}
        color={colors.grey63}
        textAlign='left'
      />
      <Text
        text={description}
        token={tokens.FS16FW500LH21_86R}
        color={colors.black21}
        textAlign='left'
      />
    </Stack>
  );
};
