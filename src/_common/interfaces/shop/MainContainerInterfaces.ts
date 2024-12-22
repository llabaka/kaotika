import { AllProducts } from "./AllProducts";
import { Product } from "./Product";

export interface MainNavigatorInterface {
    allProducts: AllProducts;
    setShowingProducts: (loaded: Product[]) => void;
    selectedMainTab: number;
    setSelectedMainTab: (loaded: number) => void;
}