/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  i18n,
  images: {
    domains: [
      'ec2-13-51-168-102.eu-north-1.compute.amazonaws.com',
      'ubrealtyy.s3.us-east-1.amazonaws.com',
      'ubrealtyyprod.s3.ca-central-1.amazonaws.com',
      'ec2-13-51-168-102.eu-north-1.compute.amazonaws.com',
      'ubrealtyy.s3.amazonaws.com',
      'ubrealtyy.s3.us-east-1.amazonaws.com',
      'dev-ubreality-api.beyonditsolution.com',
      'drive.google.com',
      'localhost',
      'ui-avatars.com',
    ],
  },
  // staticPageGenerationTimeout: 1000,
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.BASE_URL || 'localhost:4000',
    SOCKET_URL: process.env.SOCKET_URL || '',
    SIGNUP: process.env.SIGNUP || '',
    VERIFY_ACCOUNT: process.env.VERIFY_ACCOUNT || '',
    LOGIN: process.env.LOGIN || '',
    PROPERTIES: process.env.PROPERTIES || '',
    HOUSES: process.env.HOUSES || '',
    CONDOS: process.env.CONDOS || '',
    CLIENTID: process.env.CLIENTID || '',
    CLIENTSECRET: process.env.CLIENTSECRET || '',
    MAP_TILER_KEY: process.env.MAP_TILER_KEY || '',
    GOOGLE_CAPTCHA: process.env.GOOGLE_CAPTCHA || '',
    GOOGLE_ANALYTICS: process.env.GOOGLE_ANALYTICS || '',
  },
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
