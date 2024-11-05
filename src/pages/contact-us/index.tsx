import ContactUs from '@/collections/ContactUs/ContactUs';

import { NextPage } from 'next';
import Head from 'next/head';

const ContactUsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ubrealty | Contact Us</title>
      </Head>
      <ContactUs />
    </>
  );
};

export default ContactUsPage;
