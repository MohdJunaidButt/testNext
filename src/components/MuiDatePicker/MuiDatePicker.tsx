import { colors, tokens } from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DatePickerProps {
  label: string;
  style?: React.CSSProperties;
  onChange: (value: string) => void;
  type?: 'date' | 'datetime-local';
  size?: 'small' | 'medium';
  value?: string | Dayjs;
}

export default function MuiDatePicker({
  label,
  style,
  onChange,
  type = 'datetime-local',
  size = 'medium',
  value,
}: DatePickerProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        '& *': { color: 'black', ...tokens.FS16FW500LH18M },
        '& input': {
          border: `1px solid ${colors.greyE1} !important`,
          outline: 'none',
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label={label}
          value={value}
          onChange={(newValue: any) => {
            onChange(newValue);
          }}
          defaultValue={dayjs(new Date().toISOString().split('T')[0])}
        />
      </LocalizationProvider>
    </Box>
  );
}
