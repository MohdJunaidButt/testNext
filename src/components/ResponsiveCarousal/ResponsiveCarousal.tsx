import { Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

import { colors } from '@/styles';
import Image from 'next/image';
import '../../styles/components/ResponsiveCarousal.module.css';

interface ResponsiveCarousalProps {
  centerSlidePercentage?: number;
  width?: string;
  showIndicators?: boolean;
  showArrows?: boolean;
  indicatorCustomPlacementMargin?: string;
  children?: any;
  carousalWidth?: string | number;
  pillIndicator?: boolean;
  altIndicatorTheme?: boolean;
  infiniteLoop?: boolean;
  autoPlay?: boolean;
}

export function ResponsiveCarousal({
  centerSlidePercentage = 25,
  width = '100%',
  showIndicators = true,
  showArrows = true,
  indicatorCustomPlacementMargin = '0px',
  children,
  carousalWidth,
  pillIndicator = false,
  altIndicatorTheme = false,
  infiniteLoop = true,
  autoPlay = true,
}: ResponsiveCarousalProps) {
  return (
    <Box width={width}>
      {' '}
      <div>
        <Carousel
          emulateTouch
          width={carousalWidth}
          // infiniteLoop={infiniteLoop}
          // interval={2000}
          // autoPlay={autoPlay}
          centerMode
          centerSlidePercentage={centerSlidePercentage}
          showArrows={showArrows}
          showStatus={false}
          showThumbs={false}
          showIndicators={showIndicators}
          renderArrowNext={(clickHandler, hasNext) => {
            return (
              hasNext && (
                <Box
                  position={'absolute'}
                  top={'50%'}
                  width={40}
                  height={40}
                  onClick={clickHandler}
                  right={0}
                  zIndex={4}
                  sx={{
                    cursor: 'pointer',

                    transform: {
                      xs: 'translate(14px,-50%)',
                      md: 'translate(18px,-50%)',
                    },
                  }}
                >
                  <Image
                    src={'/icons/carousal-right.svg'}
                    alt='carousel-right'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              )
            );
          }}
          renderArrowPrev={(clickHandler, hasNext) => {
            return (
              hasNext && (
                <Box
                  position={'absolute'}
                  top={'50%'}
                  width={40}
                  height={40}
                  onClick={clickHandler}
                  left={0}
                  zIndex={4}
                  sx={{
                    transform: {
                      xs: 'translate(-14px,-50%)',
                      md: 'translate(-18px,-50%)',
                    },
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={'/icons/carousal-left.svg'}
                    alt='carousel-left'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              )
            );
          }}
          renderIndicator={(clickHandler, isSelected, index) => {
            return (
              <li
                onClick={clickHandler}
                style={{
                  marginRight: '5px',
                  width: pillIndicator ? '20px' : '10px',
                  height: pillIndicator ? '5px' : '10px',
                  listStyle: 'none',

                  borderRadius: pillIndicator ? '25px' : '50%',
                  display: 'inline-block',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: '100',
                  backgroundColor: getDynamicBackgroundColor(
                    isSelected,
                    altIndicatorTheme
                  ),
                  top: indicatorCustomPlacementMargin,
                }}
                key={index}
                role='button'
              />
            );
          }}
        >
          {children}
        </Carousel>
      </div>
    </Box>
  );
}

const getDynamicBackgroundColor = (
  isSelected: boolean,
  altIndicatorTheme: boolean
) => {
  if (isSelected && altIndicatorTheme) {
    return colors.whiteFF;
  } else if (!isSelected && altIndicatorTheme) {
    return colors.greyD931;
  } else if (isSelected && !altIndicatorTheme) {
    return colors.blueC2;
  } else {
    return colors.grey96;
  }
};
