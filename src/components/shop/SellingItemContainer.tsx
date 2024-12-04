import Image from 'next/image';

const SellingItemContainer = () =>  {
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[97%] mt-[5%]">

                {/* Selling Item */}
                <div className="w-full h-[75%] items-center justify-center">
                    <div className="flex relative w-full h-full">
                        <Image
                            src="/images/shop/SellingFrame.png"
                            alt="Selling Item Frame"
                            fill
                            sizes='(max-width: 426px) 100vw'
                            />
                    </div>
                </div>

                {/* Selling Buttons */}
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
            </div>
        </div>
    )
}

export default SellingItemContainer;