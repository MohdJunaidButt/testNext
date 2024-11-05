import { formatPrice } from '@/commonFunctions/commonFunctions';
import Image from '@/components/Image/Image';
import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { FormatNumber } from '@/utils/priceFormat';
import {
  Box,
  Menu,
  Popover,
  Slider,
  Stack,
  styled,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef } from 'react';

const formatLabel = (
  min: number,
  max: number,
  isPrice = false,
  currency = '$'
) =>
  isPrice
    ? `${currency}${FormatNumber(min)} - ${currency}${FormatNumber(max)}`
    : `${FormatNumber(min)}-${FormatNumber(max)}`;

interface RangeSelectorProps {
  fieldTitle: string;
  onSliderChange: (
    event: Event,
    value: number | number[],
    activeThumb: number
  ) => void;
  sliderValue: [number, number];
  min: number;
  max: number;
  isPriceFormat?: boolean;
  showBorder?: boolean;
  isPrice?: boolean;
  steps?: number;
  bgcolor?: string;
  compType?: 'lrgRounded' | 'lrgDefault' | 'smRounded';
  fieldName: string;
  showPlusIndicator?: boolean;
  isBorderDark?: boolean;
  isFullWidth?: boolean;
  currency?: '$' | 'C$' | '€' | '£';
}

const RangeSelector = ({
  fieldName,
  fieldTitle,
  onSliderChange,
  sliderValue,
  min,
  max,
  isPrice = false,
  steps = 50,
  bgcolor = undefined,
  showPlusIndicator = false,
  isPriceFormat = false,
  compType = 'lrgDefault',
  isBorderDark = false,
  isFullWidth = false,
  currency = 'C$',
}: RangeSelectorProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement | null>();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => {
      setAnchorEl(null);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl]);

  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <>
      <Box
        width={isFullWidth ? '100%' : 'fit-content'}
        height={isFullWidth ? '100%' : 'fit-content'}
        sx={{
          '&, & *': {
            cursor: 'pointer',
          },
        }}
      >
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          ref={ref}
          gap={'15px'}
          width='100%'
          height={'fit-content'}
          sx={{
            backgroundColor: bgcolor,
            border: !isBorderDark
              ? `1px solid rgba(150, 150, 150, 0.24)`
              : `1px solid ${colors.black21}`,
            borderRadius: compType === 'lrgDefault' ? '10px' : '50px',
            padding:
              compType === 'lrgDefault'
                ? '7.5px 14px'
                : compType === 'lrgRounded'
                ? '8.5px 14px'
                : isMobile
                ? '5px 10px'
                : '6.5px 12px',
            paddingRight: '32px',
            position: 'relative',
            '&, & *': {
              cursor: 'pointer',
            },
          }}
          onClick={handleClick}
        >
          <Text
            text={
              sliderValue[0] === min && sliderValue[1] === max
                ? fieldTitle
                : isPriceFormat
                ? formatLabel(sliderValue[0], sliderValue[1], isPrice, currency)
                : `${
                    isPrice
                      ? formatPrice(sliderValue[0], currency)
                      : sliderValue[0]
                  } - ${
                    isPrice
                      ? formatPrice(sliderValue[1], currency)
                      : sliderValue[1]
                  }`
            }
            color={colors.black21}
            token={
              compType === 'smRounded'
                ? tokens.FS14FW500LH19R
                : tokens.FS16FW500LH18M
            }
            styles={{
              lineHeight: compType === 'smRounded' ? '1.3 !important' : '1.5',
            }}
            cursor='pointer'
          />

          <Image
            src={'/icons/caret-down.svg'}
            alt='down'
            width='20px'
            height='fit-content'
            style={{
              position: 'absolute',
              right: '7px',
              top:
                compType === 'lrgDefault'
                  ? 'calc(50% - 0.5em)'
                  : 'calc(50% - 0.55em)',
            }}
          />
        </Box>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          elevation={0}
          sx={{
            marginTop: '2px',
            '& .MuiPaper-root': {
              borderRadius: '4px',
              boxShadow:
                'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
              border: `1px solid ${colors.greyE1}`,
              width: isFullWidth
                ? ref?.current?.getBoundingClientRect().width
                : 'max-content',
              minWidth: '300px',
            },
            '& .MuiMenu-list, & .MuiList-root': {
              width: '100%',
              padding: '0',
            },
          }}
          transformOrigin={{ horizontal: 'left', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <Stack p='10px 16px'>
            <Text
              text={fieldTitle}
              color={colors.black21}
              token={
                compType === 'smRounded'
                  ? tokens.FS14FW500LH19R
                  : tokens.FS16FW400LH18R
              }
              textAlign='center'
              styles={{
                marginBottom: '15px',
              }}
            />
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              gap={'5px'}
            >
              <Text
                text={
                  isPrice
                    ? `${currency}${FormatNumber(sliderValue[0])}`
                    : sliderValue[0].toString()
                }
                color={colors.black21}
                token={
                  compType === 'smRounded'
                    ? tokens.FS14FW500LH19R
                    : tokens.FS16FW400LH18R
                }
                textAlign='center'
                styles={{
                  border: `1px solid ${colors.greyDE}`,
                  padding: '8px 15px',
                  borderRadius: '10px',
                  minWidth: '80px',
                }}
              />
              <Text
                text={'-'}
                color={colors.black21}
                token={
                  compType === 'smRounded'
                    ? tokens.FS14FW500LH19R
                    : tokens.FS16FW400LH18R
                }
                textAlign='center'
              />
              <Text
                text={`${
                  isPrice
                    ? `${currency}${FormatNumber(sliderValue[1])}`
                    : sliderValue[1].toString()
                }${showPlusIndicator && max === sliderValue[1] ? '+' : ''}`}
                color={colors.black21}
                token={
                  compType === 'smRounded'
                    ? tokens.FS14FW500LH19R
                    : tokens.FS16FW400LH18R
                }
                textAlign='center'
                styles={{
                  border: `1px solid ${colors.greyDE}`,
                  padding: '8px 15px',
                  borderRadius: '10px',
                  minWidth: '80px',
                }}
              />
            </Box>
          </Stack>
          <Box
            width='100%'
            height='100%'
            display='flex'
            sx={{ overflow: 'hidden' }}
            // mt={1}
            p='5px 16px 10px'
          >
            <SliderExt
              value={sliderValue}
              onChange={onSliderChange}
              // size='small'
              name={fieldName}
              min={min}
              max={max}
              step={steps}
              sx={{
                width: '90%',
                marginInline: 'auto',
              }}
            />
          </Box>
        </Menu>
      </Box>
    </>
  );
};

export const PopoverExt = styled(Popover)(() => ({
  '& .MuiPopover-paper': {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingBlock: '1rem',
    overflow: 'hidden',
    '& > div': {
      paddingInline: '1rem',
    },
  },
}));

const SliderExt = styled(Slider)(({ theme }) => ({
  color: colors.black21,
  '& .MuiSlider-valueLabel': { zIndex: 2222 },
  '& .MuiSlider-thumb': {
    color: '#fff',
    border: `1px solid ${theme.palette.grey[500]}`,
    boxShadow: 'rgba(0, 0, 0, 0.1) -4px 9px 25px -6px',
    width: '25px',
    height: '25px',
    '&:hover, &.Mui-focusVisible, &.Mui-active': {
      boxShadow: 'none',
    },
  },
  '& .MuiSlider-track': {
    backgroundColor: colors.black21,
  },
}));

export default RangeSelector;
