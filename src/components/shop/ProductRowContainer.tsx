import CardItem from "./CardItem";
import React, { useEffect, useState } from "react";
import EmptyCard from "./Card/EmptyCard";
import ProductVerticalSeparator from "./ProductVerticalSeparator";
import ProductEmptyVerticalSeparator from "../ProductVerticalEmptySeparator";
import { ProductRowContainerInterface } from "@/_common/interfaces/shop/CardInterfaces";

const ProductRowContainer: React.FC<ProductRowContainerInterface> = ({ cards, onClickBuy, setProduct, setCartProducts, cartProducts, player, setShopTooltips, setQty }) => {

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
          {card.image ? <CardItem
            card={card}
            onClickBuy={onClickBuy}
            setProduct={setProduct}
            setCartProducts={setCartProducts}
            cartProducts={cartProducts}
            player={player}
            setShopTooltips={setShopTooltips}
            setQty={setQty}
          /> : <EmptyCard card={card} />}
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