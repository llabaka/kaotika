import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Equipment = () => {
  const router = useRouter();
  const [selectedArmor, setSelectedArmor] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState('');
  const [selectedHealingPotion, setSelectedHealingPotion] = useState('');
  const [selectedAntidotePotion, setSelectedAntidotePotion] = useState('');
  const [selectedEnhancerPotion, setselectedEnhancerPotion] = useState('');

  const handleNext = () => {
    //TODO REGISTER
    // if (selectedArmor && selectedWeapon && selectedHealingPotion && selectedAntidotePotion && selectedEnhancerPotion) {
    //   router.push(`/register?class=${router.query.class}&armor=${selectedArmor}&weapon=${selectedWeapon}&potion=${selectedHealingPotion}`);
    // }
  };

  const handleBack = () => {
    router.push('/player');
  };

  const armorOptions = [
    { id: '1' , imgSrc: '/images/equipment/robe_1.jpg', description: 'Description of Armor 1' },
    { id: '2' , imgSrc: '/images/equipment/robe_3.jpg', description: 'Description of Armor 2' },
    { id: '3' , imgSrc: '/images/equipment/robe_6.jpg', description: 'Description of Armor 3' },
    // { id: '4' , imgSrc: '/images/equipment/armor_1.jpg', description: 'Description of Armor 4' },
    // { id: '5' , imgSrc: '/images/equipment/armor_4.jpg', description: 'Description of Armor 5' },
    // { id: '6' , imgSrc: '/images/equipment/armor_5.jpg', description: 'Description of Armor 6' },
    // { id: '7' , imgSrc: '/images/equipment/armor_6.jpg', description: 'Description of Armor 7' },
    // { id: '8' , imgSrc: '/images/equipment/armor_7.jpg', description: 'Description of Armor 8' },
    // { id: '9' , imgSrc: '/images/equipment/armor_8.jpg', description: 'Description of Armor 9' },
  ];

  const weaponOptions = [
    // { id: 'weapon1', imgSrc: '/images/equipment/shield_1.jpg', description: 'Description of Weapon 1' },
    // { id: 'weapon2', imgSrc: '/images/equipment/shield_3.jpg', description: 'Description of Weapon 2' },
    // { id: 'weapon3', imgSrc: '/images/equipment/shield_4.jpg', description: 'Description of Weapon 3' },
    // { id: 'weapon4', imgSrc: '/images/equipment/maze_1.jpg', description: 'Description of Weapon 4' },
    // { id: 'weapon5', imgSrc: '/images/equipment/maze_2.jpg', description: 'Description of Weapon 5' },
    // { id: 'weapon6', imgSrc: '/images/equipment/maze_3.jpg', description: 'Description of Weapon 6' },
    { id: 'weapon7', imgSrc: '/images/equipment/sword_4.jpg', description: 'Description of Weapon 7' },
    { id: 'weapon8', imgSrc: '/images/equipment/sword_2.jpg', description: 'Description of Weapon 8' },
    { id: 'weapon9', imgSrc: '/images/equipment/sword_3.jpg', description: 'Description of Weapon 9' },
  ];

  const artifactOptions = [
    { id: 'artifact1', imgSrc: '/images/equipment/artifacts/artifact_1.jpg', description: 'Description of artifact 1' },
    { id: 'artifact2', imgSrc: '/images/equipment/artifacts/artifact_2.jpg', description: 'Description of artifact 2' },
    { id: 'artifact3', imgSrc: '/images/equipment/artifacts/artifact_3.jpg', description: 'Description of artifact 3' },
    // { id: 'weapon4', imgSrc: '/images/equipment/maze_1.jpg', description: 'Description of Weapon 4' },
    // { id: 'weapon5', imgSrc: '/images/equipment/maze_2.jpg', description: 'Description of Weapon 5' },
    // { id: 'weapon6', imgSrc: '/images/equipment/maze_3.jpg', description: 'Description of Weapon 6' },
    // { id: 'weapon7', imgSrc: '/images/equipment/sword_4.jpg', description: 'Description of Weapon 7' },
    // { id: 'weapon8', imgSrc: '/images/equipment/sword_2.jpg', description: 'Description of Weapon 8' },
    // { id: 'weapon9', imgSrc: '/images/equipment/sword_3.jpg', description: 'Description of Weapon 9' },
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

  return (
    <Layout>
    <div className="flex flex-col h-screen text-medievalSepia bg-cover bg-center" style={{ backgroundImage: 'url(/images/map.jpg)'}}>
      <div className="flex justify-center">
        <div className="w-1/3 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Armor</h2>
            <div className="w-full p-5 justify-around grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {armorOptions.map((armor) => (
                <img
                  key={armor.id}
                  src={armor.imgSrc}
                  alt={armor.description}
                  style={{'width': '150px'}}
                  className={`sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArmor === armor.id ? 'border-3 sepia-0 border-sepia duration-300' : ''}`}
                  onClick={() => setSelectedArmor(armor.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Weapons</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {weaponOptions.map((weapon) => (
                <img
                  key={weapon.id}
                  src={weapon.imgSrc}
                  alt={weapon.id}
                  style={{'width': '150px'}}
                  className={`sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedWeapon === weapon.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedWeapon(weapon.id)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Artifacts</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {artifactOptions.map((artifact) => (
                <img
                  key={artifact.id}
                  src={artifact.imgSrc}
                  alt={artifact.id}
                  style={{'width': '150px'}}
                  className={`sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedArtifact === artifact.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => setSelectedArtifact(artifact.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Healing Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {healingPotions.map((potion) => (
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  style={{'width': '150px'}}
                  className={`sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedHealingPotion === potion.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedHealingPotion(potion.id)}}
                  
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Antidote Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {antidotePotions.map((potion) => (
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  style={{'width': '150px'}}
                  className={`sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedAntidotePotion === potion.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setSelectedAntidotePotion(potion.id)}}
                  
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Enhancer Potions</h2>
            <div className="w-full p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-sepia bg-black/70">
              {enhancerPotions.map((potion) => (
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  style={{'width': '150px'}}
                  className={`sepia hover:sepia-0 cursor-pointer p-2 transition rounded-full ${selectedEnhancerPotion === potion.id ? 'border-3 sepia-0 border-sepia' : ''}`}
                  onClick={() => {setselectedEnhancerPotion(potion.id)}}
                  
                />
              ))}
            </div>
          </div>
        </div>
        <div className="w-1/3 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Inventory</h2>
            <div className="flex flex-col p-24 m-4 border-1 rounded-lg border-sepia">
              <div className='flex'>
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-64 h-64 bg-black m-2 rounded-full" style={{'border': '7px ridge #c28b56'}}>
                    {selectedWeapon && <img src={weaponOptions.find(weapon => weapon.id === selectedWeapon)?.imgSrc} alt="Selected Weapon" className="w-full h-full object-contain rounded-full" />}
                  </div>
                </div>
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-96 h-96 bg-black m-2 rounded-full" style={{'border': '7px ridge #c28b56'}}>
                    {selectedArmor && <img src={armorOptions.find(armor => armor.id === selectedArmor)?.imgSrc} alt="Selected Armor" className="w-full h-full object-contain rounded-full" />}
                  </div>
                </div>
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-64 h-64 bg-black m-2 rounded-full" style={{'border': '7px ridge #c28b56'}}>
                    {selectedArtifact && <img src={artifactOptions.find(artifact => artifact.id === selectedArtifact)?.imgSrc} alt="Selected Artifact" className="w-full h-full object-contain rounded-full" />}
                  </div>
                </div>
              </div>
              <div className='flex'>
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-32 h-32 bg-black m-2 rounded-full" style={{'border': '7px ridge #c28b56'}}>
                    {selectedHealingPotion && <img src={healingPotions.find(potion => potion.id === selectedHealingPotion)?.imgSrc} alt="Selected Weapon" className="w-full h-full object-contain rounded-full" />}
                  </div>
                </div>
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-32 h-32 bg-black m-2 rounded-full" style={{'border': '7px ridge #c28b56'}}>
                    {selectedAntidotePotion && <img src={antidotePotions.find(potion => potion.id === selectedAntidotePotion)?.imgSrc} alt="Selected Armor" className="w-full h-full object-contain rounded-full" />}
                  </div>
                </div>
                <div className="w-1/3 flex justify-center items-center">
                  <div className="w-32 h-32 bg-black m-2 rounded-full" style={{'border': '7px ridge #c28b56'}}>
                    {selectedEnhancerPotion && <img src={enhancerPotions.find(potion => potion.id === selectedEnhancerPotion)?.imgSrc} alt="Selected Artifact" className="w-full h-full object-contain rounded-full" />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3 p-4 text-center">
          <button
              onClick={handleNext}
              className="bg-blue-500 w-full text-white text-4xl py-2 px-4 mt-10 rounded"
              disabled={!selectedArmor || !selectedWeapon || !selectedArtifact || !selectedHealingPotion || !selectedAntidotePotion || !selectedEnhancerPotion}
          >
          Next
          </button>
          <button
              onClick={handleBack}
              className="bg-red-500 w-full text-white text-4xl py-2 px-4 mt-10 rounded"
          >
          Back
          </button>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Equipment;