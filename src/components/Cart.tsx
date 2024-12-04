import React from "react";
import CartItems from "./shop/CartItems";
import CartSeparator from "./shop/CartSeparator";
import CartTotal from "./shop/CartTotal";
import CartInterface from "@/_common/interfaces/shop/CartInterface";

const Cart:React.FC<CartInterface> = ({cartProducts}) => {
    return (
        <div className="flex flex-col h-[75%] w-[90%] text-xl border-white border-2 items-center justify-center">
            <CartItems cartProducts={cartProducts}/>
            <CartSeparator/>
            <CartTotal cartProducts={cartProducts}/>
        </div>

    )
}

export default Cart;