import React, { useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";
import { CardProps } from "@/_common/interfaces/shop/CardProps";
import BlankHorizontalSeparator from "./BlankHorizontalSeparator";
import { Armor } from "@/_common/interfaces/Armor";
import { Weapon } from "@/_common/interfaces/Weapon";

interface ProductsContainerInterface {
	products: CardProps[];
}

const ProductsContainer:React.FC<ProductsContainerInterface> = ({products}) => {

  const cardMock: Weapon = {
    _id : "asdadw1219beu21as",
    min_lvl: 12,
    image: '/images/equipment/armors/jacket_1.png',
    modifiers: {
      intelligence: 12,
      dexterity: 12,
      constitution: 20,
      insanity: 43,
      charisma: 23,
      strength: 34
    },
    name: 'cardMock',
    description: 'Descripción prueba de carta lkasndjoasbdiuasd',
    value: 340,
    type: "weapon",
    isUnique: false,
    isActive: false,
    die_faces: 2,
    die_modifier: 1,
    die_num: 10,
    base_percentage: 12
  };

  const emptyCardMock: Armor = {
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

  const cards2 = [cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock];

  const partitionArray = (array: CardProps[], size: number) => {
    const result: CardProps[][] = [];
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
  const partitionedCards = partitionArray(products, 3);

  const cards = [cardMock, cardMock, cardMock];

    return (
      <div className="flex-col justify-start items-center w-full h-full mt-1 max-h-[full] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
        <BlankHorizontalSeparator />
      {partitionedCards.map((group, index) => (
        <div key={index}>
          <ProductRowContainer cards={group} />
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
