import { CardProps } from "@/_common/interfaces/shop/CardProps";
import CardItem from "./CardItem";

interface ProductRowContainerProps {
  cards: CardProps[]; // Espera un array de objetos con la interfaz CardProps
}

const ProductRowContainer: React.FC<ProductRowContainerProps> = ({ cards }) => {
  return (
    <div className="flex w-full h-[49%] bg-gray-500 justify-center items-center text-center">
      {cards.map((card, index) => (
        <CardItem key={index} card={card} />
      ))}
    </div>
  );
};

export default ProductRowContainer;