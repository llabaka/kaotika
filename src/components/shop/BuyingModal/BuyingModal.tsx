import Image from "next/image";
import { useEffect } from "react";

const BuyingModal = () => {
    const buyingFrame = "/images/shop/BuyingFrameWithBG.png";
    const imageFake = "/images/equipment/armors/armor_20.png"
    const buttonImage = "/images/shop/ManagePlayerButton.png";

    // props a recibir item name, gold, image, booleanos de los botones
    
    useEffect(() => {
        document.getElementsByTagName('html')[0].style.overflow = 'hidden';

        return(() => {
            document.getElementsByTagName('html')[0].style.overflow = 'auto';
        });

    }, []);

    return (
        <div className="w-[100%] h-full absolute top-0 z-10 bg-black bg-opacity-70 flex items-center justify-center">
            
            <div className="w-[42%] h-[44%] flex justify-center flex-col px-[2%] py-[2%] relative z-0">
                <Image 
                    src={buyingFrame}
                    fill
                    alt="Buying frame"
                    sizes='(max-width: 953px) 100vw'
                    />
                    
                <p className="text-[34px] text-center z-10 text-white">ARE YOU SURE YOU WANT TO BUY THE 
                    <span className="text-orange-400">[ITEM NAME]</span> FOR <span className="text-orange-400">[GOLD]</span></p>
                <div className="w-[95%] h-[68%] flex justify-around items-center ml-[3%]">
                    {/* DIV PARA IMAGEN Y BOTONES */}
                    <div className="w-[34%] h-[90%] relative">
                        <Image 
                            src={imageFake}
                            fill
                            alt="item_image"
                            sizes="(max-width: 300px) 100vw"
                            />
                            
                    </div>
                    <div className="w-[50%] h-[90%] flex flex-col items-center justify-center">
                        <div className="w-[85%] h-[35%] relative mb-[12%] flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
                            <Image
                                src={buttonImage}
                                fill
                                alt="Button image"
                                sizes="(max-width: 300px) 100vw"
                                />
                            <p className="z-20 text-3xl text-green-400 font-bold ">CONFIRM</p>
                        </div>
                        <div className="w-[85%] h-[35%] relative flex items-center justify-center hover:scale-110 transition-all cursor-pointer">
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