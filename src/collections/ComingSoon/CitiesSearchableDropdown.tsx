import { SearchBar, Text } from '@/components';
import { colors, tokens } from '@/styles';
import { Box, MenuItem, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const CitiesSearchableDropdown = ({
  onSearch,
  onResetSearch,
  cities,
  backGroundColor,
  width,
  height,
  placeholder = 'Which city are you interested in?',
  borderRadius = '10px',
}: {
  onSearch: (searchQuery: string) => void;
  onResetSearch: () => void;
  cities: any;
  backGroundColor?: string;
  width?: string;
  height?: string;
  placeholder?: string;
  borderRadius?: string;
}) => {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const [searchQuery, setSearchQuery] = useState('');
  const [showResultList, setShowResultList] = useState(false);
  const [autoFillData, setAutoFillData] = useState(
    Array<{ id: number; label: string; value: string }>
  );

  const { t } = useTranslation();

  const handleSearchInput = (searchString: string) =>
    setSearchQuery(searchString.toUpperCase());

  useEffect(() => {
    if (searchQuery.trim() !== '')
      setAutoFillData(
        cities.filter((el: any) =>
          el.label.toUpperCase().startsWith(searchQuery)
        )
      );
    else setAutoFillData([]);
  }, [cities, searchQuery]);

  const renderAutoFillData = () => {
    return (
      <Box
        width='100%'
        position='absolute'
        sx={{
          top: '50px',
          borderRadius: '10px',
          boxShadow: '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
          border: `1px solid ${colors.greyE1}`,
          backgroundColor: colors.whiteFF,
          zIndex: 22222,
          maxHeight: '400px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {autoFillData.map((data, index) => (
          <MenuItem
            key={index}
            style={{
              padding: '10px 15px',
              gap: '15px',
            }}
            onClick={() => {
              onSearch(data.label);
              setSearchQuery(data.label);
              setAutoFillData([]);
            }}
          >
            <Image
              src='/icons/location-pin-alt.svg'
              alt='location'
              width={22}
              height={22}
              loading='eager'
              priority
            />{' '}
            <Text
              text={data.label}
              token={tokens.FS16FW500LH18M}
              color={colors.black2D}
              textAlign='left'
              cursor={'pointer'}
            />
          </MenuItem>
        ))}
      </Box>
    );
  };

  return (
    <Box position='relative' width='100%'>
      <SearchBar
        color={colors.black21}
        token={tokens.FS14FW400LH19R}
        backGroundColor={backGroundColor || colors.greyEB}
        placeholder={t(placeholder)}
        width={width || isMobile ? '100%' : '350px'}
        height={height}
        styles={{
          padding: '5px 15px',
          marginInline: 'auto',
          borderRadius,
        }}
        onChange={handleSearchInput}
        value={searchQuery}
        onFocus={() => setShowResultList(true)}
        onBlur={() => setTimeout(() => setShowResultList(false), 100)}
        handleClear={() => {
          setSearchQuery('');
          onResetSearch();
          setAutoFillData([]);
        }}
      />
      {showResultList && autoFillData.length > 0 && renderAutoFillData()}
    </Box>
  );
};

export default CitiesSearchableDropdown;
