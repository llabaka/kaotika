import { useState } from "react";

const ShopIcons = () =>{

    const [isPressed, setIsPressed] = useState(false);

    const handleOnPress = () =>  {
		console.log("Boton pulsado");
        setIsPressed(prev => !prev);
	}

    return (
        <div className="flex justify-around w-full">
            <button onClick={handleOnPress} className="w-10 h-10 rounded-full flex justify-center items-center">
                <i className={`bx bxs-purchase-tag-alt text-2xl transition transform ${isPressed ? 'scale-125 text-orange-400' : ''} hover:text-orange-400`}></i>
            </button>
            <button className="w-10 h-10 rounded-full flex justify-center items-center">
                <i className='bx bx-dollar-circle text-2xl hover:text-orange-400 transition'></i>
            </button>
            <button className="w-10 h-10 rounded-full flex justify-center items-center">
                <i className="bx bxs-cart text-2xl hover:text-orange-400 transition"></i>
            </button>
        </div>
    )
}

export default ShopIcons;