import { Product} from "./Product";
import { Player } from "../Player";

export default interface CartInterface {
    cartProducts: Product[];
	setCartProducts: any;
    player: Player;
    setPlayer: any;
}