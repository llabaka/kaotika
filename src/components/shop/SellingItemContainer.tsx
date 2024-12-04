import SellingItemInterface from '@/_common/interfaces/shop/Selling';
import SellingButtons from './SellingButtons';
import SellingItem from './SellingItem';


const SellingItemContainer: React.FC<SellingItemInterface> = ({ sellingImage, player }) =>{
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[97%] mt-[5%]">

                {/* Selling Item */}
                <SellingItem sellingImage={sellingImage} player={player}/>

                {/* Selling Buttons */}
                <SellingButtons/>
            </div>
        </div>
    )
}

export default SellingItemContainer;