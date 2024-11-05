import Signup from '@/collections/auth/signup/signup';
import { NextPage } from 'next';
import Head from 'next/head';

const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Signup</title>
      </Head>
      <Signup />
    </>
  );
};

export default SignUpPage;
