import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct, mockProduct2 } from '../__mocks__/mockProduct';
import PlayerStatsButtons from '@/components/shop/PlayerStatsButtons';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';

global.fetch = jest.fn() as jest.Mock;

beforeEach(() => {
    (fetch as jest.Mock).mockClear(); // Clear previous mock data before each test
  });

afterAll(async () => {
    jest.restoreAllMocks(); // Restaurar todos los mocks
  });

  describe('should display the correct amount of gold', () => {
    it('when first entering the shop', async () => {

    ////////////////////////// ARRANGE //////////////////////////

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                data: { ...mockPlayer, gold: 3819 }, // Simulate updated player data
            }),
        });

    ////////////////////////// ACT //////////////////////////

        // Render the component
        render(
            <PlayerStatsButtons
                player={mockPlayer}
            />
        );

    ////////////////////////// ASSERT //////////////////////////

        // Verify that the PlayerStatsButtons component renders correctly
        expect(screen.getByTestId('PlayerGold')).toBeInTheDocument();
        expect(screen.getByTestId('PlayerGold')).toHaveTextContent('3919');
    });

    it('when buying a product', async () => {

         ////////////////////////// ARRANGE //////////////////////////

        const mockOnClick = jest.fn();
        const mockSetPlayer = jest.fn();
        const mockSetHaveBuy = jest.fn();
        const mockSetShopTooltips = jest.fn();

        ////////////////////////// ACT //////////////////////////

        // Render the BuyingModal component
        render(
            <BuyingModal
                product={mockProduct}
                onclick={mockOnClick}
                player={mockPlayer}
                setPlayer={mockSetPlayer}
                setHaveBuy={mockSetHaveBuy}
                setShopTooltips={mockSetShopTooltips}
            />
        );

        const buyButton = screen.getByTestId('BuyButton');
        fireEvent.click(buyButton);

        ////////////////////////// ASSERT //////////////////////////

        await waitFor(() => {
            expect(mockSetPlayer).toHaveBeenCalledWith(expect.objectContaining({ gold: 3819 }));
        });

        // Extract the updated player from the first call to mockSetPlayer
        const updatedPlayer = mockSetPlayer.mock.calls[0][0];

        // Check that the updatedPlayer has the correct gold value
        expect(updatedPlayer.gold).toBe(3819);

        // Rerender the PlayerStatsButtons component with the updated player
        render(
            <PlayerStatsButtons
                player={updatedPlayer}
            />
        );

        // Verify that the PlayerStatsButtons component renders correctly
        expect(screen.getByTestId('PlayerGold')).toBeInTheDocument();
        expect(screen.getByTestId('PlayerGold')).toHaveTextContent('3819');
    });
});