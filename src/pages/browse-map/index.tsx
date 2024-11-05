const BrowseMap = dynamic(() => import('@/collections/BrowseMap/BrowseMap'), {
  ssr: false,
});
import {
  fetchAllFiltlerRanges,
  getCitiesWithCoordinates,
} from '@/services/api';
import { FilterRange } from '@/types/common/filterRange';
import { formatNumber } from '@/utils/priceFormat';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';
import Head from 'next/head';

interface BrowseMapPageProps {
  filterRanges?: Array<FilterRange>;
  cities?: any;
}

const BrowseMapPage: NextPage<BrowseMapPageProps> = ({
  filterRanges,
  cities,
}) => {
  return (
    <>
      <Head>
        <title>Ubrealty | Browse Map</title>
      </Head>
      <BrowseMap filterRanges={filterRanges || []} cities={cities || []} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    let filterRanges: Array<FilterRange> = await fetchAllFiltlerRanges();
    let cities = await getCitiesWithCoordinates();

    cities = cities.cities.map((el: any, ind: number) => ({
      label: el.name,
      value: el.name,
      latitude: el.latitude,
      longitude: el.longitude,
      id: ind + 2,
    }));

    // format numbers for filter ranges
    return {
      props: {
        filterRanges: filterRanges.map((el: any) => {
          let newMinMax = formatNumber(el.min, el.max);
          return {
            ...el,
            min: newMinMax[0],
            max: newMinMax[1] >= 5000000 ? 5000000 : newMinMax[1],
          };
        }),
        cities,
      },
    };
  } catch (er) {
    return {
      props: {
        filterRanges: [
          { filter_type: 'unit_size', min: 0, max: 0 },
          { filter_type: 'sales_price', min: 0, max: 0 },
          { filter_type: 'price_per_sqft', min: 0, max: 0 },
        ],
        cities: [],
      },
    };
  }
};

export default BrowseMapPage;
