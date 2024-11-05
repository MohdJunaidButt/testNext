export const calculateRanges = (arr: any, numRanges: number = 2) => {
  if (arr.length === 0) {
    return [];
  }

  // Find the minimum and maximum values in the array
  const minValue = Math.min(...arr);
  const maxValue = Math.max(...arr);

  // Calculate the range width
  const rangeWidth = Math.ceil((maxValue - minValue + 1) / numRanges);

  // Initialize an array to store the ranges
  const ranges = [];

  // Generate the ranges
  for (let i = 0; i < numRanges; i++) {
    const start = minValue + i * rangeWidth;
    const end = start + rangeWidth - 1;

    ranges.push({ start, end });
  }

  return ranges;
};

export const generateRanges = (min: number, max: number, numOfRanges = 2) => {
  if (numOfRanges <= 0) {
    throw new Error('Number of ranges should be greater than zero');
  }

  const step = (max - min) / numOfRanges;
  const ranges = [];

  let currentStart = min;

  for (let i = 0; i < numOfRanges; i++) {
    const currentEnd = currentStart + step;

    // Check if the range is not a duplicate
    if (i === 0 || currentStart !== currentEnd) {
      ranges.push({ start: currentStart, end: currentEnd });
    }

    currentStart = currentEnd;
  }

  return ranges;
};
