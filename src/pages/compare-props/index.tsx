import ComparePropertiesTable from '@/collections/ComparePropertiesTable/ComparePropertiesTable';
import ProtectedRoute from '@/Routes/PrivateRoute';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const ComparePropertiesTablePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Listing Comparison</title>
      </Head>
      <ProtectedRoute>
        <ComparePropertiesTable />
      </ProtectedRoute>
    </>
  );
};

export default ComparePropertiesTablePage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const userLocale = getUserLocale();
//   return {
//     props: {
//       userLocale: userLocale,
//     },
//   };
// };
