/* eslint-disable react-hooks/exhaustive-deps */
import LoginModal from '@/collections/auth/modals/LoginModal';
import { Text } from '@/components';
import Button from '@/components/Button/Button';
import ComingSoonData from '@/components/NoData/ComingSoon';
import { AppToastContext } from '@/context/Toast/ToastContext';
import { ToastContextInterface } from '@/context/Toast/ToastInterface';
import { fubRequest } from '@/services/api';
import { RootState } from '@/store';

import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface PDFFilesProps {
  file: string;
  title: string;
  propId: string;
}

export default function PDFFiles({ file, title, propId }: PDFFilesProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  const router = useRouter();
  const { slug } = router.query;
  // const [showRedirectDialog, setShowRedirectDialog] = useState(false);
  const { user } = useSelector((state: RootState) => state.Auth);
  const [fub, setFub] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let appToast = useContext<ToastContextInterface>(AppToastContext);
  const ToastLikeConfig: any = {
    type: 'success',
    duration: 1000,
  };

  const [showLoginModal, setShowLoginModal] = useState(false);

  const toggleLoginModal = () => setShowLoginModal((st) => !st);
  // const toggleRedirectDialog = () => setShowRedirectDialog((st) => !st);

  const fileNames = title?.split(',')?.map((name) => name.trim()) || [];
  const [isUnlocked, setIsUnlocked] = useState<boolean>(user ? true : false);

  useEffect(() => {
    if (user) setIsUnlocked(true);
    else setIsUnlocked(false);
  }, [user]);

  const handleUnlock = () => {
    user ? setIsUnlocked(true) : toggleLoginModal();
  };

  const handleFub = async () => {
    setIsLoading(true);
    try {
      await fubRequest(propId);
      setFub(true);
    } catch (er: any) {
    } finally {
      setIsLoading(false);
    }
  };

  console.log('file', file);

  return (
    <Box id='pdf-files' width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text={t('PDF Files')}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? '16px' : '18px',
          marginBottom: isMobile ? '10px' : '15px',
        }}
        color={colors.black21}
        textAlign='left'
      />
      {file !== '-' && title.length !== 0 ? (
        <>
          <Box width={'100%'}>
            {isUnlocked && fub ? (
              fileNames.map((fileName, index) => (
                <Link key={index} href={file} target='_blank'>
                  <Box
                    key={index}
                    padding={'15px 0px 15px 0px'}
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                    borderBottom={
                      index < fileNames.length - 1
                        ? `1px solid ${colors.grey63}`
                        : 'none'
                    }
                    style={{ cursor: 'pointer' }}
                  >
                    <Box width={'25px'} height={'30px'} marginRight={'50px'}>
                      <Image
                        src={'/icons/pdf.svg'}
                        alt='pdf'
                        width={0}
                        height={0}
                        sizes='100%'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Box>
                    <Text
                      text={fileName}
                      token={
                        isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R
                      }
                      color={colors.black21}
                      styles={{ cursor: 'pointer' }}
                      textAlign='left'
                    />
                  </Box>
                </Link>
              ))
            ) : (
              <Box position='relative'>
                {[...Array(4)].map((_, idx) => (
                  <Box
                    key={idx}
                    padding={'15px 0px 15px 0px'}
                    {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  >
                    <Box width={'25px'} height={'30px'} marginRight={'50px'}>
                      <Image
                        src={'/icons/pdf.svg'}
                        alt='pdf'
                        width={0}
                        height={0}
                        sizes='100%'
                        style={{ width: '100%', height: '100%' }}
                      />
                    </Box>
                    <Text
                      text={`${slug} - condo detail pdf ${idx + 1}`}
                      token={
                        isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R
                      }
                      color={colors.black21}
                      styles={{ cursor: 'pointer' }}
                      textAlign='left'
                    />
                  </Box>
                ))}
                {!isUnlocked && (
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentCenter}
                    width={'100%'}
                    position={'relative'}
                    // top={-4 * 60}
                    // height={4 * 60}
                    sx={{
                      top: { xs: -4 * 62, sm: -4 * 60 },
                      height: { xs: 4 * 62, sm: 4 * 60 },
                      backdropFilter: 'blur(10px)',
                    }}
                    borderRadius={'8px'}
                    marginBottom={`-${4 * 60}px`}
                  >
                    <Button
                      text={t('Unlock Files')}
                      variant='blue'
                      onClick={handleUnlock}
                      justifyContent='center'
                      icon={'/icons/lock-white.svg'}
                      iconAlt={'/icons/lock-white.svg'}
                      iconSize={{ width: 10, height: 10 }}
                      token={tokens.FS16FW500LH18M}
                      borderRadius='8px'
                      style={{ height: '50px', minWidth: '250px', zIndex: 222 }}
                    />
                  </Box>
                )}
                {isUnlocked && !fub && (
                  <Box
                    {...displayFlexAlignItemsCenterJustifyContentCenter}
                    width={'100%'}
                    position={'relative'}
                    // top={-4 * 60}
                    // height={4 * 60}
                    sx={{
                      top: { xs: -4 * 62, sm: -4 * 60 },
                      height: { xs: 4 * 62, sm: 4 * 60 },
                      backdropFilter: 'blur(10px)',
                    }}
                    borderRadius={'8px'}
                    marginBottom={`-${4 * 60}px`}
                  >
                    <Button
                      text={t('View Locked Files')}
                      variant='blue'
                      onClick={handleFub}
                      justifyContent='center'
                      icon={'/icons/lock-white.svg'}
                      iconAlt={'/icons/lock-white.svg'}
                      iconSize={{ width: 10, height: 10 }}
                      token={tokens.FS16FW500LH18M}
                      borderRadius='8px'
                      style={{ height: '50px', minWidth: '250px', zIndex: 222 }}
                      isLoading={isLoading}
                    />
                  </Box>
                )}
              </Box>
            )}
          </Box>
          {showLoginModal && (
            <LoginModal
              isOpen={showLoginModal}
              handleClose={toggleLoginModal}
            />
          )}
        </>
      ) : (
        <Link href={'/pdf/coming-soon.pdf'} target='_blank'>
          <Box
            padding={'15px 0px 15px 0px'}
            {...displayFlexAlignItemsCenterJustifyContentFlexStart}
            style={{ cursor: 'pointer' }}
          >
            <Box width={'25px'} height={'30px'} marginRight={'50px'}>
              <Image
                src={'/icons/pdf.svg'}
                alt='pdf'
                width={0}
                height={0}
                sizes='100%'
                style={{ width: '100%', height: '100%' }}
              />
            </Box>
            <Text
              text={`${title} - Coming Soon`}
              token={isMobile ? tokens.FS13FW400LH18R : tokens.FS16FW400LH18R}
              color={colors.black21}
              styles={{ cursor: 'pointer' }}
              textAlign='left'
            />
          </Box>
        </Link>
      )}
    </Box>
  );
}
