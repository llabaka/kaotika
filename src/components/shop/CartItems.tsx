import CartInterface from "@/_common/interfaces/shop/CartInterface";
import React, { useState } from "react";
import Image from "next/image";
import { CardProps } from "@nextui-org/react";
import { Product } from "@/_common/interfaces/shop/CardProps";

const CartItems:React.FC<CartInterface> = ({cartProducts, setCartProducts}) => {

    // const [products, setProducts] = useState<CardProps[] | []>(cartProducts);

    const handleRemoveItem = (id: string) => {
        setCartProducts((prevItems:Product[]) => prevItems.filter((item:Product) => item._id !== id));
      };

    const updateQuantity = (id: string, delta: number) => {
    setCartProducts((prevItems:Product[]) =>
        prevItems.map((item) =>
        item._id === id && item.type === "ingredient"
            ? { ...item, quantity: Math.max(item.quantity! + delta, 0) }
            : item
        )
    );
    };

    return(
        <div className="h-[85%] w-[90%] text-xl border-white border-2 overflow-y-scroll">
           {cartProducts.map((item, index) => (
                    <div key={index} className="flex w-[100%] h-[23%] items-center justify-between bg-black bg-opacity-50 rounded-lg mt-2">
                        {/* Imagen del objeto */}
                        <div className="w-[12%] h-[100%] ml-3">
                            <img src={item.image} alt={item.name} className="w-full h-full object-fill border-white border-2" />
                        </div>
                       
                        {/* Nombre del objeto */}
                        <div className="w-[35%] text-3xl text-orange-300 ml-4">{item.name}</div>

                        {item.type === "ingredient" ? (
                        <div className="flex w-[20%] items-center space-x-5">
                            <button
                                className="w-9 h-9 bg-orange-300 text-white text-5xl rounded-full flex items-center justify-center hover:bg-orange-600 transition"
                                onClick={() => updateQuantity(item._id!, -1)}
                            >
                                <div className="mb-4">-</div>
                            </button>
                            <span className="text-white font-medium text-5xl mb-3">
                                {item.quantity}
                            </span>
                            <button
                                className="w-9 h-9 bg-orange-300 text-white text-5xl rounded-full flex items-center justify-center hover:bg-orange-600 transition"
                                onClick={() => updateQuantity(item._id!, 1)}
                            >
                                <div className="mb-3">+</div>
                            </button>
                        </div>
                        ) : (
                            <span className="text-white text-5xl flex w-[20%]">Qty: {item.quantity}</span>
                        )}

                            {/* Botón para eliminar elemento */}
                            <button
                                onClick={() => handleRemoveItem(item._id!)}
                                className="w-[15%] h-[50%] mt-1 ml-4 mr-3 px-3 py-1 bg-orange-400 text-white text-3xl rounded hover:bg-red-700"
                            >
                            Remove Item
                            </button>


                        {/* Valor del objeto */}
                        <div className="w-[5%] text-5xl text-orange-300 mr-5">{item.value * item.quantity!}</div>

                        <div className="flex items-center justify-center z-1 text-orange-400 text-3xl mr-3">
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
                ))}
        </div>
    )
}

export default CartItems;