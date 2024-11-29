import { useState } from "react"
import ProductRowContainer from "./ProductRowContainer";
import ProductHorizontalSeparator from "./ProductHorizontalSeparator";
import { CardProps } from "@/_common/interfaces/shop/CardProps";

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

  const cards = [cardMock, cardMock, cardMock];

  const cards2 = [cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock, cardMock];

    return (
    <div className="w-full h-full overflow-y-auto bg-white bg-scroll mt-2">

        <ProductRowContainer cards={cards}/>

        <ProductHorizontalSeparator/>

        <ProductRowContainer cards={cards}/>

        <ProductHorizontalSeparator/>


    </div>
); 
}

export default ProductsContainer;
