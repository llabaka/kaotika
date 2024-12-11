import React, { useState } from "react";
import Image from "next/image";
import { AllProducts } from "@/_common/interfaces/shop/AllProducts";
import { Product } from "@/_common/interfaces/shop/Product";

const navigatorImage = require('./../../assets/MainNavigator.png')

export interface SelectedButton {
  index: number;
}

interface MainNavigatorProps {
  allProducts: AllProducts;
  setShowingProducts: (loaded: Product[]) => void;
  selectedMainTab: number;
  setSelectedMainTab: (loaded: number) => void;
}

const MainNavigator = ({ allProducts, setShowingProducts, setSelectedMainTab, selectedMainTab }: MainNavigatorProps) => {

  // Función para manejar el clic en los botones
  const handleButtonClick = (index: number) => {

    // 0 para Equipment y 1 para ingredients
    switch (index) {
      case 0:
        setShowingProducts(allProducts?.weapons!);
        break;

      case 1:
        setShowingProducts(allProducts?.ingredients!);
        break;
    }

    setSelectedMainTab(index); // Actualiza el estado con el índice del botón clickeado
  };



  return (
    <div className="flex flex-col items-center bg-transparent w-full mx-auto">
      <div className="relative w-full h-[120px]">

        <Image
          src="/images/shop/MainNavigator.png"
          alt="MainNavigator"
          fill
          className="rounded-lg z-0"
        />

        <div className="justify-center flex items-center text-center h-full relative z-1">
          <button
            onClick={() => handleButtonClick(0)} // Pasa el índice 0 al hacer clic
            className={`flex-1 h-5/6 w-2/3 font-semibold rounded-lg transition-all duration-100 group ${selectedMainTab === 0 ? 'text-orange-400 text-5xl' : 'text-white text-4xl'}`}
          >
            <p className="text-center group-hover:text-orange-200 transition-all duration-100">EQUIPMENT</p>

          </button>

          <button
            onClick={() => handleButtonClick(1)} // Pasa el índice 1 al hacer clic
            className={`flex-1 h-5/6 w-2/3 font-semibold rounded-lg transition-all duration-100 group ${selectedMainTab === 1 ? 'text-orange-400 text-5xl' : 'text-white text-4xl'}`}
          >
            <p className="text-center group-hover:text-orange-200 transition-all duration-100   ">MAGIC STUFF</p>


          </button>

        </div>
      </div>
    </div>
  );
};

export default MainNavigator;