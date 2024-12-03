import Card from "./Card/Card";
import { CardProps } from "@/_common/interfaces/shop/CardProps";

import MainNavigator from "./MainNavigator";

import ProductsContainer from "./ProductsContainer";
import React from "react";
import { DISPLAY_SCREEN } from "@/constants/shopConstants";
import CartContainer from "./CartContainer";

interface RightContainerInterface {
	products: CardProps[];
	displayingScreen: Number;
}

const RightMainContainer: React.FC<RightContainerInterface> = ({ products, displayingScreen }) => {
	return (
		<div className="flex flex-col justify-start items-center w-9/12 bg-transparent p-1 rounded-md mr-2">
			{displayingScreen === DISPLAY_SCREEN.BUY ? (
				<>
					<MainNavigator />
					<ProductsContainer products={products} />
				</>
			) : displayingScreen === DISPLAY_SCREEN.SELL ? (
				<>
					<h2>Selling Screen</h2>
				</>
			) : displayingScreen === DISPLAY_SCREEN.CART ? (
				<>
					<CartContainer/>
				</>
			) : null}
		</div>
	);
};

export default RightMainContainer;
