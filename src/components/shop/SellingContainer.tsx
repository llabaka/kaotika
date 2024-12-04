import { Player } from "@/_common/interfaces/Player";
import InventoryContainer from "./InventoryContainer";
import SellingItemContainer from "./SellingItemContainer";
import { useEffect, useState } from "react";
import { SellingContainerInterface } from "@/_common/interfaces/shop/Selling";

const SellingContainer: React.FC<SellingContainerInterface> = ({ player }) => {

    const [sellingImage, setSellingImage] = useState(player.inventory.helmets[0].image);

    useEffect(() => {
        console.log(sellingImage);
    })

    return(
    <div className="justify-center flex w-full h-[85%]">
        {/* Inventory Contaienr */}
        <InventoryContainer player={player} setSellingImage={setSellingImage}/>

        {/* Empty Space */}
        <div className="flex-col w-[3%]"></div>

        {/* Selling Item Container */}
        <SellingItemContainer sellingImage={sellingImage} player={player}/>
    </div>
    )
}

export default SellingContainer;