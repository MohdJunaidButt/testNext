import { Box, SxProps, Theme } from '@mui/material';
import NextImage from 'next/image';

interface ImageProps {
  width: string;
  height: string;
  src: string;
  alt: string;
  style?: SxProps<Theme>;
}
export default function Image({ width, height, src, style, alt }: ImageProps) {
  return (
    <Box height={height} width={width} sx={style}>
      <NextImage
        src={src}
        alt={alt}
        width={0}
        height={0}
        sizes={'100%'}
        style={{ width: '100%', height: '100%' }}
        priority
        loading='eager'
      />
    </Box>
  );
}
