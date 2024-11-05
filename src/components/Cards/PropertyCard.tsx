import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Divider, SxProps, Theme, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button/Button';
import { Text } from '../Text';

export interface PropertyCardProps {
  tag:
    | 'Detached'
    | 'Semi Detached'
    | 'Most Popular'
    | 'Coming Soon'
    | 'Under Construction'
    | 'Hot Project'
    | 'Sold'
    | string;
  variant: 'small' | 'medium';
  images: string[];
  onClick: () => void;
  condo?: any;
  salePriceFrom: string;
  salePriceTo: string;
  propertyName: string;
  propertySlug: string;
  propertyLocation: string;
  footerJSX: ReactNode;
  style?: SxProps<Theme>;
  expectedDateOfCompletion?: string;
  isProtected?: boolean;
  isCompare?: boolean;
  onSelect?: () => void;
  isSelected?: boolean;
  condoId?: number;
  isFavorited?: boolean;
  onToggleFavorite?: () => Promise<void>;
}
export interface PropertyCardPropsPartial {
  footerJSX1?: any;
  tag:
    | 'Detached'
    | 'Semi Detached'
    | 'Most Popular'
    | 'Coming Soon'
    | 'Under Construction'
    | 'Hot Project'
    | 'Sold';

  onClick: () => void;
  style?: React.CSSProperties;
  expectedDateOfCompletion?: string;
  variant?: 'small' | 'medium';
  isCompare?: boolean;
  onSelect?: any;
  totalFloors: string;
  availableFloors: string;
  availability: string;
  isSelected?: boolean;
  isProtected?: boolean;
  name?: string;
  slug?: string;
  address?: string;
  mainImage?: string;
  salePriceFrom: string;
  salePriceTo: string;
  images?: string[];
  isFavorited?: boolean;
  onToggleFavorite?: () => Promise<void>;
}

