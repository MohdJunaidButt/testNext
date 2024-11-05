import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import {
  Box,
  Divider,
  Menu,
  MenuItem,
  Stack,
  TextField,
  styled,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type CitySearchableFilterProps = {
  value: string;
  onChange: ({
    label,
    latitude,
    longitude,
  }: {
    label: string;
    latitude: number;
    longitude: number;
  }) => void;
  isBorderDark?: boolean;
  isRounded?: boolean;
  fullWidth?: boolean;
  minpadding?: boolean;
  size?: 'default' | 'small';
  cities: Array<{
    id: number;
    label: string;
    value: string;
    latitude: number;
    longitude: number;
  }>;
};

const CitySearchableFilter = ({
  value,
  onChange,
  isBorderDark,
  isRounded,
  fullWidth = true,
  size = 'default',
  cities,
}: CitySearchableFilterProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement | null>();
  const { t } = useTranslation();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [search, setSearch] = useState('');
  const [searchedCityList, setSearchedCityList] = useState(cities);
  const handleSearchTxt = (val: string) => {
    setSearch(val);
    let cityList = cities.filter((city) =>
      city.label.toLowerCase().includes(val.toLowerCase())
    );
    setSearchedCityList(cityList);
  };

  useEffect(() => {
    if (cities.length > 0) setSearchedCityList(cities);
  }, [cities]);

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
        width={'inherit'}
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
          text={value === '' ? t('City') : value}
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
            width: fullWidth ? 'inherit' : 'fit-content',
            maxHeight: '350px',
          },
          '& .MuiMenu-list, & .MuiList-root': {
            width: 'fit-content',
            minWidth: '200px',
            maxHeight: '348px',
            paddingBlock: '15px',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Box
          sx={{
            border: `1px solid ${colors.black21}`,
            borderRadius: '49px',
            padding: '6px 30px 6px 12px',
            lineHeight: '1.2',
            mx: '10px',
            position: 'relative',
          }}
        >
          <TextField
            variant='standard'
            placeholder={t('Search City')}
            size='small'
            onChange={(e) => handleSearchTxt(e.target.value)}
            value={search}
            sx={{
              color: colors.black21,
              textAlign: 'left',
              '& .MuiInput-root': {
                ...tokens.FS14FW500LH19R,
                lineHeight: '1.3',
              },
              '& .MuiInput-root:before, & .MuiInput-root:after': {
                display: 'none',
              },
              '& .MuiInput-input': {
                flex: 1,
                minWidth: '60px',
                maxWidth: '125px',
                padding: 0,
                height: 'unset',
                '&::placeholder': {
                  color: colors.black21,
                  opacity: 0.7,
                },
              },
            }}
          />
          {search && (
            <Button
              text=''
              justifyContent='center'
              onClick={() => handleSearchTxt('')}
              token={tokens.FS16FW500LH21_86R}
              variant='black'
              borderRadius='50px'
              width='fit-content'
              icon={'/icons/close-alt.svg'}
              iconAlt={'/icons/close-alt.svg'}
              iconSize={{ width: 7, height: 7 }}
              style={{
                height: 'fit-content',
                padding: '5px',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                right: '6px',
              }}
            />
          )}
        </Box>
        <Divider sx={{ my: 1, mx: '10px' }} />
        <Box height='auto' sx={{ overflowY: 'auto' }}>
          {searchedCityList.length > 0 ? (
            searchedCityList.map((city, idx, arr) => (
              <MenuItem
                key={city.id}
                style={{
                  padding: '10px 10px',
                  gap: '15px',
                }}
                onClick={() => {
                  onChange({
                    label: city.label,
                    latitude: city.latitude,
                    longitude: city.longitude,
                  });
                  handleClose();
                }}
              >
                <Text
                  text={city.label}
                  token={tokens.FS16FW500LH18M}
                  color={colors.black2D}
                  textAlign='left'
                  cursor={'pointer'}
                />
              </MenuItem>
            ))
          ) : (
            <MenuItem
              style={{
                padding: '10px 0',
                gap: '15px',
                justifyContent: 'center',
              }}
            >
              <Text
                text={t('No city found')}
                token={tokens.FS16FW500LH18M}
                color={colors.black2D}
                cursor={'pointer'}
              />
            </MenuItem>
          )}
        </Box>
      </Menu>
    </Box>
  );
};

export default CitySearchableFilter;
