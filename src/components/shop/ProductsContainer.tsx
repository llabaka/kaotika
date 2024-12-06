import React, { useEffect, useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";
import { Product } from "@/_common/interfaces/shop/Product";
import BlankHorizontalSeparator from "./BlankHorizontalSeparator";
import { ArmorShop } from "@/_common/interfaces/shop/Product";

interface ProductsContainerInterface {
	products: Product[];
  onClickBuy : () => void;
  setProduct: any;
}

const ProductsContainer:React.FC<ProductsContainerInterface> = ({products, onClickBuy, setProduct}) => {

  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    console.log("ENTRA AL USEFFECT DE COUNT");
    
    if (products.length > 0) {
      let interval = setInterval(() => {
        setVisibleCount((prevCount) => {
          if (prevCount < products.length) {
            return prevCount + 3;
          } else {
            clearInterval(interval);
            return prevCount;
          }
        });
      }, 1000);
  
      return () => clearInterval(interval); 
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

    return (
      <div className="flex-col justify-start items-center w-full h-full mt-1 max-h-[full] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
        <BlankHorizontalSeparator />
      {partitionedCards.map((group, index) => (
        <div key={index}>
          <ProductRowContainer cards={group} onClickBuy={onClickBuy} 
            setProduct={setProduct}/>
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
