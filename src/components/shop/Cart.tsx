import React, { useEffect, useState } from "react";
import CartItems from "./CartItems";
import CartSeparator from "./CartSeparator";
import CartTotal from "./CartTotal";
import CartProductsInterface from "@/_common/interfaces/shop/CartProductsInterface";
import calculateTotalPrice from "./helpers/CalculatePrice";
import { Product } from "@/_common/interfaces/shop/Product";

const Cart: React.FC<CartProductsInterface> = ({ cartProducts, setCartProducts }) => {

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const handleRemoveItem = (id: string) => {
    setCartProducts((prevItems: Product[]) => prevItems.filter((item: Product) => item._id !== id));
    console.log("HANDLE REMOVE ITEM", id);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartProducts((prevItems: Product[]) =>
      prevItems.map((item) =>
        item._id === id && item.type === "ingredient"
          ? { ...item, quantity: Math.max(item.quantity! + delta, 0) }
          : item
      )
    );
  };

  useEffect(() => {
    setTotalPrice((prevTotal) => {
      const newTotalPrice = calculateTotalPrice(cartProducts);
      // Opcional: lógica que depende del precio anterior
      console.log(`Precio anterior: ${prevTotal}, Nuevo precio: ${newTotalPrice}`);
      return newTotalPrice;
    });
  }, [cartProducts, setCartProducts]);


  return (
    <div className="flex flex-col h-[75%] w-[90%] text-xl items-center justify-center" data-testid={'Cart'}>
      <CartItems cartProducts={cartProducts} setCartProducts={setCartProducts} handleRemoveItem={handleRemoveItem} handleUpdateQuantity={updateQuantity} />
      <CartSeparator />
      <CartTotal cartProducts={cartProducts} />
    </div>

  )
}

export default Cart;