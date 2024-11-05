import { colors } from '@/styles';
import { ButtonProps } from '@/types';
import { alpha, Box, Tooltip, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Image from 'next/image';
import { useState } from 'react';
import { Text } from '../Text';

export default function Button({
  variant,
  icon,
  iconAlt,
  text,
  onClick,
  width,
  justifyContent,
  lowPadding,
  maxWidth,
  marginRight,
  iconReverse,
  token,
  iconSize,
  borderRadius = '25px',
  style,
  isLoading = false,
  disabled = false,
  form = '',
  type = 'action',
  tooltip = '',
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const styles = {
    primary: {
      color: colors.whiteFF,
      colorDis: colors.whiteFF,
      colorAlt: colors.whiteFF,
      border: `1px solid ${colors.blueC2}`,
      backgroundColor: colors.blueC2,
      backgroundColorAlt: colors.blueC2,
    },
    transparent: {
      color: colors.whiteFF,
      colorDis: colors.whiteFF,
      colorAlt: colors.black21,
      border: `1px solid ${colors.whiteFF}`,
      backgroundColor: colors.transparent,
      backgroundColorAlt: colors.whiteFF,
    },
    transparentWBlackText: {
      color: colors.black21,
      colorDis: colors.black21,
      colorAlt: colors.whiteFF,
      border: `none`,
      backgroundColor: colors.transparent,
      backgroundColorAlt: colors.whiteFF,
    },
    red: {
      color: 'white',
      colorDis: 'white',
      colorAlt: '#E30000',
      backgroundColor: '#E30000',
      backgroundColorAlt: 'white',
      border: '1px solid #E30000',
    },
    light_red: {
      color: 'black',
      colorDis: 'black',
      colorAlt: 'black',
      backgroundColor: alpha('#E30000', 0.22),
      backgroundColorAlt: alpha('#E30000', 0.5),
      border: '0px',
    },
    light_yellow: {
      color: 'black',
      colorDis: 'black',
      colorAlt: 'black',
      backgroundColor: alpha('#f5aa42', 0.29),
      backgroundColorAlt: alpha('#f5aa42', 0.5),
      border: '0px',
    },
    light_blue: {
      color: 'black',
      colorDis: 'black',
      colorAlt: 'black',
      backgroundColor: alpha(colors.blueC2, 0.19),
      backgroundColorAlt: alpha(colors.blueC2, 0.5),
      border: '0px',
    },
    green: {
      color: 'white',
      colorDis: 'white',
      colorAlt: '#1E692E',
      backgroundColor: '#1E692E',
      backgroundColorAlt: 'white',
      border: '1px solid #1E692E',
    },
    grey: {
      color: colors.black21,
      colorDis: colors.black21,
      colorAlt: colors.black21,
      backgroundColor: colors.greyF6,
      backgroundColorAlt: colors.greyE1,
      border: `1px solid ${colors.greyF6}`,
    },
    black: {
      color: colors.whiteFF,
      colorDis: colors.grey96,
      colorAlt: colors.whiteFF,
      backgroundColor: !disabled ? colors.black21 : colors.greyEB,
      backgroundColorAlt: colors.black21Light,
      border: `1px solid ${!disabled ? colors.black21 : colors.greyEB}`,
      // backgroundColor: colors.black21,
      // border: `1px solid ${colors.black21}`,
    },
    'black-light-bg': {
      color: colors.whiteFF,
      colorDis: colors.whiteFF,
      colorAlt: colors.black21,
      backgroundColor: colors.black21,
      backgroundColorAlt: colors.greyEB,
      border: `1px solid ${colors.black21}`,
    },
    blackOutlined: {
      color: colors.black21,
      colorDis: colors.black21,
      colorAlt: colors.whiteFF,
      backgroundColor: colors.transparent,
      backgroundColorAlt: colors.black21,
      border: `1px solid ${colors.black21}`,
    },
    blue: {
      color: colors.whiteFF,
      colorDis: colors.grey96,
      colorAlt: colors.whiteFF,
      // colorAlt: colors.blueC2,
      backgroundColor: !disabled ? colors.blueC2 : colors.greyEB,
      backgroundColorAlt: colors.blueEF,
      // backgroundColorAlt: colors.blueEF,
      border: `1px solid ${!disabled ? colors.blueC2 : colors.greyEB}`,
    },
    darkBlue: {
      color: colors.whiteFF,
      colorDis: colors.whiteFF,
      colorAlt: colors.blue44,
      backgroundColor: colors.blue44,
      backgroundColorAlt: colors.whiteFF,
      border: `1px solid ${colors.blue44}`,
    },
    white: {
      color: colors.black21,
      colorDis: colors.black21,
      colorAlt: colors.whiteFF,
      backgroundColor: colors.whiteFF,
      backgroundColorAlt: colors.black21,
      border: `1px solid ${colors.blue44}`,
    },
  };
  return (
    <Tooltip title={tooltip}>
      <Box
        sx={{
          backgroundColor: styles[variant].backgroundColor,
          ':hover': {
            cursor: !isLoading && !disabled ? 'pointer' : 'not-allowed',
            backgroundColor: !disabled
              ? styles[variant].backgroundColorAlt
              : styles[variant].backgroundColor,
            color: !disabled ? styles[variant].colorAlt : styles[variant].color,
          },
          transition: 'background-color 100ms ease-in',
          cursor: !isLoading && !disabled ? 'pointer' : 'not-allowed',
          ...style,
        }}
        onClick={(e: any) => {
          !disabled && type === 'action' && onClick(e);
        }}
        borderRadius={borderRadius}
        border={styles[variant].border}
        color={styles[variant].color}
        display='flex'
        justifyContent={justifyContent}
        alignItems='center'
        width={width ? width : maxWidth ? '100%' : 'fit-content'}
        padding={lowPadding ? '10px' : '7px 20px'}
        height={maxWidth ? '100%' : ''}
        marginRight={marginRight}
        flexDirection={iconReverse !== undefined ? 'row-reverse' : 'initial'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        component={'button'}
        form={form}
        type='submit'
      >
        {!isLoading && icon && iconAlt && (
          <Image
            src={!isHovered ? icon : iconAlt}
            alt='icon'
            height={iconSize?.height}
            width={iconSize?.width}
          />
        )}
        {!isLoading && text !== '' && (
          <Box
            margin={
              icon
                ? iconReverse !== undefined
                  ? '0px 10px 0px 0px'
                  : '0px 0px 0px 10px'
                : undefined
            }
          >
            <Text
              text={text as string}
              token={token}
              color={
                isHovered && !disabled
                  ? styles[variant].colorAlt
                  : disabled
                  ? styles[variant].colorDis
                  : styles[variant].color
              }
              cursor='pointer'
              styles={{
                cursor: !isLoading && !disabled ? 'pointer' : 'not-allowed',
              }}
            />
          </Box>
        )}
        {isLoading && (
          <CircularProgress
            size={token.fontSize}
            sx={{ color: styles[variant].color }}
          />
        )}
      </Box>
    </Tooltip>
  );
}
