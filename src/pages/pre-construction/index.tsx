import PreConstruction from '@/collections/PreConstruction/PreConstruction';
import APIError from '@/components/APIError/APIError';
import {
  fetchAllFiltlerRanges,
  fetchPagesProperties,
  getDistinct,
  healthAPI,
} from '@/services/api';
import { PreConstructionProps } from '@/types/common/condos';
import { FilterRange } from '@/types/common/filterRange';
import ObjectToPrams from '@/utils/ObjectToParams';
import { formatNumber } from '@/utils/priceFormat';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface IPreConstructionPage extends PreConstructionProps {
  cities?: Array<{ id: number; label: string; value: string }>;
  filterRanges?: Array<FilterRange>;
  isApiDown?: boolean;
}

const PreConstructionPage: NextPage = ({
  comingSoonPropertiesData,
  filterRanges,
  cities,
  isApiDown = false,
}: IPreConstructionPage) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Pre-Construction Listings`}</title>
      </Head>
      {isApiDown ? (
        <APIError />
      ) : (
        <PreConstruction
          comingSoonPropertiesData={comingSoonPropertiesData}
          filterRanges={filterRanges || []}
          cities={cities || []}
        />
      )}
    </>
  );
};

export default PreConstructionPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const checkAPI = await healthAPI();
    if (!checkAPI) throw new Error('API is down right now.');
    const comingSoonPropertiesData = await fetchPagesProperties(
      ObjectToPrams({
        detail_name: 'construction_status',
        detail_description: 'pre-construction',
        selling_status: 'Selling,Pending,Registration',
        limit: 16,
        page: 1,
      })
    );

    let filterRanges: Array<FilterRange> = await fetchAllFiltlerRanges();
    let cities = await getDistinct('city');
    cities = cities.map((el: string, ind: number) => ({
      label: el,
      value: el,
      id: ind + 2,
    }));

    return {
      props: {
        comingSoonPropertiesData,
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
  } catch (error) {
    return {
      props: {
        comingSoonPropertiesData: null,
        filterRanges: [],
        cities: [],
        isApiDown: true,
      },
    };
  }
};
