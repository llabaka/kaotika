import CartScreenMainTab from "./CartScreenMainTab";
import CartContainer from "./CartContainer";
import React from "react";
import CartInterface from "@/_common/interfaces/shop/CartInterface";

const CartMainContainer:React.FC<CartInterface> = ({cartProducts, setCartProducts, player, setPlayer}) => {
    return(
        <div className="h-[85%] w-full text-xl justify-center items-center content-center">
            <CartContainer cartProducts={cartProducts} setCartProducts={setCartProducts} player={player} setPlayer={setPlayer}/>
        </div>
    )
}

export default CartMainContainer;