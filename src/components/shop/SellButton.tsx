import { Product } from '@/_common/interfaces/shop/Product';
import { SellingButtonsInterface } from '@/_common/interfaces/shop/Selling';
import Image from 'next/image';

const handleSellPress = (sellingItem: Product) =>{
    console.log(sellingItem.name);
}

const SellButton:React.FC<SellingButtonsInterface> = ({ sellingItem, player }) =>  {
    return (
        <div className='w-[35%] h-full'>
            <button onClick={() => handleSellPress(sellingItem)} className="flex relative w-full h-full items-center justify-center">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Selling Item Frame"
                    fill
                    sizes='(max-width: 426px) 100vw'
                />
                <span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">SELL</span>
            </button>
        </div>
    )
}

export default SellButton;