import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Progress } from "@nextui-org/react";
import Image from 'next/image'
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
  img: string;
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
    setSelectedOption(selectedOption);
    const currentClass = classes.find((obj) => obj._id === selectedOption);
    setCurrentClass(currentClass as Class);
  }

  if (loading) {
    return <Loading />;
  }
  if (error) return <div className="text-4xl text-center">{error}</div>;

  return (
    <div className="mx-auto mt-10 flex-col">
      {isRegistered ? (
        <div className="w-full p-4">
          <h1 className="text-3xl font-bold">Welcome, {playerData?.name}</h1>
          <p>Email: {playerData?.email}</p>
          <p>Other data: {playerData?.image}</p>
          <p>Other data: {playerData?.class}</p>
        </div>
      ) : (
        <div className="w-full flex p-4">
          <div className="w-1/3 p-4">
          <h1 className="text-6xl mb-4">Select your Hero Class </h1>        
            <select
                className="block w-full bg-gray-800 text-white border py-4 pl-6 pr-10 text-4xl"
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
            {selectedOption ? (
              <div className="mb-5 mt-10">
                <h1 className="text-6xl mb-4">{currentClass?.name}</h1>
                <p className="text-4xl text-white mb-4">{currentClass?.description}</p>
              </div>
            ): null}
          </div>
          {selectedOption ? (
            <>
          <div className="w-1/3 p-4 text-center">
            <img
              className="mx-auto mb-8"
              src={currentClass?.img} 
              alt={currentClass?.name}
            />
          </div>
          <div className="w-1/3 p-4">
            <div className="mb-5">
              <h1 className="text-6xl mb-4">Initial attribute points</h1>
              <Progress
                size="lg"
                radius="sm"
                minValue={0}
                maxValue={100}
                classNames={{
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider text-4xl text-default-300 mt-10",
                  value: "text-foreground/90",
                }}
                label="Constitution"
                value={currentClass?.attributes.con}
                showValueLabel={true}
              />
              <Progress
                size="lg"
                radius="sm"
                minValue={0}
                maxValue={100}
                classNames={{
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider text-4xl text-default-300 mt-10",
                  value: "text-foreground/60",
                }}
                label="Dexterity"
                value={currentClass?.attributes.dex}
                showValueLabel={true}
              />
              <Progress
                size="lg"
                radius="sm"
                minValue={0}
                maxValue={100}
                classNames={{
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500",
                  label: "tracking-wider text-4xl text-default-300 mt-10",
                  value: "text-foreground/60",
                }}
                label="Strength"
                value={currentClass?.attributes.str}
                showValueLabel={true}
              />
              <Progress
                size="lg"
                radius="sm"
                minValue={0}
                maxValue={100}
                classNames={{
                  track: "drop-shadow-md border border-default",
                  indicator: "bg-gradient-to-r from-pink-500 to-yellow-500 mb-10",
                  label: "tracking-wider text-4xl text-default-300 mt-10",
                  value: "text-4xl text-default-300 mt-10",
                }}
                label="Intelligence"
                value={currentClass?.attributes.int}
                showValueLabel={false}
              />              
            </div>
            <button
                onClick={handleRegister}
                className="bg-blue-500 w-full text-white text-4xl py-2 px-4 mt-10 rounded"
            >
            REGISTER
            </button>
          </div>
          </>
          ) : null}
        </div>
        ) }
    </div>
    
    );
}
export default PlayerPage;