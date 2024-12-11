import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardItem from '@/components/shop/CardItem';
import { Product } from '@/_common/interfaces/shop/Product';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct } from '../__mocks__/mockProduct';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';

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
