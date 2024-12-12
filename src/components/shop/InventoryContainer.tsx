import { Product } from "@/_common/interfaces/shop/Product";
import InventoryContainerInterface from "@/_common/interfaces/shop/Inventory";
import Image from 'next/image';
import { useEffect } from "react";

const InventoryContainer: React.FC<InventoryContainerInterface> = ({ player, setSellingImage, setSellingItem, setProduct, sellingItem }) => {
    // Combina todas las propiedades de arrays en un solo array

    console.log("PLAYER INVENTORY");
    
    console.log(player.inventory)
    
    const playerInventory = [
        ...player.inventory.helmets,
        ...player.inventory.weapons,
        ...player.inventory.armors,
        ...player.inventory.shields,
        ...player.inventory.artifacts,
        /*...player.inventory.antidote_potions,
        ...player.inventory.enhancer_potions,
        ...player.inventory.healing_potions, */
        ...player.inventory.rings,
        ...player.inventory.boots,
        ...player.inventory.ingredients
    ];

    const handleOnPress = (item: Product) => {
        setSellingItem(item)
        setSellingImage(item.image!)
        setProduct(item);
    };


    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[85%] mt-[10%] overflow-y-auto max-h-[full] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
                {playerInventory.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => handleOnPress(item)}
                        onMouseDown={(e) => e.currentTarget.classList.add("scale-85")}
                        onMouseUp={(e) => e.currentTarget.classList.remove("scale-85")}
                        onMouseLeave={(e) => e.currentTarget.classList.remove("scale-85")}
                        className={`flex flex-start items-center bg-black bg-opacity-50 rounded-lg w-[95%] h-[23%] mb-[4%] transition-transform duration-200 ease-in-out ${sellingItem._id === item._id ? 'border-2 border-orange-300' : ''}`}
                    >
                        {/* Item image */}
                        <div className="w-[15%] h-[60%] m-[5%] ">
                            <img src={item.image} alt={item.name} className="w-[full] h-[full]" />
                        </div>

                        {/* Item name */}
                        <div className="text-4xl text-white">{item.name}</div>

                        {/* Item value */}
                        <div className="text-5xl text-orange-300 ml-auto mr-[3%]">{item.value}</div>

                        {/* Coin Image */}
                        <div className="justify-center">
                            <Image
                                src="/images/shop/CoinsIcon.png"
                                alt="Gold"
                                width={24}
                                height={24}
                                className="mt-3 mr-2"
                                style={{ height: 'auto', width: 'auto' }}
                            />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default InventoryContainer;
