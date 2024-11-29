import React, { useState } from "react";
import Image from "next/image";

const navigatorImage = require('./../../assets/MainNavigator.png')

interface SelectedButton {
    index: 0 | 1 | null;
  }

const MainNavigator = () => {

    const [selected, setSelected] = useState<SelectedButton['index']>(0);

     // Función para manejar el clic en los botones
     const handleButtonClick = (index: SelectedButton['index']) => {
        setSelected(index); // Actualiza el estado con el índice del botón clickeado
      };

  return (
    <div className="flex flex-col items-center bg-transparent w-full mx-auto">
      <div className="relative w-full h-[120px]">

        <Image
          src="/images/shop/MainNavigator.png"
          alt="MainNavigator"
          layout="fill"
          className="rounded-lg z-0"
        />

        <div className="justify-center flex items-center text-center h-full relative z-1">
                <button
                    onClick={() => handleButtonClick(0)} // Pasa el índice 0 al hacer clic
                    className={`flex-1 h-5/6 w-2/3 font-semibold rounded-lg transition-all duration-100 group ${selected === 0 ? 'text-orange-400 text-5xl' : 'text-white text-4xl'}`}
                >
                <p className="text-center group-hover:text-orange-200 transition-all duration-100">EQUIPMENT</p>

            </button>

            <button
                onClick={() => handleButtonClick(1)} // Pasa el índice 1 al hacer clic
                className={`flex-1 h-5/6 w-2/3 font-semibold rounded-lg transition-all duration-100 group ${selected === 1 ? 'text-orange-400 text-5xl' : 'text-white text-4xl'}`}  
                >
                <p className="text-center group-hover:text-orange-200 transition-all duration-100   ">MAGIC STUFF</p>


            </button>

        </div>
      </div>
    </div>
  );
};

export default MainNavigator;