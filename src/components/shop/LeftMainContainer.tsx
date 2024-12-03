import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';
import PlayerStatsButtons from './PlayerStatsButtons';
import ButtonsSeparator from './ButtonsSeparator';
import EquipmentButtons from './EquipmentButtons';
import SellerSeparator from './SellerSeparator';
import Seller from './Seller';
import player from '../../data/player.json'

interface LeftMainContainerInterface {
    setDisplayingScreen: (loaded:number) => void;
}

const LeftMainContainer:React.FC<LeftMainContainerInterface> = ({setDisplayingScreen})=> {

	const mockPlayer = player;

	return (
		<div className="flex flex-col justify-start items-center w-3/12 p-4 rounded-md">

			{/* Shopping Icons */}
			<ShopIcons setDisplayingScreen={setDisplayingScreen} />

			{/* Seller Frame and Image */}
			<Seller></Seller>

			{/* Seller Separator */}
			<SellerSeparator></SellerSeparator>

			{/* Player Stats Buttons */}
			<PlayerStatsButtons player={mockPlayer} />

			{/* Buttons Separator */}
			<ButtonsSeparator></ButtonsSeparator>

			{/* Equipment Buttons */}
			<EquipmentButtons></EquipmentButtons>
		</div>
	);
};

export default LeftMainContainer;