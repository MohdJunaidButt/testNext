'useclient';
import DealerProfile from '@/collections/DealerProfile/DealerProfile';
import { getDeveloperDetails } from '@/services/api';
import { IDeveloper } from '@/types/collections/developer';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
type AgentDetailPageProps = {
  developer: IDeveloper;
};
const DeveloperDetailPage = ({ developer }: AgentDetailPageProps) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Developer - ${developer.name}`}</title>
      </Head>
      <DealerProfile id={''} developer={developer} />
    </>
  );
};

export default DeveloperDetailPage;

export const getServerSideProps: GetServerSideProps = async (req) => {
  let developer = null;
  if (req.params && req.params.slug)
    developer = await getDeveloperDetails(req.params.slug as string);
  if (developer) {
    return {
      props: {
        developer,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};
