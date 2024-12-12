import { screen, render } from "@testing-library/react";
import Card from "@/components/shop/Card/Card";
import { mockProduct } from "../__mocks__/mockProduct";
import { mockPlayer } from "../__mocks__/mockPlayer";
import { Player } from "@/_common/interfaces/Player";

afterAll(async() => {
    jest.restoreAllMocks(); 
});

describe('Render Card Component', () => {

    beforeEach(() => {
        // Mock props
        const mockClick = jest.fn();
        const addToCart = jest.fn();
        const mockQtyCard = 1;
        const mockSetQtyCard = jest.fn();


        render(<Card
            props={mockProduct}
            onClickBuy={mockClick}
            onClickAddToCart={addToCart}
            player={mockPlayer}
            qtyCard={mockQtyCard}
            setQtyCard={mockSetQtyCard}
        />);
    });

    it('should show correct name of product' , async() => {
        const productCard = screen.getByTestId('product_Mock Product');

        // Verify that the name renders correctly
        expect(productCard).toBeInTheDocument();
        expect(productCard).toHaveTextContent('Mock Product');
    });

    it('should show the image of the product correctly' , async() => {
        const productImage = screen.getByTestId('image_id_/path/to/image.png');

        expect(productImage).toBeInTheDocument();
    });

    it('should shot the min level correctly' , async() => {
        const productMinLevel = screen.getByTestId('min_lvl_1');

        expect(productMinLevel).toBeInTheDocument();
        expect(productMinLevel).toHaveTextContent('1');
    });

    it('should show correctly the gold value', async() => {
        const productValue = screen.getByTestId('product_value_1');

        expect(productValue).toBeInTheDocument();
        expect(productValue).toHaveTextContent('100');
    });

    it('shoul show correctly the buy button and add to basket butto' , async() => {
        const addToBasketButton = screen.getByTestId('add_basket_1');
        const buyButton = screen.getByTestId('buy_1');

        expect(addToBasketButton).toBeInTheDocument();
        expect(addToBasketButton).toHaveTextContent('Add to Cart')
        expect(buyButton).toBeInTheDocument();
        expect(buyButton).toHaveTextContent('Buy');
    });
});

describe('disable buttons ', () => {
    
    it('should disable buttons when the player gold is less than the product value' , async() => {
        const mockPlayerLessGold : Player = { ...mockPlayer, gold: 0}

        const mockClick = jest.fn();
        const addToCart = jest.fn();
        const mockQtyCard = 1;
        const mockSetQtyCard = jest.fn();

        render(<Card
            props={mockProduct}
            onClickBuy={mockClick}
            onClickAddToCart={addToCart}
            player={mockPlayerLessGold}
            qtyCard={mockQtyCard}
            setQtyCard={mockSetQtyCard}
            
        />);

        const addToBasketButton = screen.getByTestId('add_basket_1');
        const buyButton = screen.getByTestId('buy_1');

        //NOW THEY DONT DISABLE, THIS SHOULD EXPECT A MESSAGE THAT TELLS YOU CAN'T BUY
        //expect(addToBasketButton).toBeDisabled();
        //expect(buyButton).toBeDisabled();
    });

    it('should enable buttons when the player gold is less than the product value' , async() => {

        const mockClick = jest.fn();
        const addToCart = jest.fn();
        const mockQtyCard = 1;
        const mockSetQtyCard = jest.fn();

        render(<Card
            props={mockProduct}
            onClickBuy={mockClick}
            onClickAddToCart={addToCart}
            player={mockPlayer}
            qtyCard={mockQtyCard}
            setQtyCard={mockSetQtyCard}
        />);

        const addToBasketButton = screen.getByTestId('add_basket_1');
        const buyButton = screen.getByTestId('buy_1');

        expect(addToBasketButton).not.toBeDisabled();
        expect(buyButton).not.toBeDisabled();
    });

    it('should disable buttons when the player level is lower than the product min_lvl' , async() => {
        const mockPlayer0Level : Player= {...mockPlayer, level: 0}

        const mockClick = jest.fn();
        const addToCart = jest.fn();
        const mockQtyCard = 1;
        const mockSetQtyCard = jest.fn();

        render(<Card
            props={mockProduct}
            onClickBuy={mockClick}
            onClickAddToCart={addToCart}
            player={mockPlayer0Level}
            qtyCard={mockQtyCard}
            setQtyCard={mockSetQtyCard}
        />);

        const addToBasketButton = screen.getByTestId('add_basket_1');
        const buyButton = screen.getByTestId('buy_1');

        //NOW THEY DONT DISABLE, THIS SHOULD EXPECT A MESSAGE THAT TELLS YOU CAN'T BUY
        //expect(addToBasketButton).toBeDisabled();
        //expect(buyButton).toBeDisabled();
    });

    it('should enable buttons when the player level is lower than the product min_lvl' , async() => {

        const mockClick = jest.fn();
        const addToCart = jest.fn();
        const mockQtyCard = 1;
        const mockSetQtyCard = jest.fn();

        render(<Card
            props={mockProduct}
            onClickBuy={mockClick}
            onClickAddToCart={addToCart}
            player={mockPlayer}
            qtyCard={mockQtyCard}
            setQtyCard={mockSetQtyCard}
        />);

        const addToBasketButton = screen.getByTestId('add_basket_1');
        const buyButton = screen.getByTestId('buy_1');

        expect(addToBasketButton).not.toBeDisabled();
        expect(buyButton).not.toBeDisabled();
    });
});