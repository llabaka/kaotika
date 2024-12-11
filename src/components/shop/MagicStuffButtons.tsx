import Image from 'next/image';
import React, { useState } from 'react';
import { AllProducts } from '@/_common/interfaces/shop/AllProducts';
import { Product } from '@/_common/interfaces/shop/Product';
import { DISPLAY_SCREEN } from "@/constants/shopConstants";

interface IngredientsContainerButtonsInterface {
  allProducts: AllProducts;
  setShowingProducts: (loaded: Product[]) => void;
  setDisplayingScreen: (loaded: number) => void;
  setIsTicketPressed: (loaded: boolean) => void;
  setIsDollarPressed: (loaded: boolean) => void;
  setIsCartPressed: (loaded: boolean) => void;
}

const MagicStuffButtons: React.FC<IngredientsContainerButtonsInterface> = ({allProducts, setShowingProducts, setDisplayingScreen, setIsCartPressed, setIsDollarPressed, setIsTicketPressed}) => {

  const [activeButton, setActiveButton] = useState(0);

  const buttons = [
    { id: 0, label: 'INGREDIENTS' },
    { id: 1, label: 'CONTAINER' }
  ];


  return (
    <div className="flex-col justify-start items-center w-10/12 h-80 mt-1 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
      {buttons.map(({ id, label }) => (
        <button
          key={id}
          className={`w-[98%] h-16 flex relative items-center justify-center mb-4 transform transition-transform ${activeButton !== id ? 'hover:scale-105' : ''}`}
        >
          <Image
            src="/images/shop/ManagePlayerButton.png"
            alt={label}
            fill
            sizes='(max-width: 426px) 100vw'
            className={`transform transition ${activeButton === id ? 'scale-100' : 'scale-90'}`}
          />
          <span
            className={`z-10 text-orange-400 transition-all ${activeButton === id ? 'text-3xl text-orange-300' : 'text-2xl'
              } hover:text-orange-200`}
          >
            {label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default MagicStuffButtons;
