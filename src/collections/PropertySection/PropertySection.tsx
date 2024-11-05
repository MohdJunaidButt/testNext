import { Text } from '@/components';
import PropertyCard from '@/components/Cards/PropertyCard';
import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import EmblaCarousel from '@/components/EmblaCarousel/EmblaCarousel';
import NoListingFound from '@/components/NoListingFound/NoListingFound';
import useCurrency from '@/hooks/useCurrency';
import UseFavorites from '@/hooks/useFavorites';
import { colors, tokens } from '@/styles';
import { PropertySection as IPropertySection } from '@/types/common/propertySection';
import { getAddress } from '@/utils/misc';
import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';

export default function PropertySection({
  section,
}: {
  section: IPropertySection;
}) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { toggleFavorite, isPropertyFavorite } = UseFavorites();
  const { convertCurrency } = useCurrency();
  const router = useRouter();

  return (
    <>
      <Box my={'30px'}>
        <Text
          token={
            isMobile ? tokens.FS24FW800LH32_78EB : tokens.FS48FW800LH61_36B
          }
          text={section.name}
          color={colors.black21}
          textAlign='left'
        />
        <Box mt={'10px'} width='100%'>
          {section.properties?.length > 0 ? (
            <EmblaCarousel>
              {section.properties.map((property: any, ind: any) => (
                <div className='embla__slide' key={ind}>
                  <PropertyCard
                    condo={property}
                    isProtected={false}
                    key={`${property.id}${ind}`}
                    style={{
                      cursor: 'pointer',
                    }}
                    isFavorited={isPropertyFavorite(property.property_id)}
                    onToggleFavorite={() =>
                      toggleFavorite(
                        property.property_id,
                        isPropertyFavorite(property.property_id)
                      )
                    }
                    images={
                      property.featured_building_images &&
                      property.featured_building_images[0] &&
                      property.featured_building_images[0].url &&
                      property.featured_building_images[0].url !== '-'
                        ? [property.featured_building_images[0].url]
                        : ['/images/property/coming-soon.jpg']
                    }
                    tag={
                      property?.property_details.selling_category
                        ? property?.property_details.selling_category !== '-'
                          ? property?.property_details.selling_status
                          : property?.property_details.selling_status
                        : property?.property_details.selling_status
                    }
                    variant={'small'}
                    salePriceFrom={convertCurrency(
                      property.property_details.sales_price_from,
                      true,
                      '$XXX,XXX'
                    )}
                    salePriceTo={convertCurrency(
                      property.property_details.sales_price_to,
                      true,
                      '$XXX,XXX'
                    )}
                    onClick={() => {
                      router.push(
                        `/property/${property.property_details.slug}`
                      );
                    }}
                    propertyName={
                      property.property_details.project_development_name
                    }
                    propertySlug={property.property_details.slug}
                    propertyLocation={getAddress(
                      property?.property_details?.address,
                      property?.property_details?.city
                    )}
                    footerJSX={
                      <PropertyCardFooter
                        totalFloors={
                          property.property_details.total_floor_plans
                        }
                        availableFloors={
                          property.property_details.available_plans_dynamic
                        }
                        unavailableFloors={
                          property.property_details.total_floor_plans -
                          property.property_details.available_plans_dynamic
                        }
                      />
                    }
                  />
                </div>
              ))}
            </EmblaCarousel>
          ) : (
            <NoListingFound />
          )}
        </Box>
      </Box>
    </>
  );
}
