import Condo from '@/collections/PropertyPage/Condo/Condo';
import { SingleCondo } from '@/types/common/condos';
import axios from 'axios';
import { extend } from 'lodash';

import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';

interface PropertyPageProps extends SingleCondo {
  slug?: string;
  url?: string;
}

const PropertyPage: NextPage = ({
  condo: condo,
  slug,
  url,
}: PropertyPageProps) => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | ${slug}`}</title>
        <meta
          name='description'
          content={
            condo?.type.id === 1
              ? condo?.house?.description
              : condo?.condo?.description
          }
        />
        <meta
          property='og:title'
          content={condo?.property_details.project_development_name}
        />
        <meta
          property='og:description'
          content={
            condo?.type.id === 1
              ? condo?.house?.description
              : condo?.condo?.description
          }
        />
        <meta property='og:url' content={url} />
        <meta
          property='og:image'
          content={
            condo?.featured_building_images?.[0]?.url ||
            '/images/property/coming-soon.jpg'
          }
        />
        <meta property='og:type' content='website' />
      </Head>
      <Condo condo={condo} />
    </>
  );
};

export default PropertyPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  let property = null;
  if (params && params.slug)
    property = await getProperty(params.slug as string);

  if (property) {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = `${protocol}://${host}${req.url}`;
    return {
      props: {
        condo: property,
        slug: (params?.slug as string) || '',
        url,
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

const getProperty = async (slug: string) => {
  if (process.env.BASE_URL && process.env.PROPERTIES) {
    const URL_PROPERTY =
      process.env.BASE_URL + process.env.PROPERTIES + `/slug/${slug}`;
    return axios
      .get(URL_PROPERTY)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
      });
  }
};
