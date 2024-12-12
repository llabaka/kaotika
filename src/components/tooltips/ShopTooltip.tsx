import { ShopTooltipProps } from "@/_common/interfaces/shop/ShopTooltip";
import Image from "next/image";


const ShopTooltip = ({ image, action, itemName }: ShopTooltipProps) => {

  return (
    <div className="h-32 bg-black bg-opacity-90 flex items-center justify-around relative mt-2" data-testid={'ShopTooltip'}>
      <div className="w-[50%] h-full relative mr-2">
        <div className="flex relative w-full h-full">
          <Image
            src={image}
            alt=""
            fill
          />
        </div>
      </div>
      <p className="text-white text-2xl">You have {action} <span className="text-orange-400">{itemName} </span>!! </p>
    </div>
  );
}

export default ShopTooltip;