import { Text } from '@/components';
import Button from '@/components/Button/Button';
import { colors, tokens } from '@/styles';
import { Box, Stack, useMediaQuery } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EvaluationDialog from './evaluation-dialog';

const EvaluationBanner = ({
  cities,
  bannerImg,
}: {
  cities: any;
  bannerImg: string;
}) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [evaluationForm, setEvaluationForm] = useState(false);

  const toggleEvaluationForm = () => setEvaluationForm((st) => !st);

  return (
    <Fragment>
      <Stack
        alignItems='center'
        justifyContent='center'
        sx={{
          backgroundImage: `url(${bannerImg})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: { xs: '250px', sm: '280px', md: '370px' },
          position: 'relative',
          borderRadius: '10px',
          overflow: 'hidden',
          padding: { xs: '20px', sm: '25px', md: '35px' },
          marginTop: { xs: '30px', sm: '40px' },
        }}
      >
        <Box
          sx={{
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        />
        <Stack
          zIndex={2}
          spacing={3}
          py={'30px'}
          px={'30px'}
          sx={{
            maxWidth: { md: '450px' },
            marginLeft: 'auto',
          }}
        >
          <Text
            text={t('Get a Free Property Assessment')}
            token={
              isMobile ? tokens.FS24FW400LH32_78R : tokens.FS24FW400LH32_78R
            }
            color={colors.whiteFF}
            textAlign='left'
            styles={{ fontSize: { xs: '26px', sm: '32px' } }}
          />
          <Text
            text={t(
              "Curious about the potential selling or rental value of your property? Simply choose an option below, and you're all set find out."
            )}
            token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW300LH21_86R}
            color={colors.whiteFF}
            textAlign='left'
            styles={{
              lineHeight: '1.75',
            }}
          />
          <Button
            token={tokens.FS14FW600LH16SB}
            variant={'white'}
            text={t('Instant Evaluation')}
            onClick={toggleEvaluationForm}
            justifyContent='center'
            marginRight='10px'
            icon={'/icons/arrow-right-black.svg'}
            iconAlt='/icons/arrow-right.svg'
            iconSize={{ width: 15, height: 15 }}
            iconReverse
            style={{
              height: { xs: '43px', sm: '50px' },
              paddingInline: '27px',
            }}
          />
        </Stack>
      </Stack>
      <EvaluationDialog
        isOpen={evaluationForm}
        handleClose={toggleEvaluationForm}
        cities={cities}
      />
    </Fragment>
  );
};

export default EvaluationBanner;
