import { useState } from "react";

const ShopIcons = () =>{

    const [isTicketPressed, setIsTicketPressed] = useState(true);
    const [isDollarPressed, setIsDollarPressed] = useState(false);
    const [isCartPressed, setIsCartPressed] = useState(false);

    const handleOnPressTicket = () =>  {
        setIsTicketPressed(prev => !prev);
        setIsDollarPressed(false);
        setIsCartPressed(false);
	}

    const handleOnPressDollar = () =>  {
        setIsDollarPressed(prev => !prev);
        setIsTicketPressed(false);
        setIsCartPressed(false);
	}

    const handleOnPressCart = () =>  {
        setIsCartPressed(prev => !prev);
        setIsTicketPressed(false);
        setIsDollarPressed(false);
	}

    return (
        <div className="flex flex-col justify-center items-center w-6/12 rounded-md">
            <div className="flex justify-around w-full">
                <button onClick={handleOnPressTicket} className="w-10 h-10 rounded-full flex justify-center items-center">
                    <i className={`bx bxs-purchase-tag-alt text-2xl transition transform ${isTicketPressed ? 'scale-150 text-orange-400' : ' text-gray-400'} hover:text-orange-400`}></i>
                </button>
                <button onClick={handleOnPressDollar} className="w-10 h-10 rounded-full flex justify-center items-center">
                    <i className={`bx bx-dollar-circle text-2xl transition transform ${isDollarPressed ? 'scale-150 text-orange-400' : ' text-gray-400'} hover:text-orange-400`}></i>
                </button>
                <button onClick={handleOnPressCart} className="w-10 h-10 rounded-full flex justify-center items-center">
                    <i className={`bx bxs-cart text-2xl transition transform ${isCartPressed ? 'scale-150 text-orange-400' : ' text-gray-400'} hover:text-orange-400`}></i>
                </button>
            </div>
        </div>
    )
}

export default ShopIcons;