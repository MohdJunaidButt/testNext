import { displayFlexAlignItemsCenterJustifyContentCenter } from '@/styles';
import { ImageLabelProps } from '@/types/components/ImageLabelProps';
import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';

export function ImageLabel({
  token,
  text,
  color,
  bgColor,
  border,
  borderRadius,
  top,
  left,
  right,
  bottom,
  styles = {},
  minWidth,
  isRelative = false,
  icon,
  iconSize = { width: 9, height: 9 },
  iconPlacement = 'start',
}: ImageLabelProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      sx={{
        position: isRelative ? 'relative' : 'absolute',
        borderRadius,
        backgroundColor: bgColor,
        border: `1px solid ${border}`,
        top,
        left,
        right,
        bottom,
        width: 'fit-content',
        height: 'fit-content',
        padding: isMobile ? '7px 13px' : '7px 17px',
        // padding: isMobile ? "7px 13px" : "12px 25px",
        minWidth,
      }}
    >
      <Stack
        spacing={1}
        direction={iconPlacement === 'start' ? 'row' : 'row-reverse'}
        alignItems='center'
        sx={{ ...(styles as any) }}
      >
        {icon && (
          <Image
            src={icon}
            alt='icon'
            height={iconSize?.height}
            width={iconSize?.width}
            style={{
              width: 'max-content',
            }}
          />
        )}
        <Typography {...token} color={color}>
          {text}
        </Typography>
      </Stack>
    </Box>
  );
}
