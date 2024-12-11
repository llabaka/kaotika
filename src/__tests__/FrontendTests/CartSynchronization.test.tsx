import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartContainer from '@/components/shop/CartContainer';
import CartBuyButtonContainer from '@/components/shop/CartBuyButtonContainer';
import { Product } from '@/_common/interfaces/shop/Product';
import { mockProduct, mockProduct2 } from '../__mocks__/mockProduct';
import calculateTotalPrice from '@/components/shop/helpers/CalculatePrice';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { buyProductClient } from '@/components/shop/BuyingModal/buyProductClient';

beforeAll(() => {

  });

afterAll(async () => {
    jest.restoreAllMocks(); // Restaurar todos los mocks
  });

jest.mock('@/components/shop/BuyingModal/buyProductClient', () => ({
    buyProductClient: jest.fn(),
}));

describe('Cart integration testing', () => {
    it('should send a request with the list of the selected products and total value', async () => {

        const spy = jest.spyOn(require('@/components/shop/CartBuyButtonContainer'), 'updateBuyProducts');
        // Mock props
        const mockCartProducts: Product[] = [mockProduct, mockProduct2]; // Empty array for initial state
        const mockSetCartProducts = jest.fn(); // Mocked setter function
        const mockOnClickBuy = jest.fn();
        const mockSetPlayer = jest.fn();

        const mockBackendResponse = {
            ok: true,
            json: async () => ({
                data: { ...mockPlayer, gold: 3669 }, // Updated player
            }),
        };

        (buyProductClient as jest.Mock).mockResolvedValue(mockBackendResponse);

        // Render the Cart component with the updated cart
        render(<CartBuyButtonContainer cartProducts={mockCartProducts} setCartProducts={mockSetCartProducts} player={mockPlayer} setPlayer={mockSetPlayer}/>);

        // Verify button is rendered
        const buyButton = screen.getByTestId("BuyCartButton");
        expect(buyButton).toBeInTheDocument();

        // Simulate button click
        fireEvent.click(buyButton);
        
        // Wait for backend call and assertions
        await waitFor(() => {
            // Ensure backend is called with correct arguments
            expect(buyProductClient).toHaveBeenCalledWith(mockPlayer._id, [
                { productId: mockProduct._id, type: mockProduct.type },
                { productId: mockProduct2._id, type: mockProduct2.type },
            ]);

            // Ensure cart is emptied
            expect(mockSetCartProducts).toHaveBeenCalledWith([]);

            // Ensure player is updated
            expect(mockSetPlayer).toHaveBeenCalledWith({
                ...mockPlayer,
                gold: 3669, // Remaining gold
            });
        });
    });

    it('should not proceed with the purchase if player has insufficient gold', async () => {
        // Mock player with insufficient gold
        const mockPlayerWithoutGold = {
            ...mockPlayer,
            gold: 200, // Insufficient gold to cover 100 + 150 = 250
        };

        const mockCartProducts = [mockProduct, mockProduct2]; // Use provided mocks
        const mockSetCartProducts = jest.fn();
        const mockSetPlayer = jest.fn();

        // Render component
        render(
            <CartBuyButtonContainer
                cartProducts={mockCartProducts}
                setCartProducts={mockSetCartProducts}
                player={mockPlayerWithoutGold}
                setPlayer={mockSetPlayer}
            />
        );

        // Verify button is rendered
        const buyButton = screen.getByTestId('BuyCartButton');
        expect(buyButton).toBeInTheDocument();

        // Simulate button click
        fireEvent.click(buyButton);

        // Ensure backend is not called
        await waitFor(() => {
            expect(buyProductClient).not.toHaveBeenCalled();

            // Ensure cart is not emptied
            expect(mockSetCartProducts).not.toHaveBeenCalled();

            // Ensure player is not updated
            expect(mockSetPlayer).not.toHaveBeenCalled();
        });
    });

});
