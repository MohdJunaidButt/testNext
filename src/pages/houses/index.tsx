import Houses from '@/collections/Houses/Houses';
import APIError from '@/components/APIError/APIError';
import {
  fetchAllFiltlerRanges,
  fetchPagesProperties,
  getDistinct,
  healthAPI,
} from '@/services/api';
import { HousesProps } from '@/types';
import { PropertyType } from '@/types/common/THomePage';
import { FilterRange } from '@/types/common/filterRange';
import ObjectToPrams from '@/utils/ObjectToParams';
import { formatNumber } from '@/utils/priceFormat';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface IHouseProps extends HousesProps {
  cities?: Array<{ id: number; label: string; value: string }>;
  filterRanges?: Array<FilterRange>;
  isApiDown?: boolean;
}

const HousesPage: NextPage = ({
  houses,
  cities,
  filterRanges,
  isApiDown = false,
}: IHouseProps) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | House Listings`}</title>
      </Head>
      {isApiDown ? (
        <APIError />
      ) : (
        <Houses
          houses={houses}
          cities={cities || []}
          filterRanges={filterRanges || []}
        />
      )}
    </>
  );
};

export default HousesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const checkAPI = await healthAPI();
    if (!checkAPI) throw new Error('API is down right now.');
    const houses = await fetchPagesProperties(
      ObjectToPrams({
        page: 1,
        limit: 16,
        type: PropertyType.HOUSE,
      })
    );
    let cities = await getDistinct('city');
    cities = cities.map((el: string, ind: number) => ({
      label: el,
      value: el,
      id: ind + 2,
    }));

    let filterRanges: Array<FilterRange> = await fetchAllFiltlerRanges();

    return {
      props: {
        houses,
        cities,
        filterRanges: filterRanges.map((el: any) => {
          let newMinMax = formatNumber(el.min, el.max);
          return {
            ...el,
            min: newMinMax[0],
            max: newMinMax[1] >= 5000000 ? 5000000 : newMinMax[1],
          };
        }),
      },
    };
  } catch (er) {
    return {
      props: {
        houses: [],
        cities: [],
        filterRanges: [],
        isApiDown: true,
      },
    };
  }
};
