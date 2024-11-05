import { SearchBar, Text } from '@/components';
import Image from '@/components/Image/Image';
import { useDebouncedSearch } from '@/hooks';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { ISearchResData } from '@/types/collections/MapSearch';
import { MenuItem, Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

type SearchWithSuggestionsProps = {
  handleSelectedProperty: (prop: any) => void;
  barVer?: 'navSearch' | 'bgGreyEBRnd' | 'map';
  width?: string;
  searchUrl?: string;
  handleClearSearch?: (abc?: any) => void;
};

type FieldName = 'addresses' | 'cities' | 'searchTitles';

const searchRespLabelMap: Record<FieldName, string> = {
  cities: 'City',
  addresses: 'Address',
  searchTitles: 'Listing',
};
const sendRespLabelMap: Record<FieldName, string> = {
  cities: 'city',
  addresses: 'address',
  searchTitles: 'title',
};

const SearchWithSuggestions = ({
  handleSelectedProperty,
  barVer = 'map',
  width = '100%',
  searchUrl = '/properties/searchGlobal/',
  handleClearSearch,
}: SearchWithSuggestionsProps) => {
  const { searchQuery, searchResults, loading, handleSearchInputChange } =
    useDebouncedSearch<ISearchResData>(searchUrl);
  const [showSuggestions, setToggleSuggestions] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleMenuClick = async (
    event: React.MouseEvent<HTMLLIElement>,
    name?: string
  ) => {
    handleSearchInputChange('');
    const propIdDataString = event.currentTarget.getAttribute('data-propid')!;
    setToggleSuggestions(false);
    const propIdData = JSON.parse(propIdDataString);
    handleSearchInputChange(propIdData.label);

    return handleSelectedProperty({
      label: propIdData.label,
      type: sendRespLabelMap[propIdData.type as FieldName],
      slug: propIdData.slug,
      propertyType: propIdData.propertyType,
    });
  };

  const clearSearch = () => {
    handleSearchInputChange('');
    if (handleClearSearch) handleClearSearch();
    else router.push(router.pathname);
  };

  return (
    <Box
      position={'relative'}
      left={searchBarStyles(barVer).left}
      top={searchBarStyles(barVer).top}
      sx={{
        zIndex: 402,
      }}
      width={width}
    >
      <Box
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        gap={'15px'}
        sx={{
          backgroundColor: searchBarStyles(barVer).bgColor,
          boxShadow:
            barVer === 'map' ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'none',
          borderRadius: searchBarStyles(barVer).borderRadius,
        }}
        position='relative'
      >
        <SearchBar
          placeholder={
            barVer === 'navSearch'
              ? t('Search Property')
              : t('Search by address, city or listing name')
          }
          backGroundColor={searchBarStyles(barVer).bgColor}
          color={colors.black21}
          token={searchBarStyles(barVer).token}
          width='100%'
          height={`${searchBarStyles(barVer).height}px`}
          noBorder
          iconWidth={barVer === 'navSearch' ? 14 : 19}
          iconHeight={barVer === 'navSearch' ? 14 : 19}
          onChange={(value: string) => {
            if (value !== '') handleSearchInputChange(value.toLowerCase());
            else handleSearchInputChange('');
          }}
          onFocus={() => setToggleSuggestions(true)}
          onBlur={() =>
            showSuggestions &&
            setTimeout(() => setToggleSuggestions(false), 250)
          }
          value={searchQuery}
          isLoading={loading}
          handleClear={clearSearch}
        />
      </Box>
      {showSuggestions && searchQuery !== '' && (
        <Box
          width='100%'
          position='absolute'
          p={'20px 15px 0'}
          sx={{
            top: searchBarStyles(barVer).height + 6,
            borderRadius: '10px',
            boxShadow: '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${colors.greyE1}`,
            backgroundColor: colors.whiteFF,

            maxHeight: '400px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {loading ? (
            <>
              <SkeletonInner title={t('Address')} />
              <SkeletonInner title={t('City')} />
              <SkeletonInner title={t('Listings')} />
            </>
          ) : (
            searchResults && (
              <RenderMenuItems
                searchResults={
                  searchResults && {
                    addresses: searchResults.addresses,
                    cities: searchResults.cities,
                    searchTitles: searchResults.searchTitles,
                  }
                }
                handleMenuClick={handleMenuClick}
              />
            )
          )}
        </Box>
      )}
    </Box>
  );
};

function RenderMenuItems({
  searchResults,
  handleMenuClick,
}: {
  searchResults: ISearchResData;
  handleMenuClick: (
    event: React.MouseEvent<HTMLLIElement>,
    name?: string
  ) => void;
}) {
  let isFieldEmpty = Object.entries(searchResults).every(
    ([fieldName, fieldValue]) => fieldValue?.length === 0
  );

  const { t } = useTranslation();

  return (
    <>
      {!isFieldEmpty ? (
        Object.entries(searchResults)
          .filter(([_, fieldValue]) => fieldValue.length !== 0)
          .map(([fieldName, fieldValue], ind, arr) => (
            <Box
              key={`${fieldName}-${ind}`}
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              {...flexDirection.column}
              alignItems={'start'}
              mb={ind < arr.length - 1 ? '15px' : '0'}
              sx={{
                borderBottom:
                  ind < arr.length - 1
                    ? `1px solid ${colors.greyD931}`
                    : 'none',
              }}
            >
              <Text
                text={t(searchRespLabelMap[fieldName as FieldName])}
                token={tokens.FS16FW600LH21_86R}
                color={colors.black2D}
                textAlign='left'
                cursor={'pointer'}
                styles={{ fontSize: '18px' }}
              />
              {fieldValue?.length > 0 &&
                fieldValue?.map((el: any, ind: number) => (
                  <RenderMenuItem
                    key={`${typeof el === 'string' ? el : el?.id}-${ind}`}
                    label={
                      typeof el === 'string'
                        ? el
                        : `${
                            el?.property_details?.project_development_name ||
                            el?.project_development_name
                          }`
                    }
                    type={fieldName}
                    slug={
                      typeof el !== 'string'
                        ? el?.property_details?.slug || el?.slug
                        : null
                    }
                    propertyType={
                      typeof el !== 'string' ? el.property_type : null
                    }
                    onClick={handleMenuClick}
                  />
                ))}
            </Box>
          ))
      ) : (
        <Text
          text={t('No Result Found!')}
          token={tokens.FS16FW500LH21_86R}
          color={colors.black2D}
          textAlign='center'
          styles={{
            width: '100%',
            padding: '15px 0 0',
          }}
        />
      )}
    </>
  );
}

function RenderMenuItem({
  label,
  type,
  slug,
  propertyType,
  onClick,
}: {
  label: string;
  type: string;
  slug: string | null;
  propertyType: string | null;
  onClick: (event: React.MouseEvent<HTMLLIElement>) => void;
}) {
  return (
    <MenuItem
      data-propid={JSON.stringify({
        label,
        type,
        slug,
        propertyType,
      })}
      style={{
        padding: '15px 0',
        gap: '10px',
        width: '100%',
      }}
      onClick={onClick}
      sx={{
        '&.MuiMenuItem-root:hover': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Image
        src='/icons/location-pin-alt.svg'
        alt='location'
        width={'22px'}
        height={'22px'}
      />
      <Text
        text={label}
        token={tokens.FS16FW500LH18M}
        color={colors.black2D}
        textAlign='left'
        cursor={'pointer'}
        styles={{
          maxWidth: '400px',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: '1.3',
        }}
      />
    </MenuItem>
  );
}

const SkeletonInner = ({ title }: { title: string }) => {
  return (
    <>
      <Text
        text={title}
        token={tokens.FS16FW600LH21_86R}
        color={colors.black2D}
        textAlign='left'
        cursor={'pointer'}
        styles={{ fontSize: '18px', marginBottom: '15px' }}
      />
      <Box width='100%'>
        <Skeleton
          variant='rounded'
          width={'100%'}
          height={30}
          sx={{ marginBottom: '10px' }}
        />
        <Skeleton
          variant='rounded'
          width={'100%'}
          height={30}
          sx={{ marginBottom: '10px' }}
        />
      </Box>
    </>
  );
};

const searchBarStyles = (str: string) => {
  switch (str) {
    case 'navSearch':
      return {
        left: 0,
        top: 0,
        bgColor: colors.greyEB,
        token: tokens.FS14FW500LH19R,
        height: 39,
        resultListTop: '75px',
        borderRadius: '49px',
        border: `1px solid ${colors.greyE1}`,
      };
    case 'bgGreyEBRnd':
      return {
        left: 0,
        top: 0,
        bgColor: colors.greyEB,
        token: tokens.FS16FW500LH21_86R,
        height: 50,
        resultListTop: '75px',
        borderRadius: '8px',
        border: `none`,
      };

    default:
      return {
        left: 0,
        top: 0,
        bgColor: colors.whiteFF,
        token: tokens.FS16FW500LH21_86R,
        height: 50,
        resultListTop: '75px',
        borderRadius: '13px',
        border: `none`,
        boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
      };
  }
};

export default SearchWithSuggestions;
