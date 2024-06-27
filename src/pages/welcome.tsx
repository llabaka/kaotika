import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

const Welcome = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleNext = () => {
    router.push('/player');
  };

  const handleCancel = () => {
    handleSignOut();
  };

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl mb-8">Welcome to Kaotika, {session?.user?.name}</h1>
      <h2 className="text-4xl mb-8">Let's set up your acolyte</h2>
      <button
        onClick={handleNext}
        className="bg-blue-500 w-1/4 text-white text-4xl py-2 px-4 mt-10 rounded"
        >
        Next
      </button>
      <button
        onClick={handleCancel}
        className="bg-red-500 w-1/4 text-white text-4xl py-2 px-4 mt-10 rounded"
        >
        Cancel
      </button>
    </div>
  );
};

export default Welcome;