import { Player } from "../Player";

export default interface InventoryContainerInterface {
    player: Player;
    setSellingImage: (loaded: string) => void;
    setSellingItem: any;
}