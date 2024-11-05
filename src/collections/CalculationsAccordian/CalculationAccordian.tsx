import LandTransferCalculator from '@/collections/LandTransferCalculator/LandTransferCalculator';
import MortgageCalculator from '@/collections/MortgageCalculator/MortgageCalculator';
import { Text } from '@/components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@/components/Accordian';
import useCurrency from '@/hooks/useCurrency';
import { colors, tokens } from '@/styles';
import React, { Fragment } from 'react';

type Props = {
  price: string;
};

const CalculationAccordian = ({ price }: Props) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');
  const { convertCurrency } = useCurrency();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Fragment>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
          <Text
            text={'Mortgage Calculator'}
            token={tokens.FS20FW800LH22_72EB}
            color={colors.black21}
            styles={{
              fontSize: { xs: '14px', sm: '16px' },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <MortgageCalculator propertyPrice={convertCurrency(price)} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={{ mt: '15px' }}
      >
        <AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
          <Text
            text={'Land Transfer Tax Calculator'}
            token={tokens.FS20FW800LH22_72EB}
            color={colors.black21}
            styles={{
              fontSize: { xs: '14px', sm: '16px' },
            }}
          />
        </AccordionSummary>
        <AccordionDetails>
          <LandTransferCalculator />
        </AccordionDetails>
      </Accordion>
    </Fragment>
  );
};

export default CalculationAccordian;
