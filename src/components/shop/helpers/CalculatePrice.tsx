import { Product } from "@/_common/interfaces/shop/Product";


export default function calculateTotalPrice(cartProducts: Product[]){
    return cartProducts.reduce((total, product) => total + (product.value * product.quantity! || 0), 0);
}