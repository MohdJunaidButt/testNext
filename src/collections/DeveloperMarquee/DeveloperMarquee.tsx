import { Text } from '@/components';
import { getDevelopersBasic } from '@/services/api';
import { colors, tokens } from '@/styles';
import { DeveloperBasic } from '@/types/collections/developer';
import ObjectToPrams from '@/utils/ObjectToParams';
import { Box, Skeleton, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { useTranslation } from 'react-i18next';

const DeveloperMarquee = () => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const [fetching, setFetching] = useState(true);
  const [developers, setDevelopers] = useState<Array<DeveloperBasic> | null>(
    null
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const resp = await getDevelopersBasic(
          ObjectToPrams({ page: 1, limit: 30, sort: 'name' })
        );
        if (mounted) setDevelopers(resp);
      } catch (er) {
        setFetching(false);
      } finally {
        if (mounted) {
          setFetching(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Stack
      spacing={'50px'}
      alignItems={isMobile ? 'flex-start' : 'center'}
      sx={{
        marginBlock: '40px',
      }}
    >
      <Box>
        <Text
          token={
            isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS48FW800LH61_49B
          }
          color={colors.black21}
          text={t('Our Developer Network')}
          textAlign={isMobile ? 'left' : 'center'}
        />
        <Text
          text={t(
            'Browse listings, view photos and connect with an agent to schedule a viewing in some of our popular cities'
          )}
          color={colors.grey8F}
          token={tokens.FS16FW500LH21_86R}
          textAlign={isMobile ? 'left' : 'center'}
        />
      </Box>
      <Marquee loop={0} speed={fetching ? 0 : 50}>
        {fetching
          ? [...Array(8)].map((_, idx) => (
              <Skeleton
                key={`home-dev${idx}`}
                variant='rounded'
                width={150}
                height={50}
                sx={{
                  mr: 5,
                  my: 1,
                }}
              />
            ))
          : developers &&
            developers?.map((developer) => (
              <Box
                key={developer.id}
                sx={{
                  position: 'relative',
                  width: '100%',
                  display: 'inline-block',
                  cursor: 'pointer',
                  marginRight: '80px',
                }}
              >
                <Image
                  src={developer.logo}
                  alt={developer.name}
                  width={0}
                  height={0}
                  sizes='100%'
                  style={{
                    width: 'fit-content',
                    height: 'fit-content',
                    maxHeight: '50px',
                  }}
                  loading={'lazy'}
                  placeholder='blur'
                  blurDataURL={developer.logo}
                />
              </Box>
            ))}
      </Marquee>
    </Stack>
  );
};

export default DeveloperMarquee;
