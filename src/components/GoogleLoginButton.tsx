import { signIn, useSession } from "next-auth/react";
import MedievalButton from "./MedievalButton";

export default function GoogleLoginButton() {
  const { data: session } = useSession();

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