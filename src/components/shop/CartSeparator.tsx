import Image from "next/image";

const CartSeparator = () => {
	return (
		<div className="h-[5%] w-[90%] text-xl mt-2 mb-2">
			<div className="relative w-full h-full">
				<Image
					src="/images/shop/CartSeparator2.png"
					alt="Separator"
					fill
					sizes='(max-width: 570px) 100vw'
				/>
			</div>
		</div>
	)

}

export default CartSeparator;