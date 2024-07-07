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

  const armorOptions = [
    { id: '1' , imgSrc: '/images/equipment/robe_1.jpg', description: 'Description of Armor 1' },
    { id: '2' , imgSrc: '/images/equipment/robe_3.jpg', description: 'Description of Armor 2' },
    { id: '3' , imgSrc: '/images/equipment/robe_6.jpg', description: 'Description of Armor 3' },
  ];

  const weaponOptions = [
    { id: 'weapon7', imgSrc: '/images/equipment/sword_4.jpg', description: 'Description of Weapon 7' },
    { id: 'weapon8', imgSrc: '/images/equipment/sword_2.jpg', description: 'Description of Weapon 8' },
    { id: 'weapon9', imgSrc: '/images/equipment/sword_3.jpg', description: 'Description of Weapon 9' },
  ];

  const artifactOptions = [
    { id: 'artifact1', imgSrc: '/images/equipment/artifacts/artifact_1.jpg', description: 'Description of artifact 1' },
    { id: 'artifact2', imgSrc: '/images/equipment/artifacts/artifact_2.jpg', description: 'Description of artifact 2' },
    { id: 'artifact3', imgSrc: '/images/equipment/artifacts/artifact_3.jpg', description: 'Description of artifact 3' },
  ];

  const healingPotions = [
    { id: 'potion1', imgSrc: '/images/equipment/potions/potion_1.jpg', description: 'Description of Potion 1' },
    { id: 'potion2', imgSrc: '/images/equipment/potions/potion_2.jpg', description: 'Description of Potion 2' },
    { id: 'potion3', imgSrc: '/images/equipment/potions/potion_3.jpg', description: 'Description of Potion 3' }
  ];
  const antidotePotions = [
    { id: 'potion4', imgSrc: '/images/equipment/potions/potion_4.jpg', description: 'Description of Potion 4' },
    { id: 'potion5', imgSrc: '/images/equipment/potions/potion_5.jpg', description: 'Description of Potion 5' },
    { id: 'potion6', imgSrc: '/images/equipment/potions/potion_6.jpg', description: 'Description of Potion 6' }
  ];
  const enhancerPotions = [
    { id: 'potion7', imgSrc: '/images/equipment/potions/potion_10.jpg', description: 'Description of Potion 7' },
    { id: 'potion8', imgSrc: '/images/equipment/potions/potion_11.jpg', description: 'Description of Potion 8' },
    { id: 'potion9', imgSrc: '/images/equipment/potions/potion_12.jpg', description: 'Description of Potion 9' }
  ];

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
              {armorOptions.map((armor) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={armor.description}>
                <img
                  key={armor.id}
                  src={armor.imgSrc}
                  alt={armor.description}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArmor === armor.id ? 'border-3 sepia-0 border-sepia duration-300' : ''}`}
                  onClick={() => setSelectedArmor(armor.id)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Weapons</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {weaponOptions.map((weapon) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={weapon.description}>
                <img
                  key={weapon.id}
                  src={weapon.imgSrc}
                  alt={weapon.id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedWeapon === weapon.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedWeapon(weapon.id)}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Artifacts</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {artifactOptions.map((artifact) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={artifact.description}>
                <img
                  key={artifact.id}
                  src={artifact.imgSrc}
                  alt={artifact.id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArtifact === artifact.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedArtifact(artifact.id)}
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
              {healingPotions.map((potion) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={potion.description}>
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedHealingPotion === potion.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedHealingPotion(potion.id)}}
                  
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Antidote Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {antidotePotions.map((potion) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={potion.description}>
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedAntidotePotion === potion.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedAntidotePotion(potion.id)}}
                />
                </Tooltip>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Enhancer Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {enhancerPotions.map((potion) => (
                <Tooltip className="text-4xl mb-4" showArrow={true} content={potion.description}>
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  className={`w-full h-full object-contain sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedEnhancerPotion === potion.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setselectedEnhancerPotion(potion.id)}}
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
              {selectedArmor ? <img src={armorOptions.find(armor => armor.id === selectedArmor)?.imgSrc} 
                alt="Selected Armor" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedWeapon ? <img src={weaponOptions.find(weapon => weapon.id === selectedWeapon)?.imgSrc} 
                alt="Selected Weapon" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedArtifact ? <img src={artifactOptions.find(artifact => artifact.id === selectedArtifact)?.imgSrc} 
                alt="Selected Artifact" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}} />
              }
              {selectedHealingPotion ? <img src={healingPotions.find(potion => potion.id === selectedHealingPotion)?.imgSrc} 
                alt="Selected Healing Potion" 
                className="w-full h-full object-contain rounded-full" 
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}
              />}
              {selectedAntidotePotion ? <img src={antidotePotions.find(potion => potion.id === selectedAntidotePotion)?.imgSrc} 
                alt="Selected Antidote Potion" 
                className="w-full h-full object-contain rounded-full"
                style={{'border': '3px ridge #c28b56'}} />
                :
                <img src="/images/img.jpg" alt="Inventory" className="w-full h-full object-contain rounded-full" style={{'border': '3px ridge #c28b56'}}  
              />}
              {selectedEnhancerPotion ? <img src={enhancerPotions.find(potion => potion.id === selectedEnhancerPotion)?.imgSrc} 
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
                  value={currentProfile?.attributes ? sumAttributeValues(currentProfile.attributes, ['Constitution', 'Strength'], [], 3): 0}
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