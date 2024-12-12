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
        <div className="flex w-[87%] h-[84%] relative mt-[8%] ml-[8%]">
          <Image
            src="/images/shop/SellerCrop.png"
            alt="Imagen 1"
            fill
            sizes='(max-width: 780px) 100vw'
            className="z-0 rounded-lg"
          />
        </div>
      </div>

    </div>
  )
}

export default Seller;