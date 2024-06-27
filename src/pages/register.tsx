import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    const { class: playerClass, equipment, potion } = router.query;

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        playerClass,
        equipment,
        potion,
      }),
    });

    if (response.ok) {
      router.push('/dashboard');
    } else {
      // Handle error
      console.error('Failed to register player');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.query.class || !router.query.equipment || !router.query.potion) {
      router.push('/player');
    }
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <h1 className="text-4xl mb-8">Register Your Player</h1>
      <p className="text-lg mb-8">Class: {router.query.class}</p>
      <p className="text-lg mb-8">Equipment: {router.query.equipment}</p>
      <p className="text-lg mb-8">Potion: {router.query.potion}</p>
      <button
        onClick={handleRegister}
        className="bg-blue-500 w-full text-white text-4xl py-2 px-4 mt-10 rounded"
      >
      Register
      </button>
    </div>
  );
};

export default Register;