import CartInterface from "@/_common/interfaces/shop/CartInterface";
import React, { useEffect, useState } from "react";
import calculateTotalPrice from "./helpers/CalculatePrice";
import CartPriceInterface from "@/_common/interfaces/shop/CartPriceInterface";
import Image from "next/image";

const CartTotal:React.FC<CartPriceInterface> = ({totalPrice}) => {

    return(
        <div className="h-[13%] w-[90%] text-xl border-2">
            <div className="flex h-[100%] w-[100%] text-xl justify-between items-center">
                <p className="h-[80%] ml-3 text-3xl">TOTAL<span className="text-5xl"> :</span></p>
                <div className="flex w-[25%] h-[80%] justify-center">
                    <div className="w-[90%] mr-3 text-5xl text-right">{totalPrice}</div>
                    <div className="w-[20%] flex items-center justify-center z-1 text-orange-400 text-3xl mr-6">
                            <Image
                            src="/images/shop/CoinsIcon.png"
                            alt="Gold"
                            width={24}
                            height={24}
                            className="ml-2"
                            style={{height: 'auto', width:'auto'}}
                            />
                        </div>
                </div>
               
            </div>
        </div>
    )
}

export default CartTotal;