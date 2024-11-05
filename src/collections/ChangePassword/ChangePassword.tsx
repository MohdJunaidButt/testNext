import { GridContainer, Text, TextInputWithBorder } from '@/components';
import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  flexDirection,
  tokens,
} from '@/styles';
import { Box, Grid } from '@mui/material';

type ChangePasswordProps = {
  isMobile: boolean;
  togglePasswordSection: any;
};

export default function ChangePassword({
  isMobile,
  togglePasswordSection,
}: ChangePasswordProps) {
  return (
    <>
      <GridContainer>
        <>
          <Grid item xs={12} sm={8}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentFlexStart}
              flexDirection={'column'}
              alignItems={'flex-start'}
              gap={'9px'}
            >
              <Text
                token={
                  isMobile
                    ? tokens.FS20FW800LH22_72EB
                    : tokens.FS32FW800LH43_71EB
                }
                text='Change Password'
                color={colors.black21}
                textAlign='left'
              />
              <Text
                token={isMobile ? tokens.FS14FW500LH19R : tokens.FS16FW400LH18R}
                text='Update your password.'
                color={colors.grey9C}
                textAlign='left'
                styles={{
                  fontSize: isMobile ? '16px' : '18px',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={4} display={{ xs: 'none', sm: 'block' }}>
            <Box
              {...displayFlexAlignItemsCenterJustifyContentCenter}
              height={'100%'}
              justifyContent={'flex-end'}
            >
              <Button
                token={tokens.FS16FW500LH18M}
                text='Cancel'
                onClick={togglePasswordSection}
                variant='blackOutlined'
                justifyContent='center'
                borderRadius='8px'
                style={{ height: '40px' }}
              />
              <Button
                token={tokens.FS16FW500LH18M}
                text='Save'
                onClick={() => {}}
                variant='blue'
                justifyContent='center'
                borderRadius='8px'
                style={{ marginLeft: '10px', height: '40px' }}
              />
            </Box>
          </Grid>
        </>
      </GridContainer>
      <Box marginTop={isMobile ? '32px' : '50px'}>
        <GridContainer spacing={isMobile ? 1 : 2} justifyContent='flex-start'>
          <>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{
                  columnGap: { xs: '20px', sm: '37px' },
                  rowGap: '5px',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
                alignItems='baseline'
              >
                <Text
                  text='Current Password'
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '82px' }}
                />
                <TextInputWithBorder
                  label=''
                  placeholder='Enter current password'
                  onChange={() => {}}
                  borderRadius='8px'
                  styles={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '290px',
                  }}
                  endIcon={
                    <Image
                      width={'20px'}
                      height={'20px'}
                      alt='icon'
                      src={'/icons/eye-black.svg'}
                    />
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box
                {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                height={'100%'}
                sx={{
                  columnGap: { xs: '20px', sm: '37px' },
                  rowGap: '5px',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
                alignItems='baseline'
              >
                <Text
                  text='New Password'
                  token={
                    isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                  }
                  color={colors.black21}
                  textAlign='left'
                  styles={{ minWidth: '134px' }}
                />
                <Box
                  {...displayFlexAlignItemsCenterJustifyContentFlexStart}
                  {...flexDirection.column}
                  alignItems='end'
                  gap={isMobile ? '23px' : '9px'}
                  sx={{
                    width: '100%',
                    maxWidth: isMobile ? '100%' : '290px',
                  }}
                >
                  <TextInputWithBorder
                    label=''
                    placeholder='Enter new password'
                    onChange={() => {}}
                    borderRadius='8px'
                    styles={{
                      width: '100%',
                    }}
                    endIcon={
                      <Image
                        width={'20px'}
                        height={'20px'}
                        alt='icon'
                        src={'/icons/eye-black.svg'}
                      />
                    }
                  />
                  <Text
                    text='Minimum 6 characters*'
                    token={tokens.FS12FW500LH18M}
                    color={colors.blueC2}
                    textAlign='right'
                    styles={{ marginBottom: '9px' }}
                  />
                  <Button
                    token={tokens.FS16FW500LH18M}
                    text='Update Password'
                    onClick={togglePasswordSection}
                    variant='black'
                    justifyContent='center'
                    borderRadius='8px'
                    style={{ height: '52px', width: '100%' }}
                  />
                </Box>
              </Box>
            </Grid>
          </>
        </GridContainer>
      </Box>
      {isMobile && (
        <Box
          height={'100%'}
          {...displayFlexAlignItemsCenterJustifyContentCenter}
          marginTop={'50px'}
        >
          <Button
            token={tokens.FS16FW500LH18M}
            text='Cancel'
            onClick={togglePasswordSection}
            variant='blackOutlined'
            justifyContent='center'
            borderRadius='8px'
            style={{ height: '52px', width: '50%' }}
          />
          <Button
            token={tokens.FS16FW500LH18M}
            text='Save'
            onClick={() => {}}
            variant='blue'
            justifyContent='center'
            borderRadius='8px'
            style={{ marginLeft: '10px', height: '52px', width: '50%' }}
          />
        </Box>
      )}
    </>
  );
}
