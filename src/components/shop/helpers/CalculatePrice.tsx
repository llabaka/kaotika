import { CardProps, CartItem } from "@/_common/interfaces/shop/CardProps";

export default function calculateTotalPrice(cartProducts: CartItem[]){
    return cartProducts.reduce((total, product) => total + (product.value || 0), 0);
}