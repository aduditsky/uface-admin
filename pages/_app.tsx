import Head from 'next/head';
import * as React from 'react';
import type { AppProps } from 'next/app';

//Context
import ContextProvider from '../context/global';

//Components
import HeaderComponents from '../components/Header/header.component';
import LeftMenuComponent from '../components/LeftMenu/leftmenu.componenet';
import GlobalStyle from 'styles/global.styles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Head>
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href='//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
          rel='stylesheet'
        />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
          integrity='sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA=='
          crossOrigin='anonymous'
          referrerPolicy='no-referrer'
        />
      </Head>
      <ContextProvider>
        <HeaderComponents />
        <LeftMenuComponent />

        <Component {...pageProps} />
      </ContextProvider>
    </>
  );
}

export default MyApp;
