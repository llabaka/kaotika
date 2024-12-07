import { Player } from "../Player";
import { AllProducts } from "./AllProducts";
import { Product } from "./Product";

export default interface RightContainerInterface {
	products: Product[];
	displayingScreen: Number;
	allProducts: AllProducts;
	setShowingProducts: (loaded: Product[]) => void;
	cartProducts: Product[];
	setCartProducts: (loaded: Product[]) => void;
	onClickBuy: () => void;
	onClickSell: () => void;
    setProduct: (loaded: Product) => void;
	player: Player;
	setPlayer: any
}