import Image from "next/image";
import { useEffect, useState } from "react";

interface CardLeftContainerProps {
    min_lvl: number | null;
    value: number;
    image: string;
    name: string;
    description: string;
    _id: string;
    onClickBuy: () => void;
}

const CardLeftContainer = ({min_lvl, value, image, name, description, _id, onClickBuy} : CardLeftContainerProps) => {

    const [isBought, setIsBought] = useState<boolean>(false);
    const [isAddToBasket, setIsAddToBasket] = useState<boolean>(false);

    let icon = '/images/icons/up.png';

    useEffect(() => {
        const addToBasketButton = document.getElementById(_id);

        if(isAddToBasket){
            addToBasketButton?.classList.add('opacity-50');
        }else{
            addToBasketButton?.classList.remove('opacity-50');
        }
        
    }, [isAddToBasket]);
    
    const handleAddToBasket = () => {
        setIsAddToBasket(prevState => !prevState);
    }

    return (
            <div className="flex flex-col relative w-[65%] h-[100%] items-center">
            {/* DIV LEVEL */}
            <div className="z-10 relative flex flex-row justify-around items-center w-[100%] h-[16%] ">
                <p className="text-white text-[25px] font-bold mt-1  w-[20%]">{min_lvl}</p>
                <div className="flex justify-around w-[42%] h-[75%] mt-5 items-center ml-4">
                    <p className="text-white text-[22px] font-bold">{value} g</p>
                    <div className="flex items-center justify-center z-10 text-orange-400 text-3xl mr-3.5">
                        <Image
                            src="/images/shop/CoinsIcon.png"
                            alt="Gold"
                            width={24}
                            height={24}
                            className="ml-2"
                            style={{height: 'auto', width:'auto'}}
                        />
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
                <div className="h-[100%] w-[100%] flex relative items-center justify-center rounded-lg"> 
                    <Image 
                        src={image} 
                        alt="Equipment Image"
                        fill
                        sizes='(max-width: 570px) 100vw'
                        className="rounded-lg" // También redondeamos la imagen si es necesario
                    />
                </div>
            </div>
            {/* NAME, DESCRIPTION BUTTONS DIV */}
            <div className="h-[10%] text-black text-lg font-bold flex items-center justify-center mt-2">
                <p>{name}</p>
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
                <button className="text-white text-xl ml-5 w-[36%] h-[90%] rounded-full flex items-center justify-center " 
                    onClick={handleAddToBasket}
                    id={_id}
                    >
                        Add Basket
                    </button>
                <button className="text-white text-xl mr-6 w-[36%] h-[90%] rounded-full flex items-center justify-center " 
                    onClick={onClickBuy}
                    id={`buy_button_${_id}`}
                    >
                        Buy
                </button>
            </div>
        </div>
    )
}

export default CardLeftContainer;