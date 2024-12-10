import { Product } from "@/_common/interfaces/shop/Product";

export const handleAddToCart = (card: Product, cartProducts: Product[], setCartProducts: React.Dispatch<React.SetStateAction<Product[]>>) => {
    const isProductInCart = cartProducts.some(product => product._id === card._id);

    if (!isProductInCart) {
        // Si el producto no está en el carrito, agregarlo con quantity 1
        setCartProducts((prevCartProducts: Product[] | []) => [
            ...prevCartProducts,
            { ...card, quantity: 1 }
        ]);
    } else {
        // Si el producto ya existe, actualizar su cantidad (si no tiene el atributo quantity, añadirlo)
        if(card.type === "ingredient") {
            setCartProducts((prevCartProducts: Product[] | []) =>
                prevCartProducts.map((product) =>
                    product._id === card._id
                        ? { ...product, quantity: product.quantity ? product.quantity + 1 : 1 }
                        : product
                )
            );
        }
    }
};
