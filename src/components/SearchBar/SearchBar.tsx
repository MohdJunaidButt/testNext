import Button from '@/components/Button/Button';
import {
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { SearchBarProps } from '@/types';
import { Box, CircularProgress } from '@mui/material';
import Input from '@mui/material/Input';
import Image from 'next/image';

export function SearchBar({
  backGroundColor = '',
  color,
  token,
  onChange,
  placeholder,
  width,
  borderRadius = '25px',
  height,
  noBorder = false,
  iconHeight = 13,
  iconWidth = 13,
  onFocus,
  onBlur,
  value = '',
  onKeyDown,
  isDarkBg = false,
  styles,
  isLoading = false,
  handleClear,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        backgroundColor: backGroundColor,
        border: !noBorder ? '1px solid #d9d9d9' : 'none',
        borderRadius: borderRadius,
        padding: '4px 15px 4px 15px',
        width: width,
        display: 'flex',
        height: height ? height : 'auto',
        position: 'relative',
        ...styles,
      }}
    >
      <Box {...displayFlexAlignItemsCenterJustifyContentCenter} width={'100%'}>
        <Image
          src={isDarkBg ? '/icons/magnifier-alt.svg' : '/icons/magnifier.svg'}
          alt='search'
          width={iconWidth}
          height={iconHeight}
        />
        <Box style={{ margin: '2px 0px 2px 15px', flex: 1 }} width={'100%'}>
          <Input
            placeholder={placeholder}
            fullWidth
            disableUnderline
            onChange={(e) => {
              onChange && onChange(e.target.value);
            }}
            onKeyDown={onKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            style={{
              backgroundColor: backGroundColor,
              color: color,
              textAlign: 'left',
              ...token,
            }}
            value={value}
            sx={{
              '&.MuiInput-root input': {
                '&::placeholder': {
                  color,
                },
              },
            }}
          />
        </Box>
        {isLoading ? (
          <CircularProgress size={'1.5rem'} />
        ) : (
          value.length > 0 && (
            <Button
              text=''
              justifyContent='center'
              onClick={() => handleClear && handleClear()}
              token={tokens.FS16FW500LH21_86R}
              variant='black'
              borderRadius='50px'
              width='fit-content'
              icon={'/icons/close-alt.svg'}
              iconAlt={'/icons/close-alt.svg'}
              iconSize={{ width: 8.5, height: 8.5 }}
              style={{
                height: 'fit-content',
                padding: '6px',
              }}
            />
          )
        )}
      </Box>
    </Box>
  );
}
