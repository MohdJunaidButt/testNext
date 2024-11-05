import { Text } from '@/components';
import { RootState } from '@/store';
import { authFailed } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { Avatar, Box, Divider, Menu, MenuItem } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

export default function AvatarWithMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useSelector((state: RootState) => state.Auth);

  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(authFailed());
    handleClose();
  };

  useEffect(() => {
    const handleScroll = () => setAnchorEl(null);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl]);

  return (
    <div>
      <Avatar
        onClick={handleClick}
        alt={user.profile.name!}
        src={user.profile.image_url!}
        sx={{
          cursor: 'pointer',
          width: { xs: '25px', lg: '30px' },
          height: { xs: '25px', lg: '30px' },
          fontSize: '14px',
        }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          marginTop: '10px',
          '& .MuiPaper-root': {
            borderRadius: '10px',
            boxShadow: '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${colors.greyE1}`,
          },
          '& .MuiMenu-list, & .MuiList-root': {
            minWidth: { xs: '170px', sm: '200px' },
          },
          '& .MuiMenuItem-root': {
            minHeight: 'auto',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        elevation={0}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/my-profile');
          }}
        >
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            gap={'10px'}
            alignItems='baseline'
          >
            <Box height={'14px'} width={'14px'}>
              <Image
                src={'/icons/profile.svg'}
                alt='image'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
                loading='lazy'
                placeholder='blur'
                blurDataURL={'/icons/profile.svg'}
              />
            </Box>
            <Text
              text={t('Profile')}
              color={colors.black21}
              token={tokens.FS14FW500LH19R}
            />
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push('/my-favorites');
            handleClose();
          }}
        >
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            alignItems='flex-start'
            gap={'10px'}
          >
            <Box height={'14px'} width={'14px'}>
              <Image
                src={'/icons/fav.svg'}
                alt='favourite'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
                loading='lazy'
                placeholder='blur'
                blurDataURL={'/icons/fav.svg'}
              />
            </Box>
            <Text
              text={t('My Favorites')}
              color={colors.black21}
              token={tokens.FS14FW500LH19R}
            />
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            router.push('/my-profile');
          }}
        >
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            gap={'10px'}
            alignItems='flex-start'
          >
            <Box height={'14px'} width={'14px'}>
              <Image
                src={'/icons/setting.svg'}
                alt='image'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
                loading='lazy'
                placeholder='blur'
                blurDataURL={'/icons/setting.svg'}
              />
            </Box>
            <Text
              text={t('Setting')}
              color={colors.black21}
              token={tokens.FS14FW500LH19R}
            />
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            alignItems='flex-start'
            gap={'10px'}
          >
            <Box height={'14px'} width={'14px'}>
              <Image
                src={'/icons/logout.svg'}
                alt='logout'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
                loading='lazy'
                placeholder='blur'
                blurDataURL={'/icons/logout.svg'}
              />
            </Box>
            <Text
              text={t('Signout')}
              color={colors.black21}
              token={tokens.FS14FW500LH19R}
            />
          </Box>
        </MenuItem>
      </Menu>
    </div>
  );
}
