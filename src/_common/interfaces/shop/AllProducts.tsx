import { Product } from "./Product";

export interface AllProductsStructure {
    armors: Product[];
    boots: Product[];
    helmets: Product[];
    weapons: Product[];
    shields: Product[];
    rings: Product[];
    artifacts: Product[];
    ingredients: Product[];
    // Agrega más categorías si existen
}

export type AllProducts = AllProductsStructure | null;
