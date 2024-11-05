import Developers from '@/collections/Developers/Developers';
import { NextPage } from 'next';
import Head from 'next/head';

const DevelopersPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Developers</title>
      </Head>
      <Developers />
    </>
  );
};

export default DevelopersPage;
