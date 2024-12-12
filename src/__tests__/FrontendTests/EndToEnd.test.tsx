import { fireEvent, render, screen } from "@testing-library/react";
import Cart from "@/components/shop/Cart";
import Card from "@/components/shop/Card/Card";
import { mockPlayer } from "../__mocks__/mockPlayer";
import { mockProduct, mockProduct2 } from "../__mocks__/mockProduct";
import CartBuyButtonContainer from "@/components/shop/CartBuyButtonContainer";
import PlayerStatsButtons from "@/components/shop/PlayerStatsButtons";
import BuyingModal from "@/components/shop/BuyingModal/BuyingModal";
import CardLeftContainer from "@/components/shop/Card/Components/CardLeftContainer";
import ShopTooltip from "@/components/tooltips/ShopTooltip";

global.fetch = jest.fn() as jest.Mock;


describe('complete buy flux', () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
            data: { ...mockPlayer, gold: 3669 }, // Simulate updated player data
        }),
    });

    afterAll(async () => {
        jest.restoreAllMocks(); // Restaurar todos los mocks
    });

    it('The user selects various products, adds them to the cart, and completes the purchase', () => {

        const mockSetCartProducts = jest.fn();
        const mockSetPlayer = jest.fn();

        const mockClick = jest.fn();
        const addToCart = jest.fn();

        const mockQtyCard = 1;
        const mockSetQtyCard = jest.fn();

        // Render two Card components
        render(
            <>
                <Card
                    props={mockProduct}
                    onClickBuy={mockClick}
                    onClickAddToCart={addToCart}
                    player={mockPlayer}
                    setQtyCard={mockSetQtyCard}
                    qtyCard={mockQtyCard}
                />
                <Card
                    props={mockProduct2}
                    onClickBuy={mockClick}
                    onClickAddToCart={addToCart}
                    player={mockPlayer}
                    setQtyCard={mockSetQtyCard}
                    qtyCard={mockQtyCard}
                />
            </>
        );
        // Simulate adding products to the cart
        const addToCartItem1 = screen.getByTestId('add_basket_1');
        const addToCartItem2 = screen.getByTestId('add_basket_2');

        fireEvent.click(addToCartItem1);
        fireEvent.click(addToCartItem2);

        // Verify the addToCart mock function was called
        expect(addToCart).toHaveBeenCalledTimes(2);

        // Render Cart component
        const cartProducts = [mockProduct, mockProduct2];
        render(
            <Cart
                cartProducts={cartProducts}
                setCartProducts={mockSetCartProducts}
            />
        );

        // Verify products are in the cart
        const itemInCart1 = screen.getByTestId('cart_item_1');
        const itemInCart2 = screen.getByTestId('cart_item_2');
        expect(itemInCart1).toBeInTheDocument();
        expect(itemInCart2).toBeInTheDocument();

        const mockSetShopTooltips = jest.fn();
        // Render CartBuyButtonContainer
        render(
            <CartBuyButtonContainer
                cartProducts={cartProducts}
                setCartProducts={mockSetCartProducts}
                setPlayer={mockSetPlayer}
                player={mockPlayer}
                setShopTooltips={mockSetShopTooltips}
            />
        );

        // Simulate buying all products
        const buyAllProductsFromCart = screen.getByTestId('CartBuyButton'); // Ensure this ID exists in the component
        fireEvent.click(buyAllProductsFromCart);


        const updatedPlayer = {
            ...mockPlayer,
            gold: 3669
        };

        mockSetPlayer(updatedPlayer);

        render(<PlayerStatsButtons
            player={updatedPlayer}
        />);

        const playerGold = screen.getByTestId('PlayerGold');
        expect(playerGold).toHaveTextContent('3669');
    });

    it('simulates less gold conditions for buy', async () => {
        const addToCart = jest.fn();
        const mockClickBuy = jest.fn();
        const onclick = jest.fn();
        const mockSetShopTooltips = jest.fn();
        const mockSetPlayer = jest.fn();
        const mockSetHaveBuy = jest.fn();
    
        const lessGoldPlayer = { ...mockPlayer, gold: 0 };
    
        // Render the Card component
        render(
            <CardLeftContainer
                min_lvl={mockProduct.min_lvl!}
                value={mockProduct.value!}
                image={mockProduct.image!}
                name={mockProduct.name!}
                description={mockProduct.description!}
                onClickBuy={mockClickBuy}
                player={lessGoldPlayer}
                onClickAddToCart={addToCart}
                _id={mockProduct._id!}
            />
        );
    
        // Simulate click event
        const buyButton = screen.getByTestId('buy_1');
        expect(buyButton).toBeInTheDocument();
        fireEvent.click(buyButton);
    
        // Assert the addToCart function is called
        expect(mockClickBuy).toHaveBeenCalled();
    
        // Render the BuyingModal
        render(
            <BuyingModal
                product={mockProduct}
                onclick={onclick}
                player={lessGoldPlayer}
                setHaveBuy={mockSetHaveBuy}
                setPlayer={mockSetPlayer}
                setShopTooltips={mockSetShopTooltips}
                qty={1}
            />
        );
        
        const buyingModal = screen.getByTestId('buying-modal');
        expect(buyingModal).toBeInTheDocument();

        const confirmButtonModal = screen.getByTestId('ConfirmButton');
        fireEvent.click(confirmButtonModal);

        render(<ShopTooltip
                image="/fake/image"
                action="error"
                itemName="fake item"
            />)

        const renderShopTooltip = screen.getByTestId('ShopTooltip');
        expect(renderShopTooltip).toBeInTheDocument();
    });
});
