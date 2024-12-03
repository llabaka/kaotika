import { useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";
import { CardProps } from "@/_common/interfaces/shop/CardProps";
import BlankHorizontalSeparator from "./BlankHorizontalSeparator";
import { Armor } from "@/_common/interfaces/Armor";

const ProductsContainer = () => {

  const cardMock: Armor = {
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
    defense: 32,
    type: "armor",
    isUnique: false,
    isActive: false
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
  const partitionedCards = partitionArray(cards2, 3);

  const cards = [cardMock, cardMock, cardMock];

    return (
      <div className="w-full h-full overflow-y-auto bg-transparent bg-scroll mt-2">
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
