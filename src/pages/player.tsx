import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Loading from '@/components/Loading';

interface Player {
    name: string;
    email: string;
    image: string;
    class: string;
}

interface Attribute {
  con: number;
  dex: number;
  int: number;
  str: number;
}

interface Class {
  attributes: Attribute;
  description: string;
  name: string;
  _id: string;
}

const PlayerPage = () => {
  const { data: session } = useSession();
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchPlayerData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/player/check-registration?email=${session.user?.email}`);
          if (res.status === 200) {
            const data = await res.json();
            setIsRegistered(true);
          } else if (res.status === 404) {
            const response = await res.json();
            setIsRegistered(false);
            setClasses(response.data.classes);
          } else {
            setError('An error occurred while checking registration');
          }
        } catch (error) {
          setError('An error occurred while checking registration');
        } finally {
          setLoading(false);
        }
      };

      fetchPlayerData();
    }
  }, [session]);

  const handleRegister = async () => {
    try {
      const res = await fetch(`/api/player/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session?.user?.email, option: selectedOption })
      });
      const data = await res.json();
      if (res.status === 200) {
        setPlayerData(data);
        setIsRegistered(true);
      } else {
        setError('An error occurred while registering');
      }
    } catch (error) {
      setError('An error occurred while registering');
    }
  };

  const handleSelectedOption = (selectedOption: string) => {
    const currentClass = classes.find((obj) => obj._id === selectedOption);
    setCurrentClass(currentClass as Class);
  }

  if (loading) {
    return <Loading />;
  }
  if (error) return <div className="text-4xl text-center">{error}</div>;

  return (
    <div className="container mx-auto mt-10">
      {isRegistered ? (
        <div>
          <h1 className="text-3xl font-bold">Welcome, {playerData?.name}</h1>
          <p>Email: {playerData?.email}</p>
          <p>Other data: {playerData?.image}</p>
          <p>Other data: {playerData?.class}</p>
        </div>
      ) : (
        <div className="w-full p-4">
            <h2 className="text-4xl mb-4">Select your Hero Class and Attributes</h2>        
            <select
                className="block w-full bg-gray-800 text-white border py-4 pl-6 pr-10 text-3xl"
                onChange={(e) => handleSelectedOption(e.target.value)}
                value={selectedOption}
            >
                <option value="" disabled>Select an Class</option>
                {classes.map((item) => (
                    <option key={item._id} value={item._id}>
                    {item.name}
                    </option>
                ))}
            </select>
        
            <div className="text-center">
                <div className="mb-5">
                  <p className="text-4xl mb-4">{currentClass?.name}</p>
                  <p className="text-4xl mb-4">{currentClass?.description}</p>
                  
                    <p className="text-4xl mb-4">Constitution: {currentClass?.attributes.con}</p>
                    <p className="text-4xl mb-4">Skill: {currentClass?.attributes.dex}</p>
                    <p className="text-4xl mb-4">Strength: {currentClass?.attributes.str}</p>
                    <p className="text-4xl mb-4">Intelligence: {currentClass?.attributes.int}</p>
                 
                </div>
                <button
                    onClick={handleRegister}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                REGISTER
                </button>
            </div>
        </div>
        ) }
    </div>
    
    );
}
export default PlayerPage;