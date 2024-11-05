import { Text } from '@/components';
import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, Dialog, DialogContent } from '@mui/material';
import { useEffect } from 'react';

interface AcknowledgementDialogProps {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
  icon: string;
}

export default function AcknowledgementDialog({
  isOpen,
  handleClose,
  icon,
  message,
}: AcknowledgementDialogProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => handleClose(), 2000);
      return () => clearTimeout(timer);
    }
  }, [handleClose, isOpen]);

  return (
    <Dialog open={isOpen} fullWidth maxWidth='sm' onClose={handleClose}>
      <DialogContent>
        <Box
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          flexDirection={'column'}
          p={5}
          mx='auto'
          gap={5}
        >
          <Image width='220px' height='200px' alt='icon' src={icon} />
          <Text
            text={message}
            token={tokens.FS20FW600LH22_72SB}
            color={colors.black21}
            styles={{
              fontSize: { xs: '16px', sm: '18px', md: '20px' },
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
