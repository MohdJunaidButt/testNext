import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Input } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text';
interface PasswordInputFieldProps {
  styles?: React.CSSProperties;
  onChange?: (text: string) => void;
}

export function PasswordInputField({
  styles,
  onChange,
}: PasswordInputFieldProps) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Box
      borderRadius='16px'
      height='67px'
      bgcolor={colors.greyF6}
      padding='15px 13px 15px 13px'
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      style={styles}
    >
      <Box width='100%'>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          alignItems={'center'}
        >
          <Box
            width={'10%'}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
          >
            <Image
              src={'/icons/lock-icon.svg'}
              alt='lock-icon'
              height={20}
              width={20}
            />
          </Box>

          <Input
            type={showPassword ? 'text' : 'password'}
            fullWidth
            disableUnderline
            style={tokens.FS16FW500LH18M}
            onChange={(event: any) => {
              onChange && onChange(event.target.value);
            }}
            autoComplete='off'
            sx={{ marginLeft: '10px', marginRight: '10px' }}
            placeholder={t('Enter Password')}
          />
          <Box
            width={'10%'}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            sx={{ cursor: 'pointer' }}
          >
            <Image
              src={'/icons/eye-black.svg'}
              alt='eye-icon'
              height={23}
              width={23}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
