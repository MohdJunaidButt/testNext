import { Box, useMediaQuery } from '@mui/material';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect } from 'react';

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const isDesktop = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  // useEffect(() => {
  //   const handleScroll = () => {
  //     let mainContent = document.getElementById('mainContent');
  //     if (mainContent && !isDesktop) {
  //       if (window.scrollY >= 50) {
  //         mainContent.style.marginTop = '85px';
  //       } else mainContent.style.marginTop = '0';
  //     }
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [isDesktop]);

  return <Box>{children}</Box>;
};

export default ContentWrapper;
