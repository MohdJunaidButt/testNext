import { GridContainer, Text } from '@/components';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';

import MySearches from '@/collections/MySearchesSection/MySearches';
import Button from '@/components/Button/Button';
import ComingSoonTag from '@/components/ComingSoonTag/ComingSoon';
import DialogWrapper from '@/components/Dialog/Dialog';
import DialogCloseButton from '@/components/DialogCloseButton/DialogCloseButton';
import { authFailed } from '@/store/slices';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexEnd,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import {
  Box,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Tab,
  Tabs,
  useMediaQuery,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import PlatformSettings from '../PlatformSettings/PlatformSettings';
import ProfileDetailsSection from '../ProfileDetailsSection/ProfileDetailsSection';
import SecuritySection from '../SecuritySection/SecuritySection';
const panelList = [
  {
    label: 'Profile Details',
    value: 0,
    icon: '/icons/user.svg',
    iconAlt: '/icons/user-alt.svg',
    isComing: false,
  },
  {
    label: 'My Searches',
    value: 1,
    icon: '/icons/magnifier.svg',
    iconAlt: '/icons/magnifier.svg',
    isComing: false,
  },
  {
    label: 'Security',
    value: 2,
    icon: '/icons/protect.svg',
    iconAlt: '/icons/protect-alt.svg',
    isComing: false,
  },
  {
    label: 'Settings',
    value: 3,
    icon: '/icons/setting.svg',
    iconAlt: '/icons/setting-alt.svg',
    isComing: false,
  },
];

export default function MyProfile() {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isMd = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const router = useRouter();
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [value, setValue] = useState(0);

  const toggleLogoutDialog = () => setShowLogoutDialog((st) => !st);
  const handleChange = (event: React.SyntheticEvent, newValue: number) =>
    setValue(newValue);

  return (
    <Box marginTop={isMobile ? '30px' : '30px'}>
      <ResponsiveContainer>
        <>
          <GridContainer>
            <Grid item xs={12}>
              <Text
                text={t('My Profile')}
                color={colors.black21}
                token={
                  isMobile
                    ? tokens.FS24FW800LH32_78EB
                    : tokens.FS36FW700LH49_18B
                }
                textAlign='left'
                styles={{ marginBottom: isMobile ? '21px' : '29px' }}
              />
            </Grid>
          </GridContainer>{' '}
          <GridContainer
            styles={{
              borderTop: isMobile ? '0px' : `1px solid ${colors.greyE1}`,
            }}
          >
            <>
              <Grid item xs={12} md={3} lg={2.5}>
                {isMobile ? (
                  <MobilePanel
                    steps={panelList}
                    activeStep={value}
                    handleMenuItemClick={(value: number) => setValue(value)}
                  />
                ) : (
                  <>
                    <Tabs
                      orientation={isMd ? 'horizontal' : 'vertical'}
                      variant='scrollable'
                      value={value}
                      onChange={handleChange}
                      aria-label='Vertical tabs'
                      sx={{
                        borderRight: 1,
                        borderColor: 'divider',
                        bgcolor: colors.greyEB,
                        paddingTop: isMd ? '0px' : '10px',
                        width: '100%',
                        minHeight: { xs: 'fit-content', md: '800px' },
                        height: isMd ? 'fit-content' : '100%',
                        '& *': {
                          textTransform: 'capitalize',
                        },
                        '& .MuiTab-root': {
                          padding: isMd ? '19px 15px' : '18px 24px',
                        },
                        '& .MuiTabScrollButton-root.Mui-disabled': {
                          display: 'none',
                        },
                      }}
                      TabIndicatorProps={{
                        style: {
                          display: 'none',
                        },
                      }}
                    >
                      {panelList.map((el: any) => (
                        <Tab
                          key={el.value}
                          label={renderMenuItem(
                            t(el.label),
                            el.icon,
                            el.iconAlt,
                            value === el.value,
                            isMobile,
                            el.isComing
                          )}
                          {...a11yProps(el.value)}
                        />
                      ))}
                      <Box p={'18px 24px'} onClick={toggleLogoutDialog}>
                        {renderMenuItem(
                          t('Signout'),
                          '/icons/logout.svg',
                          '/icons/logout-alt.svg',
                          value === 4,
                          isMobile,
                          false
                        )}
                      </Box>
                    </Tabs>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sx={{ display: { xs: 'block', sm: 'none' } }}>
                <Divider sx={{ marginTop: '17px' }} />
              </Grid>
              <Grid item xs={12} md={9} lg={9.5}>
                <TabPanel value={value} index={0} isMd={isMd}>
                  <ProfileDetailsSection />
                </TabPanel>
                <TabPanel value={value} index={1} isMd={isMd}>
                  <MySearches />
                </TabPanel>
                <TabPanel value={value} index={2} isMd={isMd}>
                  <SecuritySection />
                </TabPanel>
                <TabPanel value={value} index={3} isMd={isMd}>
                  <PlatformSettings />
                </TabPanel>
              </Grid>
            </>
          </GridContainer>
        </>
      </ResponsiveContainer>
      {showLogoutDialog && (
        <DialogWrapper
          open={showLogoutDialog}
          onClose={toggleLogoutDialog}
          fullWidth={true}
          maxWidth={isMobile ? 'xs' : 'sm'}
        >
          <DialogTitle
            sx={{
              padding: '21px 17px 11px',
              ...displayFlexAlignItemsCenterJustifyContentFlexEnd,
            }}
          >
            <DialogCloseButton toggleClose={toggleLogoutDialog} />
          </DialogTitle>
          <DialogContent
            sx={{
              padding: '0px 17px 37px',
            }}
          >
            <Text
              token={tokens.FS16FW600LH21_86R}
              text='Are you sure you want to logout?'
              color={colors.black21}
              textAlign='center'
              styles={{
                fontSize: isMobile ? '16px' : '20px',
                marginBottom: '35px',
              }}
            />
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              gap={'10px'}
              width='100%'
            >
              <Button
                token={tokens.FS16FW500LH18M}
                text='Cancel'
                onClick={toggleLogoutDialog}
                variant='grey'
                justifyContent='center'
                borderRadius='8px'
                style={{
                  height: isMobile ? '57px' : '65px',
                  whiteSpace: 'nowrap',
                  flex: 1,
                  maxWidth: '186px',
                }}
              />
              <Button
                token={tokens.FS16FW500LH18M}
                text='Logout'
                onClick={() => {
                  localStorage.removeItem('token');
                  dispatch(authFailed());
                  router.push('/');
                }}
                variant='blue'
                justifyContent='center'
                borderRadius='8px'
                style={{
                  height: isMobile ? '57px' : '65px',
                  flex: 1,
                  maxWidth: '186px',
                }}
              />
            </Box>
          </DialogContent>
        </DialogWrapper>
      )}
    </Box>
  );
}

const renderMenuItem = (
  label: string,
  icon: string,
  iconAlt: string,
  isSelected: boolean,
  isMobile: boolean,
  isComing: boolean
) => {
  return (
    <Box
      width={'100%'}
      {...displayFlexAlignItemsCenterJustifyContentFlexStart}
      columnGap={'22px'}
      position='relative'
    >
      <Image
        src={isSelected ? icon : iconAlt}
        alt='image'
        width={isMobile ? 10 : 25}
        height={0}
        style={{ height: '100%' }}
      />
      <Text
        text={label}
        color={isSelected ? colors.black21 : colors.grey96}
        token={returnResponsiveFonts(isSelected, isMobile)}
        styles={{ fontSize: '18px' }}
      />
      {isComing && (
        <ComingSoonTag
          sx={{
            top: { xs: -15, md: -10, lg: '50%' },
            right: { xs: -10, md: 0 },
            transform: {
              xs: 'unset',
              lg: 'translateY(-50%)',
            },
          }}
        />
      )}
    </Box>
  );
};

const returnResponsiveFonts = (selected: boolean, isMobile: boolean) => {
  if (selected && isMobile) {
    return tokens.FS12FW600LH18M;
  } else if (!selected && isMobile) {
    return tokens.FS12FW500LH18M;
  } else if (selected && !isMobile) {
    return tokens.FS16FW600LH21_86SB;
  } else {
    return tokens.FS16FW500LH21_86R;
  }
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  isMd: boolean;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, isMd, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            p: {
              xs: '20px 0px',
              md: '20px 0px 20px 20px',
              lg: '20px 0px 20px 37px',
            },
            minHeight: { xs: '300px' },
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

type MobilePanelProps = {
  steps: Array<{ label: string; value: number; icon: string; iconAlt: string }>;
  handleMenuItemClick: any;
  activeStep: number;
};

const MobilePanel = ({
  steps,
  handleMenuItemClick,
  activeStep,
}: MobilePanelProps) => {
  const [anchorEl, setAnchorEl] = useState<any | null>(null);

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
    <>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent='space-between'
        sx={{
          padding: '13px',
          borderRadius: '5px',
          backgroundColor: colors.greyF6,
          cursor: 'pointer',
        }}
        onClick={handleClick}
      >
        <Stack direction='row' alignItems={'center'} flex={1}>
          <Image
            src={panelList[activeStep].icon}
            alt='image'
            width={25}
            height={25}
            sizes='100%'
            style={{ height: '100%', marginRight: '20px' }}
          />
          <Text
            text={`${steps[activeStep].label}`}
            color={colors.black21}
            token={tokens.FS16FW600LH21_86R}
          />
        </Stack>
        <Image
          src={
            Boolean(anchorEl)
              ? '/icons/chevron-up.svg'
              : '/icons/chevron-down.svg'
          }
          alt='image'
          width={15}
          height={15}
          sizes='100%'
          style={{ height: '100%' }}
        />
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          elevation: 0,
        }}
        onScroll={() => setAnchorEl(null)}
        sx={{
          '& .MuiMenu-list': {
            marginTop: '10px',
            borderRadius: '10px',
            boxShadow: '0px 0px 1px 0px rgb(0 0 0 / 5%)',
            border: `1px solid ${colors.greyDE}`,
            paddingBlock: '0px',
            overflow: 'hidden',
            '& > li': {
              width: '140px',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            },
            '& > li:not(:last-of-type)': {
              borderBottom: `1px solid rgba(0, 0, 0, 0.19)`,
            },
          },
        }}
      >
        {steps.map((el, index) => (
          <MenuItem
            key={el.label}
            onClick={() => {
              handleMenuItemClick(index);
              handleClose();
            }}
            style={{
              ...(anchorEl && { width: anchorEl.offsetWidth }),
              justifyContent: 'start',
              gap: '20px',
            }}
          >
            <Image
              src={activeStep === el.value ? el.icon : el.iconAlt}
              alt='image'
              width={0}
              height={0}
              sizes='100%'
              style={{ width: '20px', height: '100%' }}
            />
            <Text
              text={el.label}
              color={activeStep === el.value ? colors.blueC2 : colors.black21}
              token={tokens.FS14FW600LH16SB}
              textAlign='left'
              styles={{ fontWeight: '600' }}
            />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
