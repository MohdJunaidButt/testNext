import HousePage from '@/collections/PropertyPage/HousePage/HousePage';
import { SingleHouse } from '@/types';
import axios from 'axios';

import { GetServerSideProps, NextPage } from 'next';

const House: NextPage = ({ house }: SingleHouse) => {
  return <HousePage house={house} />;
};

export default House;

export const getServerSideProps: GetServerSideProps = async (req) => {
  let house = null;
  if (req.params && req.params.slug)
    house = await getHouse(req.params.slug as string);

  if (house) {
    return {
      props: {
        house,
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

const getHouse = async (slug: string) => {
  if (process.env.BASE_URL && process.env.PROPERTIES) {
    const URL_HOUSE =
      process.env.BASE_URL + process.env.PROPERTIES + `/slug/${slug}`;
    return axios
      .get(URL_HOUSE)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  }
};
