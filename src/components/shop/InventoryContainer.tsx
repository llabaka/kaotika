import { Helmet } from "@/_common/interfaces/Helmet";
import { Player } from "@/_common/interfaces/Player";
import { CardProps } from "@/_common/interfaces/shop/CardProps";
import Image from 'next/image';

interface InventoryContainer {
    player: Player;
}

const InventoryContainer: React.FC<InventoryContainer> = ({ player }) => {

    // Combina todas las propiedades de arrays en un solo array
    const playerInventory = [
        ...player.inventory.helmets,
        ...player.inventory.weapons,
        ...player.inventory.armors,
        ...player.inventory.shields,
        ...player.inventory.artifacts,

        // Potions has no interface at the moment
        /*...player.inventory.antidote_potions,
        ...player.inventory.enhancer_potions,
        ...player.inventory.healing_potions, */

        ...player.inventory.rings,
        ...player.inventory.boots
    ];

    console.log(playerInventory); 

    const handleOnPress = (item: CardProps) =>  {
        console.log(item.image);
	}
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[85%] mt-[10%] overflow-y-auto max-h-[full] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
                {playerInventory.map((item, index) => (
                    <button key={index} onClick={() => handleOnPress(item)} className="flex flex-start items-center bg-black bg-opacity-50 rounded-lg w-[95%] h-[23%] mb-[4%]">
                        
                        {/* Item image */}
                        <div className="w-[15%] h-[60%] m-[5%]">
                            <img src={item.image} alt={item.name} className="w-[full] h-[full]"></img>
                        </div>

                        {/* Item name */}
                        <div className="text-4xl text-white">{item.name}</div>

                        {/* Item value */}
                        <div className=" text-5xl text-orange-300 ml-auto mr-[3%]">{item.value}</div>

                        {/* Coin Image */}
                        <div className="justify-center">
                            <Image
                            src="/images/shop/CoinsIcon.png"
                            alt="Gold"
                            width={24}
                            height={24}
                            className="mt-3 mr-2"
                            style={{height: 'auto', width:'auto'}}
                        />
                    </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default InventoryContainer;