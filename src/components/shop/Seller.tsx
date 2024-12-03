import Image from 'next/image';


const Seller = () => {
    return (
    <div className="flex-col w-10/12 mt-4 h-96">
        <div className="flex w-full h-full relative">
            <Image
            src="/images/shop/SellerFrame.png"
            alt="Imagen 1"
            fill
            sizes='(max-width: 450px) 100vw'
            className="z-10"
            />
            <Image
            src="/images/shop/SellerCrop.png"
            alt="Imagen 1"
            fill
            sizes='(max-width: 450px) 100vw'
            className="z-0"
            />
        </div>
    </div>
    )
}

export default Seller;