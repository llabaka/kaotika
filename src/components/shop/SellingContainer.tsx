import InventoryContainer from "./InventoryContainer";
import SellingItemContainer from "./SellingItemContainer";
import { SellingContainerInterface } from "@/_common/interfaces/shop/Selling";

const SellingContainer: React.FC<SellingContainerInterface> = ({ player, onClickSell, setProduct, setSellingItem, sellingItem, setSellingImage, sellingImage }) => {

	return (
		<div className="justify-center flex w-full h-[85%]">
			{/* Inventory Contaienr */}
			<InventoryContainer player={player} setSellingImage={setSellingImage} setSellingItem={setSellingItem} setProduct={setProduct} sellingItem={sellingItem} />

			{/* Empty Space */}
			<div className="flex-col w-[3%]"></div>

			{/* Selling Item Container */}
			<SellingItemContainer sellingImage={sellingImage} sellingItem={sellingItem} player={player} onClickSell={onClickSell} />
		</div>
	)
}

export default SellingContainer;