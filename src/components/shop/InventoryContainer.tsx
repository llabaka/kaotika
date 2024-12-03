import { Player } from "@/_common/interfaces/Player";

interface InventoryContainer {
	player: Player;
}

const InventoryContainer: React.FC<InventoryContainer> = ({ player }) =>  {
    console.log(player.inventory);
    
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center border-2 h-[90%] mt-10 border-white">
                <div className="border-2 w-[95%] h-[23%] border-white"></div>
            </div>
        </div>
    )
}

export default InventoryContainer;