const tagMeta = {
  Detached: {
    backgroundColor: colors.blueC2,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  'Semi Detached': {
    backgroundColor: colors.yellow00,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  'Most Popular': {
    backgroundColor: colors.blueC2,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  'Hot Project': {
    backgroundColor: colors.blueC2,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  Sold: {
    backgroundColor: colors.blueC2,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  'Coming Soon': {
    backgroundColor: colors.black21,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  'Under Construction': {
    backgroundColor: colors.red00,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
  'Special Promotion': {
    backgroundColor: colors.blueC2,
    color: colors.whiteFF,
    borderTopLeftRadius: '50px',
    borderBottomLeftRadius: '50px',
    padding: '10px 40px 10px 40px',
  },
};

export default function PropertyCard({
  tag,
  condo,
  variant = 'small',
  images,
  onClick,
  salePriceFrom,
  salePriceTo,
  propertyName,
  propertySlug,
  propertyLocation,
  footerJSX,
  style,
  expectedDateOfCompletion,
  isCompare = false,
  isSelected = false,
  onSelect,
  isFavorited,
  onToggleFavorite,
}: PropertyCardProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const { t } = useTranslation();
  // const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      style={{
        position: 'relative',
      }}
    >
      <Box
        borderRadius={'10px'}
        onClick={() => {
          onClick();
        }}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        sx={{
          outline: `1px solid ${colors.greyEC}`,
          transition: 'outline 0.3s ease',
          ':hover': {
            outline: `2px solid ${colors.blueC2}`,
          },
          width: '100%',
          maxWidth: isMobile ? '320px' : '340px',
          minWidth: '290px',
          ...style,
        }}
      >
        {/* Property Image */}
        <Box
          height={isMobile ? '260px' : '280px'}
          sx={{
            '& img': {
              objectFit: 'cover',
            },
          }}
        >
          {images.map((el: any, ind: number) => (
            <Image
              key={ind}
              src={el}
              alt='propImage'
              width={0}
              height={0}
              sizes='100%'
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '10px',
              }}
              loading='lazy'
              placeholder='blur'
              blurDataURL={el}
            />
          ))}
        </Box>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          width={'96%'}
          position={'relative'}
          top={isMobile ? '-253px' : '-273px'}
          marginBottom={'-20px'}
          justifyContent={
            tag === 'Under Construction' ? 'space-between' : 'flex-end'
          }
          marginLeft={'2%'}
        >
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            justifyContent={
              tag === 'Under Construction' && expectedDateOfCompletion
                ? 'space-between'
                : 'flex-end'
            }
            width={'100%'}
          >
            {tag === 'Under Construction' && expectedDateOfCompletion && (
              <Box
                borderRadius={'8px'}
                padding={'10px 15px 10px 15px'}
                bgcolor={colors.whiteFF}
                {...displayFlexAlignItemsCenterJustifyContentCenter}
              >
                <Box width={'15px'} height={'15px'} marginRight={'10px'}>
                  <Image
                    src={'/icons/calender.svg'}
                    alt='calender'
                    style={{ width: '100%', height: '100%' }}
                    width={0}
                    height={0}
                    sizes='100%'
                    loading='eager'
                    priority
                  />
                </Box>
                <Text
                  text={expectedDateOfCompletion}
                  token={
                    variant === 'medium'
                      ? tokens.FS16FW500LH21_86R
                      : tokens.FS13FW400LH18R
                  }
                  color={colors.black21}
                  textAlign='left'
                  cursor='pointer'
                />
              </Box>
            )}
            <Box
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite && onToggleFavorite();
              }}
              style={{ backgroundColor: colors.whiteFF, borderRadius: '50%' }}
            >
              <Box
                width={'15px'}
                height={'16px'}
                sx={{
                  margin: '7px',
                  '& img': {
                    objectFit: 'contain',
                  },
                }}
              >
                <Image
                  src={isFavorited ? '/icons/fav-red.svg' : '/icons/fav.svg'}
                  alt='fav'
                  style={{ width: '100%', height: '100%' }}
                  width={0}
                  height={0}
                  sizes='100%'
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Link href={`/property/${propertySlug}`}>
          <Box padding={'0px 0px 10px 0px'} position={'relative'}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
              marginLeft={'5%'}
            >
              <Text
                text={`${
                  salePriceFrom === salePriceTo && salePriceFrom.includes('XX')
                    ? salePriceFrom
                    : `${salePriceFrom} - ${salePriceTo}`
                }`}
                color={colors.blueC2}
                token={
                  variant === 'medium'
                    ? tokens.FS24FW600LH32_78SB
                    : tokens.FS16FW600LH21_86R
                }
                cursor='pointer'
                textAlign='left'
                styles={{
                  flex: 1,
                }}
              />
              <Box
                sx={{
                  ...tagMeta['Most Popular'],
                  padding:
                    variant === 'medium'
                      ? '10px 40px 10px 40px'
                      : '5px 20px 5px 20px',
                  position: 'absolute',
                  top: -30,
                  right: 0,
                }}
              >
                <Text
                  text={tag}
                  token={
                    variant === 'medium'
                      ? tokens.FS16FW500LH21_86R
                      : tokens.FS13FW400LH18R
                  }
                  color={tagMeta['Most Popular'].color}
                  textAlign='right'
                  cursor='pointer'
                />
              </Box>
            </Box>
            <Box marginLeft={'5%'} marginRight={'5%'}>
              <Text
                text={
                  condo
                    ? condo.property_details.project_development_name
                    : propertyName
                }
                color={colors.black21}
                token={
                  variant === 'medium'
                    ? tokens.FS24FW600LH32_78SB
                    : tokens.FS16FW600LH21_86SB
                }
                textAlign='left'
                styles={{
                  marginTop: '3px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
                cursor='pointer'
              />
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                mt={'10px'}
                mb={'7px'}
                alignItems={'stretch'}
              >
                <Box width={'12px'} height={'17px'}>
                  <Image
                    src={'/icons/location-pin-alt.svg'}
                    alt='pin'
                    width={0}
                    height={0}
                    sizes='100%'
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>

                <Text
                  text={propertyLocation}
                  color={colors.grey96}
                  token={
                    variant === 'medium'
                      ? tokens.FS16FW300LH21_86R
                      : tokens.FS13FW400LH18R
                  }
                  styles={{
                    marginLeft: '10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  textAlign='left'
                  cursor='pointer'
                />
              </Box>
              <Divider color={colors.greyEB} style={{ marginBottom: '7px' }} />
              {footerJSX}
            </Box>
          </Box>
        </Link>
      </Box>
      {/* {isProtected && !user && (
        <Box
          position={'relative'}
          top={-propertyCardHeight - 19}
          height={propertyCardHeight - 0.5}
          marginBottom={`-${propertyCardHeight}px`}
          width={returnDynamicCardWidth()}
          left={7}
          style={{
            backdropFilter: 'blur(4px)',
            background: 'rgba(152, 152, 152, 0.44)',
            borderRadius: '10px',
          }}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
        >
          <Button
            text='Login to View'
            justifyContent='center'
            onClick={() => {
              router.push('/auth/login');
            }}
            token={tokens.FS16FW400LH18R}
            variant='blue'
            borderRadius='8px'
            style={{
              height: '40px',
            }}
          />
        </Box>
      )} */}
      {isCompare && (
        <Button
          onClick={() => onSelect?.()}
          variant={isSelected ? 'white' : 'black'}
          token={tokens.FS20FW400LH22_72R}
          justifyContent='center'
          text={isSelected ? t('De-Select') : t('Select')}
          borderRadius='8px'
          style={{
            whiteSpace: 'nowrap',
            height: 'fit-content',
            position: 'absolute',
            top: '10px',
            left: '20px',
            padding: '4px 20px',
          }}
        />
      )}
    </Box>
  );
}
