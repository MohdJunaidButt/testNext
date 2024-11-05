import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Input } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text';

interface PhoneInputFieldProps {
  styles?: React.CSSProperties;
  onChange: (input: string) => void;
}

export function PhoneInputField({ styles, onChange }: PhoneInputFieldProps) {
  const { t } = useTranslation();
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
        <Box {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}>
          <Box
            width={'10%'}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
          >
            <Image src={'/icons/call.svg'} alt='call' height={20} width={20} />
          </Box>
          <Input
            fullWidth
            disableUnderline
            style={tokens.FS16FW500LH18M}
            type='tel'
            inputProps={{
              inputProps: {
                pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}', // Optionally, you can add a pattern for validation
              },
            }}
            onChange={(event) => onChange(event.target.value)}
            sx={{ marginLeft: '10px' }}
            placeholder={t('Enter Phone Number')}
          />
        </Box>
      </Box>
    </Box>
  );
}
