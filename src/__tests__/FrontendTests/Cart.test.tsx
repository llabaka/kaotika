import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/shop/Cart';
import CardItem from '@/components/shop/CardItem';
import { Product } from '@/_common/interfaces/shop/Product';
import { Player } from '@/_common/interfaces/Player';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct, mockProduct2 } from '../__mocks__/mockProduct';
import calculateTotalPrice from '@/components/shop/helpers/CalculatePrice';

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
  });

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
        const mockSetShopTooltips = jest.fn();
        const mockSetQty = jest.fn();
    
        // Render the component
        render(
            <CardItem
                card={mockProduct}
                onClickBuy={mockOnClickBuy}
                setProduct={mockSetProduct}
                setCartProducts={mockSetCartProducts}
                cartProducts={mockCartProducts}
                player={mockPlayer}
                setShopTooltips={mockSetShopTooltips}
                setQty={mockSetQty}
            />
        );
    
        const addButton = screen.getByText('Add to Cart');
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
            const mockCartProducts = [mockProduct, mockProduct2];
            const mockSetCartProducts = jest.fn();
            
            const { rerender } = render(
                <Cart cartProducts={mockCartProducts} setCartProducts={mockSetCartProducts} />
            );

            // Check initial total price
            expect(screen.getByTestId('CartTotalPrice')).toHaveTextContent('250');

            // Click remove button to remove the product
            const removeButton = screen.getByTestId('RemoveItem1');
            fireEvent.click(removeButton);

            expect(mockSetCartProducts).toHaveBeenCalled(); 

            // Wait for the cart to update and price to reflect the removal
            await waitFor(() => {

            //expect(screen.getByText('Mock Product')).not.toBeInTheDocument();
            // Ensure that setCartProducts was called with a function that removes the product (empty array)
            const updateFunction = mockSetCartProducts.mock.calls[0][0];  // Get the update function
            const updatedCart = updateFunction(mockCartProducts);  // Call it with the mockCartProducts
            expect(updatedCart).toEqual([mockProduct2]);  // Ensure the result is an empty array after removal
            // Ensure total price is now 0 after removal    

            rerender(<Cart cartProducts={updatedCart} setCartProducts={mockSetCartProducts} />);
            const newTotal = calculateTotalPrice(updatedCart);


            expect(screen.getByTestId('CartTotalPrice')).toHaveTextContent(`${newTotal}`);
        });
    });
});
