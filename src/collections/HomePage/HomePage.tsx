import BecomeAgentBanner from '@/collections/BecomeAgentBanner/BecomeAgentBanner';
import DeveloperMarquee from '@/collections/DeveloperMarquee/DeveloperMarquee';
import EvaluationBanner from '@/collections/EvaluationBanner/EvaluationBanner';
import PropertySection from '@/collections/PropertySection/PropertySection';
import { GridContainer } from '@/components';
import Divider from '@/components/Divider/Divider';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
import { getWebsiteSections } from '@/services/api';
import { HomePageProps } from '@/types/common/THomePage';
import { torontoCord } from '@/utils/appInfo';
import { transformDataForMap } from '@/utils/extra/mapTransformData';
import { Box, Grid, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ComingSoon from '../ComingSoon/ComingSoon';
import PropertiesInToronto from '../PropertiesInToronto/PropertiesInToronto';
import HomeJumbotron from '../homeJumbo/HomeJumbotron';

const FixedMap = dynamic(() => import('../CustomMap/FixedMap'), {
  ssr: false,
});

export default function HomePage({
  comingSoonPropertiesData,
  torontoPropertiesData,
  cities,
  mapData,
  propertySections,
  websiteSections,
}: HomePageProps) {
  const isMobile = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  const isMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const [getHomepageSite, setGetHomepageSite] = useState({
    fetching: true,
    homepageWebsiteData: null,
  });

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const resp = await getWebsiteSections('home');
        if (mounted)
          setGetHomepageSite({ fetching: false, homepageWebsiteData: resp });
      } catch (er) {
        setGetHomepageSite({ fetching: false, homepageWebsiteData: null });
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  let mapLoc = websiteSections?.filter((el) => el.section_type === 'hero')?.[0];
  return (
    <>
      <Box
        height={isMD && !isMobile ? 500 : isMobile ? 380 : 750}
        sx={{
          marginBottom: { xs: '30px', sm: '60px' },
          zIndex: 2,
        }}
      >
        <FixedMap
          height={isMD && !isMobile ? 500 : isMobile ? 380 : 750}
          styles={{
            position: 'relative',
            top: isMD ? '0' : '-145px',
            left: '0',
            marginBottom: '-50px',
            marginTop: isMobile ? '14px' : '0px',
          }}
          locations={transformDataForMap(mapData)}
          mapCenter={
            mapLoc?.latitude && mapLoc?.longitude
              ? [+mapLoc.latitude, +mapLoc.longitude]
              : torontoCord
          }
        />
        <ResponsiveContainer>
          <Box
            style={{
              position: 'relative',
              width: 'fit-content',
              height: 'fit-content',
              top:
                isMD && !isMobile ? '-440px' : isMobile ? '-340px' : '-650px',
              left: '0',
              zIndex: 1,
            }}
          >
            <HomeJumbotron />
          </Box>
        </ResponsiveContainer>
      </Box>
      <ResponsiveContainer>
        <>
          <GridContainer>
            <Grid
              item
              xs={12}
              style={{
                position: 'relative',
                top: isMD ? '0px' : '-173px',
                left: '0',
                height: '100%',
                marginBottom: isMD ? '30px' : '-125px',
              }}
            >
              <Divider styles={{ marginTop: '10px' }} />
              {propertySections?.map((section) => (
                <Fragment key={section.id}>
                  <PropertySection section={section} />
                </Fragment>
              ))}
              <DeveloperMarquee />
              <EvaluationBanner
                cities={cities}
                bannerImg={
                  websiteSections?.filter(
                    (el) => el.section_type === 'banner1'
                  )?.[0]?.images?.[0]?.url ||
                  '/images/banner/evaluation/bg2.jpg'
                }
              />
              <ComingSoon
                comingSoonPropertiesData={comingSoonPropertiesData}
                cities={cities}
              />
              <PropertiesInToronto
                torontoPropertiesData={torontoPropertiesData}
              />
              <BecomeAgentBanner
                bannerImg={
                  websiteSections?.filter(
                    (el) => el.section_type === 'banner2'
                  )?.[0]?.images?.[0]?.url || '/images/banner/agent/agent.png'
                }
              />
            </Grid>
          </GridContainer>
        </>
      </ResponsiveContainer>
    </>
  );
}
