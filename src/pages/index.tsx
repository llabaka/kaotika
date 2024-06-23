import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import GoogleLoginButton from "../components/GoogleLoginButton";

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);
  
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