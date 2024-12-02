import { CardProps } from "@/_common/interfaces/shop/CardProps";
import CardItem from "./CardItem";
import React from "react";
import EmptyCard from "./Card/EmptyCard";

interface ProductRowContainerProps {
  cards: CardProps[]; // Espera un array de objetos con la interfaz CardProps
}

const ProductRowContainer: React.FC<ProductRowContainerProps> = ({ cards }) => {

    console.log("CARDS: ");
    console.log(cards.length);
    
    

  return (
    <div className="flex w-full h-[49%] bg-gray-500 justify-center items-center text-center">
      {cards.map((card, index) => (
        <React.Fragment key={index}>
          {/* Render EmptyCard if card.image is empty, otherwise render CardItem */}
          {card.image ? <CardItem card={card} /> : <EmptyCard card={card}/>}
          {/* Show separator if it's NOT the last item */}
          {index < cards.length - 1 && (
            <div className="flex w-[2%] h-[23rem] bg-orange-500 text-white"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductRowContainer;