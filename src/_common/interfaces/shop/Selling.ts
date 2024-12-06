import { Player } from "../Player";
import { Product } from "./Product";

export default interface SellingItemInterface {
	sellingImage: String;
	sellingItem: Product;
	player: Player;
	onClickSell : () => void;
}
export interface SellingContainerInterface {
	player: Player;
	onClickSell : () => void;
}

export interface SellingItemImageInterface {
	sellingImage: String;
}

export interface SellingButtonsInterface {
	sellingItem: Product;
	player: Player
	onClickSell : () => void;
}