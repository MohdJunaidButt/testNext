import Agents from '@/collections/Agents/Agents';
import APIError from '@/components/APIError/APIError';
import { getAgents, healthAPI } from '@/services/api';
import ObjectToPrams from '@/utils/ObjectToParams';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface AgentsPageProps {
  agents: any;
  isApiDown?: boolean;
}

const AgentsPage: NextPage<AgentsPageProps> = ({
  agents,
  isApiDown = false,
}) => {
  return (
    <>
      <Head>
        <title>Ubrealty | Agents</title>
      </Head>
      {isApiDown ? <APIError /> : <Agents initialState={agents} />}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const checkAPI = await healthAPI();
    if (!checkAPI) throw new Error('API is down right now.');
    const agents = await getAgents(ObjectToPrams({ page: 1, limit: '16' }));
    return {
      props: {
        agents,
      },
    };
  } catch (er) {
    return {
      props: {
        agents: [],
        isApiDown: true,
      },
    };
  }
};

export default AgentsPage;
