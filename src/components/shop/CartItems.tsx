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

    return(
        <div className="h-[85%] w-[90%] text-xl border-white border-2 overflow-y-scroll">
           {cartProducts.map((item, index) => (
                    <div key={index} className="flex items-center bg-black bg-opacity-50 rounded-lg w-[100%] h-[23%] mt-2">
                        {/* Imagen del objeto */}
                        <div className="w-[12%] h-[100%] ml-3">
                            <img src={item.image} alt={item.name} className="w-full h-full object-fill border-white border-2" />
                        </div>
                       
                        {/* Nombre del objeto */}
                        <div className="text-3xl text-orange-300 ml-4">{item.name}</div>

                        <button
                            className="text-4xl w-6 h-6 bg-orange-300 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition">
                        +</button>

                        {/* Cantidad del objeto */}
                        <div className=" text-4xl text-orange-300 ml-auto mr-5">{item.quantity}</div>

                         {/* Botón para eliminar elemento */}
                        <button
                            onClick={() => handleRemoveItem(item._id!)}
                            className="w-[15%] h-[50%] mt-1 ml-4 px-3 py-1 bg-orange-400 text-white text-xl rounded hover:bg-red-700"
                        >
                            Remove Item
                        </button>

                        {/* Valor del objeto */}
                        <div className=" text-5xl text-orange-300 ml-auto mr-5">{item.value}</div>

                        <div className="flex items-center justify-center z-1 text-orange-400 text-3xl mr-3 mt-">
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