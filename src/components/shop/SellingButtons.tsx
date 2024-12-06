import { SellingButtonsInterface } from '@/_common/interfaces/shop/Selling';
import Image from 'next/image';
import SellButton from './SellButton';

const SellingButtons: React.FC<SellingButtonsInterface> = ({ sellingItem, player, onClickBuy }) => {
    
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
                        {/* Selling Price */}
                        <div className=" flex justify-end z-10 text-orange-400 text-4xl hover:text-orange-200transition mr-[5%] mb-[3%] w-[50%]">
                            + {sellingPrice}
                        </div>

                        {/* Coin Image */}
                        <div className='z-10  justify-center items-center'>
                            <Image
                                src="/images/shop/CoinsIcon.png"
                                alt="Gold"
                                width={24}
                                height={24}
                                className="ml-2"
                                style={{ height: 'auto', width: 'auto' }}
                            />
                            </div>
                    </div>
                </div>

                {/* Sell Button */}
                <SellButton sellingItem={sellingItem} player={player} onClickBuy={onClickBuy}/>
            </div>
        </div>
    )
}

export default SellingButtons;
