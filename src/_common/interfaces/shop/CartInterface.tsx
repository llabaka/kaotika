import { Product} from "./Product";
import { Player } from "../Player";
import { ShopTooltipProps } from "./ShopTooltip";

export default interface CartInterface {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>
    player: Player;
    setPlayer: (loaded: Player) => void;
	setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
}