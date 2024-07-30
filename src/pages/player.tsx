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
import {GRID_NUMBER} from '../constants/constants';
import ArmorTooltip from '@/components/tooltips/ArmorTooltip';
import EnhancerPotionTooltip from '@/components/tooltips/EnhancerPotionTooltip';
import HelmetTooltip from '@/components/tooltips/HelmetTooltip';
import WeaponTooltip from '@/components/tooltips/WeaponTooltip';
import ShieldTooltip from '@/components/tooltips/ShieldTooltip';
import ArtifactTooltip from '@/components/tooltips/ArtifactTooltip';
import BootTooltip from '@/components/tooltips/BootTooltip';
import HealingPotionTooltip from '@/components/tooltips/HealingPotionTooltip';
import AntidotePotionTooltip from '@/components/tooltips/AntidotePotionTooltip';
import RingTooltip from '@/components/tooltips/RingTooltip';

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
      console.log(active)
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
                  <Droppable id={100} type='helmet' children={player.equipment.helmet 
                  ? 
                    <Draggable id="helmet_1" tooltip={<HelmetTooltip element={player.equipment.helmet}/>} type={['helmet', 'inventory']} element={player.equipment.helmet} className="w-1/4 h-full object-contain rounded-sm" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <img id="helmet_2" src="/images/helmet_back.jpg" className="w-1/4 h-full object-contain rounded-sm" width="100px" style={{'border': "3px ridge #000000"}} />}/>
                </div>
                <div className="col-start-1 col-end-3">
                  <Droppable id={200} type='weapon' children={player.equipment.weapon 
                  ? 
                    <Draggable id="weapon_1" tooltip={<WeaponTooltip element={player.equipment.weapon}/>} type={['weapon', 'inventory']} element={player.equipment.weapon} className="w-1/4 h-full object-contain rounded-full" width="150px" border="3px ridge #cda882" /> 
                  : 
                    <img id="weapon_2" src="/images/sword_back.jpg" className="w-1/4 h-full object-contain rounded-full" width="150px" style={{'border': "3px ridge #000000"}} />}/>
                </div>
                <div className="col-start-3 col-end-5">
                  <Droppable id={300} type='armor' children={player.equipment.armor 
                  ? 
                    <Draggable id="armor_1" tooltip={<ArmorTooltip element={player.equipment.armor}/>} type={['armor', 'inventory']} element={player.equipment.armor} className="w-1/4 h-full object-contain rounded-sm" width="200px" border="3px ridge #cda882" /> 
                  : 
                    <img id="armor_2" src="/images/armor_back.jpg" className="w-1/4 h-full object-contain rounded-sm" width="200px" style={{'border': "3px ridge #000000"}} />}/>
                </div>
                <div className="col-end-7 col-span-2">
                  <Droppable id={400} type='shield' children={player.equipment.shield 
                  ? 
                    <Draggable id="shield_1" tooltip={<ShieldTooltip element={player.equipment.shield}/>} type={['shield', 'inventory']} element={player.equipment.shield} className="w-1/4 h-full object-contain rounded-full" width="150px" border="3px ridge #cda882" /> 
                  : 
                    <img id="shield_2" src="/images/shield_back.jpg" className="w-1/4 h-full object-contain rounded-full" width="150px" style={{'border': "3px ridge #000000"}} />}/>
                </div>
                <div className="col-start-1 col-end-3">
                  <Droppable id={500} type='artifact' children={player.equipment.artifact 
                  ? 
                    <Draggable id="artifact_1" tooltip={<ArtifactTooltip element={player.equipment.artifact}/>} type={['artifact', 'inventory']} element={player.equipment.artifact} className="w-1/4 h-full object-contain rounded-full" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <img id="artifact_2" src="/images/artifact_back.jpg" className="w-1/4 h-full object-contain rounded-full" width="100px" style={{'border': "3px ridge #000000"}} />}/>
                  </div>
                <div className="col-start-3 col-end-5">
                <Droppable id={600} type='boot' children={player.equipment.boot 
                  ? 
                    <Draggable id="boot_1" tooltip={<BootTooltip element={player.equipment.boot}/>} type={['boot', 'inventory']} element={player.equipment.boot} className="w-1/4 h-full object-contain rrounded-sm" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <img id="boot_2" src="/images/boots_back.jpg" className="w-1/4 h-full object-contain rounded-sm" width="100px" style={{'border': "3px ridge #000000"}} />}/>
                  </div>
                <div className="col-end-7 col-span-2">
                  <Droppable id={700} type='ring' children={player.equipment.ring 
                  ? 
                    <Draggable id="ring_1" tooltip={<RingTooltip element={player.equipment.ring}/>} type={['ring', 'inventory']} element={player.equipment.ring} className="w-1/4 h-full object-contain rounded-full" width="100px" border="3px ridge #cda882" /> 
                  : 
                    <img id="ring_2" src="/images/ring_back.png" className="w-1/4 h-full object-contain rounded-full" width="100px" style={{'border': "3px ridge #000000"}} />}/>
                </div>
              </div>
              <div className="grid grid-cols-3 grid-rows-1 flex-grow justify-items-center items-center pt-10">
                <Droppable id={800} type='healing' children={player.equipment.healing_potion 
                ? 
                  <Draggable id="healing_1" tooltip={<HealingPotionTooltip element={player.equipment.healing_potion}/>} type={['healing', 'inventory']} element={player.equipment.healing_potion} className="w-1/4 h-full object-contain" width="100px" border="3px ridge #cda882" /> 
                : 
                  <img id="healing_2" src="/images/healing_potion_back.jpg" className="w-1/4 h-full object-contain" width="100px" style={{'border': "3px ridge #000000"}} />}/>

                <Droppable id={900} type='antidote' children={player.equipment.antidote_potion 
                ? 
                  <Draggable id="antidote_1" tooltip={<AntidotePotionTooltip element={player.equipment.antidote_potion}/>} type={['antidote', 'inventory']} element={player.equipment.antidote_potion} className="w-1/4 h-full object-contain" width="100px" border="3px ridge #cda882" /> 
                : 
                  <img id="antidote_2" src="/images/antidote_potion_back.jpg" className="w-1/4 h-full object-contain" width="100px" style={{'border': "3px ridge #000000"}} />}/>

                <Droppable id={1000} type='enhancer' children={player.equipment.enhancer_potion 
                ? 
                  <Draggable id="enhancer_1" tooltip={<EnhancerPotionTooltip element={player.equipment.enhancer_potion}/>} type={['enhancer', 'inventory']} element={player.equipment.enhancer_potion} className="w-1/4 h-full object-contain" width="100px" border="3px ridge #cda882" /> 
                : 
                  <img id="enhancer_2" src="/images/enhancer_potion_back.jpg" className="w-1/4 h-full object-contain" width="100px" style={{'border': "3px ridge #000000"}} />}/>
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
              <div className="grid grid-cols-8 grid-rows-8 flex-grow">
                {
                  player.inventory.helmets.map((helmet, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={10}  type='inventory' children={<Draggable id={helmet.type + index} tooltip={<HelmetTooltip element={helmet}/>} type={[`${helmet.type}`, 'inventory']} element={helmet} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.weapons.map((weapon, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={20}  type='inventory' children={<Draggable id={weapon.type + index} tooltip={<WeaponTooltip element={weapon}/>} type={[`${weapon.type}`, 'inventory']} element={weapon} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.armors.map((armor, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>    
                          <Droppable id={30}  type='inventory' children={<Draggable id={armor.type + index} tooltip={<ArmorTooltip element={armor}/>} type={[`${armor.type}`, 'inventory']} element={armor} className={undefined} width="150px" border="" />}/>                      
                      </div>
                    )
                  })
                }
                {
                  player.inventory.shields.map((shield, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={40}  type='inventory' children={<Draggable id={shield.type + index} tooltip={<ShieldTooltip element={shield}/>} type={[`${shield.type}`, 'inventory']} element={shield} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.artifacts.map((artifact, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={50}  type='inventory' children={<Draggable id={artifact.type + index} tooltip={<ArtifactTooltip element={artifact}/>} type={[`${artifact.type}`, 'inventory']} element={artifact} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.boots.map((boot, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={1}  type='inventory' children={<Draggable id={boot.type + index} tooltip={<BootTooltip element={boot}/>} type={[`${boot.type}`, 'inventory']} element={boot} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.rings.map((ring, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={1}  type='inventory' children={<Draggable id={ring.type + index} tooltip={<RingTooltip element={ring}/>} type={[`${ring.type}`, 'inventory']} element={ring} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.healing_potions.map((healing, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={1}  type='inventory' children={<Draggable id={healing.type + index} tooltip={<HealingPotionTooltip element={healing}/>} type={[`${healing.type}`, 'inventory']} element={healing} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.antidote_potions.map((antidote, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={1}  type='inventory' children={<Draggable id={antidote.type + index} tooltip={<AntidotePotionTooltip element={antidote}/>} type={[`${antidote.type}`, 'inventory']} element={antidote} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  player.inventory.enhancer_potions.map((enhancer, index) => {
                    return (
                      <div className="flex justify-center items-center bg-black/30" style={{'border': '3px ridge #000000'}}>
                        <Droppable id={1}  type='inventory' children={<Draggable id={enhancer.type + index} tooltip={<EnhancerPotionTooltip element={enhancer}/>} type={[`${enhancer.type}`, 'inventory']} element={enhancer} className={undefined} width="150px" border="" />}/>
                      </div>
                    )
                  })
                }
                {
                  
                }
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