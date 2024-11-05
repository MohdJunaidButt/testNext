import Button from '@/components/Button/Button';
import { tokens } from '@/styles';
import { useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const isLg = useMediaQuery((theme: any) => theme.breakpoints.down('lg'));

  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <Button
      text=''
      token={tokens.FS13FW400LH18R}
      variant='black'
      onClick={goToTop}
      icon={'/icons/arrow-top-white.svg'}
      iconAlt={'/icons/arrow-top.svg'}
      iconSize={{ width: isLg ? 10 : 20, height: isLg ? 10 : 20 }}
      justifyContent='center'
      borderRadius={'50%'}
      style={{
        position: 'fixed',
        display: showTopBtn ? 'flex' : 'none',
        bottom: isLg ? '60px' : '10px',
        right: '10px',
        height: 'fit-content',
        width: 'fit-content',
        padding: '10px',
        zIndex: 999
      }}
    />
  );
};

export default ScrollToTop;
