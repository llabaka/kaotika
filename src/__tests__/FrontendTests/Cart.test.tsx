import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/shop/Cart';
import CardItem from '@/components/shop/CardItem';
import { Product } from '@/_common/interfaces/shop/Product';
import { Player } from '@/_common/interfaces/Player';
import { mockPlayer } from '../__mocks__/mockPlayer';

test('renders correctly the Cart component', () => {
    // Mock props
    const mockCartProducts: Product[] = []; // Example: Empty array for initial state
    const mockSetCartProducts = jest.fn(); // Mocked setter function
    const mockOnClickBuy = jest.fn();
    const mockSetProduct = jest.fn();

    const mockProduct: Product = {
        _id: '1',
        name: 'Mock Product',
        type: 'armor',
        quantity: 0,
        value: 100,
        min_lvl: 1,
        image: '/path/to/image.png',
        description: 'Mock product description',
    };

        // Renderizar el componente
        render(
            <CardItem
                card={mockProduct}
                onClickBuy={mockOnClickBuy}
                setProduct={mockSetProduct}
                setCartProducts={mockSetCartProducts}
                cartProducts={mockCartProducts}
                player={mockPlayer}
            />
        );
    // Render the component
    render(<Cart cartProducts={mockCartProducts} setCartProducts={mockSetCartProducts} />);

    // Verify rendering
    expect(screen.getByTestId('Cart')).toBeInTheDocument();
});
