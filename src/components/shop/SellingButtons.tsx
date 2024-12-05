import { SellingButtonsInterface } from '@/_common/interfaces/shop/Selling';
import Image from 'next/image';

const SellingButtons: React.FC<SellingButtonsInterface> = ({ player, sellingItem }) => {

    // Selling Price 1/3 value
    const sellingPrice = Math.floor(sellingItem.value / 3);

    return (
        <div className="flex flex-col w-full h-[20%] mt-[5%] items-center">
            {/* Gaining Gold Text */}
            <div className="flex w-full h-[20%] justify-start mb-[2%]">
                <span className="ml-[15%] text-orange-300 text-3xl font-bold">Gaining Gold</span>
            </div>

            {/* Buttons Container */}
            <div className="flex w-full h-[40%] items-center">
                <div className='w-[35%] h-full mr-[15%] ml-[8%]'>
                    <div className="flex relative w-full h-full items-center justify-center">
                        <Image
                            src="/images/shop/ManagePlayerButton.png"
                            alt="Selling Item Frame"
                            fill
                            sizes='(max-width: 426px) 100vw'
                        />
                        <span className="z-10 text-orange-400 text-4xl hover:text-orange-200 transition flex items-center">
                            + {sellingPrice}
                            {/* Coin Image */}
                            <Image
                                src="/images/shop/CoinsIcon.png"
                                alt="Gold"
                                width={24}
                                height={24}
                                className="ml-2"
                                style={{ height: 'auto', width: 'auto' }}
                            />
                        </span>
                    </div>
                </div>

                <div className='w-[35%] h-full'>
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
        </div>
    )
}

export default SellingButtons;
