import { Player } from "@/_common/interfaces/Player";
import { Product } from "@/_common/interfaces/shop/Product";
import Image from "next/image";
import { useEffect, useState } from "react";

interface CardLeftContainerProps {
    min_lvl: number | null ;
    value: number;
    image: string;
    name: string;
    description: string;
    _id: string;
    onClickBuy: () => void;
    onClickAddToCart: () => void;
    player: Player
}

const CardLeftContainer = ({min_lvl, value, image, name, description, _id, onClickBuy, onClickAddToCart, player} : CardLeftContainerProps) => {
    const [isDisableButton, setIsDisableButton] = useState<boolean>(false);

    useEffect(() => {
        if(player.gold < value || player.level < min_lvl!){
            setIsDisableButton(true);
        }else{
            setIsDisableButton(false);
        }
        
    }, [player.gold]);

    let icon = '/images/icons/up.png';

    // Change color depending on player's level
    const minLevelClass = player.level >= (min_lvl || 0) ? 'text-green-400' : 'text-red-600';

    return (
            <div className="flex flex-col relative w-[65%] h-[100%] items-center">
            {/* DIV LEVEL */}
            <div className="z-10 relative flex flex-row justify-around items-center w-[100%] h-[16%]">
                <div className={` text-[35px] font-bold w-[20%] pr-[6%] ${minLevelClass}`}
                    data-testid={`min_lvl_${_id}`}>{min_lvl}</div>
                    <div className="flex justify-around w-[36%] h-[75%] mt-5 items-center text-right">
                        <p className="text-white w-[65%] text-[25px] font-bold mr-1"
                            data-testid={`product_value_${_id}`}>{value}</p>
                        <div className="w-[35%] h-[55%] mt-1 mr-1">
                            <div className="relative w-full h-full">
                                    <Image
                                    src="/images/shop/CoinsIcon.png"
                                    alt="Gold"
                                    fill
                                    sizes='(max-width: 50px) 100vw'
                                    />
                            </div>
                        </div>
                    </div>
                <Image
                    src={icon}
                    width={128}
                    height={28}
                    alt="Equipment icon"
                    className="rounded-full relative top-1 left-2 w-[18%]"
                />
            </div>
            {/* IMAGE DIV */}
            <div className="flex-col flex justify-center items-center h-[45%] w-[65%] mt-0.5">
                <div className="h-[100%] w-[100%] flex relative items-center justify-center rounded-lg"
                    > 
                    <Image 
                        src={image} 
                        alt="Equipment Image"
                        fill
                        sizes='(max-width: 570px) 100vw'
                        className="rounded-lg" // También redondeamos la imagen si es necesario
                        data-testid={`image_id_${image}`}
                    />
                </div>
            </div>
            {/* NAME, DESCRIPTION BUTTONS DIV */}
            <div className="h-[10%] text-black text-lg font-bold flex items-center justify-center mt-2">
                <p data-testid={`product_${name}`} >{name}</p>
            </div>
            <div className="h-[14%] text-[22px] flex content-center justify-center overflow-hidden w-[87%]">
                <p className="line-clamp-none overflow-y-auto " 
                    style={{
                        overflowY: "scroll",
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                    }}> 
                {description}</p>
            </div>
            <div className="h-[12%] w-[100%] flex justify-around">
                <button className="text-white text-xl ml-5 w-[36%] h-[90%] rounded-full flex items-center justify-center" 
                    onClick={onClickAddToCart}
                    id={_id}
                    data-testid={`add_basket_${_id}`}
                    disabled={isDisableButton}
                    >
                        Add Basket
                    </button>
                <button className="text-white text-xl mr-6 w-[36%] h-[90%] rounded-full flex items-center justify-center " 
                    onClick={onClickBuy}
                    id={`buy_button_${_id}`}
                    data-testid={`buy_${_id}`}
                    disabled={isDisableButton}
                    >
                        Buy
                </button>
            </div>
        </div>
    )
}

export default CardLeftContainer;