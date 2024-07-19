import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Progress } from "@nextui-org/react";
import {Modal, ModalContent, ModalBody, useDisclosure} from "@nextui-org/react";
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import KaotikaNextButton from '@/components/KaotikaNextButton';
import KaotikaBackButton from '@/components/KaotikaPrevbutton';
import { Profile } from '@/_common/interfaces/Profile';
import { Attribute } from '@/_common/interfaces/Attribute';
import { Player } from '@/_common/interfaces/Player';
import PlayerAttributes from '@/components/player/PlayerAttributes';
import PlayerEquipment from '@/components/player/PlayerEquipment';
import PlayerInventory from '@/components/player/PlayerInventory';




const PlayerPage = () => {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter();
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [currentAttribute, setCurrentAttribute] = useState<Attribute>();
  const [player, setPlayer] = useState<Player>();
  

  useEffect(() => {
    if (session?.user?.email) {
      const fetchPlayerData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/player/check-registration?email=${session.user?.email}`);
          if (res.status === 200) {
            const data = await res.json();
            setPlayer(data.data.player[0]);
            console.log(`Registered player ${player}`)
            setIsRegistered(true);
          } else if (res.status === 404) {
            const response = await res.json();
            setIsRegistered(false);
            console.log(response.data.profiles)
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

  useEffect(() => {
    console.log(player)
  }, [player])
  

  const handleSelectedOption = (selectedOption: string) => {
    setSelectedOption(selectedOption);
    const profile = profiles.find((obj) => obj._id === selectedOption);
    setCurrentProfile(profile as Profile);
  }

  const handleNext = () => {
    const createQueryString = (name: string, value: Profile) => {
      const params = new URLSearchParams();
      params.set(name, JSON.stringify(value));
  
      return params.toString();
    };

    router.push(`/equipment?${createQueryString("profile", currentProfile as Profile)}`);
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
      {isRegistered && player ? (
        <div className="flex flex-col text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
          <div className="flex justify-center">
          <div className="w-1/3 p-4">
              <h2 className="text-4xl mb-4 text-center">PlayerAttributes</h2>
          </div>
          <div className="w-1/3 p-4">
              <h2 className="text-4xl mb-4 text-center">{player.name}</h2>
              <div className="w-full h-full p-8 border-1 rounded-lg border-sepia bg-black/70">
              <div className="grid grid-cols-6 gap-4 justify-items-center items-center">
                <div className="col-start-3 col-span-2"><img src="/images/helmet_back.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div className="col-start-1 col-end-3"><img src="/images/sword_back.jpg" alt="Inventory" className="object-contain rounded-full" style={{'border': '3px ridge #000000', 'width': '150px'}} /></div>
                <div className="col-start-3 col-end-5"><img src="/images/armor_back.jpg" alt="Inventory" className="w-full h-full object-contain rounded-sm" style={{'border': '3px ridge #000000'}} /></div>
                <div className="col-end-7 col-span-2"><img src="/images/shield_back.jpg" alt="Inventory" className="object-contain rounded-full" style={{'border': '3px ridge #000000', 'width': '150px'}} /></div>
                <div className="col-start-1 col-end-3"><img src="/images/artifact_back.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-full" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div className="col-start-3 col-end-5"><img src="/images/boots_back.jpg" alt="Inventory" className="w-full h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div className="col-end-7 col-span-2"><img src="/images/artifact_back.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-full" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
              </div>
              <h2 className="text-4xl mb-4 text-center">Level {player.level}</h2>
              <h2 className="text-4xl mb-4 text-center">Gold {player.gold}</h2>
              </div>
          </div>
          <div className="w-1/3 p-4">
              <h2 className="text-4xl mb-4 text-center">PlayerInventory</h2>
              <div className="w-full h-full p-12 border-1 rounded-lg border-sepia bg-black/70">
              <div className="grid grid-cols-6 gap-0 justify-items-center">
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
                <div><img src="/images/img.jpg" alt="Inventory" className="w-1/4 h-full object-contain rounded-sm" style={{'border': '3px ridge #000000', 'width': '100px'}} /></div>
              </div>
              </div>
          </div>
          </div>
        </div>
      ) : (
        <>
        <div className="flex flex-col items-center bg-gray-800 text-medievalSepia ">
          <h1 className="text-6xl mb-2 animate-pulse">Welcome to Legends of Kaotika, {session?.user?.name}</h1>
          <h2 className="text-4xl p-20 font-light">Today marks the beginning of your journey, a path filled with challenges and discoveries. As you step into this new adventure of Kaotika, remember that your dedication and commitment will be your greatest guides. Embrace the spirit of the Old School, where tradition meets innovation, and let it lead you to unparalleled growth and mastery. The road ahead may be demanding, but with determination and the support of your peers, you will achieve greatness. Welcome to the brotherhood; your adventure starts now.</h2>
          <h2 className="text-4xl mb-2">Let's set up your acolyte</h2>
        </div>
        <div className="w-full flex p-4">
          <div className="w-1/3 p-4">
          <h1 className="text-4xl mb-4 animate-bounce">Select your Hero Profile </h1>        
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
        </>
        ) }
    </div>
    </Layout>
    );
}
export default PlayerPage;