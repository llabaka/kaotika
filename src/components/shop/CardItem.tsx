import Card from "./Card/Card"
import { CardProps } from "@/_common/interfaces/shop/CardProps";

interface CardItemProps {
    card: CardProps;
}

const CardItem: React.FC<CardItemProps> = ({ card }) => {
    return(
        <div className="flex w-[31%] bg-transparent text-center items-center justify-center text-white hover:scale-105 transition">
            <Card {...card} />
        </div>
    )
}

export default CardItem;