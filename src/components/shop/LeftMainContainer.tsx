import { Player } from '@/_common/interfaces/Player';
import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import { Product } from '@/_common/interfaces/shop/CardProps';
import 'boxicons/css/boxicons.min.css';
import ButtonsSeparator from './ButtonsSeparator';
import EquipmentButtons from './EquipmentButtons';
import PlayerStatsButtons from './PlayerStatsButtons';
import Seller from './Seller';
import SellerSeparator from './SellerSeparator';
import ShopIcons from './ShopIcons';

interface LeftMainContainerInterface {
    setDisplayingScreen: (loaded:number) => void;
	allProducts: AllProducts;
	showingProducts: Product[];
	setShowingProducts: (loaded: Product[]) => void;
	player: Player
}

const LeftMainContainer:React.FC<LeftMainContainerInterface> = ({setDisplayingScreen, allProducts, showingProducts, setShowingProducts, player})=> {

	console.log(player);

	return (
		<div className="flex flex-col justify-start items-center w-3/12 p-4 rounded-md">

			{/* Shopping Icons */}
			<ShopIcons setDisplayingScreen={setDisplayingScreen} />

			{/* Seller Frame and Image */}
			<Seller></Seller>

			{/* Seller Separator */}
			<SellerSeparator></SellerSeparator>

			{/* Player Stats Buttons */}
			<PlayerStatsButtons player={player} />

			{/* Buttons Separator */}
			<ButtonsSeparator></ButtonsSeparator>

			{/* Equipment Buttons */}
			<EquipmentButtons allProducts={allProducts} showingProducts={showingProducts} setShowingProducts={setShowingProducts}></EquipmentButtons>
		</div>
	);
};

export default LeftMainContainer;