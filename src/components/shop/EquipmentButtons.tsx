import Image from 'next/image';
import { useState } from 'react';

const EquipmentButtons = () => {

    const [isWeaponsPressed, setIsWeaponsPressed] = useState(true);
    const [isArmorsPressed, setIsArmorsPressed] = useState(false);
    const [isBootsPressed, setIsBootsPressed] = useState(false);
    const [isHelmetsPressed, setIsHelmetsPressed] = useState(false);
    const [isRingsPressed, setIsRingsPressed] = useState(false);
    const [isShieldsPressed, setIsShieldsPressed] = useState(false);

    const handleOnWeaponsPressed = () =>  {
        setIsWeaponsPressed(prev => !prev);
        setIsArmorsPressed(false);
        setIsBootsPressed(false);
        setIsHelmetsPressed(false);
        setIsRingsPressed(false);
        setIsShieldsPressed(false);
	}

    const handleOnArmorsPressed = () =>  {
        setIsWeaponsPressed(false);
        setIsArmorsPressed(prev => !prev);
        setIsBootsPressed(false);
        setIsHelmetsPressed(false);
        setIsRingsPressed(false);
        setIsShieldsPressed(false);
	}

    const handleOnBootsPressed = () =>  {
        setIsWeaponsPressed(false);
        setIsArmorsPressed(false);
        setIsBootsPressed(prev => !prev);
        setIsHelmetsPressed(false);
        setIsRingsPressed(false);
        setIsShieldsPressed(false);
	}

    const handleOnHelmetsPressed = () =>  {
        setIsWeaponsPressed(false);
        setIsArmorsPressed(false);
        setIsBootsPressed(false);
        setIsHelmetsPressed(prev => !prev);
        setIsRingsPressed(false);
        setIsShieldsPressed(false);
	}

    const handleOnRingsPressed = () =>  {
        setIsWeaponsPressed(false);
        setIsArmorsPressed(false);
        setIsBootsPressed(false);
        setIsHelmetsPressed(false);
        setIsRingsPressed(prev => !prev);
        setIsShieldsPressed(false);
	}

    const handleOnShieldsPressed = () =>  {
        setIsWeaponsPressed(false);
        setIsArmorsPressed(false);
        setIsBootsPressed(false);
        setIsHelmetsPressed(false);
        setIsRingsPressed(false);
        setIsShieldsPressed(prev => !prev);
	}

    return (
        <div className="flex-col justify-start items-center w-10/12 h-80 mt-1 max-h-[400px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-orange-100 [&::-webkit-scrollbar-thumb]:bg-orange-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-orange-400 pr-2">
            <button onClick={handleOnWeaponsPressed} className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                    className={isWeaponsPressed ? 'transform scale-100 transition' : ' transition-all transform scale-90'}
                />
                <span className={`z-10 text-orange-400 hover:text-orange-200 ${isWeaponsPressed ? 'transition-all text-3xl' : 'transition-all text-2xl'}`}>WEAPONS</span>
            </button>
            <button onClick={handleOnArmorsPressed} className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                    className={isArmorsPressed ? 'transform scale-100 transition' : ' transition-all transform scale-90'}
                />
                <span className={`z-10 text-orange-400 hover:text-orange-200 ${isArmorsPressed ? 'transition-all text-3xl' : 'transition-all text-2xl'}`}>ARMORS</span>
            </button>
            <button onClick={handleOnBootsPressed} className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                    className={isBootsPressed ? 'transform scale-100 transition' : ' transition-all transform scale-90'}
                />
                <span className={`z-10 text-orange-400 hover:text-orange-200 ${isBootsPressed ? 'transition-all text-3xl' : 'transition-all text-2xl'}`}>BOOTS</span>
            </button>
            <button onClick={handleOnHelmetsPressed} className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                    className={isHelmetsPressed ? 'transform scale-100 transition' : ' transition-all transform scale-90'}
                />
                <span className={`z-10 text-orange-400 hover:text-orange-200 ${isHelmetsPressed ? 'transition-all text-3xl' : 'transition-all text-2xl'}`}>HELMETS</span>
            </button>
            <button onClick={handleOnRingsPressed} className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                    className={isRingsPressed ? 'transform scale-100 transition' : ' transition-all transform scale-90'}
                />
                <span className={`z-10 text-orange-400 hover:text-orange-200 ${isRingsPressed ? 'transition-all text-3xl' : 'transition-all text-2xl'}`}>RINGS</span>
            </button>
            <button onClick={handleOnShieldsPressed} className="w-full h-16 flex relative items-center justify-center mb-4">
                <Image
                    src="/images/shop/ManagePlayerButton.png"
                    alt="Imagen 1"
                    layout="fill"
                    className={isShieldsPressed ? 'transform scale-100 transition' : ' transition-all transform scale-90'}
                />
                <span className={`z-10 text-orange-400 hover:text-orange-200 ${isShieldsPressed ? 'transition-all text-3xl' : 'transition-all text-2xl'}`}>SHIELDS</span>
            </button>
        </div>
    );
};

export default EquipmentButtons;