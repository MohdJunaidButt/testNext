import {
  displayFlexAlignItemsCenterJustifyContentCenter,
  flexDirection,
} from '@/styles';
import { ResponsiveContainerProps } from '@/types';
import { Box, useMediaQuery, useTheme } from '@mui/material';

export default function ResponsiveContainer({
  noRightMargin = false,
  isSidePadding = true,
  children,
}: ResponsiveContainerProps) {
  let screenSize = '';
  const theme = useTheme();

  const isXlg = useMediaQuery('(min-width:1810px)');
  if (useMediaQuery(theme.breakpoints.up('xs'))) screenSize = 'xs';
  if (useMediaQuery(theme.breakpoints.up('sm'))) screenSize = 'sm';
  if (useMediaQuery(theme.breakpoints.up('md'))) screenSize = 'md';
  if (useMediaQuery(theme.breakpoints.up('lg'))) screenSize = 'lg';
  if (useMediaQuery('(min-width:1530px)')) screenSize = 'xl';

  const getMargins = () => {
    switch (screenSize) {
      case 'md': {
        if (noRightMargin) {
          return {
            marginLeft: '1%',
          };
        } else {
          return {
            width: '95%',
          };
        }
      }
      case 'lg': {
        if (noRightMargin) {
          return {
            marginLeft: '5%',
          };
        } else {
          return {
            width: '95%',
            maxWidth: '1300px',
            marginInline: 'auto',
          };
        }
      }
      case 'xl': {
        if (noRightMargin) {
          return {
            marginLeft: '10%',
          };
        } else {
          return {
            width: '92%',
          };
        }
      }
      default: {
        if (noRightMargin) {
          return {
            width: '97%',
          };
        } else {
          return {
            width: '97%',
          };
        }
      }
    }
  };

  return (
    <Box
      width={'100%'}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      {...flexDirection.column}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1600px',
          marginInline: 'auto',
          ...(isSidePadding && { paddingInline: { xs: '15px', md: '20px' } }),
          // ...(isSidePadding &&
          //   !isXlg && {
          //     paddingInline: { xs: '15px', md: '20px' },
          //   }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
