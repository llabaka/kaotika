import MainNavigator from "./MainNavigator";
import ProductsContainer from "./ProductsContainer";
import React from "react";
import { DISPLAY_SCREEN } from "@/constants/shopConstants";
import CartMainContainer from "./CartMainContainer";
import SellingHeaders from "./SellingHeaders";
import SellingContainer from "./SellingContainer";
import CartScreenMainTab from "./CartScreenMainTab";
import RightContainerInterface from "@/_common/interfaces/shop/RightContainerInterface";

const RightMainContainer: React.FC<RightContainerInterface> = ({ products, displayingScreen, allProducts, setShowingProducts, cartProducts, setCartProducts, onClickBuy, setProduct, player, onClickSell, setPlayer, setSellingItem, sellingItem, setSellingImage, sellingImage, setShopTooltips}) => {

	return (
		<div className="flex flex-col justify-start items-center w-9/12 bg-transparent p-1 rounded-md mr-2">
			{displayingScreen === DISPLAY_SCREEN.BUY ? (
				<>
					<MainNavigator 
						allProducts={allProducts}
						setShowingProducts={setShowingProducts} />
					<ProductsContainer products={products} onClickBuy={onClickBuy} setProduct={setProduct} setCartProducts={setCartProducts} cartProducts={cartProducts} player={player} setShopTooltips={setShopTooltips}/>
				</>
			) : displayingScreen === DISPLAY_SCREEN.SELL ? (
				<>
					<SellingHeaders />
					<SellingContainer player={player} onClickSell={onClickSell} setProduct={setProduct} setSellingItem={setSellingItem} sellingItem={sellingItem} setSellingImage={setSellingImage} sellingImage={sellingImage}/>
				</>
			) : displayingScreen === DISPLAY_SCREEN.CART ? (
				<>
					<CartScreenMainTab/>
					<CartMainContainer cartProducts={cartProducts} setCartProducts={setCartProducts} player={player} setPlayer={setPlayer} setShopTooltips={setShopTooltips}/>
				</>
			) : null}
		</div>
	);
};

export default RightMainContainer;