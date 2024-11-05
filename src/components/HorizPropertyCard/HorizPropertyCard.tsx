import { Text } from '@/components/Text';
import { colors, tokens } from '@/styles';
import { Box, Chip, Stack, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface HorizPropertyCardProps {
  title: string;
  totalFloors: string;
  availableFloors: string;
  address: string;
  status: string;
  slug: string;
  image: string;
  priceFrom: string;
  priceTo: string;
}

const HorizPropertyCard = ({
  title,
  totalFloors,
  availableFloors,
  address,
  status,
  slug,
  image,
  priceFrom,
  priceTo,
}: HorizPropertyCardProps) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <Box display='flex' p={isMobile ? '13px' : '13px 20px'}>
      <Link
        href={`/property/${slug}`}
        target='_blank'
        style={{ display: 'flex' }}
      >
        <Image
          src={image}
          alt={title}
          width={0}
          height={0}
          sizes={'100%'}
          style={{
            height: isMobile ? '120px' : '155px',
            width: isMobile ? '120px' : '155px',
            borderRadius: '10px',
            overflow: 'hidden',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </Link>
      <Stack
        sx={{
          flex: '1 1 auto',
          paddingLeft: '15px',
          position: 'relative',
          maxWidth: '100%',
          justifyContent: 'center',
          '& > *': {
            '&:not(:first-of-type)': {
              marginTop: '10px',
            },
          },
        }}
      >
        <section>
          <Stack
            direction={isMobile ? 'column' : 'row'}
            spacing={isMobile ? 0.5 : 2.75}
            alignItems={'baseline'}
            mb={'6px'}
            justifyContent={'space-between'}
          >
            <Link href={`/property/${slug}`} target='_blank'>
              <Text
                text={title}
                token={tokens.FS16FW600LH21_86R}
                color={colors.black21}
                textAlign='left'
                styles={{
                  fontFamily: 'Manrope-ExtraBold',
                  fontSize: isMobile ? '16px' : '18px',
                  '&:hover': {
                    color: colors.blueC2,
                  },
                }}
                cursor='pointer'
              />
            </Link>
            <Chip
              label={status}
              variant='filled'
              sx={{
                backgroundColor: colors.blueC2,
                color: colors.whiteFF,
                whiteSpace: 'nowrap',
                minWidth: isMobile ? 'max-content' : '80px',
                width: 'max-content',
                height: { xs: '25px', sm: '30px' },
                flexShrink: 0,
                fontSize: isMobile ? '12px' : '13px',
              }}
            />
          </Stack>
          <Text
            text={`${
              priceFrom === priceTo && priceFrom.includes('XX')
                ? priceFrom
                : `${priceFrom} - ${priceTo}`
            }`}
            token={tokens.FS14FW600LH16SB}
            color={colors.grey63}
            textAlign='left'
            styles={{
              fontFamily: 'Manrope-Bold',
              fontSize: isMobile ? '14px' : '16px',
            }}
          />
        </section>
        <section>
          <Text
            text={`${totalFloors} Floors`}
            token={tokens.FS14FW400LH19R}
            color={colors.black21}
            textAlign='left'
            styles={{
              fontFamily: 'Manrope-ExtraBold',
              fontSize: isMobile ? '22px' : '26px',
            }}
          />
          {!isMobile && (
            <Stack direction='row' spacing={2} mt={'8px'}>
              <Stack direction='row' alignItems={'center'}>
                <Image
                  src={'/icons/bluedot.svg'}
                  alt='blue-dot'
                  style={{ marginRight: '4px' }}
                  width={isMobile ? 8 : 10}
                  height={isMobile ? 8 : 10}
                />
                <Text
                  text={`${availableFloors} available`}
                  color={colors.black21}
                  token={tokens.FS12FW500LH18M}
                  cursor='pointer'
                  styles={{
                    fontSize: '12px',
                  }}
                />
              </Stack>
              <Stack direction='row' alignItems={'center'}>
                <Image
                  src={'/icons/greydot.svg'}
                  alt='grey-dot'
                  style={{ marginRight: '4px' }}
                  width={isMobile ? 8 : 10}
                  height={isMobile ? 8 : 10}
                />
                <Text
                  text={`${+totalFloors - +availableFloors} unavailable`}
                  color={colors.black21}
                  token={tokens.FS12FW500LH18M}
                  cursor='pointer'
                  styles={{
                    fontSize: '12px',
                  }}
                />
              </Stack>
            </Stack>
          )}
        </section>
        <section>
          <Text
            text={address}
            token={tokens.FS14FW400LH19R}
            color={colors.black21}
            textAlign='left'
            styles={{
              fontSize: isMobile ? '13px' : '14px',
            }}
          />
        </section>
      </Stack>
    </Box>
  );
};

export default HorizPropertyCard;
