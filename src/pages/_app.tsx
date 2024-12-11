import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";
//import { mockSession } from "./../__tests__/__mocks__/mockSession";

function MyApp({ Component, pageProps }: AppProps) {

  const mockSession2: any = {
    user: {
      name: 'Asier',
      email: 'asier.arguinchona@ikasle.aeg.eus',
      image: "https://lh3.googleusercontent.com/a/ACg8ocIqIoDtJVejSbjrzV889fEhqGR-ILGc99C0-YgY88b11zuiXfk=s96-c",
    },
    accessToken: 'fake-acces-token',
    refreshToken: 'fake-refresh-token',
    expires: '',
    email: 'asier.arguinchona@ikasle.aeg.eus'
  }

  return (
    <SessionProvider session={mockSession2}>
      <NextUIProvider>
          <Head>
            <link rel='icon' href='/favicon.ico' />
          </Head>
          <Component {...mockSession2} />
      </NextUIProvider>
    </SessionProvider>
  );

}

export default MyApp;