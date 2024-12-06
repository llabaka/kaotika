import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';
import PlayerStatsButtons from './PlayerStatsButtons';
import ButtonsSeparator from './ButtonsSeparator';
import EquipmentButtons from './EquipmentButtons';
import SellerSeparator from './SellerSeparator';
import Seller from './Seller';
import { Product } from '@/_common/interfaces/shop/Product';
import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import { Player } from '@/_common/interfaces/Player';

interface LeftMainContainerInterface {
    setDisplayingScreen: (loaded:number) => void;
	allProducts: AllProducts;
	showingProducts: Product[];
	player: Player
	setShowingProducts: (loaded: Product[]) => void;
}

const LeftMainContainer:React.FC<LeftMainContainerInterface> = ({setDisplayingScreen, allProducts, showingProducts, setShowingProducts, player})=> {

	return (
		<div className="flex flex-col justify-start items-center w-3/12 p-4 rounded-md">

			{/* Shopping Icons */}
			<ShopIcons setDisplayingScreen={setDisplayingScreen}/>

			{/* Seller Frame and Image */}
			<Seller/>

			{/* Seller Separator */}
			<SellerSeparator/>

			{/* Player Stats Buttons */}
			<PlayerStatsButtons player={player} />

			{/* Buttons Separator */}
			<ButtonsSeparator/>

			{/* Equipment Buttons */}
			<EquipmentButtons allProducts={allProducts} showingProducts={showingProducts} setShowingProducts={setShowingProducts}/>
		</div>
	);
};

export default LeftMainContainer;