
import React from "react";
import Cart from "./Cart";
import CartInterface from "@/_common/interfaces/shop/CartInterface";
import CartBuyButtonContainer from "./CartBuyButtonContainer";

const CartContainer:React.FC<CartInterface> = ({cartProducts, setCartProducts}) => {
    return(
        <div className="flex flex-col h-full w-full text-xl items-center justify-center">
            <Cart cartProducts={cartProducts} setCartProducts={setCartProducts}/>
            <CartBuyButtonContainer cartProducts={cartProducts} setCartProducts={setCartProducts}/>
        </div>
    )
}

export default CartContainer;