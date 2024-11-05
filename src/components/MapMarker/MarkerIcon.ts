import L from 'leaflet';

export const MarkerIcon = (sizeOfIcon: [number, number], imgurl: string) => {
  return L.icon({
    iconUrl: imgurl,
    iconSize: new L.Point(...sizeOfIcon),
  });
};