import 'boxicons/css/boxicons.min.css';
import ShopIcons from './ShopIcons';
import PlayerStatsButtons from './PlayerStatsButtons';
import ButtonsSeparator from './ButtonsSeparator';
import EquipmentButtons from './EquipmentButtons';
import SellerSeparator from './SellerSeparator';
import Seller from './Seller';
import { useState } from 'react';
import MagicStuffButtons from './MagicStuffButtons';
import LeftMainContainerInterface from '@/_common/interfaces/shop/LeftContainerInterfaces';

const LeftMainContainer: React.FC<LeftMainContainerInterface> = ({ setDisplayingScreen, allProducts, setShowingProducts, player, selectedMainTab, setSelectedMainTab }) => {

  const [isTicketPressed, setIsTicketPressed] = useState(true);
  const [isDollarPressed, setIsDollarPressed] = useState(false);
  const [isCartPressed, setIsCartPressed] = useState(false);

  return (
    <div className="flex flex-col justify-start items-center w-3/12 p-4 rounded-md">

      {/* Shopping Icons */}
      <ShopIcons
        setDisplayingScreen={setDisplayingScreen}
        isTicketPressed={isTicketPressed}
        isDollarPressed={isDollarPressed}
        isCartPressed={isCartPressed}
        setIsTicketPressed={setIsTicketPressed}
        setIsDollarPressed={setIsDollarPressed}
        setIsCartPressed={setIsCartPressed}
      />

      {/* Seller Frame and Image */}
      <Seller />

      {/* Seller Separator */}
      <SellerSeparator />

      {/* Player Stats Buttons */}
      <PlayerStatsButtons player={player} />

      {/* Buttons Separator */}
      <ButtonsSeparator />

      {/* Equipment Buttons */}
      {selectedMainTab === 0 ? (
        <EquipmentButtons
          allProducts={allProducts}
          setShowingProducts={setShowingProducts}
          setDisplayingScreen={setDisplayingScreen}
          setIsTicketPressed={setIsTicketPressed}
          setIsDollarPressed={setIsDollarPressed}
          setIsCartPressed={setIsCartPressed}
        />
      ) : (
        <>
          {/* Replace this with your other component */}
          <MagicStuffButtons
            allProducts={allProducts}
            setShowingProducts={setShowingProducts}
            setDisplayingScreen={setDisplayingScreen}
            setIsTicketPressed={setIsTicketPressed}
            setIsDollarPressed={setIsDollarPressed}
            setIsCartPressed={setIsCartPressed}
          />
        </>
      )}
    </div>
  );
};

export default LeftMainContainer;