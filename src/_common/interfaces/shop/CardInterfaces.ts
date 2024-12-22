import { SetStateAction } from "react";
import { Modifier } from "../Modifier";
import { Player } from "../Player";
import { RenderObject } from "./RenderObject";
import { Product } from "./Product";
import { ShopTooltipProps } from "./ShopTooltip";

export default interface CardLeftContainerInterface {
    min_lvl: number | null;
    value: number;
    image: string;
    name: string;
    description: string;
    _id: string;
    onClickBuy: () => void;
    onClickAddToCart: () => void;
    player: Player
}

export interface ProgressBarInterface {
    value?: number; // Valor entre -100 y 100
}

export interface CardRightContainerInterface {
    attributes: Modifier | null;
    extra_attribute: RenderObject | null;
    weaponDie: string | null;
    baseDamage: number | null;
}

export interface EffectsContainerProps {
    effects: string[];
    qtyCard: number;
    setQtyCard: React.Dispatch<SetStateAction<number>>;
}

export interface ProductInterface {
    props: Product,
    onClickBuy: () => void;
    onClickAddToCart: () => void;
    player: Player;
    qtyCard: number;
    setQtyCard: React.Dispatch<SetStateAction<number>>;
}

export interface CardItemInterface {
    card: Product;
    onClickBuy: () => void;
    setProduct: any;
    setCartProducts: any;
    cartProducts: Product[];
    player: Player;
    setShopTooltips: React.Dispatch<React.SetStateAction<ShopTooltipProps[]>>;
    setQty: React.Dispatch<SetStateAction<number>>;
}