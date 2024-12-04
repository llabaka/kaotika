import { CardProps, Product } from "@/_common/interfaces/shop/CardProps";

export default function calculateTotalPrice(cartProducts: Product[]){
    return cartProducts.reduce((total, product) => total + (product.value || 0), 0);
}