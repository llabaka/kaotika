import { CardProps } from "./CardProps";

export interface AllProductsStructure {
    armors: CardProps[];
    boots: CardProps[];
    helmets: CardProps[];
    weapons: CardProps[];
    shields: CardProps[];
    rings: CardProps[];
    artifacts: CardProps[];
    ingredients: CardProps[];
    // Agrega más categorías si existen
}

export type AllProducts = AllProductsStructure | null;
