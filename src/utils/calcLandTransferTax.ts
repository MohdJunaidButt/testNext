export const calculateAlbertaFees = (
  purchasePrice: number,
  mortgageAmount: number
) => {
  // Calculate the title transfer fee
  const titleTransferBaseFee = 50;
  const titleTransferAdditionalFee = Math.ceil(purchasePrice / 5000) * 2;
  const totalTitleTransferFee =
    titleTransferBaseFee + titleTransferAdditionalFee;

  // Calculate the mortgage registration fee
  const mortgageRegistrationBaseFee = 50;
  const mortgageRegistrationAdditionalFee =
    Math.ceil(mortgageAmount / 5000) * 1.5;
  const totalMortgageRegistrationFee =
    mortgageRegistrationBaseFee + mortgageRegistrationAdditionalFee;

  const totalFees = totalTitleTransferFee + totalMortgageRegistrationFee;
  return totalFees;
};

export const calcLandTransferTax = (province: string, price: number) => {
  let tax = 0;

  switch (province) {
    case 'toronto':
      if (price <= 55000) {
        tax = price * 0.005;
      } else if (price <= 250000) {
        tax = 275 + (price - 55000) * 0.01;
      } else if (price <= 400000) {
        tax = 2225 + (price - 250000) * 0.015;
      } else if (price <= 2000000) {
        tax = 4475 + (price - 400000) * 0.02;
      } else if (price <= 3000000) {
        tax = 36475 + (price - 2000000) * 0.025;
      } else {
        tax = 61475 + (price - 400000) * 0.02;
      }
      break;

    case 'ontario':
      if (price <= 55000) {
        tax = price * 0.005;
      } else if (price <= 250000) {
        tax = 275 + (price - 55000) * 0.01;
      } else if (price <= 400000) {
        tax = 2225 + (price - 250000) * 0.015;
      }
      if (price <= 2000000) {
        tax = 4475 + (price - 400000) * 0.02;
      } else {
        tax = 36475 + (price - 2000000) * 0.025;
      }
      break;

    case 'british-columbia':
      if (price <= 200000) {
        tax = price * 0.01;
      } else if (price <= 2000000) {
        tax = 2000 + (price - 200000) * 0.02;
      } else {
        tax = 38000 + (price - 2000000) * 0.03;
      }
      break;

    // Add cases for other provinces
    default:
      tax = 0;
  }

  return tax;
};
