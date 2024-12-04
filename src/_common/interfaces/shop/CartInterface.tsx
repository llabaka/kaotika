import { CardProps, CartItem } from "./CardProps";

export default interface CartInterface {
    cartProducts: CartItem[];
	setCartProducts: (loaded: CartItem[]) => void;
}