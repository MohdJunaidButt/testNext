import HomePage from '@/collections/HomePage/HomePage';
import APIError from '@/components/APIError/APIError';
import {
  fetchHomePage,
  getDistinct,
  getPropertySections,
  getWebsiteSections,
  healthAPI,
} from '@/services/api';
import { HomePageProps, PropertyData } from '@/types/common/THomePage';
import { IWebsiteSection } from '@/types/common/websiteSection';
import { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage<HomePageProps> = ({
  comingSoonPropertiesData,
  torontoPropertiesData,
  cities,
  mapData,
  propertySections,
  isApiDown = false,
  websiteSections,
}) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Explore Listings in Canada`}</title>
      </Head>
      {isApiDown ? (
        <APIError />
      ) : (
        <HomePage
          comingSoonPropertiesData={comingSoonPropertiesData}
          torontoPropertiesData={torontoPropertiesData}
          cities={cities}
          mapData={mapData}
          propertySections={propertySections}
          websiteSections={websiteSections}
        />
      )}
    </>
  );
};

export async function getServerSideProps() {
  try {
    const checkAPI = await healthAPI();
    if (!checkAPI) throw new Error('API is down right now.');
    const [homeWebsiteInfo, homePageData, cities, propertySections] =
      await Promise.allSettled([
        getWebsiteSections('home'),
        fetchHomePage(),
        getDistinct('city'),
        getPropertySections(),
      ]);

    let homeData: {
      comingSoonProps: { totalResults: number; data: PropertyData[] };
      torontoProps: { totalResults: number; data: PropertyData[] };
    } = {
      comingSoonProps: { totalResults: 0, data: [] },
      torontoProps: { totalResults: 0, data: [] },
    };

    let mapData = null;
    if (homePageData.status === 'fulfilled') {
      const { comingsoonProperties, torontoProperties, mapProperties } =
        homePageData.value;

      homeData.comingSoonProps = {
        totalResults: comingsoonProperties.length,
        data: comingsoonProperties,
      };
      homeData.torontoProps = {
        totalResults: torontoProperties.length,
        data: torontoProperties,
      };
      mapData = mapProperties;
    }

    let websiteSections = [];

    if (
      homeWebsiteInfo.status === 'fulfilled' &&
      Array.isArray(homeWebsiteInfo.value)
    ) {
      const homeData = homeWebsiteInfo.value.find(
        (item) => item.name === 'home'
      );
      if (homeData && Array.isArray(homeData.sections)) {
        websiteSections = homeData.sections.filter(
          (section: IWebsiteSection) => section !== undefined
        );
      }
    }

    return {
      props: {
        comingSoonPropertiesData: homeData.comingSoonProps,
        torontoPropertiesData: homeData.torontoProps,
        mapData,
        websiteSections,
        cities:
          cities.status === 'fulfilled'
            ? cities.value.map((el: string, ind: number) => ({
                label: el,
                value: el,
                id: ind + 2,
              }))
            : null,
        propertySections:
          propertySections.status === 'fulfilled'
            ? propertySections.value.sections
            : null,
      },
    };
  } catch (error) {
    return {
      props: {
        comingSoonPropertiesData: null,
        torontoPropertiesData: null,
        cities: [],
        mapData: null,
        propertySections: null,
        websiteSections: [],
        isApiDown: true,
      },
    };
  }
}

export default Home;
