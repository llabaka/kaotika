import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import Image from 'next/image';

const LeftMainContainer = () => {
	return (
		<div className="flex flex-col justify-start items-center w-3/12 bg-black/85 p-4 rounded-md ml-1">

			<div className="flex flex-col justify-center items-center w-6/12 rounded-md">
				<ShopIcons></ShopIcons>
			</div>

			<div className="flex flex-col justify-center items-center w-8/12 border-2 border-white rounded-md text-white mt-4 h-80">
				Seller Image
			</div>

			<div className="flex flex-col justify-center items-center w-11/12 border-2 border-white rounded-md text-white">
				Separator Image
			</div>

			<div className="flex flex-col justify-center items-center w-10/12 border-2 border-white rounded-md text-white h-32">
				<div className="flex justify-around">
					{/* First Image */}	
					<div className="w-40 h-12 flex relative">
						<Image
							src="/images/shop/ManagePlayerButton.png"
							alt="Imagen 1"
							layout="fill"
						/>
					</div>
					{/* Second Image */}
					<img src="https://via.placeholder.com/50" alt="Imagen 2" className="w-12 h-12 rounded-md"/>
				</div>

				<img src="https://via.placeholder.com/50" alt="Imagen 3" className="w-12 h-12 rounded-md"/>
			</div>

			<div className="flex flex-col justify-center items-center w-11/12 border-2 border-white rounded-md text-white">
				Separator Image2
			</div>

			<div className="flex flex-col justify-center items-center w-10/12 border-2 border-white rounded-md text-white h-96">
				Object Type Buttons
			</div>

		</div>
	);
};

export default LeftMainContainer;