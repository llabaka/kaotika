import Card from "./Card/Card";
import { CardProps } from "@/_common/interfaces/shop/CardProps";

import MainNavigator from "./MainNavigator";

import ProductsContainer from "./ProductsContainer";
import React from "react";

interface RightContainerInterface {
	products: CardProps[];
	displayingScreen: Number;
}

const RightMainContainer:React.FC<RightContainerInterface> = ({products, displayingScreen}) => {

	return (
        <div className="flex flex-col justify-start items-center w-9/12 bg-transparent p-1 rounded-md mr-2">
			<MainNavigator/>
			<ProductsContainer products={products}/>
		</div>
	);
};

export default RightMainContainer;