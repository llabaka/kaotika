import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MedievalButton from "./MedievalButton";

export default function GoogleLoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('useEffect triggered with status:', status);
    if (status === 'authenticated') {
      console.log('User is authenticated:', session);
      const email = session?.email || '';
      console.log(email.endsWith('@gmail.com'));
      if (email.endsWith('@gmail.com')) {
        router.push('/player');
      } else {
        router.push('/dashboard');
      }
    }
  }, [status]);

  if (!session) {
    return (
      <MedievalButton onClick={() => signIn("google")}>
        Iniciar sesión con Google
      </MedievalButton>
    );
  } else {
    return null;
  }
}