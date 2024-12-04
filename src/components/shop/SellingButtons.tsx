import { SellingContainerInterface } from '@/_common/interfaces/shop/Selling';
import Image from 'next/image';

const SellingButtons:React.FC<SellingContainerInterface> = ({ player }) => {
    return (
    <div className="flex w-full h-[15%] mt-[10%]">
        <div className='w-[35%] h-[60%] mr-[15%] ml-[8%]'>
            <div className="flex relative w-full h-full">
                    <Image
                        src="/images/shop/ManagePlayerButton.png"
                        alt="Selling Item Frame"
                        fill
                        sizes='(max-width: 426px) 100vw'
                        />
            </div>
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