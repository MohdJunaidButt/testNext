import { GridContainer, Text } from '@/components';
import ComingSoonData from '@/components/NoData/ComingSoon';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentCenter,
  tokens,
} from '@/styles';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useTranslation } from 'react-i18next';

function parseComplexDepositStructure(depositText: string) {
  const lines = depositText.split('\n');
  const depositStructureArray = [];
  let currentCollection: any = null;
  for (const line of lines) {
    if (line.includes('Collection:')) {
      if (currentCollection) {
        depositStructureArray.push(currentCollection);
      }
      currentCollection = { title: line.trim(), items: [] };
    } else if (line.startsWith('TOTAL')) {
      if (currentCollection) {
        currentCollection.total = line.trim();
        depositStructureArray.push(currentCollection);
        currentCollection = null;
      }
    } else if (currentCollection) currentCollection.items.push(line.trim());
  }
  if (currentCollection) depositStructureArray.push(currentCollection);
  return depositStructureArray;
}

export default function DepositStructure({
  deposit,
}: {
  deposit?: string | undefined;
}) {
  const depositItems = deposit?.split('\n');
  let depositStructureArray: any = [];
  let depositStructureType = 'simple';
  if (deposit && deposit.includes('Collection:')) {
    depositStructureType = 'complex';
    depositStructureArray = parseComplexDepositStructure(deposit);
  } else {
    for (const item of depositItems || []) {
      const parts = item.split(' ');
      const title = parts[0];
      const description = parts.slice(1).join(' ');
      const depositObject = { title, description };
      depositStructureArray.push(depositObject);
    }
  }
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const { t } = useTranslation();

  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '35px'}>
      <Text
        text={t('Deposit Structure')}
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        color={colors.black21}
        textAlign='left'
        styles={{ marginBottom: '15px', fontSize: isMobile ? '16px' : '18px' }}
      />
      {deposit === '-' || deposit === '' ? (
        <ComingSoonData
          border={{ border: `1px solid ${colors.black2D}` }}
          borderRadius='10px'
        />
      ) : (
        renderDepositStructureDetailContainer(
          depositStructureArray,
          isMobile,
          depositStructureType
        )
      )}
    </Box>
  );
}
const renderDepositStructureDetailContainer = (
  depositStructureDetails: any,
  isMobile = false,
  depositStructureType = 'simple'
) => {
  return (
    <Box
      paddingBottom={'50px'}
      border={`1px solid ${colors.black2D}`}
      borderRadius={'10px'}
      padding={'20px'}
    >
      {depositStructureType === 'complex' ? (
        <GridContainer justifyContent='flex-start' spacing={3}>
          {depositStructureDetails.map((st: any) => (
            <Grid
              key={'' + Math.random()}
              item
              xs={12}
              sm={6}
              md={4}
              flexGrow={1}
            >
              <Text
                text={st.title}
                color={colors.black21}
                token={
                  isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R
                }
                textAlign='left'
              />
              {st.items.map((internal: any) => {
                let newArr = [];
                for (const item of internal || []) {
                  const parts = item.split(' ');
                  const title = parts[0];
                  const description = parts.slice(1).join(' ');
                  const depositObject = { title, description };

                  newArr.push(depositObject);
                }
                return renderDepositStructureDetail(
                  {
                    title: internal,
                    description: '',
                  },
                  isMobile
                );
              })}
              <br />
            </Grid>
          ))}
        </GridContainer>
      ) : (
        <GridContainer justifyContent='flex-start' spacing={3}>
          {depositStructureDetails.map((depositStructure: any) =>
            renderDepositStructureDetail(depositStructure, isMobile)
          )}
        </GridContainer>
      )}
    </Box>
  );
};

const renderDepositStructureDetail = (
  depositStructureDetailsItems: {
    title: string;
    description: string;
  },
  isMobile = false
) => {
  return (
    <Grid
      item
      xs={6}
      sm={4}
      lg={4}
      xl={3}
      {...displayFlexAlignItemsCenterJustifyContentCenter}
      flexDirection={'column'}
      alignItems={'flex-start'}
      justifyContent='start'
      gap={'5px'}
      sx={{ minWidth: 'fit-content' }}
    >
      <Text
        text={depositStructureDetailsItems.title}
        color={colors.black21}
        token={isMobile ? tokens.FS14FW600LH16SB : tokens.FS16FW600LH21_86R}
        textAlign='left'
      />
      <Text
        text={depositStructureDetailsItems.description}
        color={colors.grey63}
        token={isMobile ? tokens.FS14FW400LH19R : tokens.FS16FW400LH18R}
        textAlign='left'
      />
    </Grid>
  );
};
