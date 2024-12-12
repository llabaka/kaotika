import React, { useState } from "react";
import Image from "next/image";

const CartScreenMainTab = () => {

  return (
    <div className="bg-transparent w-full mx-auto">
      <div className="relative w-full h-[120px] justify-content text-center ">

        <div className="justify-center flex items-center text-center h-full relative z-1">
          <p className="text-6xl ">CART</p>
        </div>

        <Image
          src="/images/shop/CartMainTab.png"
          alt="MainNavigator"
          fill
          className="rounded-lg z-0"
        />

      </div>
    </div>
  );
};

export default CartScreenMainTab;