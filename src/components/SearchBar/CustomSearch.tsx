import { Text } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { searchGlobal, searchNavbar1 } from '@/services/api';
import { colors, tokens } from '@/styles';
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import React, { MouseEvent, useEffect, useState } from 'react';
import { SearchBar } from './SearchBar';

// Define the type for search results
type SearchResults = {
  addresses: string[];
  cities: string[];
  searchTitles: string[];
};

type CustomSearchBarProps = {
  color: string;
  token: any; // Adjust the type according to your token object
  backGroundColor: string;
  placeholder: string;
  width: string;
};

// Define the mapping types
const searchRespLabelMap: Record<keyof SearchResults, string> = {
  cities: 'City',
  addresses: 'Address',
  searchTitles: 'Listing',
};

const sendRespLabelMap: Record<keyof SearchResults, string> = {
  cities: 'city',
  addresses: 'address',
  searchTitles: 'title',
};

export function CustomSearchBar({
  color,
  token,
  backGroundColor,
  placeholder,
  width,
}: CustomSearchBarProps) {
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults | null>(
    null
  );
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (searchValue) {
      setLoading(true);
      searchNavbar1(searchValue)
        .then((data) => {
          setLoading(false);
          setSearchResults(data);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error:', error);
        });
    } else {
      setSearchResults(null);
    }
  }, [searchValue]);

  const handleMenuClick = (event: MouseEvent<HTMLLIElement>) => {
    const propIdDataString = event.currentTarget.getAttribute('data-propid');
    if (propIdDataString) {
      const propIdData = JSON.parse(propIdDataString);
      setShowSuggestions(false);
      router.push(`/browse-map?${propIdData.type}=${propIdData.label}`);
    }
  };

  return (
    <Box position={'relative'} zIndex={999}>
      <SearchBar
        backGroundColor={backGroundColor}
        color={color}
        placeholder={placeholder}
        token={token}
        width={width}
        styles={{ padding: '8px 20px' }}
        onChange={setSearchValue}
        onFocus={() => setShowSuggestions(true)}
      />
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            right: 20,
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          <CircularProgress size={24} />
        </Box>
      )}
      {showSuggestions && searchResults && (
        <Box
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
            position: 'absolute',
          }}
        >
          <Button
            token={tokens.FS16FW500LH18M}
            text=''
            onClick={(e) => {
              setSearchValue('');
              setShowSuggestions(false);
            }}
            variant='grey'
            justifyContent='center'
            borderRadius='6px'
            width='fit-content'
            icon='/icons/close.svg'
            iconAlt='/icons/close-alt.svg'
            iconSize={{ width: 13, height: 13 }}
            style={{
              padding: '13px',
              width: '25px',
              height: '25px',
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
          />
          {Object.entries(searchResults).map(([fieldName, fieldValue], ind) => (
            <Box
              key={`${fieldName}-${fieldValue}`}
              borderBottom={
                ind < Object.entries(searchResults).length - 1
                  ? `1px solid ${colors.greyD931}`
                  : 'none'
              }
              p={'20px 15px'}
            >
              <Text
                text={searchRespLabelMap[fieldName as keyof SearchResults]}
                token={tokens.FS16FW600LH21_86R}
                color={colors.black2D}
                textAlign='left'
                cursor={'pointer'}
                styles={{ fontSize: '18px' }}
              />
              {fieldValue.length > 0 ? (
                fieldValue.map((el, ind) => (
                  <MenuItem
                    key={`${el}-${ind}`}
                    data-propid={JSON.stringify({
                      label: el,
                      type: sendRespLabelMap[fieldName as keyof SearchResults],
                    })}
                    style={{
                      padding: '10px 15px',
                      gap: '10px',
                      width: '100%',
                    }}
                    onClick={handleMenuClick}
                  >
                    <Image
                      src='/icons/location-pin-alt.svg'
                      alt='location'
                      width={'22px'}
                      height={'22px'}
                    />
                    <Text
                      text={el}
                      token={tokens.FS14FW600LH16SB}
                      color={colors.black2D}
                      textAlign='left'
                      cursor={'pointer'}
                      styles={{
                        maxWidth: '400px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    />
                  </MenuItem>
                ))
              ) : (
                <Text
                  text={'No Result Found!'}
                  token={tokens.FS16FW500LH21_86R}
                  color={colors.black2D}
                  textAlign='center'
                  styles={{ width: '100%' }}
                />
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
