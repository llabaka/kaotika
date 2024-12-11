import { Product} from "./Product";
import { Player } from "../Player";
import { ShopTooltipProps } from "./ShopTooltip";

export default interface CartInterface {
    cartProducts: Product[];
	setCartProducts: any;
    player: Player;
    setPlayer: any;
	setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
}