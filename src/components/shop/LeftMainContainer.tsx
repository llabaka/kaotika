const LeftMainContainer = () => {
	return (
		<div className="flex flex-col justify-start items-center w-3/12 bg-black/85 p-4 rounded-md ml-1">

			<div className="flex flex-col justify-center items-center w-6/12 border-2 border-white rounded-md text-white">
				<div className="flex justify-around w-full">
					<button className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-gray-400 transition">
						<img src="https://via.placeholder.com/32" alt="Icon 1" className="w-8 h-8" />
					</button>
					<button className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-gray-400 transition">
						<img src="https://via.placeholder.com/32" alt="Icon 2" className="w-8 h-8" />
					</button>
					<button className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-gray-400 transition">
						<img src="https://via.placeholder.com/32" alt="Icon 3" className="w-8 h-8" />
					</button>
				</div>
			</div>

			<div className="flex flex-col justify-center items-center w-8/12 border-2 border-white rounded-md text-white mt-4 h-80">
				Seller Image
			</div>

			<div className="flex flex-col justify-center items-center w-11/12 border-2 border-white rounded-md text-white">
				Separator Image
			</div>

			<div className="flex flex-col justify-center items-center w-10/12 border-2 border-white rounded-md text-white h-32">
				Player Info Buttons
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