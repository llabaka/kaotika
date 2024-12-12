import SellingItemInterface from '@/_common/interfaces/shop/Selling';
import SellingButtons from './SellingButtons';
import SellingItem from './SellingItem';


const SellingItemContainer: React.FC<SellingItemInterface> = ({ sellingImage, sellingItem, player, onClickSell }) => {
  return (
    <div className="flex-col w-[47%]">
      <div className="flex flex-col justify-start items-center h-[97%] mt-[5%]">

        {/* Selling Item */}
        <SellingItem sellingImage={sellingImage} />

        {/* Selling Buttons */}
        <SellingButtons sellingItem={sellingItem} player={player} onClickSell={onClickSell} />
      </div>
    </div>
  )
}

export default SellingItemContainer;