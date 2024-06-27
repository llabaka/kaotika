import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useEffect } from 'react';
import GoogleLoginButton from "../components/GoogleLoginButton";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('User is authenticated on HomePage:', session);
      const email = session?.user?.email || '';
      if (email.endsWith('@gmail.com')) {
        router.push('/welcome');
      } else {
        router.push('/dashboard');
      }
    }
  }, [status]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center flex-row">
        {!session ? (
          <>
          <div>
            <img
              className="mx-auto mb-8"
              src="/images/kaotika.png"  
              alt="Medieval Logo"
            />
          </div>
          <div>
            <GoogleLoginButton />
          </div>
          <div>
            <h1 className="text-3xl mb-4">Developed by Mortimer. Version: {publicRuntimeConfig?.version}</h1>
          </div>
        </>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default Home;