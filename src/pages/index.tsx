import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GoogleLoginButton from "../components/GoogleLoginButton";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('User is authenticated on HomePage:', session);
      const email = session?.user?.email || '';
      if (email.endsWith('@gmail.com')) {
        router.push('/player');
      } else {
        router.push('/dashboard');
      }
    }
  }, [status]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {!session ? (
          <>
          <img
            className="mx-auto mb-8"
            src="/images/kaotika.png"  
            alt="Medieval Logo"
          />
          <GoogleLoginButton />
        </>
        ) : (
          null
        )}
      </div>
    </div>
  );
};

export default Home;