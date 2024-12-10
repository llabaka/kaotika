import { Product } from "@/_common/interfaces/shop/Product";

export const mockProduct: Product = {
    _id: '1',
    name: 'Mock Product',
    type: 'armor',
    quantity: 1,
    value: 100,
    min_lvl: 1,
    image: '/path/to/image.png',
    description: 'Mock product description',
};

export const mockProduct2: Product = {
    _id: '2',
    name: 'Mock Product 2',
    type: 'armor',
    quantity: 1,
    value: 150,
    min_lvl: 1,
    image: '/path/to/image2.png',
    description: 'Mock product description 2',
};