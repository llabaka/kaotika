import CartInterface from "@/_common/interfaces/shop/CartInterface";
import React, { useEffect, useState } from "react";
import calculateTotalPrice from "./helpers/CalculatePrice";
import CartPriceInterface from "@/_common/interfaces/shop/CartPriceInterface";
import Image from "next/image";

const CartTotal:React.FC<CartPriceInterface> = ({totalPrice}) => {

    return(
        <div className="h-[13%] w-[90%] text-xl bg-black bg-opacity-50 rounded-md">
            <div className="flex h-[100%] w-[100%] text-xl justify-between items-center">
                <p className="h-[80%] ml-3 text-3xl">TOTAL<span className="text-5xl"> :</span></p>
                <div className="flex w-[25%] h-[80%] justify-center">

                    <p className="w-[70%] h-full text-5xl text-right mr-2" data-testid={"CartTotalPrice"}>{totalPrice}</p>

                    <div className="w-[20%] h-[80%]">
                        <div className="relative w-full h-full">
                                <Image
                                src="/images/shop/CoinsIcon.png"
                                alt="Gold"
                                fill
                                sizes='(max-width: 50px) 100vw'
                                />
                            </div>
                        </div>
                </div>
               
            </div>
        </div>
    )
}

export default CartTotal;