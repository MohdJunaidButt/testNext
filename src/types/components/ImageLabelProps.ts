import { Fonts } from '../fonts';

export interface ImageLabelProps {
  text: string;
  token: Fonts;
  color: string;
  bgColor: string;
  border: string;
  borderRadius: string;
  top?: number | string;
  bottom?: number | string;
  right?: number | string;
  left?: number | string;
  minWidth?: string;
  styles?: React.CSSProperties;
  isRelative?: boolean;
  icon?: string;
  iconSize?: { width: number; height: number };
  iconPlacement?: 'start' | 'end';
}
