import MainNavigator from "./MainNavigator";

import ProductsContainer from "./ProductsContainer";
import React, { useEffect } from "react";
import { DISPLAY_SCREEN } from "@/constants/shopConstants";
import CartMainContainer from "./CartMainContainer";
import SellingHeaders from "./SellingHeaders";
import SellingContainer from "./SellingContainer";
import CartScreenMainTab from "./CartScreenMainTab";
import { Weapon } from "@/_common/interfaces/Weapon";
import RightContainerInterface from "@/_common/interfaces/shop/RightContainerInterface";

const RightMainContainer: React.FC<RightContainerInterface> = ({ products, displayingScreen, allProducts, setShowingProducts, cartProducts, setCartProducts, onClickBuy, setProduct, player, onClickSell, setPlayer, setSellingItem, sellingItem}) => {

	const cardMock: Weapon = {
		_id : "asdadw1219beu21as",
		min_lvl: 12,
		image: '/images/equipment/armors/jacket_1.png',
		modifiers: {
		  intelligence: 12,
		  dexterity: 12,
		  constitution: 20,
		  insanity: 43,
		  charisma: 23,
		  strength: 34
		},
		name: 'cardMock',
		description: 'Descripción prueba de carta lkasndjoasbdiuasd',
		value: 340,
		type: "weapon",
		isUnique: false,
		isActive: false,
		die_faces: 2,
		die_modifier: 1,
		die_num: 10,
		base_percentage: 12
	  };

	


	
	return (
		<div className="flex flex-col justify-start items-center w-9/12 bg-transparent p-1 rounded-md mr-2">
			{displayingScreen === DISPLAY_SCREEN.BUY ? (
				<>
					<MainNavigator 
						allProducts={allProducts}
						setShowingProducts={setShowingProducts} />
					<ProductsContainer products={products} onClickBuy={onClickBuy} setProduct={setProduct} setCartProducts={setCartProducts} cartProducts={cartProducts} player={player}/>
				</>
			) : displayingScreen === DISPLAY_SCREEN.SELL ? (
				<>
					<SellingHeaders />
					<SellingContainer player={player} onClickSell={onClickSell} setProduct={setProduct} setSellingItem={setSellingItem} sellingItem={sellingItem}/>

				</>
			) : displayingScreen === DISPLAY_SCREEN.CART ? (
				<>
					<CartScreenMainTab/>
					<CartMainContainer cartProducts={cartProducts} setCartProducts={setCartProducts} player={player} setPlayer={setPlayer}/>
				</>
			) : null}
		</div>
	);
};

export default RightMainContainer;