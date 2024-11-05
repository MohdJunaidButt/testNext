import { ResponsiveCarousal, Text } from '@/components';
import { Box, useMediaQuery } from '@mui/material';

import PlaceholderDataPropertyCard from '@/components/Cards/PlaceholderDataPropertyCard';
import { colors, tokens } from '@/styles';

export default function SchoolsNearBy() {
  const isXL = useMediaQuery((theme: any) => theme.breakpoints.down('xl'));
  const isLG = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmMob = useMediaQuery('(min-width:465px) and (max-width: 600px)');
  const isXsMob = useMediaQuery('(min-width:0px) and (max-width: 465px)');

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text='Schools Nearby'
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? '16px' : '18px',
          marginBottom: isMobile ? '10px' : '15px',
        }}
        color={colors.black21}
        textAlign='left'
      />
      {/* <ResponsiveCarousal
        centerSlidePercentage={
          isSmMob ? 70 : isXsMob ? 100 : isMD ? 55 : isLG ? 37 : isXL ? 45 : 40
        }
        indicatorCustomPlacementMargin={"16px"}
      >
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Under Construction"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Coming Soon"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Detached"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Hot Project"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Most Popular"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Semi Detached"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Under Construction"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Under Construction"
          variant="small"
        />
        <PlaceholderDataPropertyCard
          onClick={() => {}}
          propertyPrice="18,000"
          tag="Under Construction"
          variant="small"
        />
      </ResponsiveCarousal> */}
    </Box>
  );
}
