import Image from "next/image";

const ProductVerticalSeparator = () => {

    return(
    <div className="flex w-[2%] h-[23rem] bg-transparent text-white">
         <div className="relative w-[60%] left-1 h-[23rem]">
         <Image
          src="/images/shop/CardsVerticalSeparator.png"
          alt="HorizontalSeparator"
          layout="fill"
          className="z-0"
        />
        </div>
    </div>    )
}

export default ProductVerticalSeparator;