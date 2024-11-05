export const getAddress = (address: string, city: string) => {
  let fullAddress = '';
  if (address && address !== '-') fullAddress += address;
  if (city && city !== '-') fullAddress += `, ${city}`;

  return fullAddress ? fullAddress : '-';
};

export const extractNumberFromString = (str: string) => {
  // Remove all non-numeric characters except the decimal point
  const cleanedString = str.replace(/[^0-9.]/g, '');

  // Convert the cleaned string to a number
  const number = parseFloat(cleanedString);

  // Check if the result is a valid number
  if (isNaN(number)) {
    return undefined; // Return undefined if the input is not a valid number
  }

  return number;
};

export const getDecimalPlaces = (number: number) => {
  const numberString = number.toString();
  const parts = numberString.split('.');
  if (parts.length === 1) return 0;
  return parts[1].length;
};
