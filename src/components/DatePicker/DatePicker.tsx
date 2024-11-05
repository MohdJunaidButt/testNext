import { colors, tokens } from '@/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

type DatePickerProps = {
  value: dayjs.Dayjs | null;
  onDateChange: (value: dayjs.Dayjs | null) => void;
  bgColor?: string;
  disablePast?: boolean;
  disableFuture?: boolean;
  label?: string;
};

export default function DatePickerValue({
  value,
  onDateChange,
  disablePast = true,
  disableFuture = true,
  label = '',
}: DatePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        value={value}
        onChange={onDateChange}
        disablePast={disablePast}
        disableFuture={disableFuture}
        formatDensity={'spacious'}
        {...(label !== '' && {
          slotProps: {
            textField: {
              helperText: label,
            },
          },
        })}
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-notchedOutline': {
            border: `1px solid ${colors.grey9650}`,
            borderRadius: '12px',
          },
          '& .MuiOutlinedInput-input': {
            padding: { xs: '10px 15px', sm: '15px 20px' },
          },
          '& .MuiOutlinedInput-root': {
            paddingRight: '20px',
            '& *': {
              color: colors.black21,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: `1px solid ${colors.grey9650} !important`,
            },
          },
          '& *:not(.MuiFormHelperText-root)': {
            ...tokens.FS14FW500LH19R,
            fontSize: { xs: '14px', sm: '16px' },
            lineHeight: { xs: '1', sm: '1' },
          },
          '& svg': {
            fontSize: '1.2rem !important',
          },
        }}
      />
    </LocalizationProvider>
  );
}
