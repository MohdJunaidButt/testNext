import { TextProps } from '@/types/components/Text';
import { Typography } from '@mui/material';
import Link from 'next/link';

export function Text({
  token,
  text,
  color,
  textAlign = 'center',
  cursor = 'default',
  redirect = undefined,
  styles = {},
  handleClick,
}: TextProps) {
  return redirect ? (
    <Link href={redirect}>
      <Typography
        {...token}
        color={color}
        textAlign={textAlign}
        sx={{ cursor: cursor, ...(styles as any) }}
        onClick={(e: any) => {
          handleClick && handleClick(e);
        }}
      >
        {text}
      </Typography>
    </Link>
  ) : (
    <Typography
      {...token}
      color={color}
      textAlign={textAlign}
      sx={{ cursor: cursor, ...(styles as any) }}
      onClick={() => {
        handleClick && handleClick();
      }}
    >
      {text}
    </Typography>
  );
}
