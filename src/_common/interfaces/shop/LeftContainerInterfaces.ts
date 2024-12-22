import { Player } from "../Player";
import { AllProducts } from "./AllProducts";
import { Product } from "./Product";

export default interface LeftMainContainerInterface {
    setDisplayingScreen: (loaded: number) => void;
    allProducts: AllProducts;
    player: Player
    setShowingProducts: (loaded: Product[]) => void;
    displayingScreen: Number;
    selectedMainTab: number;
    setSelectedMainTab: (loaded: number) => void;
}

export interface ShopIconsInterface {
    setDisplayingScreen: (loaded: number) => void;
    isTicketPressed: boolean;
    isDollarPressed: boolean;
    isCartPressed: boolean;
    setIsTicketPressed: (loaded: boolean) => void;
    setIsDollarPressed: (loaded: boolean) => void;
    setIsCartPressed: (loaded: boolean) => void;
}

export interface PlayerStatsButtonInterface {
    player: Player;
}