import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';
import PlayerStatsButtons from './PlayerStatsButtons';

const LeftMainContainer = () => {
	return (
		<div className="flex flex-col justify-start items-center w-3/12 bg-black/85 p-4 rounded-md ml-1">

			{/* Shopping Icons */}
			<ShopIcons></ShopIcons>

			<div className="flex flex-col justify-center items-center w-8/12 border-2 border-white rounded-md text-white mt-4 h-80">
				Seller Image
			</div>

			<div className="flex flex-col justify-center items-center w-11/12 border-2 border-white rounded-md text-white m-1">
				Separator Image
			</div>

			{/* Player Stats Buttons */}
			<PlayerStatsButtons></PlayerStatsButtons>

			<div className="flex flex-col justify-center items-center w-11/12 m-1">
				<div className="w-11/12 h-5 flex relative items-center justify-center">
					<Image
						src="/images/shop/ButtonsSeparator.png"
						alt="Imagen 1"
						layout="fill"
					/>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center w-10/12 border-2 border-white rounded-md text-white h-96">
				Object Type Buttons
			</div>

		</div>
	);
};

export default LeftMainContainer;