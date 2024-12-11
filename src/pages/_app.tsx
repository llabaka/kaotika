import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";
import { mockSession } from "@/__tests__/__mocks__/mockSession";


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <SessionProvider session={mockSession}>
      <NextUIProvider>
          <Head>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Component {...mockSession} />
      </NextUIProvider>
    </SessionProvider>
  );

}

export default MyApp;