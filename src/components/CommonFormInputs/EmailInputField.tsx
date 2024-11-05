import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Input } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Text } from '../Text';

interface EmailInputFieldProps {
  styles?: React.CSSProperties;
  onChange?: (text: string) => void;
}

export function EmailInputField({ styles, onChange }: EmailInputFieldProps) {
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
        <Box
          {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
          alignItems={'center'}
        >
          <Box
            width={'10%'}
            {...displayFlexAlignItemsCenterJustifyContentCenter}
          >
            <Image src={'/icons/mail.svg'} alt='mail' height={20} width={20} />
          </Box>
          <Input
            fullWidth
            disableUnderline
            style={tokens.FS16FW500LH18M}
            type='email'
            onChange={(event: any) => {
              onChange && onChange(event.target.value);
            }}
            sx={{ marginLeft: '10px' }}
            placeholder={t('Enter Email')}
            autoComplete='off'
          />
        </Box>
      </Box>
    </Box>
  );
}
