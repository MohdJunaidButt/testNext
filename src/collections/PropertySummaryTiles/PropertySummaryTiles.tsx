import { Text } from '@/components';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
export default function PropertySummaryTiles({ selectedFloor }: any) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      width={'100%'}
      flexWrap={'wrap'}
      gap={'15px'}
      rowGap={'15px'}
      sx={{
        '& > *': { flex: 1 },
      }}
    >
      <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
        <Image
          src={'/icons/square-blue-bed.svg'}
          alt='bed'
          width={55}
          height={55}
        />

        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          {...flexDirection.column}
          alignItems={'flex-start'}
          marginLeft={'10px'}
        >
          <Text
            text={selectedFloor?.number_of_bedrooms}
            token={
              isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS32FW800LH43_71EB
            }
            color={colors.black21}
            textAlign='left'
            styles={{ fontSize: { xs: '22px', sm: '30px' } }}
          />
          <Text
            text='Bedrooms'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
            textAlign='left'
          />
        </Box>
      </Box>
      <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
        <Image
          src={'/icons/square-blue-bathroom.svg'}
          alt='bathroom'
          width={55}
          height={55}
        />

        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          {...flexDirection.column}
          alignItems={'flex-start'}
          marginLeft={'10px'}
        >
          <Text
            text={selectedFloor?.number_of_bathrooms}
            token={
              isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS32FW800LH43_71EB
            }
            color={colors.black21}
            textAlign='left'
            styles={{ fontSize: { xs: '22px', sm: '30px' } }}
          />
          <Text
            text='Bathrooms'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
            textAlign='left'
          />
        </Box>
      </Box>
      <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
        <Image
          src={'/icons/square-blue-map.svg'}
          alt='map'
          width={55}
          height={55}
        />

        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          {...flexDirection.column}
          alignItems={'flex-start'}
          marginLeft={'10px'}
        >
          <Box display='flex' alignItems='baseline' gap={1}>
            <Text
              text={selectedFloor?.interior_size}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS32FW800LH43_71EB
              }
              styles={{ fontSize: { xs: '22px', sm: '30px' } }}
              color={colors.black21}
              textAlign='left'
            />
            <Text
              text='Sq ft'
              token={
                isMobile ? tokens.FS14FW600LH16SB : tokens.FS20FW500LH22_72SB
              }
              color={colors.grey8F}
              textAlign='left'
              styles={{ fontSize: { xs: '14px', sm: '18px' } }}
            />
          </Box>
          <Text
            text='Size'
            token={tokens.FS14FW500LH19R}
            color={colors.black21}
            textAlign='left'
          />
        </Box>
      </Box>
      {selectedFloor?.floor_range_from !== 0 && (
        <Box {...displayFlexAlignItemsCenterJustifyContentFlexStart}>
          <Image
            src={'/icons/stairs-blue.svg'}
            alt='stairs'
            width={55}
            height={55}
          />

          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            {...flexDirection.column}
            alignItems={'flex-start'}
            marginLeft={'10px'}
            minWidth={'87px'}
          >
            <Text
              text={`${selectedFloor?.floor_range_from}-${selectedFloor?.floor_range_to}`}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS32FW800LH43_71EB
              }
              color={colors.black21}
              textAlign='left'
              styles={{ fontSize: { xs: '22px', sm: '30px' } }}
            />
            <Text
              text='Floor Range'
              token={tokens.FS14FW500LH19R}
              color={colors.black21}
              textAlign='left'
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
