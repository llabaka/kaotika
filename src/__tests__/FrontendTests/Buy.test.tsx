import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cart from '@/components/shop/Cart';
import CardItem from '@/components/shop/CardItem';
import { Product } from '@/_common/interfaces/shop/Product';
import { Player } from '@/_common/interfaces/Player';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct, mockProduct2 } from '../__mocks__/mockProduct';
import calculateTotalPrice from '@/components/shop/helpers/CalculatePrice';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';

beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
    jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
  });

afterAll(async () => {
    jest.restoreAllMocks(); // Restaurar todos los mocks
  });

describe('Buy button functionality', () => {
    it('should open buying modal when clicking buy button', () => {

            ////////////////////////// ARRANGE //////////////////////////

        // Mock props
        const mockCartProducts: Product[] = []; // Empty array for initial state
        const mockSetCartProducts = jest.fn(); // Mocked setter function
        const mockOnClickBuy = jest.fn();
        const mockOnClick = jest.fn();
        const mockSetProduct = jest.fn();
        const mockSetPlayer = jest.fn();
        const mockSetHaveBuy = jest.fn();
        const mockSetShopTooltips = jest.fn;
    
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
            />
        );

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

        ////////////////////////// ACT //////////////////////////
    
        const buyingButton = screen.getByText('Buy');
        fireEvent.click(buyingButton);

        ////////////////////////// ASSERT //////////////////////////
        expect(screen.getByTestId('buying-modal')).toBeInTheDocument();
    });

});
