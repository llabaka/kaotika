import { SelectedButton } from "@/components/shop/MainNavigator";
import { Player } from "../Player";
import { AllProducts } from "./AllProducts";
import { Product } from "./Product";
import { ShopTooltipProps } from "./ShopTooltip";

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
    setSellingItem: (loaded: Product) => void;
	sellingItem: Product;
    setSellingImage: (loaded: string) => void;
	sellingImage: String;
	setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
	selectedMainTab: number;
    setSelectedMainTab: (loaded: number) => void;
}