import Button from '@/components/Button/Button';
import { tokens } from '@/styles';
import { useMediaQuery } from '@mui/material';
import React from 'react';

interface DialogCloseButtonProps {
  toggleClose?: () => void;
}

export default function DialogCloseButton({
  toggleClose,
}: DialogCloseButtonProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <Button
      token={tokens.FS16FW500LH18M}
      text=''
      onClick={() => toggleClose?.()}
      variant='grey'
      justifyContent='center'
      borderRadius='6px'
      width='fit-content'
      icon='/icons/close.svg'
      iconAlt='/icons/close-alt.svg'
      iconSize={{ width: isMobile ? 12 : 16, height: isMobile ? 12 : 16 }}
      style={{
        padding: '9px',
        width: '30px',
        height: '30px',
      }}
    />
  );
}
