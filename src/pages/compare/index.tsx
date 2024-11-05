import CompareProperties from '@/collections/CompareProperties/CompareProperties';
import LoginModal from '@/collections/auth/modals/LoginModal';
import {
  fetchAllFiltlerRanges,
  fetchPagesProperties,
  getDistinct,
} from '@/services/api';
import { RootState } from '@/store';
import { IShortPropData } from '@/types/collections/MapSearch';
import { FilterRange } from '@/types/common/filterRange';
import { formatNumber } from '@/utils/priceFormat';
import { Box } from '@mui/material';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

interface ICompPropsProps {
  cities?: Array<{ id: number; label: string; value: string }>;
  filterRanges?: Array<FilterRange>;
  properties?: IShortPropData;
}

const ComparePropertiesPage: NextPage = ({
  cities,
  filterRanges,
  properties,
}: ICompPropsProps) => {
  const { user } = useSelector((state: RootState) => state.Auth);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ubrealty | Compare Listings</title>
      </Head>
      <Box position='relative' width='100vw'>
        {!user && (
          <Box
            sx={{
              filter: 'blur(8px)',
              WebkitFilter: 'blur(8px)',
              backdropFilter: 'blur(10px)',
              width: 'inherit',
              height: 'inherit',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000,
            }}
          />
        )}
        <CompareProperties
          cities={cities || []}
          filterRanges={filterRanges || []}
          properties={properties}
        />
        {!user && (
          <LoginModal isOpen={true} handleClose={() => router.push('/')} />
        )}
      </Box>
    </>
  );
};

export default ComparePropertiesPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const [properties, cities, filterRanges] = await Promise.allSettled([
    fetchPagesProperties('page=1&limit=16'),
    getDistinct('city'),
    fetchAllFiltlerRanges(),
  ]);
  return {
    props: {
      properties: properties.status === 'fulfilled' ? properties.value : null,
      cities:
        cities.status === 'fulfilled'
          ? cities.value.map((el: string, ind: number) => ({
              label: el,
              value: el,
              id: ind + 2,
            }))
          : [],
      filterRanges:
        filterRanges.status === 'fulfilled'
          ? filterRanges.value.map((el: any) => {
              let newMinMax = formatNumber(el.min, el.max);
              return {
                ...el,
                min: newMinMax[0],
                max: newMinMax[1] >= 5000000 ? 5000000 : newMinMax[1],
              };
            })
          : null,
    },
  };
};
