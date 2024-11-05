import { SxProps, Theme } from "@mui/material";

export interface GroupedRadioTileProps {
  token: any;
  radioItems: RadioItems[];
  styles?: SxProps<Theme>;
  selectedId?: number;
  onClick: (selectedIndex: number) => void;
}

interface RadioItems {
  id: number;
  value: string;
  label: string;
}
