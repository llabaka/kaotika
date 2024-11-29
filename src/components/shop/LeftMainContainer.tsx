import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';
import PlayerStatsButtons from './PlayerStatsButtons';
import ButtonsSeparator from './ButtonsSeparator';
import EquipmentButtons from './EquipmentButtons';
import SellerSeparator from './SellerSeparator';

const LeftMainContainer = () => {
	return (
		<div className="flex flex-col justify-start items-center w-3/12 bg-black/85 p-4 rounded-md ml-1">

			{/* Shopping Icons */}
			<ShopIcons></ShopIcons>

			<div className="flex flex-col justify-center items-center w-8/12 border-2 border-white rounded-md text-white mt-4 h-80">
				Seller Image
			</div>

			{/* Seller Separator */}
			<SellerSeparator></SellerSeparator>

			{/* Player Stats Buttons */}
			<PlayerStatsButtons></PlayerStatsButtons>

			{/* Buttons Separator */}
			<ButtonsSeparator></ButtonsSeparator>

			{/* Equipment Buttons */}
			<EquipmentButtons></EquipmentButtons>
		</div>
	);
};

export default LeftMainContainer;