import Condos from '@/collections/Condos/Condos';
import APIError from '@/components/APIError/APIError';
import {
  fetchAllFiltlerRanges,
  fetchPagesProperties,
  getDistinct,
  healthAPI,
} from '@/services/api';
import { PropertyType } from '@/types/common/THomePage';
import { CondosProps } from '@/types/common/condos';
import { FilterRange } from '@/types/common/filterRange';
import ObjectToPrams from '@/utils/ObjectToParams';
import { formatNumber } from '@/utils/priceFormat';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface ICondoPage extends CondosProps {
  cities?: Array<{ id: number; label: string; value: string }>;
  filterRanges?: Array<FilterRange>;
  isApiDown?: boolean;
}

const CondosPage: NextPage = ({
  condos,
  cities,
  filterRanges,
  isApiDown = false,
}: ICondoPage) => {
  return (
    <>
      <Head>
        <title>Ubrealty | Condos Listings</title>
      </Head>
      {isApiDown ? (
        <APIError />
      ) : (
        <Condos
          condos={condos}
          cities={cities || []}
          filterRanges={filterRanges || []}
        />
      )}
    </>
  );
};

export default CondosPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const checkAPI = await healthAPI();
    if (!checkAPI) throw new Error('API is down right now.');
    const condos = await fetchPagesProperties(
      ObjectToPrams({
        page: 1,
        limit: 16,
        type: PropertyType.CONDO,
        selling_status: 'Selling,Pending,Registration',
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
        condos,
        cities,
        filterRanges: filterRanges.map((el: any) => {
          let newMinMax: any = formatNumber(el.min, el.max);
          return {
            ...el,
            min: newMinMax[0],
            max: newMinMax[1] >= 5000000 ? 5000000 : newMinMax[1],
          };
        }),
      },
    };
  } catch (error) {
    return {
      props: {
        condos: [],
        cities: [],
        filterRanges: [],
        isApiDown: true,
      },
    };
  }
};
