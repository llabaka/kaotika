import { Product} from "./Product";

export default interface CartProductsInterface {
    cartProducts: Product[];
	setCartProducts: any;
}

export interface CartItemsInterface {
    cartProducts: Product[];
	setCartProducts: any;
    handleRemoveItem: any;
    handleUpdateQuantity: any;
}