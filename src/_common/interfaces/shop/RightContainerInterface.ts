import { AllProducts } from "./AllProducts";
import { CardProps, Product } from "./CardProps";

export default interface RightContainerInterface {
	products: CardProps[];
	displayingScreen: Number;
	allProducts: AllProducts;
	setShowingProducts: (loaded: CardProps[]) => void;
	cartProducts: Product[];
	setCartProducts: (loaded: Product[]) => void;
	onClickBuy: () => void;
	setProduct: any;
}