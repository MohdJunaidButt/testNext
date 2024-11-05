import { SxProps, Theme } from '@mui/material';

export interface SearchBarProps {
  backGroundColor: string;
  color: string;
  token: any;
  onChange?: (value: string) => void;
  placeholder: string;
  width: string;
  borderRadius?: string;
  height?: string;
  noBorder?: boolean;
  iconWidth?: number;
  iconHeight?: number;
  allowClear?: boolean;
  handleClear?: () => void;
  value?: string;
  styles?: SxProps<Theme>;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: any) => void;
  isDarkBg?: boolean;
  isLoading?: boolean;
}
