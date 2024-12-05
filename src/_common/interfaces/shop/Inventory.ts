import { Player } from "../Player";
import { Product } from "./Product";

export default interface InventoryContainerInterface {
    player: Player;
    setSellingImage: (loaded: string) => void;
    setSellingItem: (loaded: Product) => void;
}