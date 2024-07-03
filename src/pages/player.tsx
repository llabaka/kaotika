import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Progress } from "@nextui-org/react";
import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import KaotikaNextButton from '@/components/KaotikaNextButton';
import KaotikaBackButton from '@/components/KaotikaPrevbutton';

interface Player {
    name: string;
    email: string;
    image: string;
    class: string;
}

interface Attribute {
  name: string;
  value: number;
  description: string;
}

interface Profile {
  attributes: Attribute[];
  description: string;
  name: string;
  image: string;
  _id: string;
}

const PlayerPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();
  const [playerData, setPlayerData] = useState<Player | null>(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute>();

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
            setProfiles(response.data.profiles);
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
    const profile = profiles.find((obj) => obj._id === selectedOption);
    setCurrentProfile(profile as Profile);
  }

  const handleNext = () => {
    const createQueryString = (name: string, value: Attribute[]) => {
      const params = new URLSearchParams();
      params.set(name, JSON.stringify(value));
  
      return params.toString();
    };

    router.push(`/equipment?${createQueryString("attributes", currentProfile?.attributes as Attribute[])}`);
  };

  const handleBack = () => {
    router.push('/welcome');
  };

  const handleAttributeClick = (attribute: Attribute) => {
    setCurrentAttribute(attribute);
    onOpen();
  }


  if (loading) {
    return <Loading />;
  }
  if (error) return <div className="text-4xl text-center">{error}</div>;

  return (
    <Layout>
    <div className="mx-auto flex-col text-medievalSepia">
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
          <h1 className="text-4xl mb-4">Select your Hero Profile </h1>        
            <select
                className="block w-full bg-gray-700 border-medievalSepia py-4 pl-6 pr-10 text-3xl"
                onChange={(e) => handleSelectedOption(e.target.value)}
                value={selectedOption}
            >
                <option value="" disabled>Select a profile</option>
                {profiles.map((item) => (
                    <option key={item._id} value={item._id}>
                    {item.name}
                    </option>
                ))}
            </select>
            {selectedOption ? (
              <div className="mb-5 mt-10">
                <p className="text-3xl text-medievalDarkSepia mb-4">{currentProfile?.description}</p>
              </div>
            ): null}
          </div>
          {selectedOption ? (
            <>
          <div className="w-1/3 p-4 text-center">
            <h1 className="text-4xl mb-4">{currentProfile?.name}</h1>
            <img
              className="mx-auto mb-8 sepia hover:sepia-0 transition"
              src={currentProfile?.image} 
              alt={currentProfile?.name}
            />
          </div>
          <div className="w-1/3 p-4">
            <div className="mb-5">
              <h1 className="text-4xl mb-4">Initial attribute points</h1>
              {currentProfile?.attributes.map((attribute) => (
                <div key={attribute.name} onClick={() => handleAttributeClick(attribute)} className='p-2 cursor-pointer hover:bg-neutral-600 transition rounded-lg'>
                  <Progress
                    key={attribute.name}
                    size="lg" 
                    radius="sm"
                    minValue={0}
                    maxValue={100}
                    classNames={{
                      track: "drop-shadow-md border border-sepia",
                      indicator: "bg-medievalSepia",
                      label: "text-medievalSepia tracking-wider text-3xl",
                      value: "text-3xl text-medievalSepia/100",
                    }}
                    formatOptions={{style: "decimal"}}
                    label={attribute.name}
                    value={attribute.value}
                    showValueLabel={true}
                  />  
                </div>
              ))}                   
            </div>
              <KaotikaNextButton handleNext={handleNext} />
              <KaotikaBackButton handleBack={handleBack} />
              <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='4xl' placement='top'>
                <ModalContent className='border-medievalSepia border-1 bg-black/80'>
                  {(onClose) => (
                    <>
                      <ModalBody>
                      <h1 className="text-5xl text-center text-medievalSepia">{currentAttribute?.name}</h1>
                        <p className="text-4xl text-medievalSepia">
                          {currentAttribute?.description}
                        </p>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
          </div>
          </>
          ) : null}
        </div>
        ) }
    </div>
    </Layout>
    );
}
export default PlayerPage;