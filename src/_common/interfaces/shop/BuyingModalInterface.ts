
import { Player } from "../Player";
import { Product } from "./Product";
import { ShopTooltipProps } from "./ShopTooltip";

export default interface BuyingModalInterface {
    product: Product | null;
    onclick: () => void;
    player: Player;
    setPlayer: any;
    setHaveBuy: any;
    setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
    qty: number;
}