import { Player } from "../Player";
import { Product } from "./CardProps";

export default interface InventoryContainerInterface {
    player: Player;
    setSellingImage: (loaded: string) => void;
    setSellingItem: (loaded: Product) => void;
}