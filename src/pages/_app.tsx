import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { useState, useEffect } from 'react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      <Head>
        <title>Deployed Model</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'light',
          cursorType: 'pointer',
          activeStyles: { transform: 'scale(0.98)' },
          colors: {
            // primary color: [6]
            brand: ['#ebfbee', '#ff0000', '#ff0000', '#ff0000', '#69db7c', '#ff0000', '#40c057', '#37b24d', '#ff0000', '#ff0000'],
          },
          primaryColor: 'brand',
          globalStyles: (theme) => ({
            '*, *::before, *::after': {
              boxSizing: 'border-box',
            },

            body: {
              ...theme.fn.fontStyles(),
              backgroundColor: theme.white,
              color: theme.black,
              lineHeight: theme.lineHeight,
            },

            'a': {
              color: 'inherit',
              textDecoration: 'none',
            },
          }),
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
