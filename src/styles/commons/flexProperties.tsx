import { responsiveFontSizes, useMediaQuery } from '@mui/material';

export const displayFlexAlignItemsCenterJustifyContentCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
export const displayFlexAlignItemsCenterJustifyContentSpaceBetween = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
export const displayFlexAlignItemsCenterJustifyContentFlexStart = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
};
export const displayFlexAlignItemsCenterJustifyContentFlexEnd = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
};
export const flexDirection = {
  row: {
    flexDirection: 'row' as any,
  },
  column: {
    flexDirection: 'column' as any,
  },
};

export const gridContainer = {
  display: 'grid',
  // gridTemplateColumns: {
  //   xs: `repeat(auto-fit, minmax(240px, max-content))`,
  //   sm: `repeat(auto-fit, minmax(240px, max-content))`,
  //   lg: `repeat(auto-fit, minmax(240px, max-content))`,
  // },
  justifyContent: { xs: 'center', sm: 'unset' },
  rowGap: '20px',
  columnGap: '20px',
  gridTemplateColumns: {
    xs: `repeat(auto-fill, minmax(290px, max-content))`,
    sm: `repeat(auto-fill, minmax(290px, 1fr))`,
  },
};
