import { Player } from "../Player";
import { Product } from "./Product";

export default interface SellingItemInterface {
	sellingImage: String;
	sellingItem: Product;
	player: Player;
	onClickBuy : () => void;
}
export interface SellingContainerInterface {
	player: Player;
	onClickBuy : () => void;
}

export interface SellingItemImageInterface {
	sellingImage: String;
}

export interface SellingButtonsInterface {
	sellingItem: Product;
	player: Player
	onClickBuy : () => void;
}