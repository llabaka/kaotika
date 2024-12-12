import Image from "next/image";

const ProductHorizontalSeparator = () => {

	return (
		<div className="text-gray-400 bg-transparent h-6 w-full text-sm text-center justify-center items-center">
			<div className="relative w-full h-full top-[10%]">
				<Image
					src="/images/shop/CartSeparator2.png"
					alt="HorizontalSeparator"
					fill
					className="z-0"
				/>
			</div>
		</div>)
}

export default ProductHorizontalSeparator;