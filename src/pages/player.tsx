import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Progress } from "@nextui-org/react";
import { Tooltip } from '@nextui-org/react';
import {DndContext, DragEndEvent, DragOverEvent} from '@dnd-kit/core';
import Loading from '@/components/Loading';
import Layout from '@/components/Layout';
import KaotikaNextButton from '@/components/KaotikaNextButton';
import { Profile } from '@/_common/interfaces/Profile';
import { Player } from '@/_common/interfaces/Player';
import Droppable from '@/components/Droppable';
import Draggable from '@/components/Draggable';
import AttributeTooltip from '@/components/tooltips/AttributeTooltip';
import currentPlayer from '../data/player.json';

const PlayerPage = () => {

  const router = useRouter();
  const { data: session } = useSession();
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [player, setPlayer] = useState<Player>();
  const [currentHelmet, setCurrentHelmet] = useState<string | null>(null);
  const [currentWeapon, setCurrentWeapon] = useState<string | null>(null);
  const [currentArmor, setCurrentArmor] = useState<string | null>(null);
  const [currentShield, setCurrentShield] = useState<string | null>(null);
  const [currentArtifact, setCurrentArtifact] = useState<string | null>(null);
  const [currentBoots, setCurrentBoots] = useState<string | null>(null);
  const [currentRing, setCurrentRing] = useState<string | null>(null);
  const [currentHealingPotion, setCurrentHealingPotion] = useState<string | null>(null);
  const [currentAntidotePotion, setCurrentAntidotePotion] = useState<string | null>(null);
  const [currentEnhancerPotion, setCurrentEnhancerPotion] = useState<string | null>(null);

  useEffect(() => {
    if (session?.user?.email) {
      const fetchPlayerData = async () => {
        try {
          setLoading(true);
          const res = await fetch(`/api/player/check-registration?email=${session.user?.email}`);
          if (res.status === 200) {
            const data = await res.json();
            setPlayer(currentPlayer);
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

  const handleDragStart = (event: DragOverEvent) => {
    
    const {active, over} = event;
    
    if (over && active.data.current?.supports.includes(over.data.current?.type)) {

    }
  }

  const handleDragOver = (event: DragOverEvent) => {
    const {active, over} = event;
    if (over && active.data.current?.supports.includes(over.data.current?.type)) {

    }
  }

  const handleDragEnd =(event: DragEndEvent)=> {
    const {active, over} = event;
    
    if (over && active.data.current?.supports.includes(over.data.current?.type)) {
      const img = (document.getElementById(active.id.toString()) as HTMLImageElement)
      const baseUrl = 'https://www.localhost:3000';
      const src = img.src.replace(baseUrl, "");
      if(over.data.current?.type === 'helmet') setCurrentHelmet(src);
      if(over.data.current?.type === 'weapon') setCurrentWeapon(src);
      if(over.data.current?.type === 'armor') setCurrentArmor(src);
      if(over.data.current?.type === 'shield') setCurrentShield(src);
      if(over.data.current?.type === 'artifact') setCurrentArtifact(src);
      if(over.data.current?.type === 'boot') setCurrentBoots(src);
      if(over.data.current?.type === 'ring') setCurrentRing(src);
      if(over.data.current?.type === 'healing') setCurrentHealingPotion(src);
      if(over.data.current?.type === 'antidote') setCurrentAntidotePotion(src);
      if(over.data.current?.type === 'enhancer') setCurrentEnhancerPotion(src);
    }
  }

  if (loading) {
    return <Loading />;
  }
  if (error) return <div className="text-4xl text-center">{error}</div>;

  return (
    <Layout>
    <div className="mx-auto flex-col text-medievalSepia">
      {isRegistered && player ? (
        <DndContext onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>
        <div className="flex flex-col text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
          <div className="flex justify-center">
          <div className="w-1/3 p-4">
            <h2 className="text-4xl mb-4 text-center border-1 rounded-l-3xl  border-sepia bg-black/70 p-3">Attributes</h2>
            <div className="w-full h-full p-12 border-1 rounded-lg border-sepia bg-black/70 rounded-l-3xl">
            </div>
          </div>
          <div className="w-1/3 p-4">
            <h2 className="text-4xl mb-4 text-center border-1  border-sepia bg-black/70 p-3">{player.nickname ? player.nickname : player.name}</h2>
            <div className="w-full h-full p-8 border-1 rounded-lg border-sepia bg-black/70">
              <div className="grid grid-cols-6 gap-4 justify-items-center items-center">
                <div className="col-start-3 col-span-2">
                  <Droppable id={100} type='helmet' children={currentPlayer.equipment.helmet 
                  ? 
                    <Draggable id="helmet_1" type={['helmet', 'inventory']} src={currentPlayer.equipment.helmet.image} className="w-1/4 h-full object-contain rounded-sm" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="helmet_2" type={[]} src="/images/helmet_back.jpg" className="w-1/4 h-full object-contain rounded-sm" width="100px" border="3px ridge #000000" />}/>
                </div>
                <div className="col-start-1 col-end-3">
                  <Droppable id={200} type='weapon' children={currentPlayer.equipment.weapon 
                  ? 
                    <Draggable id="weapon_1" type={['weapon', 'inventory']} src={currentPlayer.equipment.weapon.image} className="w-1/4 h-full object-contain rounded-full" width="150px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="weapon_2" type={[]} src="/images/sword_back.jpg" className="w-1/4 h-full object-contain rounded-full" width="150px" border="3px ridge #000000" />}/>
                </div>
                <div className="col-start-3 col-end-5">
                  <Droppable id={300} type='armor' children={currentPlayer.equipment.armor 
                  ? 
                    <Draggable id="armor_1" type={['armor', 'inventory']} src={currentPlayer.equipment.armor.image} className="w-1/4 h-full object-contain rounded-sm" width="200px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="armor_2" type={[]} src="/images/armor_back.jpg" className="w-1/4 h-full object-contain rounded-sm" width="200px" border="3px ridge #000000" />}/>
                </div>
                <div className="col-end-7 col-span-2">
                  <Droppable id={400} type='shield' children={currentPlayer.equipment.shield 
                  ? 
                    <Draggable id="shield_1" type={['shield', 'inventory']} src={currentPlayer.equipment.shield.image} className="w-1/4 h-full object-contain rounded-full" width="150px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="shield_2" type={[]} src="/images/shield_back.jpg" className="w-1/4 h-full object-contain rounded-full" width="150px" border="3px ridge #000000" />}/>
                </div>
                <div className="col-start-1 col-end-3">
                  <Droppable id={500} type='artifact' children={currentPlayer.equipment.artifact 
                  ? 
                    <Draggable id="artifact_1" type={['artifact', 'inventory']} src={currentPlayer.equipment.artifact.image} className="w-1/4 h-full object-contain rounded-full" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="artifact_2" type={[]} src="/images/artifact_back.jpg" className="w-1/4 h-full object-contain rounded-full" width="100px" border="3px ridge #000000" />}/>
                  </div>
                <div className="col-start-3 col-end-5">
                <Droppable id={600} type='boot' children={currentPlayer.equipment.boot 
                  ? 
                    <Draggable id="boot_1" type={['boot', 'inventory']} src={currentPlayer.equipment.boot.image} className="w-1/4 h-full object-contain rrounded-sm" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="boot_2" type={[]} src="/images/boots_back.jpg" className="w-1/4 h-full object-contain rounded-sm" width="100px" border="3px ridge #000000" />}/>
                  </div>
                <div className="col-end-7 col-span-2">
                  <Droppable id={700} type='ring' children={currentPlayer.equipment.ring 
                  ? 
                    <Draggable id="ring_1" type={['ring', 'inventory']} src={currentPlayer.equipment.ring.image} className="w-1/4 h-full object-contain rounded-full" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <Draggable id="ring_2" type={[]} src="/images/ring_back.png" className="w-1/4 h-full object-contain rounded-full" width="100px" border="3px ridge #000000" />}/>
                </div>
              </div>
              <div className="grid grid-cols-3 grid-rows-1 flex-grow justify-items-center items-center pt-10">
                <Droppable id={800} type='healing' children={currentPlayer.equipment.healing_potion 
                ? 
                  <Draggable id="healing_1" type={['healing', 'inventory']} src={currentPlayer.equipment.healing_potion.image} className="w-1/4 h-full object-contain" width="100px" border="3px ridge #cda882" /> 
                : 
                  <Draggable id="healing_2" type={[]} src="/images/healing_potion_back.jpg" className="w-1/4 h-full object-contain" width="100px" border="3px ridge #000000" />}/>

                <Droppable id={900} type='antidote' children={currentPlayer.equipment.antidote_potion 
                ? 
                  <Draggable id="antidote_1" type={['antidote', 'inventory']} src={currentPlayer.equipment.antidote_potion.image} className="w-1/4 h-full object-contain" width="100px" border="3px ridge #cda882" /> 
                : 
                  <Draggable id="antidote_2" type={[]} src="/images/antidote_potion_back.jpg" className="w-1/4 h-full object-contain" width="100px" border="3px ridge #000000" />}/>

                <Droppable id={1000} type='enhancer' children={currentPlayer.equipment.enhancer_potion 
                ? 
                  <Draggable id="enhancer_1" type={['enhancer', 'inventory']} src={currentPlayer.equipment.enhancer_potion.image} className="w-1/4 h-full object-contain" width="100px" border="3px ridge #cda882" /> 
                : 
                  <Draggable id="enhancer_2" type={[]} src="/images/enhancer_potion_back.jpg" className="w-1/4 h-full object-contain" width="100px" border="3px ridge #000000" />}/>
              </div>
              <div className="grid grid-cols-2 gap-4 justify-items-center items-center pt-10">
                <h2 className="text-4xl mb-4 text-center">Level: {player.level}</h2>
                <h2 className="text-4xl mb-4 text-center">XP: {player.experience}</h2>
                <h2 className="text-4xl mb-4 text-center">Gold: {player.gold}</h2>
              </div>
            </div>
          </div>
          <div className="w-1/3 p-4">
            <h2 className="text-4xl mb-4 text-center border-1 border-sepia bg-black/70 p-3">Inventory</h2>
            <div className="w-full h-full bg-black/70 flex flex-col">
              <div className="grid grid-cols-5 grid-rows-5 flex-grow">
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={1}  type='inventory' children={<Draggable id="23" type={['weapon', 'inventory']} src="/images/equipment/weapons/sword_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={2}  type='inventory' children={<Draggable id="24" type={['shield', 'inventory']} src="/images/equipment/shields/shield_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={3}  type='inventory' children={<Draggable id="25" type={['shield', 'inventory']} src="/images/equipment/shields/shield_3.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={4}  type='inventory' children={<Draggable id="26" type={['ring', 'inventory']} src="/images/equipment/rings/ring_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={5}  type='inventory' children={<Draggable id="27" type={['ring', 'inventory']} src="/images/equipment/rings/ring_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={6}  type='inventory' children={<Draggable id="28" type={['helmet', 'inventory']} src="/images/equipment/helmets/helmet_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={7}  type='inventory' children={<Draggable id="29" type={['boot', 'inventory']} src="/images/equipment/boots/boot_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={8}  type='inventory' children={<Draggable id="30" type={['armor', 'inventory']} src="/images/equipment/armors/armor_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={9}  type='inventory' children={<Draggable id="31" type={['artifact', 'inventory']} src="/images/equipment/artifacts/artifact_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={10} type='inventory'  children={<Draggable id="32" type={['enhancer', 'inventory']} src="/images/equipment/potions/enhancer/enhancer_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={11} type='inventory'  children={<Draggable id="33" type={['antidote', 'inventory']} src="/images/equipment/potions/antidote/antidote_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={12} type='inventory'  children={<Draggable id="34" type={['healing', 'inventory']} src="/images/equipment/potions/healing/healing_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={13} type='inventory'  children={<Draggable id="35" type={['enhancer', 'inventory']} src="/images/equipment/potions/enhancer/enhancer_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={14} type='inventory'  children={<Draggable id="36" type={['healing', 'inventory']} src="/images/equipment/potions/healing/healing_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={15} type='inventory'  children={<Draggable id="37" type={['healing', 'inventory']} src="/images/equipment/potions/healing/healing_3.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={16} type='inventory'  children={<Draggable id="38" type={['weapon', 'inventory']} src="/images/equipment/uniques/weapons/swords/epic_sword_1.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={17} type='inventory'  children={<Draggable id="39" type={['weapon', 'inventory']} src="/images/equipment/uniques/weapons/swords/epic_sword_2.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={18} type='inventory'  children={<Draggable id="40" type={['weapon', 'inventory']} src="/images/equipment/uniques/weapons/swords/epic_sword_3.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={19} type='inventory'  children={<Draggable id="41" type={['weapon', 'inventory']} src="/images/equipment/uniques/weapons/swords/epic_sword_4.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={20} type='inventory'  children={<Draggable id="42" type={['weapon', 'inventory']} src="/images/equipment/uniques/weapons/swords/epic_sword_5.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={21} type='inventory'  children={<Draggable id="43" type={['weapon', 'inventory']} src="/images/equipment/uniques/weapons/swords/epic_sword_6.png" className={undefined} width="150px" border="" />}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={22} type='inventory'  children={null}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={23} type='inventory'  children={null}/></div>    
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={24} type='inventory'  children={null}/></div>
                <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}><Droppable id={25} type='inventory'  children={null}/></div>      
              </div>
            </div>
          </div>
          </div>
        </div>
        </DndContext>
      ) : (
        <>
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
                <Tooltip key={attribute.name} className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" size='sm' showArrow={true} content={<AttributeTooltip element={attribute}/>}>
                  <div key={attribute.name} className='p-2 cursor-pointer hover:bg-neutral-600 transition rounded-lg'>
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
                </Tooltip>
              ))}                   
            </div>
              <KaotikaNextButton handleNext={handleNext} />
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