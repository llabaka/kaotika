import React from "react";
import Image from "next/image";

const navigatorImage = require('./../../assets/MainNavigator.png')

const SellingHeaders = () => {
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
          <div
            className="flex-1 justify-center items-center font-semibold text-center text-orange-400 text-5xl cursor-pointer">INVENTORY
          </div>

          <div
            className="flex-1 ustify-center items-center font-semibold text-center text-orange-400 text-5xl cursor-pointer">SELLING ITEM
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellingHeaders;
