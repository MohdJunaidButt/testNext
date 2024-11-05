import MyFavorites from '@/collections/MyFavorites/MyFavorites';
import { NextPage } from 'next';
import Head from 'next/head';

const MyFavoritesPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | My Favorites`}</title>
      </Head>
      <MyFavorites />
    </>
  );
};

export default MyFavoritesPage;
