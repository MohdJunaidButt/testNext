import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Menu, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export const OccupationPicker = ({
  value,
  onChange,
  isBorderDark,
  isRounded,
  fullWidth = true,
  size = 'default',
}: {
  value: string;
  onChange: (val: string) => void;
  isBorderDark?: boolean;
  isRounded?: boolean;
  fullWidth?: boolean;
  size?: 'default' | 'small';
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement | null>();
  const { t } = useTranslation();

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

  const handleOccupancyFilter = (val: any) => () => {
    if (value) {
      value = value.split(',').includes(val.toString())
        ? value
            .split(',')
            .filter((el: string) => el !== val.toString())
            .join(',')
        : value + ',' + val;
      onChange(value);
    } else onChange(val.toString());
  };

  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      width={fullWidth ? '100%' : 'fit-content'}
      height={fullWidth ? '100%' : 'fit-content'}
      gap={'15px'}
      sx={{
        '&, & *': {
          cursor: 'pointer',
        },
      }}
    >
      <Box
        width={'100%'}
        height={'auto'}
        ref={ref}
        sx={{
          border: isBorderDark
            ? `1px solid ${colors.black21}`
            : `1px solid rgba(150, 150, 150, 0.24)`,
          borderRadius: isRounded ? '50px' : '10px',
          padding:
            size === 'small'
              ? isMobile
                ? '5px 10px'
                : '6.5px 12px'
              : '7.5px 14px',
          paddingRight: '32px',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          ...(!fullWidth && {
            maxWidth: '250px',
          }),
        }}
        onClick={handleClick}
      >
        <Text
          text={!value ? t('Occupancy Year') : value.split(',').join(', ')}
          token={
            size === 'small' ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M
          }
          color={colors.black21}
          textAlign='left'
          styles={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: size === 'small' ? 1.3 : 1.5,
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
            top: isRounded ? 'calc(50% - 0.5em)' : 'calc(50% - 0.55em)',
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
            width: '300px',
          },
          '& .MuiMenu-list, & .MuiList-root': {
            width: 'inherit',
            minWidth: '265px',
            padding: '14px 14px',
            height: '100%',
            maxHeight: '200px',
            overflowY: 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            paddingRight: '10px',
          }}
        >
          {getYearsBetween(1970, 2035).map((el) => (
            <Button
              key={el}
              token={tokens.FS13FW500LH18R}
              variant={
                value?.split(',').includes(el.toString())
                  ? 'black'
                  : 'blackOutlined'
              }
              text={el.toString()}
              onClick={handleOccupancyFilter(el)}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                height: 'max-content',
                width: '100%',
              }}
            />
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

function getYearsBetween(startYear: number, endYear: number) {
  startYear = Number(startYear);
  endYear = Number(endYear);

  if (isNaN(startYear) || isNaN(endYear)) {
    console.error('Invalid input: Please provide valid years.');
    return [];
  }
  const years = [];
  const latestYear = Math.max(startYear, endYear);
  const earliestYear = Math.min(startYear, endYear);

  for (let year = latestYear; year >= earliestYear; year--) {
    years.push(year);
  }

  return years;
}
