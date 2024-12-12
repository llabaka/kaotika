import { DISPLAY_SCREEN } from "@/constants/shopConstants";
import { useState } from "react";

interface ShopIconsInterface {
  setDisplayingScreen: (loaded: number) => void;
  isTicketPressed: boolean;
  isDollarPressed: boolean;
  isCartPressed: boolean;
  setIsTicketPressed: (loaded: boolean) => void;
  setIsDollarPressed: (loaded: boolean) => void;
  setIsCartPressed: (loaded: boolean) => void;
}

const ShopIcons: React.FC<ShopIconsInterface> = ({ setDisplayingScreen, isTicketPressed, isDollarPressed, isCartPressed, setIsTicketPressed, setIsDollarPressed, setIsCartPressed }) => {

  const handleOnPressTicket = () => {
    setIsTicketPressed(true);
    setIsDollarPressed(false);
    setIsCartPressed(false);
    setDisplayingScreen(DISPLAY_SCREEN.BUY);
  }

  const handleOnPressDollar = () => {
    setIsDollarPressed(true);
    setIsTicketPressed(false);
    setIsCartPressed(false);
    setDisplayingScreen(DISPLAY_SCREEN.SELL);
  }

  const handleOnPressCart = () => {
    setIsCartPressed(true);
    setIsTicketPressed(false);
    setIsDollarPressed(false);
    setDisplayingScreen(DISPLAY_SCREEN.CART);
  }

  return (
    <div className="flex flex-col justify-center items-center w-6/12 rounded-md">
      <div className="flex justify-around w-full h-16">
        <button onClick={handleOnPressTicket} title='Shop' className="w-16 h-full flex justify-center items-center">
          <i className={`bx bxs-purchase-tag-alt text-4xl transition transform ${isTicketPressed ? 'scale-150 text-orange-400' : ' text-gray-400'} hover:text-orange-400`}></i>
        </button>
        <button onClick={handleOnPressDollar} title='Sell' className="w-16 h-full flex justify-center items-center">
          <i className={`bx bx-dollar-circle text-4xl transition transform ${isDollarPressed ? 'scale-150 text-orange-400' : ' text-gray-400'} hover:text-orange-400`}></i>
        </button>
        <button onClick={handleOnPressCart} title='Cart' className="w-16 h-full flex justify-center items-center">
          <i className={`bx bxs-cart text-4xl transition transform ${isCartPressed ? 'scale-150 text-orange-400' : ' text-gray-400'} hover:text-orange-400`}></i>
        </button>
      </div>
    </div>
  )
}

export default ShopIcons;