import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Menu, Stack, styled, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const BedroomSelector = ({
  value,
  onChange,
  isBorderDark,
  isRounded,
  fullWidth = true,
  size = 'default',
  minpadding,
}: {
  value: string;
  onChange: (val: string) => void;
  isBorderDark?: boolean;
  isRounded?: boolean;
  fullWidth?: boolean;
  minpadding?: boolean;
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
          text={value === '' ? t('Bedrooms') : value}
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
            width: fullWidth
              ? ref?.current?.getBoundingClientRect().width || '250px'
              : '250px',
          },
          '& .MuiMenu-list, & .MuiList-root': {
            width: 'inherit',
            minWidth: '265px',
            padding: '14px 14px',
            height: '100%',
            maxHeight: '250px',
            overflowY: 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          flexWrap={'wrap'}
          sx={{ gap: '8px' }}
        >
          {Bedrooms.map((bedroom: { label: string; id: string }) => (
            <Button
              key={bedroom.id}
              token={isMobile ? tokens.FS12FW500LH18M : tokens.FS14FW500LH19R}
              variant={
                value?.split(',')?.includes(bedroom.id)
                  ? 'black-light-bg'
                  : 'blackOutlined'
              }
              text={bedroom.label}
              onClick={() => onChange(bedroom.id)}
              justifyContent='center'
              style={{
                padding: '5px 10px',
                borderRadius: '10px',
              }}
            />
          ))}
        </Box>
      </Menu>
    </Box>
  );
};

const Bedrooms = [
  { id: 'Studio', label: 'Studio' },
  { id: '1 BedRoom', label: '1 Bedroom' },
  { id: '1.5 BedRoom', label: '1.5 Bedroom' },
  { id: '2 BedRooms', label: '2 Bedrooms' },
  { id: '2.5 BedRooms', label: '2.5 Bedrooms' },
  { id: '3 BedRooms', label: '3 Bedrooms' },
  { id: '3.5 BedRooms', label: '3.5 Bedrooms' },
  { id: '4 BedRooms', label: '4 Bedrooms' },
  { id: '4.5 BedRooms', label: '4.5 Bedrooms' },
  { id: '5 BedRooms', label: '5 Bedrooms' },
];

export default BedroomSelector;
