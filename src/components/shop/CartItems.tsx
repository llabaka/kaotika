
import React, { useState } from "react";
import Image from "next/image";
import { Product } from "@/_common/interfaces/shop/Product";
import CartProductsInterface, { CartItemsInterface } from "@/_common/interfaces/shop/CartProductsInterface";

const CartItems:React.FC<CartItemsInterface> = ({cartProducts, setCartProducts, handleRemoveItem, handleUpdateQuantity}) => {

    // const [products, setProducts] = useState<Product[] | []>(cartProducts);



    return(
        <div className="h-[85%] w-[90%] text-xl overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
           {cartProducts.map((item, index) => (
                    <div key={index} className="flex w-[100%] h-[23%] items-center justify-between bg-black bg-opacity-50 rounded-lg mt-2">
                        {/* Imagen del objeto */}
                        <div className="w-[12%] h-[100%] ml-3">
                            <img src={item.image} alt={item.name} className="w-full h-full object-fill" />
                        </div>
                       
                        {/* Nombre del objeto */}
                        <div className="flex w-[35%] h-[80%] text-3xl text-orange-300 ml-2 justify-start items-center">{item.name}</div>

                        {item.type === "ingredient" ? (
                        <div className="flex w-[13%] items-center space-x-2">
                            <button
                                className="w-9 h-9 bg-orange-300 text-white text-5xl rounded-full flex items-center justify-center hover:bg-orange-600 transition"
                                onClick={() => handleUpdateQuantity(item._id!, -1)}
                            >
                                <div className="mb-4">-</div>
                            </button>
                            <span className="w-9 h-full text-white font-medium text-5xl mb-3 text-center">
                                {item.quantity}
                            </span>
                            <button
                                className="w-9 h-9 bg-orange-300 text-white text-5xl rounded-full flex items-center justify-center hover:bg-orange-600 transition"
                                onClick={() => handleUpdateQuantity(item._id!, 1)}
                            >
                                <div className="mb-3">+</div>
                            </button>
                        </div>
                        ) : (
                            <span className="text-white text-5xl flex w-[13%] ">Qty: {item.quantity}</span>
                        )}

                        {/* Botón para eliminar elemento */}
                        <button
                            onClick={() => handleRemoveItem(item._id!)}
                            className="w-[15%] h-[50%] mt-1 ml-4 mr-3 px-3 py-1 bg-orange-400 text-white text-3xl rounded hover:bg-red-700 transition-all"
                            data-testid={`RemoveItem${item._id}`}
                        >
                        Remove Item
                        </button>


                        {/* Valor del objeto */}
                        <div className="flex w-[14%] h-[50%] items-center mr-2 text-right">
                            <div className="w-[100%] text-right text-5xl text-orange-300 mr-1">{item.value * item.quantity!}</div>

                            <div className="flex w-[40%] relative h-[50%] z-1 text-orange-400 text-3xl mt-3 ml-1">
                                <Image
                                src="/images/shop/CoinsIcon.png"
                                alt="Gold"
                                width={35}
                                height={35}
                                />
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    )
}

export default CartItems;