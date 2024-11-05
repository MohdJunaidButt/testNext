import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { PopoverExt } from '@/components/RangeSelector';
import { Text } from '@/components/Text';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { Box, Menu, Stack, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

const MoreFilters = ({
  filter,
  handleFilterChange,
  isBorderDark,
  isRounded,
  fullWidth = true,
  size = 'default',
}: {
  filter: any;
  handleFilterChange: (key: string, value: string) => void;
  isBorderDark?: boolean;
  isRounded?: boolean;
  fullWidth?: boolean;
  size?: 'default' | 'small';
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const ref = useRef<HTMLDivElement | null>();
  const { t } = useTranslation();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => {
      setAnchorEl(null);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl]);

  const isMobile = useMediaQuery('(max-width: 600px)');

  const handleOccupancyFilter = (val: number) => () => {
    let occupancy = filter.occupancy;
    if (occupancy) {
      occupancy = occupancy.split(',').includes(val.toString())
        ? occupancy
            .split(',')
            .filter((el: string) => el !== val.toString())
            .join(',')
        : occupancy + ',' + val;
      handleFilterChange('occupancy', occupancy);
    } else handleFilterChange('occupancy', val.toString());
  };

  return (
    <Box
      {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
      width={fullWidth ? '100%' : 'fit-content'}
      height={fullWidth ? '100%' : 'fit-content'}
      gap={'15px'}
      sx={{
        '&, & *': {
          cursor: 'pointer',
        },
      }}
    >
      <Box
        width={'100%'}
        height={'auto'}
        ref={ref}
        sx={{
          border: isBorderDark
            ? `1px solid ${colors.black21}`
            : `1px solid rgba(150, 150, 150, 0.24)`,
          borderRadius: isRounded ? '50px' : '10px',
          padding:
            size === 'small'
              ? isMobile
                ? '5px 10px'
                : '6.5px 12px'
              : '7.5px 14px',
          paddingRight: '32px',
          position: 'relative',
          cursor: 'pointer',
          overflow: 'hidden',
          background: 'white',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '320px',
        }}
        onClick={handleClick}
      >
        <Text
          text={t('More Filters')}
          token={
            size === 'small' ? tokens.FS14FW500LH19R : tokens.FS16FW500LH18M
          }
          color={colors.black21}
          textAlign='left'
          styles={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: size === 'small' ? 1.3 : 1.5,
          }}
          cursor='pointer'
        />

        <Image
          src={'/icons/caret-down.svg'}
          alt='down'
          width='20px'
          height='fit-content'
          style={{
            position: 'absolute',
            right: '7px',
            top: isRounded ? 'calc(50% - 0.5em)' : 'calc(50% - 0.55em)',
          }}
        />
      </Box>
      <PopoverExt
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={0}
        sx={{
          marginTop: '2px',
          '& .MuiPaper-root': {
            borderRadius: '4px',
            boxShadow:
              'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;',
            border: `1px solid ${colors.greyE1}`,
            width: '320px',
            overflowY: 'auto',
            display: 'block',
            height: 'fit-content',
          },
        }}
        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      >
        <Stack spacing={'10px'} mb={'20px'}>
          <Text
            text={t('Type')}
            color={colors.black21}
            token={tokens.FS14FW600LH16SB}
            textAlign='left'
          />
          <Stack
            flexWrap='wrap'
            spacing={'8px'}
            direction='row'
            alignItems={'center'}
          >
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.type.split(',').includes('condo')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Condo'}
              onClick={() => {
                let condoType = filter.type.split(',').includes('condo');
                handleFilterChange(
                  'type',
                  condoType
                    ? filter.type
                        .split(',')
                        .filter((el: string) => el !== 'condo')
                        .join(',')
                    : filter.type.length > 0
                    ? filter.type + ',condo'
                    : 'condo'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.type.split(',').includes('house')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'House'}
              onClick={() => {
                let houseType = filter.type.split(',').includes('house');
                handleFilterChange(
                  'type',
                  houseType
                    ? filter.type
                        .split(',')
                        .filter((el: string) => el !== 'house')
                        .join(',')
                    : filter.type.length > 0
                    ? filter.type + ',house'
                    : 'house'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
          </Stack>
        </Stack>
        <Stack spacing={'10px'} mb={'20px'}>
          <Text
            text={t('Development Status')}
            color={colors.black21}
            token={tokens.FS14FW600LH16SB}
            textAlign='left'
          />
          <Stack
            flexWrap='wrap'
            columnGap={'8px'}
            direction='row'
            alignItems={'center'}
            rowGap={'8px'}
          >
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.construction_status.split(',').includes('completed')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Completed'}
              onClick={() => {
                let consStatus = filter.construction_status
                  .split(',')
                  .includes('completed');
                handleFilterChange(
                  'construction_status',
                  consStatus
                    ? filter.construction_status
                        .split(',')
                        .filter((el: string) => el !== 'completed')
                        .join(',')
                    : filter.construction_status.length > 0
                    ? filter.construction_status + ',completed'
                    : 'completed'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.construction_status
                  .split(',')
                  .includes('pre-construction')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Pre-Construction'}
              onClick={() => {
                let consStatus = filter.construction_status
                  .split(',')
                  .includes('pre-construction');
                handleFilterChange(
                  'construction_status',
                  consStatus
                    ? filter.construction_status
                        .split(',')
                        .filter((el: string) => el !== 'pre-construction')
                        .join(',')
                    : filter.construction_status.length > 0
                    ? filter.construction_status + ',pre-construction'
                    : 'pre-construction'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.construction_status
                  .split(',')
                  .includes('under construction')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Under Construction'}
              onClick={() => {
                let consStatus = filter.construction_status
                  .split(',')
                  .includes('under construction');
                handleFilterChange(
                  'construction_status',
                  consStatus
                    ? filter.construction_status
                        .split(',')
                        .filter((el: string) => el !== 'under construction')
                        .join(',')
                    : filter.construction_status.length > 0
                    ? filter.construction_status + ',under construction'
                    : 'under construction'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
          </Stack>
        </Stack>
        <Stack spacing={'10px'} mb={'20px'}>
          <Text
            text={t('Selling Status')}
            color={colors.black21}
            token={tokens.FS14FW600LH16SB}
            textAlign='left'
          />
          <Stack
            flexWrap='wrap'
            columnGap={'8px'}
            direction='row'
            alignItems={'center'}
            rowGap={'8px'}
          >
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.selling_status.split(',').includes('Registration')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Registration'}
              onClick={() => {
                let consStatus = filter.selling_status
                  .split(',')
                  .includes('Registration');
                handleFilterChange(
                  'selling_status',
                  consStatus
                    ? filter.selling_status
                        .split(',')
                        .filter((el: string) => el !== 'Registration')
                        .join(',')
                    : filter.selling_status.length > 0
                    ? filter.selling_status + ',Registration'
                    : 'Registration'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.selling_status.split(',').includes('Pending')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Pending'}
              onClick={() => {
                let consStatus = filter.selling_status
                  .split(',')
                  .includes('Pending');
                handleFilterChange(
                  'selling_status',
                  consStatus
                    ? filter.selling_status
                        .split(',')
                        .filter((el: string) => el !== 'Pending')
                        .join(',')
                    : filter.selling_status.length > 0
                    ? filter.selling_status + ',Pending'
                    : 'Pending'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.selling_status.split(',').includes('Sold Out')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Sold Out'}
              onClick={() => {
                let consStatus = filter.selling_status
                  .split(',')
                  .includes('Sold Out');
                handleFilterChange(
                  'selling_status',
                  consStatus
                    ? filter.selling_status
                        .split(',')
                        .filter((el: string) => el !== 'Sold Out')
                        .join(',')
                    : filter.selling_status.length > 0
                    ? filter.selling_status + ',Sold Out'
                    : 'Sold Out'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
            <Button
              token={tokens.FS13FW500LH18R}
              variant={
                filter.selling_status.split(',').includes('Selling')
                  ? 'black'
                  : 'blackOutlined'
              }
              text={'Selling'}
              onClick={() => {
                let consStatus = filter.selling_status
                  .split(',')
                  .includes('Selling');
                handleFilterChange(
                  'selling_status',
                  consStatus
                    ? filter.selling_status
                        .split(',')
                        .filter((el: string) => el !== 'Selling')
                        .join(',')
                    : filter.selling_status.length > 0
                    ? filter.selling_status + ',Selling'
                    : 'Selling'
                );
              }}
              justifyContent='center'
              style={{
                padding: '6px 12px',
                borderRadius: '49px',
                minWidth: '80px',
              }}
            />
          </Stack>
        </Stack>
        <Stack spacing={'10px'} overflow={'hidden'}>
          <Text
            text={t('Occupancy Year')}
            color={colors.black21}
            token={tokens.FS14FW600LH16SB}
            textAlign='left'
          />
          <Box
            maxHeight={'190px'}
            sx={{
              overflowY: 'auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              paddingRight: '10px',
            }}
          >
            {getYearsBetween(1970, 2035).map((el) => (
              <Button
                key={el}
                token={tokens.FS13FW500LH18R}
                variant={
                  filter?.occupancy?.split(',').includes(el.toString())
                    ? 'black'
                    : 'blackOutlined'
                }
                text={el.toString()}
                onClick={handleOccupancyFilter(el)}
                justifyContent='center'
                style={{
                  padding: '6px 12px',
                  borderRadius: '49px',
                  height: 'max-content',
                  width: '100%',
                }}
              />
            ))}
          </Box>
        </Stack>
      </PopoverExt>
    </Box>
  );
};

function getYearsBetween(startYear: number, endYear: number) {
  startYear = Number(startYear);
  endYear = Number(endYear);

  if (isNaN(startYear) || isNaN(endYear)) {
    console.error('Invalid input: Please provide valid years.');
    return [];
  }
  const years = [];
  const latestYear = Math.max(startYear, endYear);
  const earliestYear = Math.min(startYear, endYear);

  for (let year = latestYear; year >= earliestYear; year--) {
    years.push(year);
  }

  return years;
}

export default MoreFilters;
