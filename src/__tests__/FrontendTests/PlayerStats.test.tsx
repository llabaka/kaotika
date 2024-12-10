import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/shop/Cart';
import CardItem from '@/components/shop/CardItem';
import { Product } from '@/_common/interfaces/shop/Product';
import { Player } from '@/_common/interfaces/Player';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct, mockProduct2 } from '../__mocks__/mockProduct';
import calculateTotalPrice from '@/components/shop/helpers/CalculatePrice';
import PlayerStatsButtons from '@/components/shop/PlayerStatsButtons';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';

afterAll(async () => {
    jest.restoreAllMocks(); // Restaurar todos los mocks
  });

describe('Player Gold amount', () => {
    it('shows the correct gold amount', async () => {

        const mockOnClick = jest.fn();
        const mockSetPlayer = jest.fn();
        const mockSetHaveBuy = jest.fn();
        const mockSetShopTooltips = jest.fn();

        // Render the component
        render(
            <PlayerStatsButtons
                player={mockPlayer}
            />
        );
    
        // Verify that the Cart component renders correctly
        expect(screen.getByTestId('PlayerGold')).toBeInTheDocument();
        expect(screen.getByTestId('PlayerGold')).toHaveTextContent('3919');

        render(
            <BuyingModal
                product={mockProduct}
                onclick={mockOnClick}
                player={mockPlayer}
                setPlayer={mockSetPlayer}
                setHaveBuy={mockSetHaveBuy}
                setShopTooltips={mockSetShopTooltips}
            />
        )

        const buyButton = screen.getByTestId('BuyButton');
        expect(buyButton).toBeInTheDocument();

        fireEvent.click(buyButton);

        

    });
});
