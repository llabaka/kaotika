import Image from 'next/image';


const Seller = () => {
    return (
    <div className="flex-col w-10/12 mt-4 h-96">
        <div className="flex w-full h-full relative">
            <Image
            src="/images/shop/SellerFrame.png"
            alt="Imagen 1"
            layout="fill"
            />
        </div>
    </div>
    )
}

export default Seller;