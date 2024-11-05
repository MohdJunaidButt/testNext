import NextImageOfViewer from '@/collections/TilesImagesGenerator/TilesImagesCollageExtended/NextImageOfViewer';
import { ResponsiveCarousal } from '@/components';
import { ImageLabel } from '@/components/ImageLabel';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';

interface TilesImagesCollageExtendedProps {
  images: string[];
  label?: any;
  constructionStatus?: string;
  propertyType?: string;
}

export default function TilesImagesCollageExtended({
  images,
  label,
  constructionStatus = '',
  propertyType = '-',
}: TilesImagesCollageExtendedProps) {
  const { t } = useTranslation();

  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isTab = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const isDsk = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isLaptop = useMediaQuery('(min-width:1024px) and (max-width: 1439px)');
  const isLaptopLarge = useMediaQuery(
    '(min-width:1440px) and (max-width: 1919px)'
  );
  const [extendedImages, setExtendedImages] = useState<string[]>(
    images.slice(1, images.length)
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index: number) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
    document.body.classList.add('no-scroll');
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const returnArrayOfChunks = (array: string[]) => {
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += 4) {
      const chunk = array.slice(i, i + 4);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
  };

  let viewerImages = [images[0], ...images.slice(1, images.length)].map(
    (el) => ({ src: el })
  );

  return (
    <Box width={'100%'} position='relative'>
      {images.length === 1 ? (
        <Box
          sx={{
            height: { xs: '250px', sm: '400px', md: '470px' },
          }}
        >
          <Image
            src={
              images[0].includes('coming-soon')
                ? isMobile
                  ? '/images/property/coming-soon.jpg'
                  : '/images/property/coming-soon-wide.jpg'
                : images[0]
            }
            alt='coming-soon'
            width={0}
            loading={'lazy'}
            height={0}
            sizes='100%'
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '20px',
              overflow: 'hidden',
              paddingRight: isDsk ? 5 : 0,
            }}
            fill={true}
            quality={100}
            placeholder='blur'
            blurDataURL={
              images[0].includes('coming-soon')
                ? isMobile
                  ? '/images/property/coming-soon.jpg'
                  : '/images/property/coming-soon-wide.jpg'
                : images[0]
            }
          />
        </Box>
      ) : images.length <= 5 ? (
        <ResponsiveCarousal
          centerSlidePercentage={isMobile ? 100 : isTab ? 85 : isDsk ? 70 : 51}
          infiniteLoop={false}
          autoPlay={false}
          showIndicators={false}
        >
          {images.map((image, index) => (
            <Box
              key={index}
              height={
                isMobile
                  ? '300px'
                  : isDsk
                  ? '400px'
                  : isLaptop
                  ? '400px'
                  : '450px'
              }
              sx={{
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => openImageViewer(index)}
              mr={
                !isMobile ? (index <= images.length ? '20px !important' : 0) : 0
              }
              // py={'3px'}
            >
              <Image
                src={image}
                alt='map'
                width={0}
                loading={'lazy'}
                height={0}
                sizes='100%'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  // border: `1px solid ${colors.grey96}`,
                  // boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                  paddingRight: isDsk ? 5 : 0,
                }}
                fill={true}
                quality={100}
                placeholder='blur'
                blurDataURL={image}
              />
              {index === 0 && (
                <>
                  <ImageLabel
                    // text={pathname.includes('house') ? 'House' : 'Condo'}
                    text={propertyType.includes('Condo') ? 'Condo' : 'House'}
                    token={
                      isMobile ? tokens.FS12FW400LH18R : tokens.FS13FW400LH18R
                    }
                    color={colors.black21}
                    bgColor={colors.whiteFF}
                    border={'transparent'}
                    borderRadius={'25px'}
                    top={15}
                    left={15}
                  />
                  <ImageLabel
                    text={label}
                    token={
                      isMobile ? tokens.FS12FW400LH18R : tokens.FS13FW400LH18R
                    }
                    color={colors.whiteFF}
                    bgColor={colors.blueC2}
                    border={'transparent'}
                    borderRadius={isMobile ? '10px' : '17px'}
                    bottom={15}
                    left={15}
                  />
                  {constructionStatus &&
                    constructionStatus !== '' &&
                    constructionStatus !== '-' && (
                      <ImageLabel
                        text={constructionStatus}
                        token={tokens.FS12FW400LH18R}
                        color={colors.whiteFF}
                        bgColor={colors.black21}
                        borderRadius={'49px'}
                        isRelative
                        border={'transparent'}
                        icon={'/icons/tag.svg'}
                        iconSize={{ width: 15, height: 15 }}
                        minWidth={'180px'}
                        top={15}
                        right={15}
                      />
                    )}
                </>
              )}
            </Box>
          ))}
        </ResponsiveCarousal>
      ) : (
        <Box width='100%'>
          <ResponsiveCarousal
            centerSlidePercentage={isMobile ? 100 : isTab ? 68 : 50}
            infiniteLoop={false}
            autoPlay={false}
            showIndicators={false}
          >
            <Box
              height={'100%'}
              maxHeight='460px'
              overflow='hidden'
              display='content'
              sx={{ position: 'relative', cursor: 'pointer' }}
              onClick={() => openImageViewer(0)}
            >
              <Image
                src={images[0]}
                alt='map'
                width={0}
                loading={'lazy'}
                height={0}
                sizes='100%'
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
                fill={true}
                quality={100}
                placeholder='blur'
                blurDataURL={images[0]}
              />
              <ImageLabel
                // text={pathname.includes('house') ? 'House' : 'Condo'}
                text={propertyType.includes('Condo') ? 'Condo' : 'House'}
                token={isMobile ? tokens.FS12FW400LH18R : tokens.FS13FW400LH18R}
                color={colors.black21}
                bgColor={colors.whiteFF}
                border={'transparent'}
                borderRadius={'25px'}
                top={15}
                left={15}
              />
              <ImageLabel
                text={label}
                token={isMobile ? tokens.FS12FW400LH18R : tokens.FS13FW400LH18R}
                color={colors.whiteFF}
                bgColor={colors.blueC2}
                border={'transparent'}
                borderRadius={isMobile ? '10px' : '17px'}
                bottom={15}
                left={15}
              />
              {isMobile &&
                constructionStatus !== '' &&
                constructionStatus !== '-' && (
                  <ImageLabel
                    text={constructionStatus}
                    token={tokens.FS12FW400LH18R}
                    color={colors.whiteFF}
                    bgColor={colors.black21}
                    borderRadius={'49px'}
                    border={'transparent'}
                    icon={'/icons/tag.svg'}
                    iconSize={{ width: 15, height: 15 }}
                    top={15}
                    right={15}
                  />
                )}
            </Box>
            {returnArrayOfChunks(extendedImages).map((chunk, index) => (
              <Box
                key={index}
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                flexWrap={'wrap'}
                width={'100%'}
                height={'fit-content'}
                flexDirection={chunk.length === 2 ? 'column' : 'row'}
                alignItems={'flex-start'}
                justifyContent={
                  chunk.length === 3 ? 'flex-start' : 'space-between'
                }
                sx={{
                  rowGap: '10px',
                  columnGap: '10px',
                }}
              >
                {chunk.map((image, idx) => (
                  <Box
                    key={idx}
                    width={
                      isMobile
                        ? '48.25%'
                        : isTab
                        ? '48.67%'
                        : isDsk
                        ? '48.75%'
                        : isLaptop
                        ? '49%'
                        : '49.25%'
                    }
                    height={
                      isMobile
                        ? '130px'
                        : isTab
                        ? '160px'
                        : isDsk
                        ? '170px'
                        : isLaptop
                        ? '210px'
                        : isLaptopLarge
                        ? '220px'
                        : '220px'
                    }
                    sx={{
                      cursor: 'pointer',
                      // ...(chunk.length >= 2 && { flexBasis: '49%' }),
                    }}
                    onClick={() => openImageViewer(index * 4 + (idx + 1))}
                  >
                    <Image
                      src={image}
                      alt='map'
                      width={0}
                      height={0}
                      sizes='100%'
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '20px',
                        overflow: 'hidden',
                      }}
                    />
                  </Box>
                ))}
              </Box>
            ))}
          </ResponsiveCarousal>
        </Box>
      )}
      {/* {isViewerOpen && ( */}
      <Box zIndex={222}>
        {/* <ImageViewer
            src={[images[0], ...images.slice(1, images.length)]}
            currentIndex={currentImage}
            disableScroll={false}
            closeOnClickOutside={true}
            onClose={closeImageViewer}
          /> */}
        {/* <Lightbox
            open={isViewerOpen}
            close={closeImageViewer}
            plugins={[Zoom]}
            carousel={{ preload: 2 }}
            slides={viewerImages}
            index={currentImage}
          /> */}
        <Lightbox
          open={isViewerOpen}
          close={closeImageViewer}
          plugins={[Zoom]}
          carousel={{ preload: 3 }}
          slides={viewerImages}
          index={currentImage}
          render={{ slide: NextImageOfViewer }}
        />
      </Box>
      {/* )} */}
      {images.length > 5 && (
        <Box onClick={() => openImageViewer(0)}>
          <ImageLabel
            text={`${t('See All')} ${images.length} ${t('Images')}`}
            token={isMobile ? tokens.FS12FW400LH18R : tokens.FS14FW600LH16SB}
            color={colors.whiteFF}
            bgColor={colors.black21}
            border={'transparent'}
            borderRadius={'8px'}
            bottom={15}
            right={25}
            styles={{ cursor: 'pointer', padding: '3px' }}
          />
        </Box>
      )}
    </Box>
  );
}
