import { GridContainer, Text } from '@/components';
import { Box, Grid, useMediaQuery } from '@mui/material';

import CircularProgressChart from '@/components/ChartJS/CircularProgressChart/CircularProgressChart';
import {
  colors,
  displayFlexAlignItemsCenterJustifyContentSpaceBetween,
  tokens,
} from '@/styles';

interface CashFlowAnalysisProps {
  mortgagePayment: number;
  monthlyPayment: number;
  breakEvenDownPayment: number;
  propertyTax: number;
  maintenanceCost: number;
  rentalIncome: number;
}

export default function CashFlowAnalysis({
  mortgagePayment,
  monthlyPayment,
  breakEvenDownPayment,
  propertyTax,
  maintenanceCost,
  rentalIncome,
}: CashFlowAnalysisProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <Box width={'100%'} marginTop={isMobile ? '30px' : '34px'}>
      <Text
        text='Cash Flow Analysis'
        token={isMobile ? tokens.FS16FW600LH21_86R : tokens.FS20FW500LH22_72SB}
        styles={{
          fontSize: isMobile ? '16px' : '18px',
          marginBottom: isMobile ? '10px' : '15px',
        }}
        color={colors.black21}
        textAlign='left'
      />
      <Box border={`1px solid ${colors.greyE1}`} borderRadius={'8px'}>
        <Box borderBottom={`1px solid ${colors.greyE1}`} padding={'20px'}>
          <CircularProgressChart
            dataset={{
              labels: ['Progress', 'Remaining'],
              datasets: [
                {
                  data: [20, 100 - 20],
                  backgroundColor: [colors.red4C, '#e0e0e0'],
                  hoverBackgroundColor: [colors.red00, '#e0e0e0'],
                  borderWidth: 2,
                },
              ],
            }}
            text={'Cash flow'}
          />
        </Box>
        <Box
          borderBottom={`1px solid ${colors.greyE1}`}
          padding={isMobile ? '20px' : '30px'}
        >
          <GridContainer
            justifyContent={'flex-start'}
            spacing={isMobile ? 2 : 0}
          >
            <>
              <Grid item xs={6} sm={4}>
                <Text
                  text='Mortgage Payment'
                  token={tokens.FS16FW400LH18R}
                  color={colors.grey96}
                  styles={{ marginBottom: '10px' }}
                  textAlign='left'
                />
                <Text
                  text={'$ ' + mortgagePayment.toString()}
                  token={tokens.FS16FW400LH18R}
                  color={colors.black21}
                  textAlign='left'
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Text
                  text='Monthly Payment'
                  token={tokens.FS16FW400LH18R}
                  color={colors.grey96}
                  styles={{ marginBottom: '10px' }}
                  textAlign='left'
                />
                <Text
                  text={'$ ' + monthlyPayment.toString()}
                  token={tokens.FS16FW400LH18R}
                  color={colors.black21}
                  textAlign='left'
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Text
                  text='Break even down payment'
                  token={tokens.FS16FW400LH18R}
                  color={colors.grey96}
                  styles={{ marginBottom: '10px' }}
                  textAlign='left'
                />
                <Text
                  text={breakEvenDownPayment.toString() + ' %'}
                  token={tokens.FS16FW400LH18R}
                  color={colors.black21}
                  textAlign='left'
                />
              </Grid>
            </>
          </GridContainer>
        </Box>
        <Box padding={isMobile ? '20px' : '30px'}>
          <GridContainer spacing={isMobile ? 1 : 0} justifyContent='flex-start'>
            <>
              <Grid item xs={6} md={4}>
                <Text
                  text='Property Tax'
                  token={tokens.FS16FW400LH18R}
                  color={colors.grey96}
                  styles={{ marginBottom: '10px' }}
                  textAlign='left'
                />
                <Box
                  width={isMobile ? '90%' : '80%'}
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  bgcolor={colors.greyF6}
                  padding={'15px'}
                  borderRadius={'8px'}
                >
                  <Text
                    text={propertyTax.toString()}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='left'
                  />
                  <Text
                    text={'$'}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='right'
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Text
                  text='Maintenance Cost'
                  token={tokens.FS16FW400LH18R}
                  color={colors.grey96}
                  styles={{ marginBottom: '10px' }}
                  textAlign='left'
                />
                <Box
                  width={isMobile ? '90%' : '80%'}
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  bgcolor={colors.greyF6}
                  padding={'15px'}
                  borderRadius={'8px'}
                >
                  <Text
                    text={maintenanceCost.toString()}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='left'
                  />
                  <Text
                    text={'yrs'}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='right'
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Text
                  text='Rental Income'
                  token={tokens.FS16FW400LH18R}
                  color={colors.grey96}
                  styles={{ marginBottom: '10px' }}
                  textAlign='left'
                />
                <Box
                  width={isMobile ? '90%' : '80%'}
                  {...displayFlexAlignItemsCenterJustifyContentSpaceBetween}
                  bgcolor={colors.greyF6}
                  padding={'15px'}
                  borderRadius={'8px'}
                >
                  <Text
                    text={rentalIncome.toString()}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='left'
                  />
                  <Text
                    text={'%'}
                    token={tokens.FS16FW400LH18R}
                    color={colors.black21}
                    textAlign='right'
                  />
                </Box>
              </Grid>
            </>
          </GridContainer>
        </Box>
      </Box>
    </Box>
  );
}
