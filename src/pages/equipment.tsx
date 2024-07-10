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
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>();
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
  const [attack, setAttack] = useState(0);
  const [defense, setDefense] = useState(0);
  const [magicResistance, setmagicResistance] = useState(0);
  const [cfp, setCFP] = useState(0);
  const [bcfa, setBCFA] = useState(0);
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
        name: session?.user?.name,
        email: session?.user?.email,
        avatar: session?.user?.image,
        profile: currentProfile?._id,
        equipment:{
          armor: selectedArmor?._id,
          weapon: selectedWeapon?._id, 
          artifact:selectedArtifact?._id,
          healing_potion: selectedHealingPotion?._id,
          antidote_potion: selectedAntidotePotion?._id,
          enhancer_potion: selectedEnhancerPotion?._id
        }         
      }),
    });

    if (response.ok) {
      router.push('/player');
    } else {
      // Handle error
      console.error('Failed to register player');
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/player');
  };

  const handleSelectedArmor = (armor: Armor) => {
    if(selectedArmor === armor) {      
      return;
    }
    const previousModifiers = selectedArmor?.modifiers.map(modifier => modifier)
      if(previousModifiers) {
        previousModifiers.map(modifier => {
          removeTempAttributeValue(modifier.attribute, modifier.value);
        })
      }
    setSelectedArmor(armor);
  }

  const handleSelectedWeapon = (weapon: Weapon) => {
    if(selectedWeapon === weapon) {      
      return;
    }
    const previousModifiers = selectedWeapon?.modifiers.map(modifier => modifier)
    if(previousModifiers) {
      previousModifiers.map(modifier => {
        removeTempAttributeValue(modifier.attribute, modifier.value);
      })
    }
    setSelectedWeapon(weapon);
  }

  const handleSelectedArtifact = (artifact: Artifact) => {
    if(selectedArtifact === artifact) {      
      return;
    }
    const previousModifiers = selectedArtifact?.modifiers.map(modifier => modifier)
    if(previousModifiers) {
      previousModifiers.map(modifier => {
        removeTempAttributeValue(modifier.attribute, modifier.value);
      })
    }
    setSelectedArtifact(artifact);
  }

  useEffect(() => {
    console.log("ARMOR CHANGED");
    console.log(selectedArmor);
    if(selectedArmor) setArmorModifiers(selectedArmor.modifiers);    
  }, [selectedArmor]);

  useEffect(() => {
    console.log("ARMOR MODIFIERS");
    armorModifiers?.map(modifier => {
      console.log("MODIFIER");
      console.log(modifier);
      changeAttributeValue(modifier.attribute, modifier.value);
    })
  }, [armorModifiers]);

  useEffect(() => {
    console.log("WEAPON CHANGED");
    if(selectedWeapon) setWeaponModifiers(selectedWeapon.modifiers);    
  }, [selectedWeapon]);

  useEffect(() => {
    console.log("WEAPON MODIFIERS");
    weaponModifiers?.map(modifier => {
      console.log("MODIFIER");
      changeAttributeValue(modifier.attribute, modifier.value);
    })
  }, [weaponModifiers]);

  useEffect(() => {
    console.log("ARTIFACT CHANGED");
    if(selectedArtifact) setArtifactModifiers(selectedArtifact.modifiers);    
  }, [selectedArtifact]);

  useEffect(() => {
    console.log("ARTIFACT MODIFIERS");
    artifactModifiers?.map(modifier => {
      console.log("MODIFIER");
      changeAttributeValue(modifier.attribute, modifier.value);
    })
  }, [artifactModifiers]);
  
  useEffect(() => {
    console.log("CALCULATE ALL");
    calculateHitPoints();
    calculateAttack();
    calculateDefense();
    calculateMagicResistance();
    calculateCFP();
    calculateBCFA();
  }, [currentProfile, tempConstitution, tempStrength, tempIntelligence, tempDexterity, tempCharisma, tempInsanity])
  
  const changeAttributeValue = (attributeName: string, newValue: number) => {
    console.log("CURRENT CHANGE ATTRIBUTE ", attributeName); 
    if(attributeName === 'Constitution') setTempConstitution(newValue + tempConstitution);
    if(attributeName === "Strength") setTempStrength(newValue + tempStrength)
    if(attributeName === "Intelligence") setTempIntelligence(newValue + tempIntelligence)
    if(attributeName === "Dexterity") setTempDexterity(newValue + tempDexterity)
    if(attributeName === "Charisma") setTempCharisma(newValue + tempCharisma)
    if(attributeName === "Insanity") setTempInsanity(newValue + tempInsanity) 
  };

  const removeTempAttributeValue = (attributeName: string, newValue: number) => {
    console.log("REMOVE TEMP ATTRIBUTE ", attributeName); 
    if(attributeName === 'Constitution') setTempConstitution((previous) => newValue - previous);
    if(attributeName === "Strength") setTempStrength((previous) => newValue - previous);
    if(attributeName === "Intelligence") setTempIntelligence((previous) => newValue - previous);
    if(attributeName === "Dexterity") setTempDexterity((previous) => newValue - previous);
    if(attributeName === "Charisma") setTempCharisma((previous) => newValue - previous);
    if(attributeName === "Insanity") setTempInsanity((previous) => newValue - previous);
  };

  const calculateHitPoints = (): void => {
    console.log("calculateHitPoints");
    if (!currentProfile) return ;
    const strength = currentProfile.attributes.find(attr => attr.name === 'Strength')?.value || 0;
    const constitution = currentProfile.attributes.find(attr => attr.name === 'Constitution')?.value || 0;
    setHitPoints( (strength + tempStrength)  + (constitution + tempConstitution)); 
  };

  const calculateAttack = (): void => {
    console.log("calculateAttack");
    if(!currentProfile) return;
    const strength = currentProfile.attributes.find(attr => attr.name === 'Strength')?.value || 0;
    const insanity = currentProfile.attributes.find(attr => attr.name === 'Insanity')?.value || 0;
    setAttack((strength + tempStrength) - (insanity + tempInsanity)/2);
  }

  const calculateDefense = (): void => {
    console.log("calculateDefense");
    if(!currentProfile) return;
    const dexterity = currentProfile.attributes.find(attr => attr.name === 'Dexterity')?.value || 0;
    const constitution = currentProfile.attributes.find(attr => attr.name === 'Constitution')?.value || 0;
    const intelligence = currentProfile.attributes.find(attr => attr.name === 'Intelligence')?.value || 0;
    console.log(tempDexterity);
    setDefense((dexterity + tempDexterity) + (constitution + tempConstitution) + (intelligence + tempIntelligence)/2)
  }

  const calculateMagicResistance = (): void => {
    console.log("calculateMagicResistance");
    if(!currentProfile) return;
    const intelligence = currentProfile.attributes.find(attr => attr.name === 'Intelligence')?.value || 0;
    const charisma = currentProfile.attributes.find(attr => attr.name === 'Charisma')?.value || 0;
    setmagicResistance((intelligence + tempIntelligence) + (charisma + tempCharisma));

  }

  const calculateCFP = (): void => {
    console.log("calculateCFP");
    if(!currentProfile) return;
    const insanity = currentProfile.attributes.find(attr => attr.name === 'Insanity')?.value || 0;
    setCFP((insanity + tempInsanity));
  }

  const calculateBCFA =(): void => {
    console.log("calculateBCFA");
    if(!currentProfile) return;
    const strength = currentProfile.attributes.find(attr => attr.name === 'Strength')?.value || 0;
    const insanity = currentProfile.attributes.find(attr => attr.name === 'Insanity')?.value || 0;
    setBCFA((strength + tempStrength) + (insanity + tempInsanity));
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
                <Tooltip className="w-96 text-4xl mb-4 border-1 rounded-lg border-sepia bg-black/90" placement="bottom" size='sm' showArrow={true}  content={<WeaponTooltip element={weapon}/>}>
                <img
                  key={weapon._id}
                  src={weapon.image}
                  alt={weapon._id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedWeapon?._id === weapon._id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => handleSelectedWeapon(weapon)}
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
                  onClick={() => handleSelectedArtifact(artifact)}
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
                  value={attack}
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
                  value={defense}
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
                  value={magicResistance}
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
                  value={cfp}
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
                  value={bcfa}
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