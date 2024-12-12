import { Product } from '@/_common/interfaces/shop/Product';
import BuyingModal from '@/components/shop/BuyingModal/BuyingModal';
import CardItem from '@/components/shop/CardItem';
import ShopTooltip from '@/components/tooltips/ShopTooltip';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { mockPlayer } from '../__mocks__/mockPlayer';
import { mockProduct } from '../__mocks__/mockProduct';
import { mockShopTooltip } from '../__mocks__/mockShopTooltip';
import PlayerStatsButtons from '@/components/shop/PlayerStatsButtons';

beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {}); // Silence console logs
  jest.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
  jest.spyOn(console, 'warn').mockImplementation(() => {}); // Silence console warnings
});

global.fetch = jest.fn() as jest.Mock;

beforeEach(() => {
  (fetch as jest.Mock).mockClear(); // Clear previous mock data before each test
});

afterAll(async () => {
  jest.restoreAllMocks(); // Restaurar todos los mocks
});

describe('Buy button functionality', () => {
  it('should open buying modal when clicking buy button', () => {

    ////////////////////////// ARRANGE //////////////////////////

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        data: { ...mockPlayer, gold: 3819 }, // Simulate updated player data
      }),
    });

    // Mock props
    const mockCartProducts: Product[] = []; // Empty array for initial state
    const mockSetCartProducts = jest.fn(); // Mocked setter function
    const mockOnClickBuy = jest.fn();
    const mockOnClick = jest.fn();
    const mockSetProduct = jest.fn();
    const mockSetPlayer = jest.fn();
    const mockSetHaveBuy = jest.fn();
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

    // Render the BuyingModal component
    render(
      <BuyingModal
        product={mockProduct}
        onclick={mockOnClick}
        player={mockPlayer}
        setPlayer={mockSetPlayer}
        setHaveBuy={mockSetHaveBuy}
        setShopTooltips={mockSetShopTooltips}
        qty={1}
      />
    );

    ////////////////////////// ACT //////////////////////////

    //  Control button display
    if (mockPlayer.gold >= mockProduct.value) {
      expect(screen.getByTestId('buy_1')).toBeInTheDocument();
    } else {
      expect(screen.getByTestId('buy_1')).not.toBeInTheDocument();
    }

    const buyingButton = screen.getByText('Buy');
    fireEvent.click(buyingButton);

    ////////////////////////// ASSERT //////////////////////////
    expect(screen.getByTestId('buying-modal')).toBeInTheDocument();
    expect(screen.getByTestId('ConfirmButton')).toBeInTheDocument();
  });

  it('should show item bought message when clicking confirm button', () => {

    // Mock props
    const mockOnClick = jest.fn();
    const mockSetPlayer = jest.fn();
    const mockSetHaveBuy = jest.fn();
    const mockSetShopTooltips = jest.fn();
    const mockIndex = 1;

    // Render the BuyingModal component
    render(
      <BuyingModal
        product={mockProduct}
        onclick={mockOnClick}
        player={mockPlayer}
        setPlayer={mockSetPlayer}
        setHaveBuy={mockSetHaveBuy}
        setShopTooltips={mockSetShopTooltips}
        qty={1}
      />
    );

    //Render tooltip
    render(
      <ShopTooltip
        image={mockShopTooltip.image}
        itemName={mockShopTooltip.itemName}
        key={mockIndex}
        action={mockShopTooltip.action}
      />
    );

    const confirmButton = screen.getByTestId('ConfirmButton');
    fireEvent.click(confirmButton);

    expect(screen.getByTestId('ShopTooltip')).toBeInTheDocument();
    expect(screen.getByTestId('ShopTooltip')).toHaveTextContent('You have bought Knife !!');
  })

  it('should show updated gold from player in screen', async () => {

    ////////////////////////// ARRANGE //////////////////////////

    // Mock state and setState for the player
    let player = { ...mockPlayer };

    const mockSetPlayer = jest.fn((newPlayer) => {
      player = newPlayer;
    });

    const { rerender } =
      render(
        <PlayerStatsButtons player={player} />
      );

    ////////////////////////// ACT //////////////////////////

    // Simulate incoming gold is changed because buying and set to player
    const updatedPlayer = { ...mockPlayer, gold: 3819 };
    mockSetPlayer(updatedPlayer);

    // Re-render the component with updated player
    rerender(<PlayerStatsButtons player={updatedPlayer} />);

    ////////////////////////// ASSERT //////////////////////////

    // Verify the updated gold is displayed
    expect(screen.getByTestId('PlayerGold')).toBeInTheDocument();
    expect(screen.getByTestId('PlayerGold')).toHaveTextContent('3819');
  });
});