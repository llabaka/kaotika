import { useRouter } from 'next/router';
import { useState } from 'react';

const Equipment = () => {
  const router = useRouter();
  const [selectedArmor, setSelectedArmor] = useState('');
  const [selectedWeapon, setSelectedWeapon] = useState('');
  const [selectedPotion, setSelectedPotion] = useState('');
  const [selectedArtifact, setSelectedArtifact] = useState('');

  const handleNext = () => {
    if (selectedArmor && selectedWeapon && selectedPotion) {
      router.push(`/register?class=${router.query.class}&armor=${selectedArmor}&weapon=${selectedWeapon}&potion=${selectedPotion}`);
    }
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
    { id: 'artifact1', imgSrc: '/images/equipment/artifact_1.png', description: 'Description of artifact 1' },
    { id: 'artifact2', imgSrc: '/images/equipment/artifact_2.png', description: 'Description of artifact 2' },
    { id: 'artifact3', imgSrc: '/images/equipment/artifact_3.png', description: 'Description of artifact 3' },
    // { id: 'weapon4', imgSrc: '/images/equipment/maze_1.jpg', description: 'Description of Weapon 4' },
    // { id: 'weapon5', imgSrc: '/images/equipment/maze_2.jpg', description: 'Description of Weapon 5' },
    // { id: 'weapon6', imgSrc: '/images/equipment/maze_3.jpg', description: 'Description of Weapon 6' },
    // { id: 'weapon7', imgSrc: '/images/equipment/sword_4.jpg', description: 'Description of Weapon 7' },
    // { id: 'weapon8', imgSrc: '/images/equipment/sword_2.jpg', description: 'Description of Weapon 8' },
    // { id: 'weapon9', imgSrc: '/images/equipment/sword_3.jpg', description: 'Description of Weapon 9' },
  ];

  const potionOptions = [
    { id: 'potion1', imgSrc: '/images/equipment/potion_1.jpg', description: 'Description of Potion 1' },
    { id: 'potion2', imgSrc: '/images/equipment/potion_2.jpg', description: 'Description of Potion 2' },
    { id: 'potion3', imgSrc: '/images/equipment/potion_3.jpg', description: 'Description of Potion 3' },
    { id: 'potion4', imgSrc: '/images/equipment/potion_4.jpg', description: 'Description of Potion 4' },
    { id: 'potion5', imgSrc: '/images/equipment/potion_5.jpg', description: 'Description of Potion 5' },
    { id: 'potion6', imgSrc: '/images/equipment/potion_6.jpg', description: 'Description of Potion 6' },
    { id: 'potion7', imgSrc: '/images/equipment/potion_10.jpg', description: 'Description of Potion 7' },
    { id: 'potion8', imgSrc: '/images/equipment/potion_11.jpg', description: 'Description of Potion 8' },
    { id: 'potion9', imgSrc: '/images/equipment/potion_12.jpg', description: 'Description of Potion 9' },
  ];

  return (
    <div className="flex flex-col justify-center h-screen bg-gray-800 text-white">
      <div className="flex justify-center">
        <div className="w-1/3 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Armor</h2>
            <div className="p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-gray-600">
              {armorOptions.map((armor) => (
                <img
                  key={armor.id}
                  src={armor.imgSrc}
                  alt={armor.description}
                  style={{'width': '200px'}}
                  className={`cursor-pointer p-2 ${selectedArmor === armor.id ? 'border-4 border-yellow-500' : ''}`}
                  onClick={() => setSelectedArmor(armor.id)}
                />
              ))}
            </div>
            {/* {selectedArmor && <p className="mt-4">{armorOptions.find(armor => armor.id === selectedArmor)?.description}</p>} */}
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Weapons</h2>
            <div className="p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-gray-600">
              {weaponOptions.map((weapon) => (
                <img
                  key={weapon.id}
                  src={weapon.imgSrc}
                  alt={weapon.id}
                  style={{'width': '200px'}}
                  className={`cursor-pointer p-2 ${selectedWeapon === weapon.id ? 'border-4 border-yellow-500' : ''}`}
                  onClick={() => setSelectedWeapon(weapon.id)}
                />
              ))}
            </div>
            {/* {selectedWeapon && <p className="mt-4">{weaponOptions.find(weapon => weapon.id === selectedWeapon)?.description}</p>} */}
          </div>
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Artifacts</h2>
            <div className="p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-gray-600">
              {artifactOptions.map((artifact) => (
                <img
                  key={artifact.id}
                  src={artifact.imgSrc}
                  alt={artifact.id}
                  style={{'width': '200px'}}
                  className={`cursor-pointer p-2 ${selectedArtifact === artifact.id ? 'border-4 border-yellow-500' : ''}`}
                  onClick={() => setSelectedArtifact(artifact.id)}
                />
              ))}
            </div>
            {/* {selectedArtifact && <p className="mt-4">{artifactOptions.find(artifact => artifact.id === selectedArtifact)?.description}</p>} */}
          </div>
        </div>
        <div className="w-1/3 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Potions</h2>
            <div className="p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-gray-600">
              {potionOptions.map((potion) => (
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  style={{'width': '200px'}}
                  className={`cursor-pointer p-2 ${selectedPotion === potion.id ? 'border-4 border-yellow-500' : ''}`}
                  onClick={() => setSelectedPotion(potion.id)}
                />
              ))}
            </div>
            {/* {selectedPotion && <p className="mt-4">{potionOptions.find(potion => potion.id === selectedPotion)?.description}</p>} */}
          </div>
        </div>
        <div className="w-1/3 p-4">
          <div className="flex flex-col items-center m-4">
            <h2 className="text-4xl mb-4">Potions</h2>
            <div className="p-5 grid grid-cols-3 gap-4 border-1 rounded-lg border-gray-600">
              {potionOptions.map((potion) => (
                <img
                  key={potion.id}
                  src={potion.imgSrc}
                  alt={potion.id}
                  style={{'width': '200px'}}
                  className={`cursor-pointer p-2 ${selectedPotion === potion.id ? 'border-4 border-yellow-500' : ''}`}
                  onClick={() => setSelectedPotion(potion.id)}
                />
              ))}
            </div>
            {/* {selectedPotion && <p className="mt-4">{potionOptions.find(potion => potion.id === selectedPotion)?.description}</p>} */}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-1/3 p-4 text-center">
          <button
              onClick={handleNext}
              className="bg-blue-500 w-full text-white text-4xl py-2 px-4 mt-10 rounded"
              disabled={!selectedArmor || !selectedWeapon || !selectedPotion}
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
  );
};

export default Equipment;