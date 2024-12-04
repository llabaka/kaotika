import { Player } from "@/_common/interfaces/Player";
import InventoryContainer from "./InventoryContainer";
import SellingItemContainer from "./SellingItemContainer";
import { useEffect, useState } from "react";
import { SellingContainerInterface } from "@/_common/interfaces/shop/Selling";
import SellingItem from "./SellingItem";
import { Product } from "@/_common/interfaces/shop/CardProps";

const SellingContainer: React.FC<SellingContainerInterface> = ({ player }) => {

    const [sellingImage, setSellingImage] = useState(player.inventory.helmets[0].image);
    const [sellingItem, setSellingItem] = useState<Product>(player.inventory.helmets[0]);

    useEffect(()=>{
        console.log(sellingItem);
    })

    return(
    <div className="justify-center flex w-full h-[85%]">
        {/* Inventory Contaienr */}
        <InventoryContainer player={player} setSellingImage={setSellingImage} setSellingItem={setSellingItem}/>

        {/* Empty Space */}
        <div className="flex-col w-[3%]"></div>

        {/* Selling Item Container */}
        <SellingItemContainer sellingImage={sellingImage} player={player} sellingItem={sellingItem}/>
    </div>
    )
}

export default SellingContainer;