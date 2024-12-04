import { CardProps } from "./CardProps";

export default interface CartInterface {
    cartProducts: CardProps[];
	setCartProducts: (loaded: CardProps[]) => void;
}