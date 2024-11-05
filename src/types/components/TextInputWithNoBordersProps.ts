import { SxProps, Theme } from "@mui/material";
export interface TextInputWithNoBordersProps {
  placeholder: string;
  onChange: (value: string) => void;
  label: string;
  backgroundColor?: string;
  borderRadius?: string;
  styles?: SxProps<Theme>;
}
