import Notifications from '@/collections/Notifications/Notifications';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const NotificationsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Notifications`}</title>
      </Head>
      <Notifications />
    </>
  );
};

export default NotificationsPage;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const userLocale = getUserLocale();
//   return {
//     props: {
//       userLocale: userLocale,
//     },
//   };
// };
