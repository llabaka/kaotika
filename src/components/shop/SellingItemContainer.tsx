import SellingButtons from './SellingButtons';
import SellingItem from './SellingItem';

interface SellingItemContainer {
	sellingImage: String;
}

const SellingItemContainer: React.FC<SellingItemContainer> = ({ sellingImage }) =>{
    return (
        <div className="flex-col w-[47%]">
            <div className="flex flex-col justify-start items-center h-[97%] mt-[5%]">

                {/* Selling Item */}
                <SellingItem sellingImage={sellingImage}/>

                {/* Selling Buttons */}
                <SellingButtons/>
            </div>
        </div>
    )
}

export default SellingItemContainer;