import { CardProps, Product } from "@/_common/interfaces/shop/CardProps";

interface CardItemProps {
    card: Product;
  }


const EmptyCard: React.FC<CardItemProps> = ({ card }) => {

    return(
            <div className="w-[25rem] relative h-[23rem] flex flex-row">
                
            </div>
    )
};

export default EmptyCard;
