import BecomeAgent from '@/collections/BecomeAgent/BecomeAgent';
import { NextPage } from 'next';
import Head from 'next/head';

const BecomeAgentPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Become an Agent</title>
      </Head>
      <BecomeAgent />
    </>
  );
};

export default BecomeAgentPage;
