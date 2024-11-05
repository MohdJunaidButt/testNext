import { BoxProps, SxProps, Theme } from '@mui/material';

export interface GridContainerProps {
  children: JSX.Element;
  justifyContent?: 'center' | 'space-between' | 'flex-start' | 'flex-end';
  spacing?: number;
  alignItems?: 'center' | 'inherit' | 'end' | 'baseline' | 'stretch';
  styles?: SxProps<Theme>;
}
