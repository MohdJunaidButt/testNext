/* eslint-disable react-hooks/exhaustive-deps */
import L from 'leaflet';
import React, { useCallback, useEffect, useState } from 'react';
import { Marker, useMap } from 'react-leaflet';
import useSupercluster from 'use-supercluster';

import Button from '@/components/Button/Button';
import Image from '@/components/Image/Image';
import MapMarker from '@/components/MapMarker/MapMarker';
import {
  displayFlexAlignItemsCenterJustifyContentFlexStart,
  tokens,
} from '@/styles';
import { IPropertiesOnMap } from '@/types/collections/MapSearch';
import { Box } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import { useRouter } from 'next/router';

const icons: Record<number, L.DivIcon> = {};

const fetchIcon = (count: number, size: number): L.DivIcon => {
  if (!icons[count]) {
    icons[count] = L.divIcon({
      html: `<div class="cluster-marker" style="width: ${size}px; height: ${size}px;">
        <span>${count}</span>
      </div>`,
    });
  }
  return icons[count];
};

interface ViewMapWithClusteringProps {
  data: IPropertiesOnMap[] | [];
  mapHeight: string;
  allowZoom?: boolean;
  zoomBtnSize?: 'small' | 'medium';
  zoomPosition?: 'end' | 'start';
  zoomVertPosition?: 'top' | 'bottom';
  zoomBtnDirection?: 'row' | 'column';
}

const ViewMapWithClustering: React.FC<ViewMapWithClusteringProps> = ({
  data,
  mapHeight,
  allowZoom = true,
  zoomBtnSize = 'medium',
  zoomPosition = 'start',
  zoomVertPosition = 'bottom',
  zoomBtnDirection = 'row',
}) => {
  const maxZoom = 22;
  const pathname = useRouter().pathname;
  const [bounds, setBounds] = useState<
    | [number, number, number, number]
    | [number, number, number, number, number, number]
    | null
  >(null);
  const [zoom, setZoom] = useState(9);
  const map = useMap();

  // get map bounds
  const updateMap = () => {
    const b = map.getBounds();
    setBounds([
      b.getSouthWest().lng,
      b.getSouthWest().lat,
      b.getNorthEast().lng,
      b.getNorthEast().lat,
    ]);
    setZoom(map.getZoom());
  };

  const onMove = useCallback(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    updateMap();
  }, [map]);

  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  const points =
    data && data.length > 0
      ? data.map((prop) => ({
          type: 'Feature',
          properties: {
            cluster: false,
            propId: prop.id,
            propName: prop.propName,
            propImage: prop.projImage,
            propSlug: prop.propSlug,
            projType: prop.projType,
            ...(prop.propStatus && { propStatus: prop.propStatus }),
          },
          geometry: {
            type: 'Point',
            coordinates: [prop.position[1], prop.position[0]],
          },
        }))
      : [];

  const { clusters, supercluster } = useSupercluster({
    points: points,
    ...(bounds && { bounds }),
    zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <>
      {clusters.map((cluster: any, ind: number) => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } =
          cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}-${ind}`}
              position={[latitude, longitude]}
              icon={fetchIcon(
                pointCount,
                10 + (pointCount / points.length) * 40
              )}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    maxZoom
                  );
                  map.setView([latitude, longitude], expansionZoom, {
                    animate: true,
                  });
                },
              }}
            />
          );
        }

        return (
          <MapMarker
            key={`${cluster.properties.propId}-${ind}`}
            position={[latitude, longitude]}
            title={cluster.properties.propName}
            image={cluster.properties.propImage}
            markerImg={
              cluster.properties.projType === 'house'
                ? '/icons/home-filled.svg'
                : '/icons/condo.svg'
            }
            propId={cluster.properties.propId}
            propSlug={cluster.properties.propSlug}
            projType={cluster.properties.projType}
            propStatus={cluster.properties.propStatus || ''}
          />
        );
      })}
      {allowZoom && (
        <Box
          {...displayFlexAlignItemsCenterJustifyContentFlexStart}
          position={'relative'}
          left={0}
          bottom={`calc(75px - ${mapHeight})`}
          justifyContent={zoomPosition === 'start' ? 'flex-start' : 'flex-end'}
          {...(zoomPosition === 'start'
            ? { marginLeft: { xs: '15px', sm: '20px' } }
            : { marginRight: { xs: '15px', sm: '20px' }, marginLeft: 'auto' })}
          className='btnsOnMapIndex-401'
          flexDirection={zoomBtnDirection}
          gap={'10px'}
          sx={{
            cursor: 'pointer',
            width: 'fit-content',
            ...(zoomVertPosition === 'bottom'
              ? {
                  bottom:
                    zoomBtnSize === 'small'
                      ? `calc(85px - ${mapHeight})`
                      : {
                          xs: `calc(65px - ${mapHeight})`,
                          md: `calc(75px - ${mapHeight})`,
                        },
                }
              : {
                  top: {
                    xs: `calc(50px + 20px + 15px)`,
                    md: 'calc(50px + 20px + 15px)',
                  },
                }),
          }}
        >
          <Button
            variant='black'
            onClick={(e) => {
              e.stopPropagation();
              if (zoom > 3) {
                map.setZoom(zoom - 1);
                setZoom((st) => st - 1);
              }
            }}
            text=''
            icon='/icons/minus.svg'
            iconAlt='/icons/minus.svg'
            iconSize={{ width: 25, height: 25 }}
            justifyContent='center'
            borderRadius='12px'
            token={tokens.FS18FW400LH18R}
            style={{
              height:
                zoomBtnSize === 'small' ? '40px' : { xs: '50px', md: '60px' },
              width:
                zoomBtnSize === 'small' ? '40px' : { xs: '50px', md: '60px' },
            }}
          />
          <Button
            variant='black'
            onClick={(e) => {
              e.stopPropagation();
              if (zoom < 20) {
                map.setZoom(zoom + 1);
                setZoom((st) => st + 1);
              }
            }}
            text=''
            icon='/icons/plus.svg'
            iconAlt='/icons/plus.svg'
            iconSize={{ width: 25, height: 25 }}
            justifyContent='center'
            borderRadius='12px'
            token={tokens.FS18FW400LH18R}
            style={{
              height:
                zoomBtnSize === 'small' ? '40px' : { xs: '50px', md: '60px' },
              width:
                zoomBtnSize === 'small' ? '40px' : { xs: '50px', md: '60px' },
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ViewMapWithClustering;
