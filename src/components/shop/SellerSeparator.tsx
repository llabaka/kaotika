import Image from 'next/image';

const SellerSeparator = () => {
	return (
		<div className="flex flex-col justify-center items-center w-11/12 mb-2">
			<div className="w-8/12 h-6 flex relative items-center justify-center">
				<Image
					src="/images/shop/SellerSeparator.png"
					alt="Imagen 1"
					fill
					sizes='(max-width: 374px) 100vw'
				/>
			</div>
		</div>
	)
}

export default SellerSeparator;