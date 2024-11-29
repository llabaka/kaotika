import Image from 'next/image';

const SellerSeparator = () => {
    return (
        <div className="flex flex-col justify-center items-center w-11/12 mt-2">
            <div className="w-8/12 h-6 flex relative items-center justify-center">
                <Image
                    src="/images/shop/SellerSeparator.png"
                    alt="Imagen 1"
                    layout="fill"
                />
            </div>
        </div>
    )
}

export default SellerSeparator;