import { mapCenter } from '@/utils/appInfo';

export const APP_NAV_LINKS = {
  comingSoon: {
    linkName: 'Coming Soon',
    linkTo: '/coming-soon',
    isPrivate: false,
    showIsComing: false,
  },
  condos: {
    linkName: 'Condos',
    linkTo: '/condos',
    isPrivate: false,
    showIsComing: false,
  },
  houses: {
    linkName: 'Houses',
    linkTo: '/houses',
    isPrivate: false,
    showIsComing: false,
  },
  preConstruction: {
    linkName: 'Pre Construction',
    linkTo: '/pre-construction',
    isPrivate: false,
    showIsComing: false,
  },
  compareProps: {
    linkName: 'Compare',
    linkTo: '/compare',
    isPrivate: false,
    showIsComing: false,
  },
  resale: {
    linkName: 'Resale',
    linkTo: '/page-coming-soon',
    isPrivate: false,
    showIsComing: true,
  },
  rent: {
    linkName: 'For Rent',
    linkTo: '/page-coming-soon',
    isPrivate: false,
    showIsComing: true,
  },
  agents: {
    linkName: 'Agents',
    linkTo: '/agents',
    isPrivate: false,
    showIsComing: false,
  },
  developers: {
    linkName: 'Developers',
    linkTo: '/developers',
    isPrivate: false,
    showIsComing: false,
  },
  browseMap: {
    linkName: 'Browse Map',
    linkTo: `/browse-map?latitude=${mapCenter.latitude}&longitude=${mapCenter.longitude}`,
    isPrivate: false,
    showIsComing: false,
  },
  marketTrends: {
    linkName: 'Market Trends',
    linkTo: '/page-coming-soon',
    isPrivate: false,
    showIsComing: true,
  },
  listWithUs: {
    linkName: 'List With Us',
    linkTo: '/page-coming-soon',
    isPrivate: false,
    showIsComing: true,
  },
  becomeAgent: {
    linkName: 'Become An Agent',
    linkTo: '/become-an-agent',
    isPrivate: false,
    showIsComing: false,
  },
  privacyPolicy: {
    linkName: 'Privacy Policy',
    linkTo: '/privacy-policy',
    isPrivate: false,
    showIsComing: false,
  },
  contactUs: {
    linkName: 'Contact Us',
    linkTo: '/contact-us',
    isPrivate: false,
    showIsComing: false,
  },
  myProfile: {
    linkName: 'My Profile',
    linkTo: '/my-profile',
    isPrivate: false,
    showIsComing: false,
  },
  settings: {
    linkName: 'Settings',
    linkTo: '/my-profile?section=settings',
    isPrivate: false,
    showIsComing: false,
  },
  login: {
    linkName: 'Login',
    linkTo: '/auth/login',
    isPrivate: false,
    showIsComing: false,
  },
  signUp: {
    linkName: 'Sign Up',
    linkTo: '/auth/signup',
    isPrivate: false,
    showIsComing: false,
  },
};

export const NAV_LINKS_EN = [
  APP_NAV_LINKS.agents,
  APP_NAV_LINKS.developers,
  APP_NAV_LINKS.browseMap,
  APP_NAV_LINKS.marketTrends,
  APP_NAV_LINKS.listWithUs,
];
export const NAV_LINKS_ES = [
  {
    linkTo: '/browse-map',
    linkName: 'Examinar mapa',
    showIsComing: false,
  },
  {
    linkName: 'Las tendencias del mercado',
    linkTo: '/page-coming-soon',
  },
  {
    linkName: 'Enlace con nosotros',
    linkTo: '/page-coming-soon',
  },
];
export const NAV_LINKS_FR = [
  {
    linkTo: '/browse-map',
    linkName: 'Parcourir la carte',
    showIsComing: false,
  },
  {
    linkName: 'Tendances du marché',
    linkTo: '/page-coming-soon',
  },
  {
    linkName: 'Inscrivez-vous avec nous',
    linkTo: '/page-coming-soon',
  },
];

export const NAV_BOTTOM_LINKS_EN = [
  {
    linkTo: '/',
    linkName: 'Home',
    icon: '/icons/home-mobile-alt.svg',
    iconAlt: '/icons/home-mobile.svg',
  },
  {
    linkTo: '/list-with-us',
    linkName: 'List Now',
    icon: '/icons/listnow-alt.svg',
    iconAlt: '/icons/listnow.svg',
  },
  {
    linkTo: '/browse-map',
    linkName: 'Map',
    icon: '/icons/map-alt.svg',
    iconAlt: '/icons/map.svg',
  },
];

export const protectedLinks = [
  APP_NAV_LINKS.myProfile.linkTo,
  APP_NAV_LINKS.compareProps.linkTo,
];
