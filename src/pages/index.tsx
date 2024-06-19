import { useSession, signOut } from "next-auth/react";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Home = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        {session ? (
          <>
            <h1 className="text-4xl font-bold mb-8 text-white">
              Welcome {session?.user?.email}
            </h1>
            <button
              onClick={() => signOut()}
              className="text-4xl font-bold mb-8 px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 focus:outline-none"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <img
              className="mx-auto mb-8"
              src="/images/kaotika.png"  
              alt="Medieval Logo"
            />
            <GoogleLoginButton />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;