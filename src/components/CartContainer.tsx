
import React from "react";
import Cart from "./Cart";
import CartInterface from "@/_common/interfaces/shop/CartInterface";

const CartContainer:React.FC<CartInterface> = ({cartProducts}) => {
    return(
        <div className="flex h-full w-full text-xl border-white border-2 items-center justify-center">
            <Cart cartProducts={cartProducts}/>
        </div>
    )
}

export default CartContainer;