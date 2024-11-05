import { GridContainer, Text } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { useSocket } from '@/context/Socket/SocketContext';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  flexDirection,
  tokens,
} from '@/styles';
import { getFormatDate, isDateToday } from '@/utils/date';
import {
  Box,
  Divider,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
} from '@mui/material';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
export default function Notifications() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { markAllRead, groupByDay } = useSocket();
  const { t } = useTranslation();

  let groupedData = groupByDay();

  return (
    <Box marginTop={isMobile ? '30px' : '50px'}>
      <ResponsiveContainer>
        <>
          <GridContainer
            justifyContent='space-between'
            styles={{ marginBottom: '35px' }}
          >
            <>
              <Grid item xs={6}>
                <Text
                  text={t('Notifications')}
                  color={colors.black21}
                  token={
                    isMobile
                      ? tokens.FS24FW800LH32_78EB
                      : tokens.FS36FW700LH49_18B
                  }
                  textAlign='left'
                  styles={{ marginBottom: '10px' }}
                />
              </Grid>
              <Grid item xs={4} sm={3} md={2} justifyContent={'flex-end'}>
                <Button
                  text={t('Mark all read')}
                  variant='blue'
                  justifyContent='center'
                  token={tokens.FS16FW500LH21_86R}
                  borderRadius='8px'
                  maxWidth
                  onClick={markAllRead}
                />
              </Grid>
            </>
          </GridContainer>{' '}
          {Object.keys(groupedData).length > 0 ? (
            Object.keys(groupedData).map((date, idx) => (
              <Box key={date} mb={2}>
                <ul>
                  {/* {!isDateToday(date) && ( */}
                  <Box mb={'10px'} mt={idx === 0 ? 0 : '20px'}>
                    <Text
                      text={isDateToday(date) ? 'Today' : date}
                      color={colors.black21}
                      token={tokens.FS14FW600LH16SB}
                      textAlign='left'
                      styles={{
                        fontWeight: 700,
                        marginInline: 'auto',
                        paddingBottom: '5px',
                      }}
                    />
                  </Box>
                  <Divider
                    sx={{
                      borderColor: colors.greyEC,
                    }}
                  />
                  {/* )} */}
                  {groupedData[date].map((obj: any, ind: number, arr: any) => (
                    <Fragment key={`${obj.createdAt}-${ind}`}>
                      <ListItem
                        sx={{
                          paddingBlock: '10px',
                          gap: '20px',
                          paddingInline: '0',
                        }}
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              width: '45px',
                              height: '45px',
                              borderRadius: '50%',
                              backgroundColor: colors.whiteFF,
                              boxShadow:
                                'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',

                              ...displayFlexAlignItemsCenterJustifyContentCenter,
                              padding: '15px',
                            }}
                          >
                            <Image
                              src={'/icons/bell.svg'}
                              alt='house'
                              height={'30px'}
                              width={'30px'}
                              style={{
                                borderRadius: '10px',
                                overflow: 'hidden',
                              }}
                            />
                          </Box>
                        </ListItemIcon>
                        <ListItemText sx={{ height: '100%' }}>
                          <Box
                            {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                            gap={'15px'}
                          >
                            <Box
                              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                              {...flexDirection.column}
                              gap={'10px'}
                              alignItems='start'
                            >
                              <Box
                                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                                gap={'10px'}
                              >
                                <Text
                                  text={obj.message}
                                  color={colors.black21}
                                  token={
                                    obj.is_active
                                      ? tokens.FS16FW600LH21_86R
                                      : tokens.FS16FW500LH18M
                                  }
                                  textAlign='left'
                                />
                                <Text
                                  text={
                                    resourceInfo[`${obj?.resource_name}`]
                                      ?.linkName
                                  }
                                  color={colors.blueC2}
                                  token={
                                    obj.is_active
                                      ? tokens.FS16FW600LH21_86R
                                      : tokens.FS16FW500LH18M
                                  }
                                  textAlign='left'
                                  styles={{ cursor: 'pointer' }}
                                  redirect={
                                    resourceInfo[`${obj?.resource_name}`]
                                      ?.link ?? '/'
                                  }
                                />
                              </Box>
                              <Box
                                {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                                gap={'7px'}
                                alignItems='flex-start'
                                sx={{ cursor: 'pointer' }}
                                onClick={() => {}}
                              >
                                <Text
                                  text={t('View')}
                                  color={colors.grey96}
                                  token={
                                    isMobile
                                      ? tokens.FS12FW500LH18M
                                      : tokens.FS16FW500LH18ML
                                  }
                                  textAlign='left'
                                />
                                <Text
                                  text={' - '}
                                  color={colors.grey96}
                                  token={
                                    isMobile
                                      ? tokens.FS12FW500LH18M
                                      : tokens.FS16FW500LH18ML
                                  }
                                  textAlign='left'
                                />
                                <Text
                                  text={getFormatDate(obj?.created_on)}
                                  color={colors.grey96}
                                  token={
                                    isMobile
                                      ? tokens.FS12FW500LH18M
                                      : tokens.FS16FW500LH18ML
                                  }
                                  textAlign='left'
                                />
                              </Box>
                            </Box>
                            <Box
                              borderRadius={'50%'}
                              width={'fit-content'}
                              padding={'8px'}
                            >
                              <Image
                                src={'/icons/arrow-right-black.svg'}
                                alt='arrowRightCircular'
                                width={'25px'}
                                height={'25px'}
                                style={{ cursor: 'pointer' }}
                              />
                            </Box>
                          </Box>
                        </ListItemText>
                      </ListItem>
                      {ind < arr.length - 1 && (
                        <Divider
                          sx={{
                            borderColor: colors.greyEC,
                          }}
                        />
                      )}
                    </Fragment>
                  ))}
                </ul>
              </Box>
            ))
          ) : (
            <Stack
              sx={{ minHeight: '500px' }}
              alignItems={'center'}
              justifyContent={'center'}
            >
              <Text
                text={'No Notifications Exists'}
                color={colors.black2D}
                token={tokens.FS16FW500LH18M}
              />
            </Stack>
          )}
          {/* <List>
            {dates?.map((item: any, index: any) => {
              let obj = notify?.filter((itm: any) => {
                let dt = itm?.created_on?.split('T')[0];
                return dt == item;
              });

              return (
                <>
                  <ListItem
                    sx={{
                      paddingInline: '0',
                    }}
                  >
                    <ListItemText>
                      <Text
                        text={
                          index == 0
                            ? 'Today'
                            : index == 1
                            ? 'Yesterday'
                            : moment(item).format('DD/MM/YYYY')
                        }
                        token={tokens.FS16FW600LH21_86R}
                        color={colors.black21}
                        textAlign='left'
                      />
                    </ListItemText>
                  </ListItem>
                  <Divider />
                  {obj.map((item: any, index: any) => {
                    return (
                      <>
                        {renderNotificationTile(item, isMobile)}
                        {index < notify.length - 1 && <Divider />}
                      </>
                    );
                  })}
                </>
              );
            })}
          </List>
          <Box marginTop={'20px'}> </Box> */}
        </>
      </ResponsiveContainer>
    </Box>
  );
}

const resourceInfo: any = {
  user: {
    link: '/users',
    linkName: 'View User',
  },
};
