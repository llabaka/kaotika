import { Player } from "@/_common/interfaces/Player";
import InventoryContainer from "./InventoryContainer";
import SellingItemContainer from "./SellingItemContainer";

interface SellingContainerInterface {
	player: Player;
}

const SellingContainer: React.FC<SellingContainerInterface> = ({ player }) => {
    return(
    <div className="justify-center flex w-full h-full border-2 border-white">
        {/* Inventory Contaienr */}
        <InventoryContainer player={player}/>

        {/* Empty Space */}
        <div className="flex-col w-[3%]"></div>

        {/* Selling Item Container */}
        <SellingItemContainer/>
    </div>
    )
}

export default SellingContainer;