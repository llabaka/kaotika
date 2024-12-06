import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/_common/interfaces/shop/Product";
import { Player } from "@/_common/interfaces/Player";
import { buyProductClient } from "./buyProductClient";

// Open Modal boolean 
// product
interface  BuyingModalProps {
    product: Product;
    onclick: () => void;
    player: Player;
}

const BuyingModal = ({product, onclick, player} : BuyingModalProps) => {
    const buyingFrame = "/images/shop/BuyingFrameWithBG.png";
    const imageFake = "/images/equipment/armors/armor_20.png"
    const buttonImage = "/images/shop/ManagePlayerButton.png";

    useEffect(() => {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';

        return(() => {
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        });

    }, []);

    const buyButtonHandler = async() => {
        // check gold
        const productValue = product?.value!;
        const playerGold = player.gold;
        
        if(playerGold > productValue){

            buyProductClient(player._id, product._id!, product.type!);
            console.log("Procede a comprar");
        }

        onclick(); // Cierra el modal
    }

    
    return (
        <div className="w-[100%] h-full absolute top-0 z-20 bg-black bg-opacity-70 flex items-center justify-center" id="buy_modal">
            
            <div className="w-[42%] h-[44%] flex justify-center flex-col px-[2%] py-[2%] relative z-0">
                <Image 
                    src={buyingFrame}
                    fill
                    alt="Buying frame"
                    sizes='(max-width: 953px) 100vw'
                    />
                    
                <p className="text-[34px] text-center z-10 text-white">Are you sure you want to buy the
                    <span className="text-orange-400"> {product?.name}</span> for <span className="text-orange-400">{product?.value} g</span></p>
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