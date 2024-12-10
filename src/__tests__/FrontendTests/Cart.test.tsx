import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/shop/Cart';
import CardItem from '@/components/shop/CardItem';
import { Product } from '@/_common/interfaces/shop/Product';
import { Player } from '@/_common/interfaces/Player';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct } from '../__mocks__/mockProduct';
import calculateTotalPrice from '@/components/shop/helpers/CalculatePrice';

afterAll(async () => {
    jest.restoreAllMocks(); // Restaurar todos los mocks
  });

describe('Add To Cart functionality', () => {
    it('calls setCartProducts with correct data when "Add Basket" button is clicked', async () => {
        // Mock props
        const mockCartProducts: Product[] = []; // Empty array for initial state
        const mockSetCartProducts = jest.fn(); // Mocked setter function
        const mockOnClickBuy = jest.fn();
        const mockSetProduct = jest.fn();
    
        // Render the component
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
    
        const addButton = screen.getByText('Add Basket');
        fireEvent.click(addButton);
    
        // Verify that the setCartProducts function is called with the updated cart
        const updatedCart = mockSetCartProducts.mock.calls[0][0](mockCartProducts);
        expect(updatedCart).toHaveLength(1); // Cart should have 1 product now
        expect(updatedCart[0]).toEqual({ ...mockProduct, quantity: 1 });
    
        // Render the Cart component with the updated cart
        render(<Cart cartProducts={updatedCart} setCartProducts={mockSetCartProducts} />);
    
        // Verify that the Cart component renders correctly
        expect(screen.getByTestId('Cart')).toBeInTheDocument();

        //Verify price total value
        const totalPriceElements = screen.getAllByTestId('CartTotalPrice');
        expect(totalPriceElements).toHaveLength(1);
        expect(totalPriceElements[0]).toHaveTextContent('100');
    });

    it('updates the total price when a product is removed from the cart', async () => {
           // Initial cart with one product
    const mockCartProducts = [{ ...mockProduct, quantity: 1 }];
    
    // Mock function for setting cart products
    const mockSetCartProducts = jest.fn();

    // Render the Cart component
    render(
        <Cart cartProducts={mockCartProducts} setCartProducts={mockSetCartProducts} />
    );

    // Verify that the total price is initially correct
    expect(screen.getByTestId('CartTotalPrice')).toHaveTextContent('100');

    // Simulate the "Remove" button click
    const removeButton = screen.getByTestId('RemoveItem');
    fireEvent.click(removeButton);

    // Now check that `setCartProducts` was called with a function (React's functional update)
    expect(mockSetCartProducts).toHaveBeenCalledWith(expect.any(Function));

    // Get the function passed to setCartProducts
    const updateCartFunction = mockSetCartProducts.mock.calls[0][0];

    // Simulate calling this function with the current state (cart with 1 product)
    const newState = updateCartFunction(mockCartProducts);

    // Now `newState` should be an empty array because we removed the product
    expect(newState).toEqual([]);  // This confirms the cart is empty

    // Use findByTestId to wait for the total price element to appear with the updated value
    const totalPriceElement = await screen.findByTestId('CartTotalPrice');

    // Check if the total price is now 0
    expect(totalPriceElement).toHaveTextContent('1000');
    });
});
