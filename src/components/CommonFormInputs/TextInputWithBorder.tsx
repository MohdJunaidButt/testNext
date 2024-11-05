import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { TextInputWithBordersProps } from '@/types';
import { Box, Input, useMediaQuery } from '@mui/material';
import { Text } from '../Text';
export function TextInputWithBorder({
  placeholder,
  onChange,
  label,
  backgroundColor = 'transparent',
  borderRadius = 'none',
  styles,
  height = 'auto',
  width = 'auto',
  type = 'text',
  allowSingleInput = false,
  inputStyleToken,
  multiline = false,
  rows,
  startIcon,
  endIcon,
  size = 'medium',
  value,
  name,
  required = false,
  isReadOnly = false,
}: TextInputWithBordersProps) {
  const isSm = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <>
      {label !== '' && (
        <Box marginBottom={'7px'}>
          <Text
            text={label}
            token={tokens.FS14FW600LH16SB}
            color={colors.black21}
            textAlign='left'
          />
        </Box>
      )}
      <Box
        width={width}
        height={height}
        padding={size === 'medium' ? '10px 15px' : '3.09px 14px'}
        {...displayFlexAlignItemsCenterJustifyContentFlexStart}
        flexDirection={'column'}
        alignItems={'flex-start'}
        justifyContent={'center'}
        bgcolor={backgroundColor}
        borderRadius={borderRadius}
        border={'1px solid #96969650'}
        sx={{
          ...styles,
          '& .MuiInput-root': {
            columnGap: '13px',
          },
        }}
      >
        <Input
          inputProps={{
            maxLength: allowSingleInput ? 1 : undefined,
            form: {
              autoComplete: 'off',
            },
          }}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          placeholder={placeholder}
          fullWidth
          disableUnderline
          style={
            inputStyleToken
              ? inputStyleToken
              : isSm
              ? tokens.FS14FW400LH19R
              : tokens.FS16FW300LH21_86R
          }
          type={type}
          multiline={multiline}
          rows={rows}
          endAdornment={endIcon}
          startAdornment={startIcon}
          name={name}
          required={required}
          readOnly={isReadOnly}
        />
      </Box>
    </>
  );
}
