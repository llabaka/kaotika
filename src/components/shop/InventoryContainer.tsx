import { Player } from "@/_common/interfaces/Player";

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
        ...player.inventory.antidote_potions,
        ...player.inventory.enhancer_potions,
        ...player.inventory.healing_potions,
        ...player.inventory.rings,
        ...player.inventory.boots
    ];

    console.log(playerInventory); 
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[85%] mt-[10%] overflow-y-auto max-h-[full] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
                {playerInventory.map((item, index) => (
                    <div key={index} className="flex flex-start items-center bg-black bg-opacity-50 rounded-lg w-[95%] h-[23%] mb-4">
                        {/* Imagen del objeto */}
                        <img src={item.image} alt={item.name} className="w-[15%] h-[50%] object-cover m-[5%]" />

                        {/* Nombre del objeto */}
                        <div className="text-3xl text-orange-300">{item.name}</div>

                        {/* Valor del objeto */}
                        <div className=" text-5xl text-orange-300 ml-auto mr-5">{item.value}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InventoryContainer;
