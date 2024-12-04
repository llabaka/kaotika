import CartInterface from "@/_common/interfaces/shop/CartInterface";
import React, { useEffect, useState } from "react";
import calculateTotalPrice from "./helpers/CalculatePrice";
import CartPriceInterface from "@/_common/interfaces/shop/CartPriceInterface";

const CartTotal:React.FC<CartPriceInterface> = ({totalPrice}) => {

    return(
        <div className="h-[13%] w-[90%] text-xl border-white border-2">
            <div className="flex h-[100%] w-[100%] text-xl border-blue-600 border-2 justify-between items-center">
                <p className="ml-3 text-3xl">TOTAL<span className="text-5xl"> :</span></p>
                <p className="mr-3 text-5xl">{totalPrice}</p>
            </div>
        </div>
    )
}

export default CartTotal;