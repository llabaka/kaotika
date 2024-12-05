import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import "../styles/globals.css";
import {NextUIProvider} from "@nextui-org/react";
import Head from "next/head";

export const mockSession = {
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