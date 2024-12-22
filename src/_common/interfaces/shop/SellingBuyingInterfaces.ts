
import { Player } from "../Player";
import { Product } from "./Product";
import { ShopTooltipProps } from "./ShopTooltip";

export default interface BuyingModalInterface {
    product: Product | null;
    onclick: () => void;
    player: Player;
    setPlayer: (loaded: Player) => void;
    setHaveBuy: any;
    setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
    qty: number;
}

export interface SellingModalInterface {
    sellingItem: Product | null;
    onClickSell: any;
    player: Player,
    setPlayer: (loaded: Player) => void;
    setSellingItem: (loaded: Product) => void;
    setSellingImage: (loaded: string) => void;
    setHaveSell: any;
    setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
}