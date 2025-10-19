import type { AppProps } from 'next/app';
import Head from 'next/head';

import NotificationWrapper from '@components/Notification/NotificationWrapper';

import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Company.</title>
        <meta
          name="description"
          content="Company profile page with product catalog"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NotificationWrapper />
      <Component {...pageProps} />
    </>
  );
}
