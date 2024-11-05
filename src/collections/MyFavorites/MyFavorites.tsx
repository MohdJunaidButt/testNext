/* eslint-disable react-hooks/exhaustive-deps */
import {
  GridContainer,
  ResponsiveCarousal,
  SearchBar,
  Text,
} from '@/components';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import Divider from '@/components/Divider/Divider';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import useCurrency from '@/hooks/useCurrency';
import { addFavorite, removeFavorite } from '@/services/api';
import { AppDispatch, RootState } from '@/store';
import { fetchUserFavoritesAsync } from '@/store/slices/favorities';
import { colors, gridContainer, tokens } from '@/styles';
import {
  Box,
  CircularProgress,
  Grid,
  Stack,
  useMediaQuery,
} from '@mui/material';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MyFavorites = () => {
  const isMd = useMediaQuery('(max-width:950px)');
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isSmMob = useMediaQuery('(min-width:465px) and (max-width: 650px)');
  const { favorites, status, error } = useSelector(
    (state: RootState) => state.favorities
  );
  const { convertCurrency } = useCurrency();

  const [searchInput, setSearchInput] = useState('');
  const [filteredFav, setFilteredFav] = useState<any[]>([]);

  const dispatch: AppDispatch = useDispatch();

  const fetchFavoritesData = useCallback(async () => {
    try {
      await dispatch(fetchUserFavoritesAsync()).then((res) =>
        setFilteredFav(res.payload || [])
      );
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchFavoritesData();
  }, []);

  useEffect(() => {
    if (searchInput.trim().length === 0) return setFilteredFav(favorites);

    setFilteredFav(
      filteredFav.filter((item: any) =>
        item.property_details.project_development_name
          .toLowerCase()
          .includes(searchInput)
      )
    );
  }, [searchInput]);

  const toggleFavorite = async (propertyId: number, isFavorited: boolean) => {
    try {
      if (isFavorited) {
        await removeFavorite(propertyId);
      } else {
        await addFavorite(propertyId);
      }
      await fetchFavoritesData();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleTxtChange = (value: string) => setSearchInput(value);
  const clearSearch = () => setSearchInput('');

  const router = useRouter();
  return (
    <Box my={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <GridContainer>
          <Grid item xs={12}>
            <Text
              text='My Favorites'
              color={colors.black21}
              token={
                isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS36FW700LH49_18B
              }
              textAlign='left'
              styles={{ marginBottom: '10px' }}
            />
            <SearchBar
              backGroundColor={colors.greyEB}
              color={colors.black21}
              token={tokens.FS16FW500LH21_86R}
              placeholder='Search by listing name'
              width={isMobile ? '100%' : '500px'}
              height='50px'
              borderRadius='8px'
              onChange={handleTxtChange}
              value={searchInput}
              handleClear={clearSearch}
            />
            <Divider styles={{ marginBlock: '50px' }} />
            {status === 'loading' ? (
              <Stack
                mx='auto'
                width='fit-content'
                minHeight={'400px'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <CircularProgress />
              </Stack>
            ) : status === 'succeeded' &&
              filteredFav &&
              filteredFav.length > 0 ? (
              <>
                {!isMd ? (
                  <Box {...gridContainer} flexWrap={'wrap'}>
                    {filteredFav.map((favorite: any, ind: any) => {
                      return (
                        <PropertyCard
                          condo={favorite}
                          onToggleFavorite={() =>
                            toggleFavorite(favorite.property_id, true)
                          }
                          isFavorited={true}
                          isProtected={false}
                          key={`${favorite.id}${ind}`}
                          style={{
                            margin: '0px 7px 20px 7px',
                            cursor: 'pointer',
                          }}
                          images={
                            favorite.featured_building_images &&
                            favorite.featured_building_images[0] &&
                            favorite.featured_building_images[0].url
                              ? [favorite.featured_building_images[0].url]
                              : ['/images/property/coming-soon.jpg']
                          }
                          tag={'Most Popular'}
                          variant={'small'}
                          salePriceFrom={convertCurrency(
                            favorite.property_details.sales_price_from,
                            true,
                            '$XXX,XXX'
                          )}
                          salePriceTo={convertCurrency(
                            favorite.property_details.sales_price_to,
                            true,
                            '$XXX,XXX'
                          )}
                          onClick={() => {
                            router.push(
                              `/property/${favorite.property_details.slug}`
                            );
                          }}
                          propertyName={
                            favorite.property_details.project_development_name
                          }
                          propertySlug={favorite.property_details.slug}
                          propertyLocation={`${favorite.property_details.address}, ${favorite.property_details.city}`}
                          footerJSX={
                            <PropertyCardFooter
                              totalFloors={
                                favorite.property_details.total_floor_plans
                              }
                              availableFloors={
                                favorite.property_details
                                  .available_plans_dynamic
                              }
                              unavailableFloors={
                                favorite.property_details.total_floor_plans -
                                favorite.property_details
                                  .available_plans_dynamic
                              }
                            />
                          }
                        />
                      );
                    })}
                  </Box>
                ) : (
                  <>
                    <EmblaCarousel>
                      {filteredFav.map((favorite: any, ind: any) => (
                        <div className='embla__slide' key={ind}>
                          <PropertyCard
                            condo={favorite}
                            onToggleFavorite={() =>
                              toggleFavorite(favorite.property_id, true)
                            }
                            isFavorited={true}
                            isProtected={false}
                            key={`${favorite.id}${ind}`}
                            style={{
                              margin: '0px 7px 20px 7px',
                              cursor: 'pointer',
                            }}
                            images={
                              favorite.featured_building_images &&
                              favorite.featured_building_images[0] &&
                              favorite.featured_building_images[0].url &&
                              favorite.featured_building_images[0].url !== '-'
                                ? [favorite.featured_building_images[0].url]
                                : ['/images/property/coming-soon.jpg']
                            }
                            tag={'Most Popular'}
                            variant={'small'}
                            salePriceFrom={convertCurrency(
                              favorite.property_details.sales_price_from,
                              true,
                              '$XXX,XXX'
                            )}
                            salePriceTo={convertCurrency(
                              favorite.property_details.sales_price_to,
                              true,
                              '$XXX,XXX'
                            )}
                            onClick={() => {
                              router.push(
                                `/property/${favorite.property_details.slug}`
                              );
                            }}
                            propertyName={
                              favorite.property_details.project_development_name
                            }
                            propertySlug={favorite.property_details.slug}
                            propertyLocation={`${favorite?.property_details?.address}, ${favorite?.property_details?.city}`}
                            footerJSX={
                              <PropertyCardFooter
                                totalFloors={
                                  favorite.property_details.total_floor_plans
                                }
                                availableFloors={
                                  favorite.property_details
                                    .available_plans_dynamic
                                }
                                unavailableFloors={
                                  favorite.property_details.total_floor_plans -
                                  favorite.property_details
                                    .available_plans_dynamic
                                }
                              />
                            }
                          />
                        </div>
                      ))}
                    </EmblaCarousel>
                  </>
                )}
              </>
            ) : status === 'failed' ? (
              <div>Error: {error}</div>
            ) : (
              <Box width='fit-content' mx='auto'>
                <NoListingFound />
              </Box>
            )}
          </Grid>
        </GridContainer>
      </ResponsiveContainer>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(MyFavorites), { ssr: false });
