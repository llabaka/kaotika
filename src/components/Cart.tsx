import React from "react";
import CartItems from "./shop/CartItems";
import CartSeparator from "./shop/CartSeparator";
import CartTotal from "./shop/CartTotal";
import CartInterface from "@/_common/interfaces/shop/CartInterface";

const Cart:React.FC<CartInterface> = ({cartProducts, setCartProducts}) => {
    return (
        <div className="flex flex-col h-[75%] w-[90%] text-xl border-white border-2 items-center justify-center">
            <CartItems cartProducts={cartProducts} setCartProducts={setCartProducts}/>
            <CartSeparator/>
            <CartTotal cartProducts={cartProducts} setCartProducts={setCartProducts}/>
        </div>

    )
}

export default Cart;