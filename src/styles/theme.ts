import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: '#2E66C2',
    },
    secondary: {
      main: '#1E692E',
      contrastText: 'white',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {
          maxHeight: '300px',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          '&.MuiMenu-paper': {
            borderRadius: 10,
            boxShadow: '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
            border: '1px solid #E1E1E1',
          },
        },
      },
    },
  },
});
