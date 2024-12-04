import { SellingButtonsInterface, SellingContainerInterface } from '@/_common/interfaces/shop/Selling';
import Image from 'next/image';

const SellingButtons:React.FC<SellingButtonsInterface> = ({ player, sellingItem }) => {
    console.log("PLAYER GOLD");
    console.log(player.gold);
    
    console.log("SELLING ITEM");
    console.log(sellingItem);

    // Selling Price 1/3 value
    const sellingPrice = Math.floor(sellingItem.value / 3);
    
    return (
    <div className="flex w-full h-[15%] mt-[10%]">
        <div className='w-[35%] h-[60%] mr-[15%] ml-[8%]'>
            <button className="flex relative w-full h-full items-center justify-center">
                    <Image
                        src="/images/shop/ManagePlayerButton.png"
                        alt="Selling Item Frame"
                        fill
                        sizes='(max-width: 426px) 100vw'
                        />
                <span className="z-10 text-orange-400 text-4xl hover:text-orange-200 transition">+ {sellingPrice}</span>
            </button>
        </div>

        <div className='w-[35%] h-[60%]'>
            <button className="flex relative w-full h-full items-center justify-center">
                    <Image
                        src="/images/shop/ManagePlayerButton.png"
                        alt="Selling Item Frame"
                        fill
                        sizes='(max-width: 426px) 100vw'
                        />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">SELL</span>
            </button>
        </div>
    </div>
    )
}

export default SellingButtons;