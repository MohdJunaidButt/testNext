import ComingSoonPage from '@/collections/ComingSoonPage/ComingSoonPage';
import APIError from '@/components/APIError/APIError';
import ResponsiveContainer from '@/components/ResponsiveContainer/ResponsiveContainer';
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
import { Box } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface IComingSoonPage extends PreConstructionProps {
  cities?: Array<{ id: number; label: string; value: string }>;
  filterRanges?: Array<FilterRange>;
  isApiDown?: boolean;
}

// ComingSoonNextPage component displays a placeholder page while the properties data is being fetched.
const ComingSoonNextPage: NextPage = ({
  comingSoonPropertiesData,
  filterRanges,
  cities,
  isApiDown = false,
}: IComingSoonPage) => {
  return (
    <>
      <Head>
        <title>Ubrealty | Coming Soon Listings</title>
      </Head>
      {isApiDown ? (
        <APIError />
      ) : (
        <ComingSoonPage
          comingSoonPropertiesData={comingSoonPropertiesData}
          filterRanges={filterRanges || []}
          cities={cities || []}
        />
      )}
    </>
  );
};

export default ComingSoonNextPage;

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const checkAPI = await healthAPI();
    if (!checkAPI) throw new Error('API is down right now.');
    const comingSoonPropertiesData = await fetchPagesProperties(
      ObjectToPrams({
        detail_name: 'selling_status',
        detail_description: 'Registration',
        sales_price: '0-0',
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
