import type {FC} from "react";
import type {AppProps} from "next/app";
import Head from "next/head";
import type {EmotionCache} from "@emotion/cache";
import {CacheProvider} from "@emotion/react";
import type {Session} from "next-auth";
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {SessionProvider} from "next-auth/react";
import createEmotionCache from '~/utils/createEmotionCache';
import {theme} from "@girth/theme"
import {BaseProvider} from "~/utils/BaseProvider";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export interface ExtendedAppProps extends AppProps {
  emotionCache?: EmotionCache;
  session?: Session | null;
}

const App: FC<ExtendedAppProps> = (props) => {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    pageProps: {...pageProps},
    session,
  } = props;

  return (
    <SessionProvider session={session}>
      <BaseProvider>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>{`Rocket Inventory`}</title>
            <meta
              name="description"
              content={`Rocket Inventory Web App by E2 Solutions.`}
            />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            <Component {...pageProps} />
          </ThemeProvider>

        </CacheProvider>
      </BaseProvider>
    </SessionProvider>
  );
};

export default App;
