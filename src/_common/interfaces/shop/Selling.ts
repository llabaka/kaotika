import { Player } from "../Player";
import { Product } from "./Product";

export default interface SellingItemInterface {
	sellingImage: String;
	sellingItem: Product;
}
export interface SellingContainerInterface {
	player: Player;
}

export interface SellingItemImageInterface {
	sellingImage: String;
}

export interface SellingButtonsInterface {
	sellingItem: Product;
}