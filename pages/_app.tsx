import '../styles/globals.css';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import Context from '../context/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href='//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
          rel='stylesheet'
        />
      </Head>
      <Context>
        <Component {...pageProps} />
      </Context>
    </>
  );
}

export default MyApp;
