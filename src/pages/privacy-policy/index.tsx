import PrivacyPolicy from '@/collections/PrivacyPolicy/PrivacyPolicy';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const PrivacyPolicyPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Privacy Policy`}</title>
      </Head>
      <PrivacyPolicy />
    </>
  );
};

export default PrivacyPolicyPage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const userLocale = getUserLocale();
//   return {
//     props: {
//       userLocale: userLocale,
//     },
//   };
// };
