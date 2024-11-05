import { tokens } from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface DateTimePickerProps {
  label: string;
  style?: React.CSSProperties;
  onChange: (value: string) => void;
  type?: 'date' | 'datetime-local';
  size?: 'small' | 'medium';
  value?: string | Dayjs;
}

export default function MuiDateTimePicker({
  label,
  style,
  onChange,
  type = 'datetime-local',
  size = 'medium',
  value,
}: DateTimePickerProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        '& *': { color: 'black' },
        '& > *': {
          width: '100%',
          borderRadius: '10px',
        },
        '& svg': {
          width: size === 'small' ? '20px' : '24px',
          height: size === 'small' ? '20px' : '24px',
        },
        '& input': {
          // border: `1px solid rgba(150, 150, 150, 0.24) !important`,
          ...(size === 'small' ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M),
          borderRadius: '10px 0 0 10px',
          outline: 'none',
          padding: size === 'small' ? '11px 12px' : '8px 16px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderRadius: '10px',
          border: `1px solid rgba(150, 150, 150, 0.24) !important`,
        },
      }}
      width='auto'
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label=''
          value={value}
          onChange={(newValue: any) => {
            onChange(newValue);
          }}
          defaultValue={dayjs(new Date().toISOString().split('T')[0])}
        />
        {/* <DatePicker
          label={label}
          value={value}
          onChange={(newValue: any) => {
            onChange(newValue);
          }}
          defaultValue={dayjs(new Date().toISOString().split('T')[0])}
        /> */}
      </LocalizationProvider>
    </Box>
  );
}
