import { Player } from "@/_common/interfaces/Player";
import Card from "./Card/Card"
import { Product } from "@/_common/interfaces/shop/Product";
import { handleAddToCart } from "./helpers/HandleAddToCart";

interface CardItemProps {
    card: Product;
    onClickBuy : () => void;
    setProduct: any;
    setCartProducts: any;
    cartProducts: Product[];
    player: Player;
}

const CardItem: React.FC<CardItemProps> = ({ card, onClickBuy, setProduct, setCartProducts, cartProducts, player } ) => {

    const handleOnClickBuy = () => {
        onClickBuy();
        setProduct(card);
    }

    const handleAddToCart = () => {
        // Verificar si el producto ya está en el carrito
        const isProductInCart = cartProducts.some(product => product._id === card._id);

        if (!isProductInCart) {
            // Si el producto no está en el carrito, agregarlo con quantity 1
            setCartProducts((prevCartProducts: Product[] | []) => [
                ...prevCartProducts,
                { ...card, quantity: 1 }
            ]);
        } else {
            // Si el producto ya existe, actualizar su cantidad (si no tiene el atributo quantity, añadirlo)
            if(card.type === "ingredient") {
                setCartProducts((prevCartProducts : Product[] | []) =>
                    prevCartProducts.map((product) =>
                        product._id === card._id
                            ? { ...product, quantity: product.quantity ? product.quantity + 1 : 1 }
                            : product
                    )
                );
            }
          
        }
    }

    return(
        <div className="flex w-[31%] bg-transparent text-center items-center justify-center text-white hover:scale-105 transition z-20 mt-1 mb-1" data-testid={"CardItem"}>
            <Card props={card} onClickBuy={handleOnClickBuy} onClickAddToCart={handleAddToCart} player={player}/>
        </div>
    )
}

export default CardItem;