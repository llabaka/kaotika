import CartInterface from "@/_common/interfaces/shop/CartInterface";
import Image from "next/image";
import React from "react";

const CartBuyButtonContainer:React.FC<CartInterface> = ({setCartProducts}) => {

    const handleBuyAllButton = () => {
        setCartProducts([]); 
      };

    return(
        <div className="flex h-[15%] w-[90%] border-2 justify-center items-center">
            <div className=" flex h-[65%] w-[25%] items-center justify-center " >
                <button className="flex-col relative h-full w-full flex items-center justify-center z-1 text-orange-400 text-4xl mr-3 hover:scale-105 transition-all"
                    onClick={handleBuyAllButton}>
                    <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt={'Buy All'}
                    fill
                    sizes='(max-width: 426px) 100vw'
                    />
                    <span className={`z-10 text-orange-400 transition-all 'text-4xl text-orange-300'`}>
                        BUY ALL
                    </span>
                </button>


               

            </div>
        </div>
    )

}

export default CartBuyButtonContainer;