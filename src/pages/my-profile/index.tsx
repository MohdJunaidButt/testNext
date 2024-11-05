import ProtectedRoute from '@/Routes/PrivateRoute';
import MyProfile from '@/collections/MyProfile/MyProfile';
import { NextPage } from 'next';
import Head from 'next/head';
const MyProfilePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>{`Ubrealty | My Profile`}</title>
      </Head>
      <ProtectedRoute>
        <MyProfile />
      </ProtectedRoute>
    </>
  );
};

export default MyProfilePage;
