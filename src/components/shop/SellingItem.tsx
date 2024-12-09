import { SellingItemImageInterface } from '@/_common/interfaces/shop/Selling';
import Image from 'next/image';

const SellingItem: React.FC<SellingItemImageInterface> = ({ sellingImage }) => {
    return (
        <div className="w-full h-[75%] items-center justify-center">
            <div className="flex relative w-full h-full items-center justify-center">
                <Image
                    src="/images/shop/SellingFrame.png"
                    alt="Selling Item Frame"
                    fill
                    sizes='(max-width: 426px) 100vw'
                    />

                <div className="flex w-[95%] h-[95%] items-center justify-center">
                    <img src={`${sellingImage}`} alt="" sizes='(max-width: 780px) 100vw' className="z-10 rounded-lg"/>
                </div>
            </div>
        </div>
    )
}

export default SellingItem;