import { AllProducts } from "./AllProducts";
import { CardProps, Product } from "./CardProps";

export default interface RightContainerInterface {
	products: Product[];
	displayingScreen: Number;
	allProducts: AllProducts;
	setShowingProducts: (loaded: Product[]) => void;
	cartProducts: Product[];
	setCartProducts: (loaded: Product[]) => void;
}