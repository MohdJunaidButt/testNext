import Sold from '@/collections/Sold/Sold';
import { fetchFilteredProperties } from '@/services/api';
import ObjectToPrams from '@/utils/ObjectToParams';
import { GetServerSideProps, NextPage } from 'next';

type SoldPageProps = {
  soldPropertiesData: any;
};

const SoldPage: NextPage<SoldPageProps> = ({ soldPropertiesData }) => {
  return <Sold soldPropertiesData={soldPropertiesData} />;
};

export const getServerSideProps: GetServerSideProps = async (query) => {
  let soldPropertiesFetchArgs = {
    selling_status: 'Selling',
    limit: 16,
    page: 1,
  };

  if (query && query.query) {
    soldPropertiesFetchArgs = {
      ...soldPropertiesFetchArgs,
      ...query.query,
    };
  }

  try {
    const soldPropertiesData = await fetchFilteredProperties(
      ObjectToPrams(soldPropertiesFetchArgs)
    );

    return {
      props: {
        soldPropertiesData,
      },
    };
  } catch (error) {
    return {
      props: {
        soldPropertiesData: null,
      },
    };
  }
};

export default SoldPage;
