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
import { Armor } from '@/_common/interfaces/Armor';
import { Modifier } from '@/_common/interfaces/Modifier';
import { Weapon } from '@/_common/interfaces/Weapon';
import { Artifact } from '@/_common/interfaces/Artifact';
import { HealingPotion } from '@/_common/interfaces/HealingPotion';
import { AntidotePotion } from '@/_common/interfaces/AntidotePotion';
import { EnhancerPotion } from '@/_common/interfaces/EnhancerPotion';

const Equipment = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [selectedArmor, setSelectedArmor] = useState<Armor>();
  const [selectedWeapon, setSelectedWeapon] = useState<Weapon>();
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact>();
  const [selectedHealingPotion, setSelectedHealingPotion] = useState<HealingPotion>();
  const [selectedAntidotePotion, setSelectedAntidotePotion] = useState<AntidotePotion>();
  const [selectedEnhancerPotion, setselectedEnhancerPotion] = useState<EnhancerPotion>();
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [currentAttributes, setCurrentAttributes] = useState<Attribute[]>()
  const [armorModifiers, setArmorModifiers] = useState<Modifier[] | null>(null);
  const [weaponModifiers, setWeaponModifiers] = useState<Modifier[] | null>(null);
  const [artifactModifiers, setArtifactModifiers] = useState<Modifier[] | null>(null);
  const [tempStrength, setTempStrength] = useState(0);
  const [tempConstitution, setTempConstitution] = useState(0);
  const [tempDexterity, setTempDexterity] = useState(0);
  const [tempIntelligence, setTempIntelligence] = useState(0);
  const [tempInsanity, setTempInsanity] = useState(0);
  const [tempCharisma, setTempCharisma] = useState(0);
  const [hitPoints, setHitPoints] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const profile = router.query.profile;
    setCurrentProfile(JSON.parse(profile as string));
    setCurrentAttributes(currentProfile?.attributes);

  }, []);

  const handleNext = async() => {
    setLoading(true);
  

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
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

  const handleSelectedArmor = (armor: Armor) => {
    setSelectedArmor(armor)
  }

  useEffect(() => {
    if(selectedArmor) setArmorModifiers(selectedArmor.modifiers);    
  }, [selectedArmor]);

  useEffect(() => {
    armorModifiers?.map(modifier => {
      changeAttributeValue(modifier.attribute, modifier.value);
    })
  }, [armorModifiers])
  
  useEffect(() => {
    calculateHitPoints();
  }, [currentProfile,tempConstitution])
  
  const changeAttributeValue = (attributeName: string, newValue: number) => {

    if (currentAttributes) {
      if(attributeName === 'Constitution') setTempConstitution(newValue);
      if(attributeName === "Strength") setTempStrength(newValue)
      if(attributeName === "Intelligence") setTempIntelligence(newValue)
      if(attributeName === "Dexterity") setTempDexterity(newValue)
      if(attributeName === "Charisma") setTempCharisma(newValue)
      if(attributeName === "Insanity") setTempInsanity(newValue)
    } 
  };

  const calculateHitPoints = (): void => {
    if (!currentProfile) return ;
    const strength = currentProfile.attributes.find(attr => attr.name === 'Strength')?.value || 0;
    const constitution = currentProfile.attributes.find(attr => attr.name === 'Constitution')?.value || 0;
    setHitPoints( (strength + tempStrength)  + (constitution + tempConstitution)); 
  };

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
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/90">
              {currentProfile?.equipment.armors.map((armor) => (
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement='top' size='sm' showArrow={true} content={<ArmorTooltip element={armor}/>}>
                <img
                  key={armor._id}
                  src={armor.image}
                  alt={armor.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArmor?._id === armor._id ? 'border-3 sepia-0 border-sepia duration-300' : ''}`}
                  onClick={() => handleSelectedArmor(armor)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Weapons</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.weapons.map((weapon) => (
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" size='sm' showArrow={true}  content={<WeaponTooltip element={weapon}/>}>
                <img
                  key={weapon._id}
                  src={weapon.image}
                  alt={weapon._id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedWeapon?._id === weapon._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedWeapon(weapon)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Artifacts</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.artifacts.map((artifact) => (
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" size='sm' showArrow={true} content={<ArtifactTooltip element={artifact}/>}>
                <img
                  key={artifact._id}
                  src={artifact.image}
                  alt={artifact.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArtifact?._id === artifact._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedArtifact(artifact)}
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
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" size='sm' showArrow={true} content={<HealingPotionTooltip element={potion}/>}>
                <img
                  key={potion._id}
                  src={potion.image}
                  alt={potion.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedHealingPotion?._id === potion._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedHealingPotion(potion)}}
                  
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Antidote Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.antidote_potions.map((potion) => (
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" size='sm' showArrow={true} content={<AntidotePotionTooltip element={potion}/>}>
                <img
                  key={potion._id}
                  src={potion.image}
                  alt={potion.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedAntidotePotion?._id === potion._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedAntidotePotion(potion)}}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Enhancer Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {currentProfile?.equipment.enhancer_potions.map((potion) => (
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" size='sm' showArrow={true} content={<EnhancerPotionTooltip element={potion}/>}>
                <img
                  key={potion._id}
                  src={potion.image}
                  alt={potion.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedEnhancerPotion?._id === potion._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setselectedEnhancerPotion(potion)}}
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
              {selectedArmor ? <img src={currentProfile?.equipment.armors.find(armor => armor._id === selectedArmor._id)?.image} 
                key={selectedArmor._id}
                alt="Selected Armor" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img key={"img_0"} src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedWeapon ? <img src={currentProfile?.equipment.weapons.find(weapon => weapon._id === selectedWeapon._id)?.image} 
                key={selectedWeapon._id}
                alt="Selected Weapon" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img key={"img_1"} src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedArtifact ? <img src={currentProfile?.equipment.artifacts.find(artifact => artifact._id === selectedArtifact._id)?.image} 
                alt="Selected Artifact" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img key={"img_2"} src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedHealingPotion ? <img src={currentProfile?.equipment.healing_potions.find(potion => potion._id === selectedHealingPotion._id)?.image} 
                alt="Selected Healing Potion" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img key={"img_3"} src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}
              />}
              {selectedAntidotePotion ? <img src={currentProfile?.equipment.antidote_potions.find(potion => potion._id === selectedAntidotePotion._id)?.image} 
                alt="Selected Antidote Potion" 
                className="w-full h-full object-contain rounded-full"
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img key={"img_4"} src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}  
              />}
              {selectedEnhancerPotion ? <img src={currentProfile?.equipment.enhancer_potions.find(potion => potion._id === selectedEnhancerPotion._id)?.image} 
                alt="Selected Enhanced Potion" 
                className="w-full h-full object-contain rounded-full"
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img key={"img_5"} src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}  
              />}
            </div> 
            <div className="w-full flex flex-col items-center m-4">
              <h2 className="text-4xl mb-4">{currentProfile?.name} attributes</h2> 
              <div className="w-full p-5 border-1 rounded-lg border-sepia bg-black/70">
                <Progress
                  key={"p-1"}
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
                  value={hitPoints}
                  showValueLabel={true}
                />
                <Progress
                  key={"p-2"}
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
                  key={"p-3"}
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
                  key={"p-4"}
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
                  key={"p-5"}
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
                  key={"p-6"}
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