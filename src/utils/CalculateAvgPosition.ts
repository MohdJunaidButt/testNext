export const calculateAveragePosition = (positions: [number, number][]) => {
  let totalLat = 0;
  let totalLng = 0;

  // Loop through the positions
  positions.forEach((position) => {
    totalLat += position[0];
    totalLng += position[1];
  });

  // Calculate the average latitude and longitude
  const avgLat = totalLat / positions.length;
  const avgLng = totalLng / positions.length;

  return [avgLat, avgLng];
};
