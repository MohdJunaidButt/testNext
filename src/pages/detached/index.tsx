// import Detached from '@/collections/Detached/Detached';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const DetachedPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Detached Listings</title>
      </Head>
      {/* <Detached /> */}
    </>
  );
};

export default DetachedPage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const userLocale = getUserLocale();
//   return {
//     props: {
//       userLocale: userLocale,
//     },
//   };
// };
