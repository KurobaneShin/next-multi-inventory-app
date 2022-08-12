import { CacheProvider, EmotionCache } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { SnackbarProvider } from 'notistack';

import { ModeProvider } from '@/contexts/modeContext';
import createEmotionCache from '@/createEmotionCache'; //* style + assets
import queryClient from '@/services/queryClient';
import ThemeConfig from '@/theme';

import '@/assets/scss/styles.scss'; //* styles

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>

        <ModeProvider>
          <ThemeConfig>
            <SessionProvider>
              <SnackbarProvider maxSnack={3} preventDuplicate autoHideDuration={1500}>
                <Component {...pageProps} />
              </SnackbarProvider>
            </SessionProvider>
          </ThemeConfig>
        </ModeProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}
