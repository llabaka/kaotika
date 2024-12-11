import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartContainer from '@/components/shop/CartContainer';
import CartBuyButtonContainer from '@/components/shop/CartBuyButtonContainer';
import { Product } from '@/_common/interfaces/shop/Product';
import { mockProduct, mockProduct2 } from '../__mocks__/mockProduct';
import calculateTotalPrice from '@/components/shop/helpers/CalculatePrice';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { buyProductClient } from '@/components/shop/BuyingModal/buyProductClient';

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(async () => {
    jest.restoreAllMocks(); // Restaurar todos los mocks
  });

  jest.mock('@/components/shop/BuyingModal/buyProductClient', () => ({
    buyProductClient: jest.fn((playerId, products) => {
        console.log('Mock buyProductClient called with:', playerId, products);
        return Promise.resolve({
            ok: true,
            json: async () => ({ data: { ...mockPlayer, gold: 3669 } }),
        });
    }),
}));

describe('Cart integration testing', () => {
    it('should send a request with the list of the selected products and total value', async () => {

        ////////////////////////// ARRANGE //////////////////////////

        // Mock props
        const mockCartProducts: Product[] = [mockProduct, mockProduct2]; // Empty array for initial state
        const mockSetCartProducts = jest.fn(); // Mocked setter function
        const mockSetPlayer = jest.fn();

        const mockBackendResponse = {
            ok: true,
            json: async () => ({
                data: { ...mockPlayer, gold: 3669 }, // Updated player
            }),
        };

        (buyProductClient as jest.Mock).mockResolvedValue(mockBackendResponse);

        ////////////////////////// ACT //////////////////////////

        // Render the CartContainer component
        render(<CartContainer cartProducts={mockCartProducts} setCartProducts={mockSetCartProducts} player={mockPlayer} setPlayer={mockSetPlayer}/>);

        // Verify button is rendered
        const buyButton = screen.getByTestId("CartBuyButton");
        expect(buyButton).toBeInTheDocument();

        // Simulate button click
        fireEvent.click(buyButton);

        ////////////////////////// ASSERT //////////////////////////
        
        // Wait for backend call
        await waitFor(() => {
            // Ensure that the backend is called with correct arguments
            expect(buyProductClient).toHaveBeenCalledWith(mockPlayer._id, [
                { productId: mockProduct._id, type: mockProduct.type },
                { productId: mockProduct2._id, type: mockProduct2.type },
            ]);

            // Ensure cart is empty
            expect(mockSetCartProducts).toHaveBeenCalledWith([]);

            // Ensure player is updated
            expect(mockSetPlayer).toHaveBeenCalledWith({
                ...mockPlayer,
                gold: 3669, // Remaining gold
            });
        });
    });

    it('should not proceed with the purchase if player has insufficient gold', async () => {

        ////////////////////////// ARRANGE //////////////////////////

        const mockPlayerWithoutGold = {
            ...mockPlayer,
            gold: 200, // Set not enough gold to make the purchase
        };
    
        const mockCartProducts: Product[] = [mockProduct, mockProduct2]; // Total = 250
    
        const mockSetCartProducts = jest.fn();
        const mockSetPlayer = jest.fn();
    
        ////////////////////////// ACT //////////////////////////

        render(
            <CartContainer
                cartProducts={mockCartProducts}
                setCartProducts={mockSetCartProducts}
                player={mockPlayerWithoutGold}
                setPlayer={mockSetPlayer}
            />
        );
    
        const buyButton = screen.getByTestId('CartBuyButton');
        fireEvent.click(buyButton);
    
        ////////////////////////// ASSERT //////////////////////////

        await waitFor(() => {
            // Verificar que no se llama al backend
            expect(buyProductClient).not.toHaveBeenCalled();
    
            // Verificar que no se vacía el carrito
            expect(mockSetCartProducts).not.toHaveBeenCalled();
    
            // Verificar que no se actualiza el jugador
            expect(mockSetPlayer).not.toHaveBeenCalled();
        });
    });

});
