import { colors } from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';

interface DatePickerProps {
  label: string;
  style?: React.CSSProperties;
  onChange?: (value: string) => void;
  type?: 'date' | 'datetime-local';
  size?: 'small' | 'medium';
}

export default function CustomDatePicker({
  label,
  style,
  onChange,
  type = 'datetime-local',
  size = 'medium',
}: DatePickerProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        '& *': { color: 'black' },
        '& input': {
          border: `1px solid ${colors.greyE1} !important`,
          outline: 'none',
        },
      }}
    >
      <input
        type='text'
        onChange={(event) => {
          if (onChange) {
            onChange(event.target.value);
          }
        }}
        placeholder={label}
        aria-label={label}
        onFocus={(event) =>
          (event.target.type = type === 'date' ? 'date' : 'datetime-local')
        }
        onBlur={(event) => (event.target.type = 'text')}
        style={{
          backgroundColor: colors.whiteFF,
          width: '100%',
          height: size === 'medium' ? '50px' : '40px',
          borderRadius: '8px',
          padding: size === 'medium' ? '10px 20px' : '3.09px 14px',
          fontSize: isSm ? '14px' : '16px',
          ...style,
        }}
      />
    </Box>
  );
}
