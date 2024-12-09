import { Player } from "@/_common/interfaces/Player";
import { Product } from "@/_common/interfaces/shop/Product";
import Image from "next/image";
import { useEffect, useState } from "react";
import { sellingProductClient } from "./sellingProductClient";
import Loading from "@/components/Loading";

// Open Modal boolean 
// product
interface  SellingModalProps {
    sellingItem: Product | null;
	onClickSell : () => void;
    player: Player,
    setPlayer: (loaded: Player) => void;
    setSellingItem: (loaded: Product) => void;
}

const SellingModal = ({sellingItem, onClickSell, player, setPlayer} : SellingModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
 
    const buyingFrame = "/images/shop/BuyingFrameWithBG.png";
    const buttonImage = "/images/shop/ManagePlayerButton.png";

    useEffect(() => {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';

        return(() => {
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        });

    }, []);

    // Check if player has the item
    const checkItemInInventory = (): Boolean => {
        if (!sellingItem) return false;

        const inventoryCategories = Object.values(player.inventory);

        // Find Item in all categories of the inventory
        for (const type of inventoryCategories) {
            if (Array.isArray(type) && type.some(playerInventoryItem => playerInventoryItem._id === sellingItem._id)) {
                return true;
            }
        }
        return false;
    };

    const sellButtonHandler = async() => {
        setIsLoading(true);

        if (!sellingItem) return false;

        const playerHaveItem = checkItemInInventory();

        if (playerHaveItem) {
            console.log("SELL ITEM");
            const response = await sellingProductClient(player._id, sellingItem._id!, sellingItem.type!);
            const json = await response.json();

            if(!response.ok){
                console.log(json);
                return;
            }

            const updatePlayer = json.data;
            setPlayer(updatePlayer);
        } else {
            console.log("PLAYER DON'T HAVE THIS ITEM");
        }

        // Cerrar el modal
        setIsLoading(false);
        onClickSell(); 
    };


    return (

        isLoading ? <Loading/> : 
        <div className="w-[100%] h-full absolute top-0 z-10 bg-black bg-opacity-70 flex items-center justify-center" id="buy_modal">
            
            <div className="w-[42%] h-[44%] flex justify-center flex-col px-[2%] py-[2%] relative z-0">
                <Image 
                    src={buyingFrame}
                    fill
                    alt="Buying frame"
                    sizes='(max-width: 953px) 100vw'
                    />
                    
                <p className="text-[34px] text-center z-10 text-white">Are you sure you want to sell the
                    <span className="text-orange-400"> {sellingItem?.name}</span> for <span className="text-orange-400">{sellingItem?.value} g</span></p>
                <div className="w-[95%] h-[68%] flex justify-around items-center ml-[3%]">
                    {/* DIV PARA IMAGEN Y BOTONES */}
                    <div className="w-[34%] h-[90%] relative">
                        <Image 
                            src={sellingItem?.image!}
                            fill
                            alt="item_image"
                            sizes="(max-width: 300px) 100vw"
                            />
                            
                    </div>
                    <div className="w-[50%] h-[90%] flex flex-col items-center justify-center">
                        <div onClick={sellButtonHandler} className="w-[85%] h-[35%] relative mb-[12%] flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
                            <Image
                                src={buttonImage}
                                fill
                                alt="Button image"
                                sizes="(max-width: 300px) 100vw"
                                />
                            <p className="z-20 text-3xl text-green-400 font-bold ">CONFIRM</p>
                        </div>
                        <div className="w-[85%] h-[35%] relative flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                            onClick={onClickSell}>
                            <Image
                                src={buttonImage}
                                fill
                                alt="Button image"
                                sizes="(max-width: 300px) 100vw"
                                />
                            <p className="z-20 text-3xl text-medievalRed font-bold">DECLINE</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}   

export default SellingModal;