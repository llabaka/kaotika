import { Product} from "./Product";

export default interface CartProductsInterface {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export interface CartItemsInterface {
    cartProducts: Product[];
    setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>
    handleRemoveItem: any;
    handleUpdateQuantity: any;
}