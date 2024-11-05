import TileWithIconTextAndInfo from '@/collections/TileWithIconTextAndInfo/TileWithIconTextAndInfo';
import { GridContainer, SearchBar, Text } from '@/components';
import Button from '@/components/Button/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useState } from 'react';
const AreaChart = dynamic(
  () => import('../../components/ApexCharts/AreaChart'),
  {
    ssr: false,
  }
);

export default function MarketTrends() {
  const isSmMob = useMediaQuery('(min-width:465px) and (max-width: 650px)');

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            gap={'10px'}
          >
            <SearchBar
              backGroundColor={colors.greyEB}
              color={colors.black21}
              token={tokens.FS16FW500LH21_86R}
              placeholder='Search market trend by community name'
              width={isMD ? '100%' : '500px'}
              height={isMD ? '50px' : '64px'}
              borderRadius='8px'
            />
            <Button
              variant='primary'
              onClick={() => {}}
              text={isMobile ? '' : 'Contact Agent'}
              icon='/icons/phone.svg'
              iconAlt='/icons/phone-alt.svg'
              iconSize={{ width: 20, height: 20 }}
              justifyContent='center'
              borderRadius='6px'
              token={tokens.FS20FW400LH22_72R}
              style={{
                width: { xs: 'fit-content', sm: '330px' },
                height: { xs: '50px', md: '64px' },
                padding: { xs: '19px 20px', md: '19px 33px' },
              }}
            />
          </Box>
          <Box
            sx={{
              position: 'relative',
              ...(!isLoggedIn && {
                height: '990px',
                overflow: 'hidden',
              }),
            }}
          >
            {!isLoggedIn && (
              <Button
                variant='black'
                onClick={() => {
                  router.push('/auth/login');
                }}
                text='Login to view'
                token={tokens.FS16FW500LH18M}
                justifyContent='center'
                icon={'/icons/lock-white.svg'}
                iconAlt={'/icons/lock-black.svg'}
                iconSize={{ width: 18, height: 18 }}
                style={{
                  height: '50px',
                  position: 'absolute',
                  top: '50%',
                  transform: 'translate(50%,-50%)',
                  right: '50%',
                  zIndex: 2222,
                }}
                borderRadius='9px'
              />
            )}
            <Box
              position='absolute'
              height='100%'
              width='100%'
              sx={{
                zIndex: 2221,
                backdropFilter: 'blur(4px)',
              }}
            />
            <Text
              text='London Market Trend'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              textAlign='left'
              styles={{ marginBlock: '45px 40px' }}
            />
            <GridContainer
              spacing={isMobile ? 1 : 2}
              justifyContent='flex-start'
            >
              <>
                {homeValueTiles.map((homeValueTile, index) => (
                  <Grid key={index} item xs={6} sm={6} lg={4}>
                    <TileWithIconTextAndInfo
                      image={homeValueTile.image}
                      description={homeValueTile.description}
                      title={homeValueTile.title}
                      infoText={homeValueTile.infoText}
                    />
                  </Grid>
                ))}
              </>
            </GridContainer>
            <Text
              text='London Median Price and Avg DOM'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS24FW600LH32_78SB
              }
              textAlign='left'
              styles={{ marginBlock: '90px 40px' }}
            />
            <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
              <AreaChart
                datasetSeries={[
                  {
                    name: 'Median Price',
                    data: [
                      130, 50, 105, 144, 80, 45, 120, 80, 95, 114, 180, 80,
                    ],
                  },
                  {
                    name: 'Avg DOM',
                    data: [
                      100, 90, 135, 114, 120, 145, 70, 40, 35, 100, 150, 80,
                    ],
                  },
                ]}
                bottomLabel={'All Type of properties London'}
                isMobile={isMobile}
                seriesOpacity={[0, 0]}
              />
            </Box>
            <Text
              text='London Sold and Active Listing'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS24FW600LH32_78SB
              }
              textAlign='left'
              styles={{ marginBlock: '90px 40px' }}
            />
            <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
              <AreaChart
                datasetSeries={[
                  {
                    name: 'Total Sold',
                    data: [
                      130, 50, 105, 144, 80, 45, 120, 80, 95, 114, 180, 80,
                    ],
                  },
                  {
                    name: 'New Listing',
                    data: [
                      100, 90, 135, 114, 120, 145, 70, 40, 35, 100, 150, 80,
                    ],
                  },
                  {
                    name: 'Active Listing',
                    data: [120, 70, 105, 94, 70, 90, 120, 60, 65, 130, 120, 90],
                  },
                ]}
                bottomLabel={'All Type of properties London'}
                isMobile={isMobile}
                seriesOpacity={[0, 0, 0]}
              />
            </Box>
            <Text
              text='London Median Rent Price'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS24FW600LH32_78SB
              }
              textAlign='left'
              styles={{ marginBlock: '90px 40px' }}
            />
            <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
              <AreaChart
                datasetSeries={[
                  {
                    name: 'Median Price',
                    data: [15, 55, 30, 55, 30, 85, 45, 50, 30, 95, 75, 70],
                  },
                  {
                    name: 'Total Leased',
                    data: [5, 20, 7, 25, 10, 70, 15, 20, 18, 35, 60, 55],
                  },
                  {
                    name: 'New Listing',
                    data: [10, 15, 20, 25, 23, 35, 15, 15, 25, 35, 55, 70],
                  },
                ]}
                bottomLabel={'All Type of properties London'}
                isMobile={isMobile}
                seriesOpacity={[0.3, 0.4, 0]}
                showMarker={false}
                strokeWidth={[2, 0, 2]}
              />
            </Box>

            <Text
              text='Just Sold'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS24FW600LH32_78SB
              }
              textAlign='left'
              styles={{ marginBlock: '90px 40px' }}
            />
          </Box>
        </>
      </ResponsiveContainer>
    </Box>
  );
}

const homeValueTiles = [
  {
    image: '/icons/dollar-double-circle.svg',
    title: 'Jan 2023 - Median Price',
    description: '$252,555',
    infoText: 'Jan 2023 - Median Price',
  },
  {
    image: '/icons/home.svg',
    title: 'Jan 2023 - New Listings',
    description: '55',
    infoText: 'Jan 2023 - New Listings',
  },
  {
    image: '/icons/clock.svg',
    title: 'Jan 2023 - Median days on market',
    description: '34',
    infoText: 'Jan 2023 - Median days on market',
  },
  {
    image: '/icons/chart-up.svg',
    title: '1 Year change value',
    description: '+10%',
    infoText: '1 Year change value',
  },
  {
    image: '/icons/chart-down.svg',
    title: '5 Year change value',
    description: '-1.3%',
    infoText: '5 Year change value',
  },
  {
    image: '/icons/chart-up.svg',
    title: '10 Year change value',
    description: '+11%',
    infoText: '10 Year change value',
  },
];
