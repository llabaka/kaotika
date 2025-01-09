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
    setCartProducts((prevItems: Product[]) => {
      if (delta === 1) {
        // Añadir un nuevo objeto si no existe en el carrito
        const newItem = prevItems.find(item => item._id === id && item.type === "ingredient");
        return newItem ? [...prevItems, newItem] : prevItems; // Solo añade si existe en la lista original
      } else if (delta === -1) {
        // Eliminar solo una instancia del objeto
        const indexToRemove = prevItems.findIndex(item => item._id === id && item.type === "ingredient");
        if (indexToRemove !== -1) {
          const updatedItems = [...prevItems];
          updatedItems.splice(indexToRemove, 1); // Elimina solo una instancia
          return updatedItems;
        }
        return prevItems; // Si no se encuentra el objeto, no modifica el carrito
      }
      return prevItems;
    });
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