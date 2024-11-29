import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';
import PlayerStatsButtons from './PlayerStatsButtons';
import ButtonsSeparator from './ButtonsSeparator';

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

			{/* Buttons Separator */}
			<ButtonsSeparator></ButtonsSeparator>

			{/* Equipment Buttons */}
			<div className="flex flex-col justify-center items-center w-10/12 rounded-m h-96">
				<button className="w-full h-16 flex relative items-center justify-center mb-4">
					<Image
						src="/images/shop/ManagePlayerButton.png"
						alt="Imagen 1"
						layout="fill"
					/>
					<span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">WEAPON</span>
				</button>
				<button className="w-full h-16 flex relative items-center justify-center mb-4">
					<Image
						src="/images/shop/ManagePlayerButton.png"
						alt="Imagen 1"
						layout="fill"
					/>
					<span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">ARMORS</span>
				</button>
				<button className="w-full h-16 flex relative items-center justify-center mb-4">
					<Image
						src="/images/shop/ManagePlayerButton.png"
						alt="Imagen 1"
						layout="fill"
					/>
					<span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">BOOTS</span>
				</button>
				<button className="w-full h-16 flex relative items-center justify-center mb-4">
					<Image
						src="/images/shop/ManagePlayerButton.png"
						alt="Imagen 1"
						layout="fill"
					/>
					<span className="z-10 text-orange-400 text-2xl hover:text-orange-200 transition">HELMETS</span>
				</button>
			</div>
		</div>
	);
};

export default LeftMainContainer;