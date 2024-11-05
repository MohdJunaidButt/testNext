import { formatPrice } from '@/commonFunctions/commonFunctions';
import { SearchBar, Text } from '@/components';
import Image from '@/components/Image/Image';
import NoDataExists from '@/components/NoData/NoDataExists';
import { useDebouncedSearch } from '@/hooks';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import {
  IGlobalSearchProperty,
  IHomeSearch,
} from '@/types/collections/homeHeaderSearch';
import { getPriceAccToCurrency } from '@/utils/convertPriceByCurrency';
import { Divider, Skeleton, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const searchVer = (ver: string) => {
  if (ver === 'greyLightRounded')
    return {
      backColor: colors.greyEB,
      color: colors.black21,
      height: 60,
      top: 75,
      borderRadius: '10px',
    };
  else
    return {
      backColor: colors.greyEB,
      color: colors.black21,
      height: 60,
      top: 75,
      borderRadius: '49px',
    };
};
interface ISearchWithSuggestions {
  barVer?: string;
  width?: string;
}

const SearchWithSuggestionsNew = ({
  barVer = 'greyLightSquared',
  width = '100%',
}: ISearchWithSuggestions) => {
  const {
    searchQuery,
    searchResults,
    loading,
    handleSearchInputChange,
    setSearchQuery,
  } = useDebouncedSearch<IHomeSearch>('/properties/homepage-navbar2/');
  const { currency } = useSelector((st: RootState) => st.Auth);
  const [showSuggestions, setToggleSuggestions] = useState(false);
  const router = useRouter();
  const { t } = useTranslation();

  const handleListingClick = (e: any) => {
    const { propid } = e.currentTarget.dataset;
    let getListing = searchResults?.properties.find(
      (el) => el.property_id === +propid
    );
    window.open(`/property/${getListing?.property_details.slug}`, '_blank');
  };

  const handleLocationClick = (e: any) => {
    const { locid, loctype } = e.currentTarget.dataset;
    router.push(`/browse-map?${loctype}=${locid}`);
  };

  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Box position={'relative'} zIndex={999} width={width}>
      <Box
        {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
        gap={'15px'}
        sx={{
          backgroundColor: searchVer(barVer).backColor,
          borderRadius: '49px',
          paddingInline: '5px',
          border: `1px solid #d9d9d9`,
        }}
      >
        <SearchBar
          placeholder={t('Search by address, city or listing name')}
          backGroundColor={searchVer(barVer).backColor}
          color={searchVer(barVer).color}
          token={isDesktop ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R}
          width='100%'
          borderRadius='49px'
          height={`${
            isMobile
              ? searchVer(barVer).height - 15
              : isDesktop
              ? searchVer(barVer).height - 7
              : searchVer(barVer).height
          }px`}
          noBorder
          iconWidth={isMobile ? 15 : 19}
          iconHeight={isMobile ? 15 : 19}
          value={searchQuery}
          isLoading={loading}
          onChange={(value: string) => {
            if (value !== '') handleSearchInputChange(value);
            else handleSearchInputChange('');
          }}
          onFocus={() => setToggleSuggestions(true)}
          onBlur={() => setTimeout(() => setToggleSuggestions(false), 250)}
          handleClear={() => handleSearchInputChange('')}
        />
      </Box>
      {showSuggestions && searchQuery !== '' && (
        <Box
          width='100%'
          position='absolute'
          sx={{
            borderRadius: '10px',
            top:
              (isMobile
                ? searchVer(barVer).height - 15
                : isDesktop
                ? searchVer(barVer).height - 7
                : searchVer(barVer).height) + 10,
            boxShadow: '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${colors.greyE1}`,
            backgroundColor: colors.whiteFF,
            zIndex: 2,
            maxHeight: '400px',
            padding: '15px',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          {loading ? (
            <>
              <Text
                text={t('Cities')}
                token={tokens.FS16FW600LH21_86R}
                color={colors.black2D}
                textAlign='left'
                cursor={'pointer'}
                styles={{ marginBottom: '15px' }}
              />
              <LocationSkeleton />
              <LocationSkeleton />
              <Text
                text={t('Locations')}
                token={tokens.FS16FW600LH21_86R}
                color={colors.black2D}
                textAlign='left'
                cursor={'pointer'}
                styles={{ marginBlock: '15px' }}
              />
              <LocationSkeleton />
              <LocationSkeleton />
              <Text
                text={t('Condos/Houses')}
                token={tokens.FS16FW600LH21_86R}
                color={colors.black2D}
                textAlign='left'
                cursor={'pointer'}
                styles={{ marginBlock: '15px' }}
              />
              <ListingSkeleton />
              <ListingSkeleton />
            </>
          ) : (
            searchResults && (
              <>
                {searchResults.cities.length > 0 && (
                  <>
                    <Text
                      text={t('Cities')}
                      token={tokens.FS16FW600LH21_86R}
                      color={colors.black2D}
                      textAlign='left'
                      styles={{ flex: 1 }}
                    />
                    {searchResults.cities.map((el: string, ind: number) => (
                      <RenderSingleLocation
                        key={`${el}-ind`}
                        locType='city'
                        description={el}
                        handleClick={handleLocationClick}
                      />
                    ))}
                  </>
                )}
                {searchResults.addresses.length > 0 && (
                  <>
                    <Text
                      text={t('Locations')}
                      token={tokens.FS16FW600LH21_86R}
                      color={colors.black2D}
                      textAlign='left'
                      styles={{ flex: 1, mt: 2 }}
                    />
                    {searchResults.addresses.map((el: string, ind: number) => (
                      <RenderSingleLocation
                        key={`${el}-ind`}
                        locType='address'
                        description={el}
                        handleClick={handleLocationClick}
                      />
                    ))}
                  </>
                )}
                {searchResults.properties.length > 0 && (
                  <>
                    <Text
                      text={t('Condos/Houses')}
                      token={tokens.FS16FW600LH21_86R}
                      color={colors.black2D}
                      textAlign='left'
                      styles={{ flex: 1, mt: 2 }}
                    />
                    {searchResults.properties.map(
                      (el: IGlobalSearchProperty, ind: number) => (
                        <>
                          <RenderSingleListing
                            key={el.id}
                            listingInfo={el}
                            handleItemClick={handleListingClick}
                            currencySelec={currency}
                          />
                          {ind < searchResults.properties.length - 1 && (
                            <Divider />
                          )}
                        </>
                      )
                    )}
                  </>
                )}
                {searchResults.cities.length === 0 &&
                  searchResults.addresses.length === 0 &&
                  searchResults.properties.length === 0 && <NoDataExists />}
              </>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

function RenderSingleLocation({
  handleClick,
  locType,
  description,
}: {
  handleClick: (event: any) => void;
  locType: string;
  description: string;
}) {
  const { t } = useTranslation();
  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      gap={'10px'}
      py={'16px'}
      sx={{ cursor: 'pointer' }}
      data-locid={description}
      data-loctype={locType}
      onClick={handleClick}
    >
      <Image
        src={
          locType === 'city'
            ? '/icons/city-loc.svg'
            : '/icons/location-pin-new.svg'
        }
        alt='location'
        width={'20px'}
        height={'20px'}
      />
      <Text
        text={description}
        token={tokens.FS14FW500LH19R}
        color={colors.black21}
        textAlign='left'
        styles={{ flex: 1, fontSize: { xs: '13px', sm: '14px' } }}
        cursor='pointer'
      />
      <Text
        text={locType === 'city' ? t('City') : t('Address')}
        token={tokens.FS13FW400LH18R}
        color={colors.grey8F}
        textAlign='center'
        cursor='pointer'
      />
    </Box>
  );
}
function RenderSingleListing({
  handleItemClick,
  listingInfo,
  currencySelec,
}: {
  handleItemClick: (event: any) => void;
  listingInfo: IGlobalSearchProperty;
  currencySelec: {
    label: string;
    symbol: string;
    value: number;
  };
}) {
  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      gap={'10px'}
      sx={{
        cursor: 'pointer',
        '& img': {
          objectFit: 'cover',
        },
      }}
      py={'16px'}
      alignItems='stretch'
      onClick={handleItemClick}
      data-propid={listingInfo.property_id}
    >
      <Image
        src={
          listingInfo?.featured_building_images?.length > 0 &&
          listingInfo?.featured_building_images?.[0]?.url !== '-'
            ? listingInfo?.featured_building_images?.[0]?.url
            : '/images/property/coming-soon.jpg'
        }
        alt='location'
        width={'70px'}
        height={'70px'}
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      />
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        {...flexDirection.column}
        alignItems='stretch'
        flex={1}
      >
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          gap={'10px'}
        >
          <Text
            text={
              listingInfo?.property_details?.sales_price_from !== '0' &&
              listingInfo?.property_details?.sales_price_to !== '0'
                ? `${formatPrice(
                    getPriceAccToCurrency(
                      listingInfo?.property_details?.sales_price_from,
                      currencySelec.value
                    ),
                    currencySelec.symbol
                  )} - ${formatPrice(
                    getPriceAccToCurrency(
                      listingInfo?.property_details?.sales_price_to,
                      currencySelec.value
                    ),
                    currencySelec.symbol
                  )}`
                : `${currencySelec.symbol || '$'}XXX,XXX`
            }
            token={tokens.FS14FW600LH16SB}
            color={
              listingInfo?.property_details?.sales_price_from !== '0'
                ? colors.blueC2
                : colors.red4C
            }
            textAlign='left'
            cursor='pointer'
            styles={{
              wordBreak: 'break-word',
              fontSize: { xs: '13px', sm: '14px' },
            }}
          />
          <Text
            text={listingInfo?.property_details?.selling_status}
            token={tokens.FS14FW600LH16SB}
            color={
              listingInfo?.property_details?.sales_price_from !== '0'
                ? colors.blueC2
                : listingInfo?.property_details?.selling_status === 'Sold Out'
                ? colors.red4C
                : colors.blueC2
            }
            cursor='pointer'
            textAlign='left'
            styles={{ fontSize: { xs: '13px', sm: '14px' } }}
          />
        </Box>
        <Text
          text={listingInfo?.property_details?.project_title}
          token={tokens.FS14FW500LH19R}
          color={colors.black21}
          textAlign='left'
          cursor='pointer'
          styles={{ marginTop: '10px', fontSize: { xs: '12px', sm: '14px' } }}
        />
        <Text
          text={
            `${listingInfo?.property_details?.address}, ${listingInfo?.property_details?.city}` ||
            '-'
          }
          token={tokens.FS13FW400LH18R}
          color={colors.grey8F}
          textAlign='left'
          cursor='pointer'
          styles={{ marginTop: '3px', fontSize: { xs: '11px', sm: '13px' } }}
        />
      </Box>
    </Box>
  );
}

const LocationSkeleton = () => {
  return (
    <Box
      width='100%'
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      gap={'25px'}
      mb={'10px'}
    >
      <Skeleton variant='rounded' width={400} height={25} />
      <Skeleton variant='rounded' width={80} height={25} />
    </Box>
  );
};
const ListingSkeleton = () => {
  return (
    <Box
      width='100%'
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      gap={'15px'}
      mb={'13px'}
    >
      <Skeleton variant='rounded' width={70} height={70} />
      <Box
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        {...flexDirection.column}
        alignItems='start'
        gap={'5px'}
        flex={1}
      >
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          mb={'10px'}
          width='100%'
        >
          <Skeleton variant='rounded' width={65} height={15} />
          <Skeleton variant='rounded' width={65} height={15} />
        </Box>
        <Skeleton variant='rounded' width={100} height={15} />
        <Skeleton variant='rounded' width={150} height={20} />
      </Box>
    </Box>
  );
};

export default SearchWithSuggestionsNew;
