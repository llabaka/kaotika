import { Product } from "@/_common/interfaces/shop/Product";
import CardItem from "./CardItem";
import React, { useEffect, useState } from "react";
import EmptyCard from "./Card/EmptyCard";
import ProductVerticalSeparator from "./ProductVerticalSeparator";
import ProductEmptyVerticalSeparator from "../ProductVerticalEmptySeparator";

interface ProductRowContainerProps {
  cards: Product[]; // Espera un array de objetos con la interfaz Product
  onClickBuy: () => void;
  setProduct: any;
}

const ProductRowContainer: React.FC<ProductRowContainerProps> = ({ cards, onClickBuy, setProduct}) => {

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div
      className={`flex w-full h-[49%] bg-transparent justify-center items-center text-center z-20
        ${isAnimating ? "row-container-animation" : ""}`}
    >
      {cards.map((card, index) => (
        <React.Fragment key={index}>
          {/* Render EmptyCard if card.image is empty, otherwise render CardItem */}
          {card.image ? <CardItem card={card} onClickBuy={onClickBuy} setProduct={setProduct}/> : <EmptyCard card={card}/>}
          {/* Show separator if it's NOT the last item */}
          {index < cards.length - 1 && (
            card.image 
              ? <ProductVerticalSeparator /> 
              : <ProductEmptyVerticalSeparator />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProductRowContainer;