import AgentsDetails from '@/collections/AgentsDetails/AgentsDetails';
import { NextPageContext } from 'next';
import Head from 'next/head';
type AgentDetailPageProps = {
  username: string;
};
const AgentsDetailsPage = ({ username }: AgentDetailPageProps) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Agent - ${username} `}</title>
      </Head>
      <AgentsDetails username={username as string} />
    </>
  );
};

export default AgentsDetailsPage;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { username } = query;
  return {
    props: {
      username,
    },
  };
};
