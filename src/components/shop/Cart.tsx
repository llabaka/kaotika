import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import CartSeparator from "./CartSeparator";
import CartTotal from "./CartTotal";
import CartInterface from "@/_common/interfaces/shop/CartInterface";
import calculateTotalPrice from "./helpers/CalculatePrice";

const Cart:React.FC<CartInterface> = ({cartProducts, setCartProducts}) => {

    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setTotalPrice((prevTotal) => {
            const newTotalPrice = calculateTotalPrice(cartProducts);
            // Opcional: lógica que depende del precio anterior
            console.log(`Precio anterior: ${prevTotal}, Nuevo precio: ${newTotalPrice}`);
            return newTotalPrice;
        });
    }, [cartProducts]);

    return (
        <div className="flex flex-col h-[75%] w-[90%] text-xl border-white border-2 items-center justify-center">
            <CartItems cartProducts={cartProducts} setCartProducts={setCartProducts}/>
            <CartSeparator/>
            <CartTotal totalPrice={totalPrice}/>
        </div>

    )
}

export default Cart;