import Login from '@/collections/auth/login/login';
import { NextPage } from 'next';
import Head from 'next/head';

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Login</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
