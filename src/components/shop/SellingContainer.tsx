import InventoryContainer from "./InventoryContainer";
import SellingItemContainer from "./SellingItemContainer";

const SellingContainer = () => {
    return(
    <div className="justify-center flex w-full h-full border-2 border-white">
        {/* Inventory Contaienr */}
        <InventoryContainer/>

        {/* Empty Space */}
        <div className="flex-col w-[3%]"></div>

        {/* Selling Item Container */}
        <SellingItemContainer/>
    </div>
    )
}

export default SellingContainer;