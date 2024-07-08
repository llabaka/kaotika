import KaotikaNextButton from '@/components/KaotikaNextButton';
import KaotikaBackButton from '@/components/KaotikaPrevbutton';
import Layout from '@/components/Layout';
import { Tooltip } from '@nextui-org/react';
import { Progress } from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Loading from '@/components/Loading';
import { Profile } from '@/_common/interfaces/Profile';
import { Attribute } from '@/_common/interfaces/Attribute';
import ArmorTooltip from '@/components/ArmorTooltip';
import WeaponTooltip from '@/components/WeaponTooltip';
import ArtifactTooltip from '@/components/ArtifactTooltip';
import HealingPotionTooltip from '@/components/HealingPotionTooltip';
import AntidotePotionTooltip from '@/components/AntidotePotionTooltip';
import EnhancerPotionTooltip from '@/components/EnhancerPotionTooltip';

const Equipment = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedArmor, setSelectedArmor] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState('');
  const [selectedHealingPotion, setSelectedHealingPotion] = useState('');
  const [selectedAntidotePotion, setSelectedAntidotePotion] = useState('');
  const [selectedEnhancerPotion, setselectedEnhancerPotion] = useState('');
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const profile = router.query.profile;
    setCurrentProfile(JSON.parse(profile as string));
  }, []);

  const handleNext = async() => {
    console.log(session)
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

  const handleBack = () => {
    router.push('/player');
  };

  const sumAttributeValues = (currentAtrributes: Attribute[], toAdd: string[], toSubtract: string[] = [],multiplicationModifier:number = 1, divisionModifier:number = 1): number => {
    return currentAtrributes.reduce((sum: number, attr: Attribute) => {
      if(toAdd.includes(attr.name)) {
        return sum + attr.value * multiplicationModifier;
      } else if (toSubtract.includes(attr.name)) {
        return sum - (attr.value / divisionModifier)
      }
      return sum;
    }, 0)
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
    <div className="flex flex-col text-medievalSepia bg-cover bg-center min-h-screen" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
      <div className="flex justify-center">
        <div className="w-1/4 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Armor</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.armors.map((armor) => (
                <Tooltip className="text-4xl mb-4" size='sm' showArrow={false} content={<ArmorTooltip element={armor}/>}>
                <img
                  key={armor._id}
                  src={armor.image}
                  alt={armor.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArmor === armor._id ? 'border-3 sepia-0 border-sepia duration-300' : ''}`}
                  onClick={() => setSelectedArmor(armor._id)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Weapons</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.weapons.map((weapon) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={<WeaponTooltip element={weapon}/>}>
                <img
                  key={weapon._id}
                  src={weapon.image}
                  alt={weapon._id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedWeapon === weapon._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedWeapon(weapon._id)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Artifacts</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.artifacts.map((artifact) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={<ArtifactTooltip element={artifact}/>}>
                <img
                  key={artifact._id}
                  src={artifact.image}
                  alt={artifact.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArtifact === artifact._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedArtifact(artifact._id)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/4 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Healing Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.healing_potions.map((potion) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={<HealingPotionTooltip element={potion}/>}>
                <img
                  key={potion._id}
                  src={potion.image}
                  alt={potion.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedHealingPotion === potion._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedHealingPotion(potion._id)}}
                  
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Antidote Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.antidote_potions.map((potion) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={<AntidotePotionTooltip element={potion}/>}>
                <img
                  key={potion._id}
                  src={potion.image}
                  alt={potion.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedAntidotePotion === potion._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedAntidotePotion(potion._id)}}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Enhancer Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.enhancer_potions.map((potion) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={<EnhancerPotionTooltip element={potion}/>}>
                <img
                  key={potion._id}
                  src={potion.image}
                  alt={potion.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedEnhancerPotion === potion._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setselectedEnhancerPotion(potion._id)}}
                />
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Inventory</h2>
            <div className="w-full p-5 grid grid-cols-6 gap-12 border-1 rounded-lg border-sepia bg-black/70">
              {selectedArmor ? <img src={currentProfile?.equipment.armors.find(armor => armor._id === selectedArmor)?.image} 
                alt="Selected Armor" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedWeapon ? <img src={currentProfile?.equipment.weapons.find(weapon => weapon._id === selectedWeapon)?.image} 
                alt="Selected Weapon" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedArtifact ? <img src={currentProfile?.equipment.artifacts.find(artifact => artifact._id === selectedArtifact)?.image} 
                alt="Selected Artifact" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedHealingPotion ? <img src={currentProfile?.equipment.healing_potions.find(potion => potion._id === selectedHealingPotion)?.image} 
                alt="Selected Healing Potion" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}
              />}
              {selectedAntidotePotion ? <img src={currentProfile?.equipment.antidote_potions.find(potion => potion._id === selectedAntidotePotion)?.image} 
                alt="Selected Antidote Potion" 
                className="w-full h-full object-contain rounded-full"
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}  
              />}
              {selectedEnhancerPotion ? <img src={currentProfile?.equipment.enhancer_potions.find(potion => potion._id === selectedEnhancerPotion)?.image} 
                alt="Selected Enhanced Potion" 
                className="w-full h-full object-contain rounded-full"
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}  
              />}
            </div> 
            <div className="w-full flex flex-col items-center m-4">
              <h2 className="text-4xl mb-4">{currentProfile?.name} attributes</h2> 
              <div className="w-full p-5 border-1 rounded-lg border-sepia bg-black/70">
                <Progress
                  key={1}
                  size="lg" 
                  radius="sm"
                  minValue={0}
                  maxValue={300}
                  classNames={{
                    track: "drop-shadow-md border border-sepia",
                    indicator: "bg-medievalSepia",
                    label: "text-medievalSepia tracking-wider text-3xl",
                    value: "text-3xl text-medievalSepia/100",
                  }}
                  formatOptions={{style: "decimal"}}
                  label="Hit Points (Max 300)"
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Constitution', 'Strength'], []): 0}
                  showValueLabel={true}
                />
                <Progress
                  key={1}
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
                  label="Attack"
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Strength'], ['Insanity'],1, 2): 0}
                  showValueLabel={true}
                />  
                <Progress
                  key={1}
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
                  label="Defense"
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Constitution', 'Dexterity', 'Intelligence']): 0}
                  showValueLabel={true}
                />
                <Progress
                  key={1}
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
                  label="Magic resistance"
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Intelligence', 'Charisma']): 0}
                  showValueLabel={true}
                />  
                <Progress
                  key={1}
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
                  label="CFP (critical or fumble probability)"
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Insanity']): 0}
                  showValueLabel={true}
                />  
                <Progress
                  key={1}
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
                  label="BCFA (base critical & fumble attack)"
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Strength', 'Insanity']): 0}
                  showValueLabel={true}
                />  
              </div>
            </div> 
            <KaotikaNextButton handleNext={handleNext} />
            <KaotikaBackButton handleBack={handleBack} />                
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3 p-4 text-center">
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Equipment;