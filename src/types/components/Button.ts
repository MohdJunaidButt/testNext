import { BoxProps, SxProps, Theme } from '@mui/material';

export interface ButtonProps {
  variant:
    | 'primary'
    | 'green'
    | 'grey'
    | 'black'
    | 'blackOutlined'
    | 'transparent'
    | 'blue'
    | 'darkBlue'
    | 'transparentWBlackText'
    | 'black-light-bg'
    | 'white'
    | 'red'
    | 'light_red'
    | 'light_yellow'
    | 'light_blue';
  text?: string | JSX.Element | undefined;
  icon?: any;
  iconAlt?: any;
  onClick: (e?: any) => void;
  width?: string;
  justifyContent: 'space-between' | 'center';
  lowPadding?: boolean;
  maxWidth?: boolean;
  marginRight?: string;
  iconReverse?: boolean;
  token: {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
  iconSize?: {
    height: number;
    width: number;
  };
  borderRadius?: string;
  style?: SxProps<Theme>;
  isLoading?: Boolean;
  disabled?: Boolean;
  form?: string;
  type?: 'submit' | 'action';
  tooltip?: string;
}
