import { signIn, useSession } from "next-auth/react";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MedievalButton from "./MedievalButton";

export default function GoogleLoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <MedievalButton onClick={() => signIn("google")}>
        Google Signin
      </MedievalButton>
    );
  } else {
    return null;
  }
}