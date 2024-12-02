import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';
import PlayerStatsButtons from './PlayerStatsButtons';
import ButtonsSeparator from './ButtonsSeparator';
import EquipmentButtons from './EquipmentButtons';
import SellerSeparator from './SellerSeparator';

const LeftMainContainer = () => {
	return (
		<div className="flex flex-col justify-start items-center w-3/12 bg-black/85 p-4 rounded-md">

			{/* Shopping Icons */}
			<ShopIcons></ShopIcons>

			{/* Seller Frame and Image */}
			<div className="flex-col w-10/12 mt-4 h-96">

				<div className="flex w-full h-full relative">
					<Image
						src="/images/shop/SellerFrame.png"
						alt="Imagen 1"
						layout="fill"
					/>
				</div>
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