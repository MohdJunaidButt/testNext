import { BoxProps, SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';
import { Fonts } from '../fonts';

export interface TextProps {
  text: string | undefined;
  token: Fonts;
  color: string;
  textAlign?: 'center' | 'left' | 'right';
  cursor?: 'default' | 'pointer';
  redirect?: string;
  styles?: SxProps<Theme> | undefined;
  handleClick?: (e?: any) => void;
}
