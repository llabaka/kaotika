import { AllProducts } from "./AllProducts";
import { Product, Product } from "./Product";

export default interface RightContainerInterface {
	products: Product[];
	displayingScreen: Number;
	allProducts: AllProducts;
	setShowingProducts: (loaded: Product[]) => void;
	cartProducts: Product[];
	setCartProducts: (loaded: Product[]) => void;
	onClickBuy: () => void;
	setProduct: any;
}