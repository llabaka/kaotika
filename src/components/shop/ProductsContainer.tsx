import React, { SetStateAction, useEffect, useRef, useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";
import { Product } from "@/_common/interfaces/shop/Product";
import BlankHorizontalSeparator from "./BlankHorizontalSeparator";
import { ArmorShop } from "@/_common/interfaces/shop/Product";
import { Player } from "@/_common/interfaces/Player";
import { ShopTooltipProps } from "@/_common/interfaces/shop/ShopTooltip";

interface ProductsContainerInterface {
	products: Product[];
  onClickBuy : () => void;
  setProduct: any;
  setCartProducts: (loaded: Product[]) => void
  cartProducts: Product[];
  player: Player;
  setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
  setQty: React.Dispatch<SetStateAction<number>>;
}

const ProductsContainer:React.FC<ProductsContainerInterface> = ({products, onClickBuy, setProduct, setCartProducts, cartProducts, player, setShopTooltips, setQty}) => {

  const [visibleCount, setVisibleCount] = useState(0);
    // Referencia para el contenedor del ProductsContainer
    const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(0); // Resetear visibleCount a 0
    
    if (products.length > 0) {
      let interval = setInterval(() => {
        setVisibleCount((prevCount) => {
          if (prevCount < products.length) {
            return prevCount + 3;
          } else {
            console.log("INTERVAL DETENIDO");
            clearInterval(interval); // Detener el intervalo
            setVisibleCount(0);
            return prevCount;
          }
        });
      }, 400);

      return () => {
        clearInterval(interval); // Limpiar el intervalo al desmontar
      };
    }
  }, [products]);


    const visibleProducts = products.slice(0, visibleCount);

  const emptyCardMock: Product = {
    _id: "asdadsasdasd",
    min_lvl: 0,
    image: '',
    modifiers: {
      intelligence: 0,
      dexterity: 0,
      constitution: 0,
      insanity: 0,
      charisma: 0,
      strength: 0,
    },
    name: '',
    description: '',
    value: 0,
    defense: 0,
    isUnique: false,
    isActive: false,
    type: "armor"
  };

  const partitionArray = (array: Product[], size: number) => {
    const result: Product[][] = [];
    for (let i = 0; i < array.length; i += size) {
      let partition = array.slice(i, i + size);

      // Si es el último grupo y no tiene el tamaño completo, rellena con mocks vacíos
      if (partition.length < size && i + size >= array.length) {
        while (partition.length < size) {
          partition.push(emptyCardMock);
        }
      }

      result.push(partition);
    }
    return result;
  };

  // Particionar el array en grupos de 3
  const partitionedCards = partitionArray(visibleProducts, 3);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // Mueve el scroll hacia arriba
      window.scrollTo(0, 0); // Desplaza el scroll hacia arriba
    }
  }, [products]);

    return (
      <div 
      data-testid={'products_container'}
      ref={containerRef} // Asignamos la referencia aquí
      className="flex-col justify-start items-center w-full h-full mt-1 max-h-[full] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
        <BlankHorizontalSeparator />
      {partitionedCards.map((group, index) => (
        <div key={index}>
          <ProductRowContainer cards={group} onClickBuy={onClickBuy} 
            setProduct={setProduct}
            cartProducts={cartProducts}
            setCartProducts={setCartProducts}
            player={player}
            setShopTooltips={setShopTooltips}
            setQty={setQty}
            />
          {index < partitionedCards.length - 1 ? (
            <ProductHorizontalSeparator />
          ) : (
            <BlankHorizontalSeparator />
          )}
        </div>
      ))}
    </div>
); 
}

export default ProductsContainer;
