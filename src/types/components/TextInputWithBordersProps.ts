import { BoxProps } from '@mui/material';
import React from 'react';
export interface TextInputWithBordersProps {
  value?: string;
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  backgroundColor?: string;
  borderRadius?: string;
  styles?: BoxProps;
  width?: string;
  height?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  allowSingleInput?: boolean;
  inputStyleToken?: any;
  multiline?: boolean;
  rows?: number;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  size?: 'small' | 'medium';
  name?: string;
  required?: boolean;
  isReadOnly?: boolean;
}
