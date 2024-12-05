import { Player } from "../Player";
import { Product } from "./CardProps";

export default interface SellingItemInterface {
	sellingImage: String;
	player: Player
	sellingItem: Product;
}
export interface SellingContainerInterface {
	player: Player;
}

export interface SellingItemImageInterface {
	sellingImage: String;
}

export interface SellingButtonsInterface {
	player: Player;
	sellingItem: Product;
}