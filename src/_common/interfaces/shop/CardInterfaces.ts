import { Player } from "../Player";

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

export interface ProgressBarProps {
    value?: number; // Valor entre -100 y 100
}