import { useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";
import { CardProps } from "@/_common/interfaces/shop/CardProps";
import BlankHorizontalSeparator from "./BlankHorizontalSeparator";

const ProductsContainer = () => {

  const cardMock: CardProps = {
    minLevel: 12,
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
    icon: '/images/icons/up.png',
    value: 340,
    defense: 32
  };

  const cards2 = [cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock];

  const partitionArray = (array: CardProps[], size: number) => {
    const result: CardProps[][] = [];
    for (let i = 0; i < array.length; i += size) {
      let partition = array.slice(i, i + size);

      // Rellenar con cardMock si es necesario
      while (partition.length < size) {
        partition.push(cardMock);
      }

      result.push(partition);
    }
    return result;
  };

  // Particionar el array en grupos de 3
  const partitionedCards = partitionArray(cards2, 3);

  const cards = [cardMock, cardMock, cardMock];

  console.log("Partitioned Cards:", partitionedCards.length);

    return (
      <div className="w-full h-full overflow-y-auto bg-white bg-scroll mt-2">
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
