import { colors } from '@/styles';
import {
  foodTypes,
  getTotalGroupCount,
  hospitalsTypes,
  icons,
  lodgingTypes,
  parksTypes,
  schoolsTypes,
  shoppingTypes,
  transportTypes,
} from '@/utils/extra/mapTypeCount';
import L from 'leaflet';
import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

interface LegendProps {
  places: any[];
}

const PlacesLegend: React.FC<LegendProps> = ({ places }: LegendProps) => {
  const map = useMap();
  let groupCount: any = getTotalGroupCount(places, {
    schoolsTypes,
    hospitalsTypes,
    parksTypes,
    lodgingTypes,
    shoppingTypes,
    transportTypes,
    foodTypes,
  });

  useEffect(() => {
    if (places.length === 0) return;
    const renderIconStat = () => {
      return icons.map(
        (icon, index) =>
          `<div key="${index}" style="display: flex;background:#fff; align-items: center; gap: 2px; border: 1px solid ${
            colors.greyE1
          }; border-radius: 49px; padding: 5px 10px;box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;">
      <img src="${icon.icon}" alt="${icon.label}" width="15" height="15" />
      <span style="color: #000; font-size: 12px; font-weight: 500;font-family:Manrope-SemiBold; line-height: 18px; margin-left: 8px;">
        ${icon.label} (${groupCount[icon.id]})
      </span>
    </div>`
      );
    };

    const legend = (L as any).control({ position: 'topright' });
    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info');
      div.innerHTML = renderIconStat().join('');
      return div;
    };
    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [groupCount, map]);

  return null;
};

export default PlacesLegend;
