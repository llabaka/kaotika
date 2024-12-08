import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/shop/Cart';
import { Product } from '@/_common/interfaces/shop/Product';

test('renders correctly the Cart component', () => {
    // Mock props
    const mockCartProducts: Product[] = []; // Example: Empty array for initial state
    const mockSetCartProducts = jest.fn(); // Mocked setter function

    // Render the component
    render(<Cart cartProducts={mockCartProducts} setCartProducts={mockSetCartProducts} />);

    // Verify rendering
    expect(screen.getByTestId('Cart')).toBeInTheDocument();
});
