import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import { useEffect } from 'react';
import GoogleLoginButton from "../components/GoogleLoginButton";
import Loading from '@/components/Loading';

const Home = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    
    if (status === 'authenticated') {
      console.log('User is authenticated on HomePage:', session);
      const email = session?.user?.email || '';
      const fetchPlayer = async () => {
        try {        
          const res = await fetch(`/api/player/check-registration?email=${email}`);
          if(res.status === 200 && email.endsWith('@gmail.com')) router.push('/player');
          if(res.status === 200 && email.endsWith('@aeg.eus')) router.push('/dashboard'); 
          if(res.status === 404) router.push('/welcome');           
        } catch (error) {
          console.error('Failed to fetch player:', error);
        } 
      }
      fetchPlayer();
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center flex-row">
        {!session ? (
          <>
          <div>
            <h1 className="text-8xl mb-4 text-medievalSepia">LEGENDS</h1>
            <h1 className="text-6xl mb-4 text-medievalSepia">of</h1>
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
            <h1 className="text-3xl mb-4 text-medievalSepia">Developed by Mortimer. Version: {publicRuntimeConfig?.version}</h1>
          </div>
        </>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Home;