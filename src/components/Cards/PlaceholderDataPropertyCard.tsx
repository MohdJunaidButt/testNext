import PropertyCardFooter from '@/components/Cards/PropertyCardFooter';
import { Box } from '@mui/material';
import PropertyCard, { PropertyCardPropsPartial } from './PropertyCard';

export default function PlaceholderDataPropertyCard({
  tag,
  onClick,
  style,
  variant = 'medium',
  isCompare = false,
  isSelected = false,
  onSelect,
  footerJSX1: JSX,
  isProtected = false,
  name = 'Olive Residences Condos',
  slug = '',
  address = '6th ave, london street, london',
  salePriceFrom,
  isFavorited,
  onToggleFavorite,
  totalFloors,
  availableFloors,
  availability,
  salePriceTo,
  images,
}: PropertyCardPropsPartial) {
  return (
    <Box position='relative'>
      <PropertyCard
        isFavorited={isFavorited}
        onToggleFavorite={onToggleFavorite}
        style={{
          cursor: 'pointer',
          ...style,
        }}
        images={images ? images : ['/images/property/coming-soon.jpg']}
        tag={tag}
        variant={variant}
        salePriceFrom={salePriceFrom || ''}
        salePriceTo={salePriceTo || ''}
        onClick={() => onClick()}
        propertyName={name}
        propertySlug={slug}
        propertyLocation={address}
        isProtected={isProtected}
        isCompare={isCompare}
        isSelected={isSelected}
        onSelect={onSelect}
        footerJSX={
          <PropertyCardFooter
            totalFloors={+totalFloors}
            availableFloors={+availableFloors}
            unavailableFloors={+availability}
          />
        }
      />
    </Box>
  );
}
