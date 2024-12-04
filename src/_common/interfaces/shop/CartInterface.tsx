import { CardProps, Product } from "./CardProps";

export default interface CartInterface {
    cartProducts: Product[];
	setCartProducts: (loaded: Product[]) => void;
}