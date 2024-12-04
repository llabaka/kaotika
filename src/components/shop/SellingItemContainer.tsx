import Image from 'next/image';

const SellingItemContainer = () =>  {
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[97%] mt-[5%]">
                <div className="w-[95%] h-[75%] items-center justify-center">
                    <div className="flex relative w-full h-full">
                        <Image
                            src="/images/shop/SellingFrame.png"
                            alt="Selling Item Frame"
                            fill
                            sizes='(max-width: 426px) 100vw'
                            />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellingItemContainer;