import { Product } from "@/_common/interfaces/shop/Product";

export const mockProduct: Product = {
    _id: '1',
    name: 'Mock Product',
    type: 'armor',
    quantity: 0,
    value: 100,
    min_lvl: 1,
    image: '/path/to/image.png',
    description: 'Mock product description',
};