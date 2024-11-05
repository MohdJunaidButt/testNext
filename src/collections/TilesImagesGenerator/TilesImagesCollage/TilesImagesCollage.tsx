import { GridContainer, Text } from '@/components';
import { ImageLabel } from '@/components/ImageLabel';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { TilesImagesCollageProps } from '@/types/collections/TilesImagesCollageProps';
import { Box, Grid, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function TilesImagesCollage({
  image1,
  image2,
  image3,
  image4,
  onClickShowMore,
}: TilesImagesCollageProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const pathname = useRouter().pathname;

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '40px'}>
      <ResponsiveContainer>
        <GridContainer spacing={2}>
          <>
            <Grid
              item
              height={isMobile ? '250px' : '412px'}
              xs={12}
              lg={7.5}
              sx={{ position: 'relative' }}
            >
              <Image
                src={image1}
                alt='map'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
              />
              <ImageLabel
                text={pathname.includes('house') ? 'House' : 'Condo'}
                token={
                  isTab && !isMobile
                    ? tokens.FS16FW500LH18M
                    : isMobile
                    ? tokens.FS14FW600LH16SB
                    : tokens.FS20FW500LH22_72SB
                }
                color={colors.black21}
                bgColor={colors.whiteFF}
                border={'transparent'}
                borderRadius={'25px'}
                top={30}
                left={30}
              />
              <ImageLabel
                text={'For Sale'}
                token={
                  isTab && !isMobile
                    ? tokens.FS20FW600LH22_72SB
                    : isMobile
                    ? tokens.FS16FW500LH18M
                    : tokens.FS24FW400LH32_78R
                }
                color={colors.whiteFF}
                bgColor={colors.blueC2}
                border={'transparent'}
                borderRadius={isMobile ? '10px' : '17px'}
                bottom={15}
                left={30}
              />
            </Grid>
            <Grid item xs={12} lg={4.5}>
              <GridContainer spacing={2} styles={{ height: '100%' }}>
                <>
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={6}
                    height={isTab ? '100%' : '207px'}
                  >
                    <Image
                      src={image2}
                      alt='map'
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={6}
                    height={isTab ? '100%' : '207px'}
                  >
                    <Image
                      src={image3}
                      alt='map'
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={6}
                    height={isTab ? '100%' : '207px'}
                  >
                    <Image
                      src={image4}
                      alt='map'
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    md={3}
                    lg={6}
                    height={isTab ? '100%' : '207px'}
                    onClick={() => {
                      onClickShowMore();
                    }}
                  >
                    <Box
                      bgcolor={colors.greyE1}
                      {...displayFlexAlignItemsCenterJustifyContentCenter}
                      borderRadius={'12px'}
                      height={'100%'}
                    >
                      <Text
                        text={isMobile ? '+5 More' : '+5 More Photos'}
                        token={
                          isMobile
                            ? tokens.FS11FW400LH18R
                            : tokens.FS14FW600LH16SB
                        }
                        color={colors.black21}
                        styles={{
                          marginRight: '5px',
                        }}
                      />
                      <Image
                        src={'/icons/rightDirectionfilled.svg'}
                        alt='rightDirectionfilled'
                        width={isMobile ? 10 : 16}
                        height={isMobile ? 10 : 16}
                      />
                    </Box>
                  </Grid>
                </>
              </GridContainer>
            </Grid>
          </>
        </GridContainer>
      </ResponsiveContainer>
    </Box>
  );
}
