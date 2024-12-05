import Card from "./Card/Card"
import { Product } from "@/_common/interfaces/shop/Product";

interface CardItemProps {
    card: Product;
    onClickBuy : () => void;
    setProduct: any;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClickBuy, setProduct } ) => {

    const handleOnClickBuy = () => {
        onClickBuy();
        setProduct(card);
    }

    return(
        <div className="flex w-[31%] bg-transparent text-center items-center justify-center text-white hover:scale-105 transition">
            <Card props={card} onClickBuy={handleOnClickBuy} />
        </div>
    )
}

export default CardItem;