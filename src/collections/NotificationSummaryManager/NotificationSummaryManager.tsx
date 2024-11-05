import { Text } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import { useSocket } from '@/context/Socket/SocketContext';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';
import { getFormatDate } from '@/utils/date';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Stack,
} from '@mui/material';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function NotificationSummaryManager(props: any) {
  const { markAllRead, notifications, getUnreadLength, groupByDay } =
    useSocket();
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  useEffect(() => {
    const handleScroll = () => setAnchorEl(null);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl]);

  return (
    <div>
      <Box
        onClick={handleClick}
        sx={{
          cursor: 'pointer',
          width: { xs: '16px', lg: '19px' },
          height: { xs: '22px', lg: '25px' },
        }}
      >
        <Image
          src={'/icons/bell-more.svg'}
          alt='bell'
          width={'0'}
          height={'0'}
          style={{ width: '100%', height: '100%' }}
        />
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          marginTop: '10px',
          '& .MuiPaper-root': {
            borderRadius: '14px',
            boxShadow: '0px 26px 43px 0px rgba(0, 0, 0, 0.05)',
            border: `1px solid ${colors.greyE1}`,
          },
          '& .MuiMenu-list, & .MuiList-root': {
            padding: 0,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        elevation={2}
      >
        <List sx={{ width: '400px' }}>
          <ListItem>
            <ListItemText>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                gap={'15px'}
              >
                <Text
                  text={t('Notifications')}
                  color={colors.black21}
                  token={tokens.FS16FW600LH21_86SB}
                  textAlign='left'
                />{' '}
                <Button
                  text={t('Mark all read')}
                  onClick={markAllRead}
                  variant='blue'
                  justifyContent='center'
                  token={tokens.FS14FW400LH19R}
                  borderRadius='8px'
                />
              </Box>
            </ListItemText>
          </ListItem>
          <Divider />
          <Box sx={{ height: '100%', maxHeight: '190px', overflowY: 'auto' }}>
            {notifications.length > 0 ? (
              notifications.map((notification: any, index: number) => (
                <Fragment key={index}>
                  {renderNotificationTile({
                    image:
                      notification.image ||
                      notification.resource_name === 'user'
                        ? `https://ui-avatars.com/api/?name=${notification.from_user_name}`
                        : `https://ui-avatars.com/api/?name=${notification.resource_name}`,
                    message: notification.message,
                    created_on: getFormatDate(notification.created_on),
                    is_active: notification.is_active || false,
                  })}
                  {index < props?.notification?.length - 1 && <Divider />}
                </Fragment>
              ))
            ) : (
              <Stack
                alignItems='center'
                justifyContent='center'
                width='100%'
                height='190px'
              >
                <Text
                  text={t('No notifications to show')}
                  color={colors.black21}
                  token={tokens.FS16FW600LH21_86R}
                />
              </Stack>
            )}
          </Box>
          <Divider />
          <ListItem>
            <ListItemText>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentCenter}
                gap={'15px'}
                onClick={() => {
                  handleClose();
                  router.push('/notifications');
                }}
              >
                <Text
                  text={t('Show all notifications')}
                  color={colors.black21}
                  token={tokens.FS16FW600LH21_86R}
                  cursor='pointer'
                />
                <Image
                  src={'/icons/arrow-right-circular-pill.svg'}
                  alt='arrow-right-circular-pill'
                  width={'60px'}
                  height={'20px'}
                  style={{ cursor: 'pointer' }}
                />
              </Box>
            </ListItemText>
          </ListItem>
        </List>
      </Menu>
    </div>
  );
}

const renderNotificationTile = (notification: {
  image: string;
  message: string;
  created_on: string;
  is_active: boolean;
}) => {
  return (
    <ListItem
      key={notification.message}
      sx={{ paddingBlock: '7px', gap: '10px', cursor: 'pointer' }}
    >
      <ListItemIcon
        sx={{
          minWidth: 'fit-content',
          paddingRight: '10px',
        }}
      >
        <Image
          src={'/icons/bell.svg'}
          alt='house'
          height='20px'
          width='20px'
          style={{ borderRadius: '10px' }}
        />
      </ListItemIcon>
      <ListItemText>
        <Box {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}>
          <Box
            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
            flexDirection={'column'}
            height={'100%'}
            alignItems={'flex-start'}
          >
            <Text
              text={notification.message}
              color={colors.black21}
              token={tokens.FS16FW600LH21_86SB}
              textAlign='left'
            />
            <Text
              text={'View Now -  ' + notification.created_on}
              color={colors.black2D}
              token={tokens.FS12FW400LH18R}
              textAlign='left'
            />
          </Box>
          <Box borderRadius={'50%'} width={'fit-content'} padding={'8px'}>
            <Image
              src={'/icons/arrow-right-long-black.svg'}
              alt='arrowRightCircular'
              width={'25px'}
              height={'25px'}
            />
          </Box>
        </Box>
      </ListItemText>
    </ListItem>
  );
};
