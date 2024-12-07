import CartInterface from "@/_common/interfaces/shop/CartInterface";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { buyProductClient } from "./BuyingModal/buyProductClient";
interface Product {
    productId: string;
    type: string;
}

const CartBuyButtonContainer:React.FC<CartInterface> = ({setCartProducts, cartProducts, player, setPlayer}) => {
    const [buyProducts, setBuyProducts] = useState<Product[]>([]);

    useEffect(() => {

        const updatedBuyProducts = cartProducts.map(cartProduct => ({
            productId: cartProduct._id!,
            type: cartProduct.type!
        }));

        setBuyProducts(updatedBuyProducts);

    }, [cartProducts]);

    useEffect(() => {
        console.log(buyProducts);
    }, [buyProducts]);

    const handleBuyAllButton = async() => {
        let productsValue = 0;
        cartProducts.map(product => {
            productsValue += product.value;
        });

        if(player.gold > productsValue){
            console.log("have enough gold");
            const response = await buyProductClient(player._id, buyProducts);
            const updatePlayer = response.data;
            setPlayer(updatePlayer);
            console.log("Realiza compra desde carrito y lo vacia");
            setCartProducts([]);
                
            
        }else{
            console.log("not enough gold");
        }
        
    };

    return(
        <div className="flex h-[15%] w-[90%] justify-center items-center">
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