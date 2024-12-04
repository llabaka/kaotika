import { Player } from "@/_common/interfaces/Player";
import InventoryContainer from "./InventoryContainer";
import SellingItemContainer from "./SellingItemContainer";
import { useState } from "react";

interface SellingContainerInterface {
	player: Player;
}

const SellingContainer: React.FC<SellingContainerInterface> = ({ player }) => {

    const [sellingImage, setSellingImage] = useState("");

    return(
    <div className="justify-center flex w-full h-[85%]">
        {/* Inventory Contaienr */}
        <InventoryContainer player={player} setSellingImage={setSellingImage}/>

        {/* Empty Space */}
        <div className="flex-col w-[3%]"></div>

        {/* Selling Item Container */}
        <SellingItemContainer sellingImage={sellingImage}/>
    </div>
    )
}

export default SellingContainer;