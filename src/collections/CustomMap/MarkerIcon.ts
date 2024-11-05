import { getIcon } from '@/utils/extra/mapTypeCount';
import L from 'leaflet';
import condoIcon from '/public/icons/condo.svg';
import homeIcon from '/public/icons/home-filled.svg';

export const MarkerIcon = (
  sizeOfIcon: [number, number],
  isCondo?: boolean,
  primaryType?: string
) => {
  return L.icon({
    iconUrl: `${
      isCondo
        ? condoIcon.src
        : primaryType
        ? getIcon(primaryType)
        : homeIcon.src
    }`,
    iconSize: new L.Point(...sizeOfIcon),
  });
};
