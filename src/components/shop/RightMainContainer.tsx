import Card from "./Card/Card";
import { CardProps } from "@/_common/interfaces/shop/CardProps";

import MainNavigator from "./MainNavigator";

import ProductsContainer from "./ProductsContainer";
import React from "react";

interface RightContainerInterface {
	products: CardProps[];
}

const RightMainContainer:React.FC<RightContainerInterface> = ({products}) => {

	return (
        <div className="flex flex-col justify-start items-center w-9/12 bg-transparent p-1 rounded-md mr-2">
			<MainNavigator/>
			<ProductsContainer/>
		</div>
	);
};

export default RightMainContainer;
