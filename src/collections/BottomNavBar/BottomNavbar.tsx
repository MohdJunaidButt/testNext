import { Text } from '@/components';
import Image from '@/components/Image/Image';
import { NAV_BOTTOM_LINKS_EN } from '@/resources';
import { RootState } from '@/store';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  flexDirection,
  tokens,
} from '@/styles';
import { Tab, Tabs, useMediaQuery } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function BottomNavbar({ locale }: any) {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState('houses');
  const [selectedPage, setSelectedPage] = useState(0);
  const [navLinks, setNavlinks] = useState<
    { linkTo: string; linkName: string; icon: string; iconAlt: string }[]
  >([]);

  const { user } = useSelector((state: RootState) => state.Auth);
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  useEffect(() => {
    let navData = [];
    if (user) {
      navData.push(
        {
          linkName: 'Agents',
          linkTo: '/agents',
          icon: '/icons/agent-alt.svg',
          iconAlt: '/icons/agent.svg',
        },
        {
          linkName: 'Profile',
          linkTo: '/my-profile',
          icon: '/icons/profile-alt.svg',
          iconAlt: '/icons/profile.svg',
        }
      );
    } else {
      navData.push({
        linkName: 'Login',
        linkTo: '/auth/login',
        icon: '/icons/login-alt.svg',
        iconAlt: '/icons/login.svg',
      });
    }
    navData = [...NAV_BOTTOM_LINKS_EN, ...navData];
    const filteredNavData = filterUniqueObjects(navData, 'linkName');
    setNavlinks(filteredNavData);
  }, [locale, user]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedPage(newValue);
    router.replace(`/${navLinks[newValue].linkTo}`);
  };
  const handleSelectedButtonState = (value: string) => {
    setSelectedButton(value);
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: colors.whiteFF,
        borderTop: `1px solid ${colors.greyE1}`,
      }}
    >
      <Toolbar sx={{ backgroundColor: 'transparent', paddingInline: 0 }}>
        <Tabs
          variant='fullWidth'
          value={selectedPage}
          onChange={handleChange}
          aria-label='Vertical tabs example'
          sx={{
            overflowY: 'visible',
            width: '100%',
          }}
          TabIndicatorProps={{
            style: {
              display: 'none',
            },
          }}
        >
          {navLinks.map((el, ind) => (
            <Tab
              key={el.linkTo}
              label={renderMenuItem(
                el.linkName,
                el.icon,
                el.iconAlt,
                selectedPage === ind,
                isMobile
              )}
              {...a11yProps(ind)}
              sx={{
                '&.MuiTab-root': {
                  padding: isMobile ? '10px 5px' : '12px 16px',
                  ...(isMobile && { width: 'fit-content', minWidth: 'unset' }),
                },
              }}
            />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

const renderMenuItem = (
  label: string,
  icon: string,
  iconAlt: string,
  isSelected: Boolean,
  isMobile: Boolean
) => {
  return (
    <Box position='relative' sx={{ paddingTop: '10px', width: '100%' }}>
      <Box
        position='absolute'
        component='div'
        top='-19%'
        left='50%'
        width='77%'
        height='8px'
        bgcolor={isSelected ? colors.blueC2 : 'inherit'}
        sx={{
          borderBottomRightRadius: '10px',
          borderBottomLeftRadius: '10px',
          transform: 'translateX(-48%)',
        }}
      />
      <Box
        {...displayFlexAlignItemsCenterJustifyContentCenter}
        {...flexDirection.column}
        gap={'10px'}
      >
        <Image
          src={isSelected ? icon : iconAlt}
          alt='image'
          width={isMobile ? '20px' : '25px'}
          height={isMobile ? '20px' : '25px'}
        />

        <Text
          text={label}
          color={isSelected ? colors.blueC2 : colors.black21}
          token={isMobile ? tokens.FS13FW400LH18R : tokens.FS14FW600LH16SB}
        />
      </Box>
    </Box>
  );
};

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const filterUniqueObjects = (arr: any, prop: string) => {
  const uniqueMap = new Map();

  for (const item of arr) {
    const key = item[prop];
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    }
  }

  return [...uniqueMap.values()];
};
