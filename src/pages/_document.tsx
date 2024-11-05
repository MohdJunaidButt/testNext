import Image from '@/components/Image/Image';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='author' content='Ubrealty' />
        <meta charSet='UTF-8' />
        {/* <meta
          property='og:title'
          content='UB Realty - Find your dream home with us'
        />
        <meta
          property='og:description'
          content="Discover top residential and commercial properties in Canada. Use UB Realty's platform to find, save, and share your ideal listings effortlessly."
        />
        <meta property='og:url' content='https://www.ubrealty.com' />
        <meta
          property='og:image'
          content='https://ubrealty.com/logo/ubrealty.png'
        />
        <meta property='og:type' content='website' /> */}
        <meta
          name='keywords'
          content='real estate, condos, houses, listings, homes for sale, property listings, real estate listings, residential properties, commercial properties'
        />
        <meta
          name='description'
          content='Explore residential and commercial properties across Canada with ubrealty.com. Our website allow you to search, save, and share listings in major cities, making your property hunt seamless and efficient.'
        />
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'RealEstateAgent',
              name: 'Ubrealty',
              url: 'https://www.ubrealty.com',
              logo: 'https://www.ubrealty.com/logo/ubrealty.svg',
              image: 'https://www.ubrealty.com/logo/ubrealty.png',
              description:
                'Explore residential and commercial properties across Canada with Ubrealty. Our website allows you to search, save, and share listings in major cities, making your property hunt seamless and efficient.',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '647-910-9000',
                contactType: 'Customer Service',
              },
              areaServed: 'US',
              availableLanguage: ['English'],
            }),
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
      <div id='globalLoader'>
        <Image
          src='/logo/ubrealty.svg'
          alt='ubrealty'
          height='80px'
          width='200px'
        />
      </div>
    </Html>
  );
}
