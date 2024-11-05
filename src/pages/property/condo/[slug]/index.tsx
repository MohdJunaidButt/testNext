import Condo from '@/collections/PropertyPage/Condo/Condo';
import { SingleCondo } from '@/types/common/condos';
import axios from 'axios';

import { GetServerSideProps, NextPage } from 'next';

const CondoPage: NextPage = ({ condo }: SingleCondo) => {
  return <Condo condo={condo} />;
};

export default CondoPage;

export const getServerSideProps: GetServerSideProps = async (req) => {
  let condo = null;
  if (req.params && req.params.slug)
    condo = await getCondo(req.params.slug as string);

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

const getCondo = async (slug: string) => {
  if (process.env.BASE_URL && process.env.PROPERTIES) {
    const URL_CONDOS =
      process.env.BASE_URL + process.env.PROPERTIES + `/slug/${slug}`;
    return axios
      .get(URL_CONDOS)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  }
};
