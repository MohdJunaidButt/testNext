import CondoFloorDetail from '@/collections/PropertyPage/CondoFloorDetail/CondoFloorDetail';

import { SingleCondo } from '@/types/common/condos';
import axios from 'axios';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

const CondoFloorDetailPage: NextPage = ({ condo }: SingleCondo) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | Floor Plans - ${condo?.property_details.project_development_name}`}</title>
      </Head>
      <CondoFloorDetail condo={condo} />
    </>
  );
};

export default CondoFloorDetailPage;

export const getServerSideProps: GetServerSideProps = async (req) => {
  let condo = null;
  if (req.params && req.params.id)
    condo = await getCondo(req.params.id as string);

  if (condo) {
    return {
      props: {
        condo,
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

const getCondo = async (id: string) => {
  if (process.env.BASE_URL && process.env.PROPERTIES) {
    const URL_CONDOS = process.env.BASE_URL + process.env.PROPERTIES + `/${id}`;
    return axios
      .get(URL_CONDOS)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
