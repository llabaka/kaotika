import { CardProps } from "@/_common/interfaces/shop/CardProps";

export default function calculateTotalPrice(cartProducts: CardProps[]){
    return cartProducts.reduce((total, product) => total + (product.value || 0), 0);
}