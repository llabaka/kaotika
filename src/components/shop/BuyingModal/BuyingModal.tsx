import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/_common/interfaces/shop/Product";
import { Player } from "@/_common/interfaces/Player";
import { buyProductClient } from "./buyProductClient";
import { ShopTooltipProps } from "@/_common/interfaces/shop/ShopTooltip";
import Loading from "@/components/Loading";

// Open Modal boolean 
// product
interface  BuyingModalProps {
    product: Product | null;
    onclick: () => void;
    player: Player;
    setPlayer: any;
    setHaveBuy: any;
    setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
}

const BuyingModal = ({product, onclick, player, setPlayer, setHaveBuy, setShopTooltips} : BuyingModalProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const buyingFrame = "/images/shop/BuyingFrameWithBG.png";
    const imageFake = "/images/equipment/armors/armor_20.png"
    const buttonImage = "/images/shop/ManagePlayerButton.png";

    const addToolTip = (image: string, itemName: string, action: string) => {
        setShopTooltips((prevTooltips : ShopTooltipProps[]) => [...prevTooltips, {image, action, itemName}]);
    }

    // Block the scroll
    document.documentElement.style.overflow = "hidden";
    
    const buyButtonHandler = async() => {

        // check gold
        setIsLoading(true);

        const productValue = product?.value!;
        const playerGold = player.gold;
        
        if(playerGold > productValue){

            if(product !== null){
                const response = await buyProductClient(player._id, [{type: product.type!, productId: product._id!}]);
                const json = await response.json();

                if(!response.ok){   
                    console.log(JSON.stringify(json));
                    addToopltip("", json.error, "Error");
                    setIsLoading(false);
                    onclick(); // Cierra el modal
                    return;
                }

                const updatePlayer = json.data;
                setPlayer(updatePlayer);
                addToolTip(product.image!, product.name!, "bought");
                console.log("Procede a comprar");
            }
        }else{
            console.log("EL jugador no tiene suficiente oro CLIENT");
        }

        setIsLoading(false);
        setHaveBuy(true);
        onclick(); // Cierra el modal
        document.documentElement.style.overflow = "";
    }

    
    return (
        isLoading ? <Loading/> : 

        <div className="w-full h-[120%] absolute top-0 z-20 bg-black bg-opacity-70 flex items-center justify-center" id="buy_modal">
            
            <div className="w-[42%] h-[44%] flex justify-center flex-col px-[2%] py-[2%] relative z-0">
                <Image 
                    src={buyingFrame}
                    fill
                    alt="Buying frame"
                    sizes='(max-width: 953px) 100vw'
                    />
                    
                <p className="text-[34px] text-center z-10 text-white">Are you sure you want to buy the
                    <span className="text-orange-400"> {product?.name}</span> for <span className="text-orange-400">{product?.value} g</span> ?</p>
                <div className="w-[95%] h-[68%] flex justify-around items-center ml-[3%]">
                    {/* DIV PARA IMAGEN Y BOTONES */}
                    <div className="w-[34%] h-[90%] relative">
                        <Image 
                            src={product?.image!}
                            fill
                            alt="item_image"
                            sizes="(max-width: 300px) 100vw"
                            />
                            
                    </div>
                    <div className="w-[50%] h-[90%] flex flex-col items-center justify-center">
                        <div className="w-[85%] h-[35%] relative mb-[12%] flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                            onClick={buyButtonHandler}>
                            <Image
                                src={buttonImage}
                                fill
                                alt="Button image"
                                sizes="(max-width: 300px) 100vw"
                                />
                            <p className="z-20 text-3xl text-green-400 font-bold ">CONFIRM</p>
                        </div>
                        <div className="w-[85%] h-[35%] relative flex items-center justify-center hover:scale-110 transition-all cursor-pointer"
                            onClick={onclick}>
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

export default BuyingModal;